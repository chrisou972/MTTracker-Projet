# MTTracker v5 — Analyse de refonte

## CE QUI ÉTAIT BON (v2/v3) et qu'on a PERDU dans v4
- ✅ Direction aller/retour fonctionnel avec terminus inversés
- ✅ Toutes les lignes nearby au même niveau (pas de carte "featured")
- ✅ Badge anonyme intégré proprement dans le header
- ✅ Tracking : barre de statut claire avec durée + distance + idle
- ✅ Signalements persistés avec compteur par ligne
- ✅ Toggle "Autour de moi" / "Toutes les lignes" clair
- ✅ Rate limiting signalements
- ✅ Sanitisation recherche

## CE QUI EST BIEN dans v4 (à GARDER)
- ✅ Gradient header arrondi (tropical ocean)
- ✅ Timeline d'arrêts (dots connectés)
- ✅ Cards blanches sur fond gris clair
- ✅ Bottom nav pill (mais revoir les onglets)
- ✅ Location picker en bottom sheet
- ✅ Typo Outfit + DM Sans
- ✅ Ombres douces, border-radius généreux

## BUGS À CORRIGER
1. Profile tab → INUTILE, l'app est anonyme
2. Featured card → SUPPRIME, toutes les lignes sont égales
3. Direction aller/retour → CASSÉ, remettre le toggle
4. Tracking status → MAL PLACÉ dans le header gradient
5. Badge anonyme → FLOTTANT dans le vide sur l'écran tracking
6. ETA "DÉMO" → PAS PERTINENT sans données réelles

## ARCHITECTURE DES ÉCRANS

### ACCUEIL
┌─────────────────────────────┐
│ [gradient header]            │
│  MTTracker        ● LIVE     │
│  🔍 Rechercher...           │
│  📍 Derrière-Morne ✎  🔒   │
├─────────────────────────────┤
│ [Autour de moi] [Toutes]    │
│                              │
│ 📍 Lignes à Derrière-Morne  │
│ ┌───────────────────────┐   │
│ │ NA22  Basse-Pointe→Mah│ › │
│ │ SMR5  Ste-Marie Boucle│ › │
│ │ SMR8  Ste-Marie→ZonBac│ › │
│ │ TME1  Trinité→MorneEss│ › │
│ └───────────────────────┘   │
│                              │
├─────────────────────────────┤
│ 🏠 Accueil  🚌 Lignes  ⚠️  │
└─────────────────────────────┘

### PAGE LIGNE (tracking)
┌─────────────────────────────┐
│ ← NA22  Basse-Pointe↔Mahault│
├─────────────────────────────┤
│ [→ Aller: BP→Mah] [← Retour]│
├─────────────────────────────┤
│ Arrêts                       │
│ ● Basse-Pointe        (dép.)│
│ │                            │
│ ○ Arrêt 2                    │
│ │  🚌 Bus en approche        │
│ ○ Arrêt 3                    │
│ │                            │
│ ● Mahault             (arr.) │
├─────────────────────────────┤
│ ⚠️ Signalements              │
│ ✅ RAS — la ligne roule      │
├─────────────────────────────┤
│ [🚌 Je suis monté dans le bus]│
│                              │
│ En mode tracking :           │
│ ┌─ 🟢 En route ─── 12:34 ─┐│
│ │ NA22 → Mahault  3.2 km   ││
│ │ [Signaler] [Arrivé 🛑]   ││
│ └──────────────────────────┘│
├─────────────────────────────┤
│ 🏠 Accueil  🚌 Lignes  ⚠️  │
└─────────────────────────────┘

## BOTTOM NAV — 3 onglets seulement
- 🏠 Accueil (nearby lines)
- 🚌 Lignes (toutes les 110 lignes)  
- ⚠️ Infos (signalements actifs + sécurité/confidentialité)
PAS de Profil (anonyme), pas de Live (redondant avec Accueil)

## SÉCURITÉ — Points à auditer
1. Sanitisation inputs : recherche + location picker
2. GPS : validation Martinique + bruit + try/catch
3. Rate limiting : signalements 60s
4. Pas de localStorage/sessionStorage
5. Pas de tracking côté client
6. CSP dans index.html
7. Pas de données personnelles stockées
8. Badge sécurité visible mais pas flottant
