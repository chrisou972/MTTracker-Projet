// ═══════════════════════════════════════════════
// MTTracker — Pipeline GTFS dynamique
// Mise à jour automatique des lignes
// ═══════════════════════════════════════════════

/**
 * STRATÉGIE DE MISE À JOUR AUTOMATIQUE DES LIGNES
 * 
 * Les lignes de bus en Martinique changent régulièrement :
 * - Nouvelles lignes créées (ex: 18 lignes Nord Atlantique en nov 2022)
 * - Lignes supprimées ou fusionnées
 * - Tracés modifiés (travaux, déviations)
 * - Horaires mis à jour (été/hiver, scolaire/vacances)
 * 
 * SOURCES DE DONNÉES :
 * ┌────────────────────────────────────────────────────────────────┐
 * │ Source                          │ URL                          │
 * ├────────────────────────────────────────────────────────────────┤
 * │ GTFS Centre (CACEM)             │ transport.data.gouv.fr       │
 * │ GTFS Sud (CAESM/Sudlib)         │ transport.data.gouv.fr       │
 * │ GTFS Maritime                   │ transport.data.gouv.fr       │
 * │ GTFS Scolaire                   │ transport.data.gouv.fr       │
 * │ Martinique Mobilités (horaires) │ martiniquemobilites.mq       │
 * │ Martinique Transport (infos)    │ martiniquetransport.mq       │
 * └────────────────────────────────────────────────────────────────┘
 * 
 * PIPELINE :
 * 
 *  [CRON hebdomadaire]
 *       │
 *       ▼
 *  [Télécharger GTFS ZIP depuis transport.data.gouv.fr]
 *       │
 *       ▼
 *  [Comparer hash SHA256 avec version précédente]
 *       │
 *       ├─ Identique → Rien à faire
 *       │
 *       └─ Différent → 
 *            │
 *            ▼
 *       [Parser les fichiers GTFS]
 *       (routes.txt, stops.txt, trips.txt, 
 *        stop_times.txt, shapes.txt, calendar.txt)
 *            │
 *            ▼
 *       [Comparer avec la base actuelle]
 *            │
 *            ├─ Nouvelles lignes → INSERT + notification admin
 *            ├─ Lignes supprimées → SOFT DELETE + notification admin
 *            ├─ Tracés modifiés → UPDATE shapes
 *            └─ Horaires modifiés → UPDATE stop_times
 *            │
 *            ▼
 *       [Log des changements]
 *       [Notification push aux utilisateurs si ligne favorite modifiée]
 *       [Mise à jour du cache Redis]
 */

// ── URLs des datasets GTFS sur transport.data.gouv.fr ──

export const GTFS_SOURCES = {
  centre: {
    name: "Réseau Centre (CACEM)",
    datasetUrl: "https://transport.data.gouv.fr/datasets/gtfs-urbain-de-la-zone-centre",
    // L'URL exacte du ZIP change à chaque mise à jour
    // Il faut la récupérer dynamiquement via l'API data.gouv.fr
    apiUrl: "https://www.data.gouv.fr/api/1/datasets//?organization=martinique-transport&q=centre",
    updateFrequency: "mensuel",
  },
  sud: {
    name: "Réseau Sud (CAESM/Sudlib)",
    datasetUrl: "https://transport.data.gouv.fr/datasets/gtfs-urbain-de-la-zone-sud",
    apiUrl: "https://www.data.gouv.fr/api/1/datasets/?organization=martinique-transport&q=sud",
    updateFrequency: "mensuel",
  },
  maritime: {
    name: "Réseau Maritime",
    datasetUrl: "https://transport.data.gouv.fr/datasets/gtfs-du-reseau-maritime-de-martinique",
    apiUrl: "https://www.data.gouv.fr/api/1/datasets/?organization=martinique-transport&q=maritime",
    updateFrequency: "trimestriel",
  },
  scolaire: {
    name: "Transport Scolaire",
    datasetUrl: "https://transport.data.gouv.fr/datasets/gtfs-du-transport-scolaire-en-martinique",
    apiUrl: "https://www.data.gouv.fr/api/1/datasets/?organization=martinique-transport&q=scolaire",
    updateFrequency: "annuel (rentrée)",
  },
};

/**
 * Architecture du CRON job (backend Node.js)
 * 
 * Pseudo-code du pipeline :
 */
