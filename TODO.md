# MTTracker — TODO / Next Steps

## 🔴 Priorité haute (avant bêta)

### Infrastructure
- [ ] Réserver le domaine **mttracker.mq**
- [ ] Créer les comptes réseaux sociaux (Instagram, Facebook, TikTok)
- [ ] Setup hébergement (Scaleway Paris ou OVH Gravelines)
- [ ] Setup PostgreSQL + PostGIS
- [ ] Setup Redis pour le pub/sub temps réel

### Backend
- [ ] Télécharger et importer les fichiers GTFS depuis transport.data.gouv.fr
- [ ] Pipeline d'import GTFS automatisé (cron job)
- [ ] API REST : GET /lines, GET /lines/:id/stops, GET /lines/:id/buses
- [ ] WebSocket server pour recevoir les positions GPS des passagers
- [ ] Algorithme de clustering GPS → position bus
- [ ] Snap-to-route (ST_ClosestPoint PostGIS)
- [ ] Filtrage de vélocité (rejet positions > 80 km/h)
- [ ] API signalements : POST /reports, GET /lines/:id/reports

### Frontend / App
- [ ] Intégrer Mapbox GL JS avec les vrais shapes GTFS
- [ ] Afficher les vrais arrêts avec noms depuis GTFS stops.txt
- [ ] Géolocalisation native (navigator.geolocation)
- [ ] Mode PWA avec service worker (offline fallback)
- [ ] Notifications push (signalements, perturbations)

### RGPD / Légal
- [ ] Rédiger la politique de confidentialité (FR + créole)
- [ ] Rédiger les CGU
- [ ] Réaliser l'AIPD (Analyse d'Impact)
- [ ] Mentionner le DPO / référent RGPD

## 🟡 Priorité moyenne (bêta privée)

- [ ] Système de gamification pour encourager le partage (badges, streak)
- [ ] Détection automatique de fin de trajet (GPS immobile > 10 min)
- [ ] Détection automatique de la ligne (matching GPS avec shapes GTFS)
- [ ] Historique personnel des trajets (stocké localement, pas en base)
- [ ] Score de fiabilité par ligne (basé sur notations communautaires)
- [ ] Widget "prochain bus" pour l'écran d'accueil

## 🟢 Priorité basse (post-lancement)

- [ ] Chat anonyme par ligne (modéré)
- [ ] Publication sur App Store + Google Play
- [ ] Dashboard B2B pour Martinique Transport (analytics)
- [ ] Intégration réseau Sud (Sudlib / Mobilité Sud — 91 lignes supplémentaires)
- [ ] Module DloTracker (coupures d'eau)
- [ ] Module PrixAntiy (comparateur de prix)
- [ ] API publique pour développeurs tiers

## 📊 KPIs de lancement

| Métrique | Objectif M+1 | Objectif M+3 | Objectif M+6 |
|----------|-------------|-------------|-------------|
| Inscriptions bêta | 500 | 3 000 | 10 000 |
| Contributeurs actifs/jour | 50 | 300 | 1 000 |
| Lignes couvertes (>1 contrib) | 3 (TCSP) | 15 | 40+ |

## 🎯 Prochaines actions immédiates

1. ✅ Document de cadrage projet
2. ✅ Rapport des problématiques Martinique
3. ✅ Prototype app (110 lignes, tracking, signalements, notation)
4. ✅ Landing page avec inscription bêta
5. ⬜ Réserver mttracker.mq
6. ⬜ Créer @mttracker sur Instagram/Facebook
7. ⬜ Partager la landing avec 10 proches pour feedback
8. ⬜ Télécharger les GTFS et valider les shapes
9. ⬜ Prototyper le snap-to-route avec PostGIS
