#!/usr/bin/env node
/**
 * MTTracker — Script d'import GTFS
 * 
 * Ce script télécharge les fichiers GTFS depuis transport.data.gouv.fr,
 * extrait les arrêts par ligne, et génère le fichier stops-data.js
 * utilisable directement dans l'app.
 * 
 * USAGE :
 *   node import-gtfs.js
 * 
 * PRÉ-REQUIS :
 *   npm install node-fetch adm-zip csv-parse
 * 
 * SOURCES :
 *   - GTFS Centre (CACEM) : 1 373 arrêts, 60 lignes
 *   - GTFS Nord : lignes interurbaines + locales  
 *   - GTFS Sud (Sudlib) : 91 lignes
 *   - GTFS Maritime : vedettes
 * 
 * SORTIE :
 *   src/data/stops-data.js — mapping complet arrêt → ligne avec coordonnées GPS
 */

const fs = require('fs');
const path = require('path');

// ── URLs des fichiers GTFS ──
const GTFS_URLS = {
  centre: "https://www.data.gouv.fr/api/1/datasets/r/6e599077-0719-44b4-82ad-0da90a282846",
  sud: "https://www.data.gouv.fr/api/1/datasets/r/b2e73b8f-0a83-4c2a-8b27-2ac69cf1c417", 
  maritime: "https://www.data.gouv.fr/api/1/datasets/r/9f3c0bba-c093-4c03-b0ff-8d4c72c38f64",
  scolaire: "https://www.data.gouv.fr/api/1/datasets/r/7a3e5c2d-8f1b-4a9c-b6d3-e2f8a7c9d1e5",
};

// ── GeoJSON (conversion automatique par transport.data.gouv.fr) ──
const GEOJSON_URLS = {
  centre: "https://transport.data.gouv.fr/resources/conversions/79898/GeoJSON",
  sud: "https://transport.data.gouv.fr/resources/conversions/79897/GeoJSON",
};

async function importGTFS() {
  console.log("═══════════════════════════════════════");
  console.log("  MTTracker — Import GTFS");
  console.log("═══════════════════════════════════════\n");

  // Étape 1 : Télécharger le GTFS Centre
  console.log("1. Téléchargement GTFS Centre...");
  
  try {
    const fetch = (await import('node-fetch')).default;
    const AdmZip = require('adm-zip');
    const { parse } = require('csv-parse/sync');

    for (const [network, url] of Object.entries(GTFS_URLS)) {
      console.log(`\n── ${network.toUpperCase()} ──`);
      console.log(`Téléchargement depuis ${url}...`);
      
      const response = await fetch(url);
      if (!response.ok) {
        console.log(`  ⚠️ Erreur ${response.status} — Skip`);
        continue;
      }
      
      const buffer = Buffer.from(await response.arrayBuffer());
      const zip = new AdmZip(buffer);
      
      // Extraire stops.txt
      const stopsEntry = zip.getEntry("stops.txt");
      const routesEntry = zip.getEntry("routes.txt");
      const tripsEntry = zip.getEntry("trips.txt");
      const stopTimesEntry = zip.getEntry("stop_times.txt");
      
      if (!stopsEntry) {
        console.log("  ⚠️ stops.txt non trouvé");
        continue;
      }
      
      const stops = parse(stopsEntry.getData().toString('utf8'), { columns: true, skip_empty_lines: true });
      console.log(`  ✅ ${stops.length} arrêts trouvés`);
      
      const routes = routesEntry ? parse(routesEntry.getData().toString('utf8'), { columns: true, skip_empty_lines: true }) : [];
      console.log(`  ✅ ${routes.length} lignes trouvées`);
      
      const trips = tripsEntry ? parse(tripsEntry.getData().toString('utf8'), { columns: true, skip_empty_lines: true }) : [];
      console.log(`  ✅ ${trips.length} trajets trouvés`);
      
      const stopTimes = stopTimesEntry ? parse(stopTimesEntry.getData().toString('utf8'), { columns: true, skip_empty_lines: true }) : [];
      console.log(`  ✅ ${stopTimes.length} horaires d'arrêt trouvés`);
      
      // Construire le mapping trip_id → route_id
      const tripToRoute = {};
      trips.forEach(t => { tripToRoute[t.trip_id] = t.route_id; });
      
      // Construire le mapping stop_id → [route_ids]
      const stopToRoutes = {};
      stopTimes.forEach(st => {
        const routeId = tripToRoute[st.trip_id];
        if (!routeId) return;
        if (!stopToRoutes[st.stop_id]) stopToRoutes[st.stop_id] = new Set();
        stopToRoutes[st.stop_id].add(routeId);
      });
      
      // Construire le mapping route_id → [stops avec coords]
      const routeStops = {};
      routes.forEach(r => { routeStops[r.route_id] = []; });
      
      stops.forEach(stop => {
        const routeIds = stopToRoutes[stop.stop_id];
        if (!routeIds) return;
        routeIds.forEach(routeId => {
          if (!routeStops[routeId]) routeStops[routeId] = [];
          routeStops[routeId].push({
            id: stop.stop_id,
            name: stop.stop_name,
            lat: parseFloat(stop.stop_lat),
            lng: parseFloat(stop.stop_lon),
          });
        });
      });
      
      // Écrire le résultat
      const outputFile = path.join(__dirname, 'src', 'data', `stops-${network}.json`);
      
      const output = {
        network,
        generatedAt: new Date().toISOString(),
        source: url,
        stats: {
          totalStops: stops.length,
          totalRoutes: routes.length,
          totalTrips: trips.length,
        },
        routes: routes.map(r => ({
          id: r.route_short_name || r.route_id,
          name: r.route_long_name || r.route_short_name,
          color: r.route_color ? `#${r.route_color}` : null,
          stops: (routeStops[r.route_id] || [])
            .filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i) // Déduplique
            .sort((a, b) => a.name.localeCompare(b.name)),
        })),
        // Mapping inversé : stop → lignes (pour "autour de moi")
        stopToLines: Object.fromEntries(
          stops.map(stop => {
            const routeIds = stopToRoutes[stop.stop_id];
            if (!routeIds || routeIds.size === 0) return null;
            return [
              stop.stop_name,
              {
                lat: parseFloat(stop.stop_lat),
                lng: parseFloat(stop.stop_lon),
                lines: [...routeIds].map(rid => {
                  const route = routes.find(r => r.route_id === rid);
                  return route ? (route.route_short_name || route.route_id) : rid;
                }),
              }
            ];
          }).filter(Boolean)
        ),
      };
      
      fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
      console.log(`  ✅ Écrit dans ${outputFile}`);
      
      // Stats
      const stopsWithRoutes = Object.keys(stopToRoutes).length;
      console.log(`  📊 ${stopsWithRoutes} arrêts liés à des lignes`);
      console.log(`  📊 ${Object.keys(output.stopToLines).length} noms d'arrêts uniques`);
    }
    
    console.log("\n═══════════════════════════════════════");
    console.log("  ✅ Import terminé !");
    console.log("  Les fichiers sont dans src/data/");
    console.log("  Lance l'app pour voir les vrais arrêts");
    console.log("═══════════════════════════════════════");
    
  } catch (err) {
    console.error("\n❌ Erreur :", err.message);
    console.log("\nAssure-toi d'installer les dépendances :");
    console.log("  npm install node-fetch adm-zip csv-parse");
  }
}

importGTFS();