export const PIPELINE_PSEUDOCODE = `
// cron: tous les lundis à 3h du matin (heure Martinique)
// 0 3 * * 1

async function updateGTFSData() {
  for (const [key, source] of Object.entries(GTFS_SOURCES)) {
    try {
      // 1. Récupérer l'URL du dernier GTFS via l'API data.gouv.fr
      const datasetInfo = await fetch(source.apiUrl);
      const latestResource = findLatestGTFS(datasetInfo);
      
      // 2. Comparer le hash avec notre version
      const currentHash = await db.query(
        "SELECT hash FROM gtfs_versions WHERE source = $1", [key]
      );
      
      if (latestResource.hash === currentHash) {
        log(\`[\${key}] Aucun changement détecté\`);
        continue;
      }
      
      // 3. Télécharger le nouveau GTFS
      const zipBuffer = await fetch(latestResource.url);
      const gtfsFiles = await unzipGTFS(zipBuffer);
      
      // 4. Parser et comparer
      const newRoutes = parseRoutes(gtfsFiles["routes.txt"]);
      const newStops = parseStops(gtfsFiles["stops.txt"]);
      const newShapes = parseShapes(gtfsFiles["shapes.txt"]);
      const newStopTimes = parseStopTimes(gtfsFiles["stop_times.txt"]);
      
      const diff = compareWithCurrent(key, { 
        routes: newRoutes, 
        stops: newStops, 
        shapes: newShapes 
      });
      
      // 5. Appliquer les changements
      if (diff.added.length > 0) {
        await insertNewRoutes(diff.added);
        await notifyAdmins(\`Nouvelles lignes: \${diff.added.map(r => r.name).join(", ")}\`);
      }
      
      if (diff.removed.length > 0) {
        await softDeleteRoutes(diff.removed);
        await notifyAdmins(\`Lignes supprimées: \${diff.removed.map(r => r.name).join(", ")}\`);
      }
      
      if (diff.modified.length > 0) {
        await updateRoutes(diff.modified);
      }
      
      // 6. Mettre à jour le cache Redis
      await redis.del("lines:all");
      await redis.del(\`lines:network:\${key}\`);
      
      // 7. Sauvegarder le hash
      await db.query(
        "UPSERT gtfs_versions SET hash = $1, updated_at = NOW() WHERE source = $2",
        [latestResource.hash, key]
      );
      
      // 8. Log
      log(\`[\${key}] Mis à jour: +\${diff.added.length} -\${diff.removed.length} ~\${diff.modified.length}\`);
      
    } catch (err) {
      logError(\`[\${key}] Erreur pipeline GTFS: \${err.message}\`);
      await notifyAdmins(\`ERREUR GTFS \${key}: \${err.message}\`);
    }
  }
}
`;

/**
 * Structure de la table PostgreSQL pour le versioning
 */
export const DB_SCHEMA = `
-- Versions des fichiers GTFS
CREATE TABLE gtfs_versions (
  source VARCHAR(50) PRIMARY KEY,
  hash VARCHAR(64) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  file_url TEXT,
  valid_from DATE,
  valid_to DATE
);

-- Lignes (routes) avec soft delete
CREATE TABLE lines (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  route_desc TEXT,
  network VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  color VARCHAR(7),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ -- soft delete
);

-- Arrêts
CREATE TABLE stops (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  geom GEOMETRY(Point, 4326), -- PostGIS
  line_id VARCHAR(20) REFERENCES lines(id),
  stop_sequence INTEGER,
  is_active BOOLEAN DEFAULT true
);

-- Index spatial pour la recherche par proximité
CREATE INDEX idx_stops_geom ON stops USING GIST(geom);

-- Tracés (shapes) des lignes
CREATE TABLE shapes (
  line_id VARCHAR(20) REFERENCES lines(id),
  direction VARCHAR(10), -- 'aller' ou 'retour'
  geom GEOMETRY(LineString, 4326), -- PostGIS
  PRIMARY KEY (line_id, direction)
);

CREATE INDEX idx_shapes_geom ON shapes USING GIST(geom);

-- Historique des changements
CREATE TABLE gtfs_changelog (
  id SERIAL PRIMARY KEY,
  source VARCHAR(50),
  action VARCHAR(20), -- 'added', 'removed', 'modified'
  entity_type VARCHAR(20), -- 'line', 'stop', 'shape'
  entity_id VARCHAR(50),
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Requête : trouver les lignes proches d'un point
-- SELECT l.* FROM lines l
-- JOIN stops s ON s.line_id = l.id
-- WHERE ST_DWithin(
--   s.geom, 
--   ST_SetSRID(ST_MakePoint(-61.06, 14.60), 4326),
--   3000  -- 3km en mètres
-- )
-- AND l.is_active = true
-- GROUP BY l.id
-- ORDER BY MIN(ST_Distance(s.geom, ST_SetSRID(ST_MakePoint(-61.06, 14.60), 4326)));
`;
