# 🚌 MTTracker — Tracking communautaire des bus en Martinique

> **An nou tracké bis-la ansanm !**

MTTracker est une application communautaire qui permet de suivre les bus de Martinique en temps réel, en s'appuyant sur la géolocalisation volontaire et anonyme des passagers.

## 🎯 Le problème

La Martinique n'a **aucun système de tracking temps réel** pour ses bus. Les données GTFS existent (horaires théoriques) mais aucun GTFS-RT (positions GPS). Les usagers ne savent jamais si le bus va passer, à quelle heure, ni même s'il roule ce jour-là.

Résultat : la Martinique est le département français avec le plus de voitures par habitant.

## 💡 La solution

Plutôt que d'attendre le déploiement coûteux de boîtiers GPS dans chaque bus (SAEIV), MTTracker utilise les **smartphones des passagers** comme capteurs GPS distribués :

1. **L'usager monte dans le bus** → il appuie sur "Je suis monté dans le bus"
2. **Son GPS anonyme est agrégé** avec ceux des autres passagers de la même ligne
3. **La position du bus est déduite** et affichée en temps réel pour tous

## 📊 Couverture

**110 lignes répertoriées** sur tous les réseaux de Martinique Transport :

| Réseau | Lignes | Zone |
|--------|--------|------|
| TCSP (BHNS) | A, B | Fort-de-France ↔ Lamentin |
| Centre / Mozaïk | 47 lignes | FdF, Lamentin, Schoelcher, St-Joseph |
| Nord Caraïbe | NC01-NC10 + NC4A/B, NC8A/B | Saint-Pierre, Prêcheur, Morne-Rouge |
| Nord Atlantique | NA21-NA27 | Trinité, Ste-Marie, Robert, Basse-Pointe |
| Gros-Morne | GRM-1 à GRM-7 | Gros-Morne local |
| Le Lorrain | LR01-LR06 | Le Lorrain local |
| Le Robert | ROB-1 à ROB-8 | Le Robert local |
| La Trinité | TRI-1 à TRI-5 + TME-1 | Trinité local + Morne des Esses |
| Sainte-Marie | SMR-1 à SMR-9 | Ste-Marie local + Zone du Bac |
| Maritime | VT1, VT2 | Vedettes Fort-de-France ↔ Trois-Îlets |

## 🏗️ Structure du projet

```
MTTracker/
├── README.md                    ← Ce fichier
├── package.json                 ← Config npm
│
├── docs/
│   ├── MTTracker_Cadrage_Projet.docx   ← Document de cadrage complet (13 sections)
│   ├── MTTracker_Cadrage_Projet.pdf    ← Version PDF
│   └── rapport-problematiques-martinique.jsx  ← Rapport interactif des 10 problématiques
│
├── src/
│   ├── components/
│   │   ├── App.jsx              ← Application principale (sélection ligne, tracking, signalements, notation)
│   │   └── Landing.jsx          ← Landing page (inscription bêta, présentation)
│   │
│   └── data/
│       └── lines.js             ← Base de données des 110 lignes (exportable)
│
└── public/
    └── index.html               ← Point d'entrée
```

## ✨ Fonctionnalités (MVP)

- [x] **110 lignes répertoriées** avec recherche et filtres par réseau
- [x] **Sélecteur de direction** (Aller / Retour) pour chaque ligne
- [x] **Bouton "Je suis monté dans le bus"** — UX naturelle, pas de sensation de tracking
- [x] **Détection automatique de fin de trajet** (inactivité GPS)
- [x] **Signalements communautaires** : 🚨 Accident, 🧍 Bus plein, ⏰ Retard, 🚫 Annulé, 🔧 Panne
- [x] **Notation de fin de voyage** (5 niveaux : Galère → Top)
- [x] **Indicateur de confiance** (nombre de contributeurs par bus)
- [x] **Arrêts visibles** sur le tracé avec terminus marqués
- [x] **Landing page** avec inscription bêta et présentation complète

## 🔧 Stack technique cible

| Couche | Technologie |
|--------|-------------|
| Frontend mobile | React Native / Expo (ou PWA) |
| Frontend web | React + Mapbox GL JS |
| Backend API | Node.js (Fastify) ou Python (FastAPI) |
| Temps réel | WebSocket (Socket.io) |
| Base de données | PostgreSQL + PostGIS + Redis |
| Hébergement | Scaleway ou OVH (France, RGPD) |
| Cartographie | Mapbox ou MapTiler (OpenStreetMap) |

## 🔒 Privacy by design

- **Aucun compte requis** — pas d'email, pas de mot de passe
- **GPS anonyme** — identifiant de session temporaire, détruit en fin de trajet
- **Aucune donnée personnelle** stockée — seule la position agrégée du bus est conservée
- **Conforme RGPD** — consentement explicite, minimisation, rétention limitée
- **DPIA requise** avant lancement (géolocalisation à grande échelle)

## 🚀 Roadmap

| Phase | Période | Livrables |
|-------|---------|-----------|
| Phase 0 | Sem. 1-2 | Cadrage ✅, maquettes ✅, import GTFS |
| Phase 1 | Sem. 3-6 | Backend API + WebSocket, clustering GPS, PostGIS |
| Phase 2 | Sem. 7-10 | App mobile/PWA fonctionnelle |
| Phase 3 | Sem. 11-13 | ETA, qualité données, beta privée 50 testeurs |
| Phase 4 | Sem. 14-16 | Tests terrain, RGPD, **lancement public** |

## 💰 Modèle économique

- **B2B Data** : données agrégées pour Martinique Transport (retards, fréquentation)
- **Subventions** : CTM, ADEME, BPI France, FEDER
- **Freemium** : version gratuite + premium sans pub avec alertes personnalisées
- **Partenariat MT** : adoption comme outil officiel à moyen terme

## 🌊 Fait partie d'un écosystème

MTTracker est le premier volet d'une plateforme citoyenne :
- **MTTracker** — Bus en temps réel (ce projet)
- **DloTracker** — Coupures d'eau en temps réel (à venir)
- **PrixAntiy** — Comparateur de prix communautaire (à venir)

Même architecture, même communauté, trois problèmes résolus.

## 📧 Contact

Projet en développement — Martinique 🇲🇶

---

*An nou tracké bis-la ansanm !* 🚌
