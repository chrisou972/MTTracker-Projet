// ═══════════════════════════════════════════════
// MTTracker — Module de sécurité
// Analyse des attaques GPS, injection, RGPD
// ═══════════════════════════════════════════════

// ────────────────────────────────────────────
// 1. SANITISATION DES ENTRÉES (anti-injection)
// ────────────────────────────────────────────

/**
 * Nettoie une entrée utilisateur contre :
 * - XSS (Cross-Site Scripting)
 * - SQL Injection (si jamais relayé au backend)
 * - NoSQL Injection
 * - Template Injection
 * - Path Traversal
 */
export function sanitizeInput(raw) {
  if (typeof raw !== "string") return "";
  
  let clean = raw
    // Limite de longueur (pas besoin de plus pour une recherche de ligne)
    .slice(0, 100)
    // Supprime les balises HTML/script
    .replace(/<[^>]*>/g, "")
    // Supprime les caractères dangereux pour SQL/NoSQL
    .replace(/['";\\`${}()]/g, "")
    // Supprime les séquences d'échappement
    .replace(/\\[nrtbfv0]/g, "")
    // Supprime les tentatives de path traversal
    .replace(/\.\.\//g, "")
    .replace(/\.\.\\/g, "")
    // Supprime les null bytes
    .replace(/\0/g, "")
    // Normalise les espaces
    .replace(/\s+/g, " ")
    .trim();
  
  return clean;
}

/**
 * Vérifie qu'une recherche ne contient pas de patterns suspects
 */
export function isSearchSafe(input) {
  const dangerousPatterns = [
    /(<script|javascript:|on\w+=)/i,
    /(union\s+select|drop\s+table|insert\s+into)/i,
    /(\$where|\$regex|\$gt|\$lt|\$ne)/i,
    /({{.*}}|<%.*%>)/,
    /(file:\/\/|data:)/i,
  ];
  return !dangerousPatterns.some(p => p.test(input));
}


// ────────────────────────────────────────────
// 2. SÉCURITÉ GPS — Analyse des attaques connues
// ────────────────────────────────────────────

/**
 * MENACES GPS IDENTIFIÉES ET PROTECTIONS :
 * 
 * ┌──────────────────────┬─────────────────────────────────────────────┐
 * │ ATTAQUE              │ PROTECTION MTTracker                        │
 * ├──────────────────────┼─────────────────────────────────────────────┤
 * │ GPS Spoofing         │ Vérification de cohérence : vitesse,       │
 * │ (fausse position)    │ direction, snap-to-route GTFS.             │
 * │                      │ Score de confiance multi-utilisateur.       │
 * │                      │ Rejet si position hors tracé > 150m.       │
 * ├──────────────────────┼─────────────────────────────────────────────┤
 * │ Replay Attack        │ Timestamp obligatoire + TTL 10s.           │
 * │ (rejouer d'anciens   │ Rejet des positions > 10s d'ancienneté.    │
 * │  signaux)            │ Nonce unique par session.                   │
 * ├──────────────────────┼─────────────────────────────────────────────┤
 * │ Location Harvesting  │ Pas de stockage des positions individuelles │
 * │ (récolte de          │ Agrégation immédiate → seule la position    │
 * │  positions)          │ du BUS est conservée, jamais celle de      │
 * │                      │ l'utilisateur.                              │
 * ├──────────────────────┼─────────────────────────────────────────────┤
 * │ Man-in-the-Middle    │ TLS 1.3 obligatoire (WSS, HTTPS).          │
 * │                      │ Certificate pinning sur l'app native.       │
 * ├──────────────────────┼─────────────────────────────────────────────┤
 * │ Triangulation        │ Aucun identifiant persistant.               │
 * │ (identifier un       │ Session ID aléatoire, détruit à la fin.     │
 * │  utilisateur)        │ Pas de fingerprinting device.               │
 * │                      │ Bruit ajouté sur les positions brutes.      │
 * ├──────────────────────┼─────────────────────────────────────────────┤
 * │ Flood / DDoS         │ Rate limiting : max 1 position/3s par       │
 * │                      │ session. Max 1 session active par device.   │
 * │                      │ Captcha invisible après comportement anormal│
 * ├──────────────────────┼─────────────────────────────────────────────┤
 * │ Faux signalements    │ Seuil de contributeurs : 1 signalement seul│
 * │ (spam de rapports)   │ = confiance basse. 3+ = affiché.           │
 * │                      │ Rate limit : max 1 report / 5 min.         │
 * │                      │ Score de fiabilité par session anonyme.     │
 * └──────────────────────┴─────────────────────────────────────────────┘
 */

/**
 * Valide une position GPS reçue d'un client
 */
export function validateGPSPosition(position, previousPosition, routeShape) {
  const errors = [];
  
  // 1. Coordonnées valides pour la Martinique
  const { lat, lng, timestamp, accuracy } = position;
  if (lat < 14.38 || lat > 14.90 || lng < -61.25 || lng > -60.80) {
    errors.push("HORS_MARTINIQUE");
  }
  
  // 2. Précision GPS acceptable (< 100m)
  if (accuracy && accuracy > 100) {
    errors.push("PRECISION_INSUFFISANTE");
  }
  
  // 3. Timestamp frais (< 10 secondes)
  const age = Date.now() - timestamp;
  if (age > 10000 || age < -1000) {
    errors.push("TIMESTAMP_INVALIDE");
  }
  
  // 4. Vitesse réaliste (si position précédente)
  if (previousPosition) {
    const dt = (timestamp - previousPosition.timestamp) / 1000; // secondes
    if (dt > 0) {
      const dist = haversineDistance(
        previousPosition.lat, previousPosition.lng,
        lat, lng
      );
      const speedKmh = (dist / dt) * 3.6;
      
      // Bus urbain max ~80 km/h, interurbain ~90 km/h
      if (speedKmh > 90) {
        errors.push("VITESSE_IRREALISTE");
      }
      // Immobile = probablement pas dans un bus en mouvement (sauf arrêt)
      // On tolère car le bus peut être à un arrêt ou dans un embouteillage
    }
  }
  
  // 5. Proximité avec le tracé GTFS (snap-to-route)
  if (routeShape) {
    const distToRoute = distanceToPolyline(lat, lng, routeShape);
    if (distToRoute > 150) { // > 150m du tracé
      errors.push("HORS_TRACE");
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    confidence: Math.max(0, 1 - (errors.length * 0.3))
  };
}

/**
 * Rate limiter pour les positions GPS
 */
export function createRateLimiter(maxPerWindow, windowMs) {
  const sessions = new Map();
  
  return {
    check(sessionId) {
      const now = Date.now();
      if (!sessions.has(sessionId)) {
        sessions.set(sessionId, []);
      }
      const timestamps = sessions.get(sessionId).filter(t => now - t < windowMs);
      if (timestamps.length >= maxPerWindow) {
        return false; // Rate limited
      }
      timestamps.push(now);
      sessions.set(sessionId, timestamps);
      return true;
    },
    cleanup() {
      const now = Date.now();
      for (const [id, ts] of sessions) {
        const valid = ts.filter(t => now - t < windowMs);
        if (valid.length === 0) sessions.delete(id);
        else sessions.set(id, valid);
      }
    }
  };
}


// ────────────────────────────────────────────
// 3. ANONYMISATION & RGPD
// ────────────────────────────────────────────

/**
 * PRINCIPES RGPD APPLIQUÉS :
 * 
 * Art. 5 - Minimisation : seul lat/lng/timestamp/lineId collecté
 * Art. 6 - Base légale : consentement explicite (bouton "Je suis monté")
 * Art. 7 - Consentement : révocable à tout instant ("Je descends")
 * Art. 13 - Information : popup premier lancement + politique de conf.
 * Art. 17 - Effacement : positions supprimées après agrégation (~5s)
 * Art. 25 - Privacy by design : anonymisation dès la conception
 * Art. 35 - DPIA : requise (géolocalisation grande échelle)
 */

/**
 * Génère un ID de session anonyme (aucun lien avec l'appareil)
 */
export function generateAnonymousSessionId() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Ajoute du bruit GPS pour empêcher la triangulation fine
 * Bruit de ~20m : suffisant pour cacher la position exacte
 * mais assez précis pour le snap-to-route
 */
export function addPositionNoise(lat, lng, noiseMeters = 20) {
  // 1 degré latitude ≈ 111km
  const latNoise = (Math.random() - 0.5) * 2 * (noiseMeters / 111000);
  // 1 degré longitude à 14.6° N ≈ 107km
  const lngNoise = (Math.random() - 0.5) * 2 * (noiseMeters / 107000);
  return {
    lat: lat + latNoise,
    lng: lng + lngNoise
  };
}

/**
 * Structure de données envoyée au serveur
 * (RIEN d'identifiable)
 */
export function createPositionPayload(lat, lng, lineId, direction, sessionId) {
  const noisy = addPositionNoise(lat, lng);
  return {
    sid: sessionId,           // Session anonyme temporaire
    lat: noisy.lat,           // Position avec bruit
    lng: noisy.lng,
    line: lineId,             // Ligne sélectionnée
    dir: direction,           // aller ou retour
    ts: Date.now(),           // Timestamp
    // PAS de : device ID, user agent, IP (masqué par le proxy), 
    // numéro de téléphone, email, nom, etc.
  };
}


// ────────────────────────────────────────────
// 4. UTILITAIRES GÉO
// ────────────────────────────────────────────

/**
 * Distance en mètres entre deux points (Haversine)
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 + 
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * 
    Math.sin(dLng/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

/**
 * Distance minimale d'un point à une polyline (tracé GTFS)
 */
export function distanceToPolyline(lat, lng, polyline) {
  let minDist = Infinity;
  for (let i = 0; i < polyline.length - 1; i++) {
    const d = distanceToSegment(
      lat, lng,
      polyline[i][0], polyline[i][1],
      polyline[i+1][0], polyline[i+1][1]
    );
    if (d < minDist) minDist = d;
  }
  return minDist;
}

function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const lenSq = dx*dx + dy*dy;
  if (lenSq === 0) return haversineDistance(px, py, ax, ay);
  let t = ((px-ax)*dx + (py-ay)*dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return haversineDistance(px, py, ax + t*dx, ay + t*dy);
}

/**
 * Trouve les lignes à proximité d'une position
 * @param {number} lat - Latitude utilisateur
 * @param {number} lng - Longitude utilisateur
 * @param {Array} lines - Toutes les lignes avec stops
 * @param {number} radiusKm - Rayon de recherche en km
 */
export function findNearbyLines(lat, lng, lines, radiusKm = 3) {
  // Pour chaque ligne, vérifier si un arrêt est dans le rayon
  return lines.filter(line => {
    if (!line.stops || line.stops.length === 0) return false;
    return line.stops.some(stop => {
      const dist = haversineDistance(lat, lng, stop.lat, stop.lng);
      return dist <= radiusKm * 1000;
    });
  }).sort((a, b) => {
    // Trier par distance de l'arrêt le plus proche
    const distA = Math.min(...a.stops.map(s => haversineDistance(lat, lng, s.lat, s.lng)));
    const distB = Math.min(...b.stops.map(s => haversineDistance(lat, lng, s.lat, s.lng)));
    return distA - distB;
  });
}
