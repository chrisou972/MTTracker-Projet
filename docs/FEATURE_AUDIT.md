# MTTracker — Audit des fonctionnalités
# Chaque feature : RÉELLE, SIMULÉE, ou MANQUANTE

## ═══════════════════════════════════════
## RÉSULTAT : 8 faux / 14 vrais / 6 manquants
## ═══════════════════════════════════════

### ✅ RÉEL — Fonctionne vraiment
1. Recherche sanitisée — filtre les lignes en temps réel ✅
2. Filtres par réseau (chips) — fonctionnels ✅  
3. Sélection de ligne — ouvre l'écran tracking ✅
4. Direction aller/retour — inverse les terminus ✅
5. Bouton "Je suis monté" — change l'état ✅
6. Notation de fin de trajet — affiche les emojis, cliquable ✅
7. Géolocalisation — appelle navigator.geolocation ✅
8. Validation GPS Martinique — rejette les coords hors zone ✅
9. Recherche bascule auto en vue "toutes" ✅
10. Sanitisation recherche — strip XSS/SQL ✅
11. Rate limit signalements — cooldown 60s ✅
12. Toggle "Autour de moi" / "Toutes les lignes" ✅
13. Proximité par ligne (coords terminus) ✅
14. Toast notifications ✅

### 🔴 FAUX — Simulé, données bidons
1. Badge "LIVE" — toujours affiché, même hors connexion
2. "47 actifs" — nombre random, pas de vrais users
3. Bus animés sur le tracé — simulation Math.random()
4. "Bus détectés: 2" — nombre random, pas de vrais bus  
5. "ETA: 5 min" — Math.random(), aucun calcul réel
6. "Contributeurs: 12" — simulé
7. Signalements live "5 min retard Perrinon" — texte en dur
8. Compteur "247 inscrits à la bêta" (Landing) — faux

### ⚠️ MANQUANT — Devrait exister pour un vrai test
1. Détection hors-ligne (LIVE → HORS LIGNE)
2. Persistance des signalements (disparaissent au reload)
3. Partage GPS réel pendant le trajet (watchPosition)
4. Timer de trajet qui se met à jour en temps réel  
5. Détection auto fin de trajet (immobilité)
6. Compteur de distance parcourue
