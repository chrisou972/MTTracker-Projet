# 🔒 MTTracker — Audit de sécurité

**Date :** Mars 2026  
**Scope :** Frontend React (App.jsx, Landing.jsx), modules data (security.js, lines.js, gtfs-pipeline.js)

---

## Résultats de l'audit automatisé

| Catégorie | Statut | Détails |
|-----------|--------|---------|
| XSS (Cross-Site Scripting) | ✅ OK | Aucun `dangerouslySetInnerHTML`, `innerHTML`, `eval()` |
| Injection DOM | ✅ OK | Aucun `document.write`, insertion dynamique de script |
| Stockage non sécurisé | ✅ OK | Aucun `localStorage`, `sessionStorage`, `cookie` |
| Fuites dans les URLs | ✅ OK | Aucune donnée sensible dans les paramètres URL |
| Secrets exposés | ✅ OK | Aucune clé API, token, mot de passe en clair |
| Console.log | ✅ OK | Aucun log pouvant fuiter des données |

---

## Failles détectées et corrigées

### 🔴 FAILLE 1 — Email non sanitisé (Landing.jsx)
**Risque :** Injection XSS via le champ email de la landing page  
**Localisation :** `Landing.jsx` lignes 105 et 301  
**Problème :** `onChange={e => setEmail(e.target.value)}` — aucune validation  
**Attaque possible :** `"><script>alert(1)</script>` ou `'; DROP TABLE users;--`  
**Correction :** Ajout de `sanitizeEmail()` avec validation regex + strip HTML  

### 🔴 FAILLE 2 — GPS non validé après réception (App.jsx)
**Risque :** GPS spoofing, coordonnées absurdes  
**Localisation :** `App.jsx` ligne 201  
**Problème :** `setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })` sans vérification  
**Attaque possible :** Un appareil rooté envoie des coordonnées à Paris → voit 0 lignes  
**Correction :** Validation que les coordonnées sont dans les bornes de la Martinique  

### 🟡 FAILLE 3 — Proximité trop imprécise (App.jsx)
**Risque :** Mauvaise UX, pas une faille de sécu directe  
**Problème :** Un seul point par réseau → toutes les lignes d'un réseau apparaissent d'un coup  
**Correction :** Coordonnées par ligne (terminus) au lieu d'un point par réseau  

### 🟡 FAILLE 4 — Rate limiting absent côté client
**Risque :** Un utilisateur malveillant spamme les signalements  
**Problème :** Le bouton de signalement n'a aucun cooldown  
**Correction :** Cooldown de 60s entre chaque signalement côté client + rate limit serveur  

### 🟡 FAILLE 5 — Pas de Content Security Policy
**Risque :** Injection de scripts tiers  
**Problème :** Aucune CSP définie dans index.html  
**Correction :** Ajout de meta CSP dans index.html  

---

## Failles supplémentaires à considérer (backend futur)

### 🔴 WebSocket Hijacking
**Risque :** Un attaquant se connecte au WebSocket et envoie de fausses positions  
**Protection :** Token de session anonyme + validation server-side de chaque position  

### 🔴 Déni de service par flood GPS
**Risque :** Envoi massif de positions pour surcharger le serveur  
**Protection :** Rate limiter 1 position / 3 secondes par session, ban auto après 100 rejets  

### 🟡 Corrélation temporelle
**Risque :** Corréler les heures de connexion pour identifier un usager régulier  
**Protection :** Nouveau session ID à chaque ouverture d'app, pas de persistence  

### 🟡 Fingerprinting navigateur
**Risque :** Identifier un utilisateur via user-agent, résolution, plugins  
**Protection :** Ne collecter AUCUNE info device. Proxy les WebSocket via un relay qui strip les headers  

### 🟡 Analyse de patterns de trajet
**Risque :** Identifier quelqu'un par ses habitudes (même ligne, même heure)  
**Protection :** Pas de stockage historique côté serveur. Agrégation immédiate.  

### 🟢 Interception réseau (MitM)
**Risque :** Interception des positions en transit  
**Protection déjà prévue :** TLS 1.3 obligatoire (WSS + HTTPS), certificate pinning en natif  
