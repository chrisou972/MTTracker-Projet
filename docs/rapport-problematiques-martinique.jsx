import { useState } from "react";

const problems = [
  {
    id: 1,
    rank: 1,
    title: "Vie chère & prix alimentaires",
    criticite: 10,
    pertinence: 10,
    score: 100,
    icon: "🛒",
    color: "#E74C3C",
    summary: "Les prix alimentaires sont 40% plus chers qu'en métropole (INSEE 2022). Malgré le Bouclier Qualité-Prix élargi à 180 produits en septembre 2025, les prix continuent d'augmenter (+0,8% sur un an). Crise sociale majeure en octobre 2024 : manifestations, barricades, couvre-feu, aéroport fermé.",
    sources: ["INSEE Analyses Martinique n°63", "Martinique la 1ère (sept 2025)", "RCI, France-Antilles"],
    details: "L'octroi de mer, les marges des importateurs-grossistes et le quasi-monopole de la grande distribution (GBH/Bernard Hayot) créent une opacité totale sur la formation des prix. Le Nutella est 74% plus cher au Lamentin qu'au Havre. Les produits locaux sont parfois plus chers que les produits importés, un comble.",
    solution: {
      name: "PrixAntiy — Comparateur de prix communautaire",
      type: "Application mobile + IA",
      description: "Application où les utilisateurs scannent les codes-barres et photographient les étiquettes de prix dans les supermarchés. L'IA agrège les données pour créer une cartographie en temps réel des prix par produit, par magasin, par commune. Comparaison automatique avec les prix métropolitains. Alertes sur les meilleures offres. Analyse IA des marges anormales.",
      impact: "Transparence totale sur les prix → pression concurrentielle → baisse des marges. Outil de négociation pour les associations de consommateurs et les pouvoirs publics.",
      techStack: "React Native, OCR (Google Vision), IA de classification produits, base de données prix crowdsourcée, dashboard public",
      monetisation: "Freemium grand public + licences B2B pour observatoires des prix, DGCCRF, collectivités"
    }
  },
  {
    id: 2,
    rank: 2,
    title: "Crise de l'eau potable",
    criticite: 10,
    pertinence: 9,
    score: 95,
    icon: "💧",
    color: "#3498DB",
    summary: "Coupures d'eau chroniques sur tout le territoire. En 2025 : conflit social SAUR dans le Nord, coupures tournantes dans le Sud et le Centre. Réseau vétuste avec des taux de fuite estimés à 50-70%. Production dépendante à 94% des rivières, vulnérable à la sécheresse.",
    sources: ["RCI (coupures d'eau)", "Martinique la 1ère (sept 2025)", "Odyssi", "SME", "Préfecture Martinique"],
    details: "Les maires du Nord dénoncent une situation \"intenable\". Des écoles ferment faute d'eau. Le CHU Romain Blondet a connu des difficultés. La gouvernance éclatée entre Odyssi (CACEM), SME/SAUR (Cap Nord, Espace Sud) crée des inégalités de traitement. ODYSSI signale encore des coupures en mars 2026.",
    solution: {
      name: "DloTracker — Monitoring citoyen de l'eau",
      type: "Application + IoT",
      description: "App communautaire où les habitants signalent en temps réel les coupures d'eau dans leur quartier (1 tap : j'ai de l'eau / je n'ai pas d'eau). Carte en temps réel de la disponibilité de l'eau par quartier. Historique des coupures par zone. Notifications préventives basées sur les patterns détectés par l'IA. Intégration des communiqués officiels Odyssi/SME/SAUR.",
      impact: "Pression sur les opérateurs via la transparence. Outil d'aide à la décision pour les collectivités. Les citoyens anticipent les coupures.",
      techStack: "PWA React, géolocalisation, IA prédictive (patterns de coupures), scraping des communiqués opérateurs, notifications push",
      monetisation: "Gratuit pour les citoyens. Données agrégées vendues aux collectivités et opérateurs. Subventions ADEME/CTM."
    }
  },
  {
    id: 3,
    rank: 3,
    title: "Transport en commun défaillant",
    criticite: 8,
    pertinence: 10,
    score: 90,
    icon: "🚌",
    color: "#27AE60",
    summary: "Pas de tracking temps réel des bus, horaires peu fiables, faible couverture le weekend (3 lignes le dimanche). Martinique = département français avec le plus d'immatriculations proportionnellement. Marchés provisoires passés en urgence en septembre 2025 pour le réseau Centre.",
    sources: ["Routard.com", "Martinique Transport", "transport.data.gouv.fr", "Pappers.fr"],
    details: "Les données GTFS existent en open data mais aucun GTFS-RT (temps réel). Les usagers n'ont aucune visibilité. Les touristes sont dissuadés d'utiliser le bus. L'insécurité des conducteurs de BHNS est croissante. Le TCSP reste le seul axe structurant fiable.",
    solution: {
      name: "MTTracker — Tracking communautaire des bus",
      type: "PWA + Crowdsourcing GPS",
      description: "C'est TON projet ! App où les passagers signalent volontairement leur présence dans le bus. Leur GPS anonymisé est agrégé pour déduire la position des bus en temps réel. Affichage sur carte avec ETA aux arrêts.",
      impact: "Rend le transport en commun viable au quotidien. Réduit la dépendance à la voiture. Données exploitables par Martinique Transport.",
      techStack: "React Native/PWA, WebSocket, PostGIS, GTFS import, algorithme snap-to-route",
      monetisation: "Gratuit. B2B data pour Martinique Transport. Subventions mobilité durable."
    }
  },
  {
    id: 4,
    rank: 4,
    title: "Sargasses — Crise environnementale et sanitaire",
    criticite: 9,
    pertinence: 8,
    score: 88,
    icon: "🟤",
    color: "#8B4513",
    summary: "Échouements massifs et croissants depuis 2011. En 2025 : fermeture du collège Robert 3 (gaz H₂S toxiques), comité d'experts installé en avril 2025. Le plan Sargasses II n'a réalisé que 10 mesures sur 26. Les volumes augmentent et la saison s'allonge.",
    sources: ["ARS Martinique (mai 2025)", "Martinique la 1ère (juin 2025)", "Rapport Comité Experts Sargasses", "Vie-publique.fr"],
    details: "Les sargasses contiennent des métaux lourds (arsenic) et du chlordécone, rendant la valorisation complexe. Le GIP Sargasses accompagne des projets pilotes (cercueils, matériaux construction, biocarburant). 3 pilotes en fonctionnement mais modèle économique fragile. Météo-France tente de prédire les échouements.",
    solution: {
      name: "SargAlert — Prévision et alerte sargasses",
      type: "Plateforme IA + capteurs",
      description: "Plateforme combinant les données satellites (Copernicus/Sentinel), les prévisions de courants marins et l'IA pour prédire les échouements 3 à 7 jours à l'avance, commune par commune. Alertes push aux habitants, mairies, établissements scolaires. Carte des zones touchées en temps réel avec signalements citoyens. Dashboard pour les collectivités et le GIP Sargasses.",
      impact: "Anticipation → collecte préventive en mer avant échouement. Protection des populations (écoles, habitations). Planification touristique.",
      techStack: "Python (modèle prédictif), images satellite Copernicus, React dashboard, notifications push, API météo marine",
      monetisation: "Subventions Plan Sargasses III + CTM + ADEME. Licence SaaS pour collectivités caribéennes."
    }
  },
  {
    id: 5,
    rank: 5,
    title: "Chlordécone — Pollution persistante",
    criticite: 9,
    pertinence: 7,
    score: 85,
    icon: "☠️",
    color: "#9B59B6",
    summary: "Pesticide utilisé de 1972 à 1993, contamination persistante des sols et des eaux. Plan Chlordécone IV (2021-2027) en cours. 32 000 tests de chlordéconémie en 2025. Lien établi avec le cancer de la prostate. Restrictions de pêche étendues.",
    sources: ["ARS Martinique", "Plan Chlordécone IV", "CHU Martinique", "Chlordécone-info.fr"],
    details: "La pollution est pérenne (siècles). Le programme JaFa (Jardins Familiaux) aide les ménages à tester leurs sols. Mais l'information reste mal diffusée : beaucoup de Martiniquais ne savent pas si leur parcelle est contaminée ni quels aliments éviter.",
    solution: {
      name: "KlorMap — Cartographie et guide alimentaire chlordécone",
      type: "Application mobile + IA",
      description: "App grand public qui géolocalise l'utilisateur et lui indique le niveau de contamination de sa zone (données cartographiques publiques). Guide alimentaire personnalisé : quels poissons, fruits, légumes éviter selon sa localisation. Scanner de produits locaux. Prise de RDV chlordéconémie simplifiée. Chatbot IA pour répondre aux questions de santé.",
      impact: "Démocratiser l'accès à l'information chlordécone. Réduire l'exposition. Aider les agriculteurs à adapter leurs cultures.",
      techStack: "React Native, cartographie PostGIS, données publiques chlordécone, chatbot Claude API, OCR produits",
      monetisation: "Financement Plan Chlordécone IV + ARS + CTM. Gratuit pour les citoyens."
    }
  },
  {
    id: 6,
    rank: 6,
    title: "Économie en contraction & défaillances d'entreprises",
    criticite: 8,
    pertinence: 8,
    score: 82,
    icon: "📉",
    color: "#E67E22",
    summary: "Activité en baisse de 1,5% au T3 2025. +10% de défaillances et liquidations judiciaires en 2025. BTP en chute (-6,5%), commerce en recul (-2,6%). Délais de paiement des collectivités extrêmement longs. Investissement privé en panne.",
    sources: ["INSEE Conjoncture Martinique n°36", "IEDOM", "CCI Martinique (P. Jock)", "Contact-Entreprises"],
    details: "La croissance est tirée uniquement par la dépense publique (+2%). Le secteur privé stagne. Les tensions sociales de fin 2024 ont durablement affecté la confiance. Le budget Outre-mer 2026 est en baisse de 750 à 800 M€.",
    solution: {
      name: "BizPulse972 — Radar économique local",
      type: "Dashboard IA + mise en relation",
      description: "Plateforme qui agrège en temps réel les indicateurs économiques locaux (IEDOM, INSEE, CCI) et les rend accessibles aux entrepreneurs. IA qui détecte les signaux faibles de difficultés (retards de paiement, baisse CA sectorielle). Mise en relation avec les aides disponibles (BPI, ADEME, CTM, FEDER). Marketplace B2B locale pour favoriser les circuits courts entre entreprises martiniquaises.",
      impact: "Prévention des défaillances. Meilleur accès aux aides. Dynamisation du tissu économique local.",
      techStack: "React dashboard, scraping données publiques, IA prédictive, API BPI/subventions",
      monetisation: "Freemium entreprises + licences CCI/collectivités"
    }
  },
  {
    id: 7,
    rank: 7,
    title: "Exode des jeunes & déclin démographique",
    criticite: 8,
    pertinence: 7,
    score: 78,
    icon: "✈️",
    color: "#1ABC9C",
    summary: "Baisse significative de la population, particulièrement des jeunes diplômés qui quittent massivement pour l'hexagone. Taux de chômage à 14,4% (vs 7,7% en France). Perte de compétences essentielles. Vieillissement accéléré de la population.",
    sources: ["INSEE", "Antilla Martinique (tribune J-M Nol)", "KaribInfo (municipales 2026)"],
    details: "Le manque de perspectives professionnelles, les salaires bas face au coût de la vie élevé, et l'absence de tissu entrepreneurial tech poussent les jeunes au départ. L'ARS a lancé un Gérontopôle face au vieillissement. Les \"Martiniquaises Connectées\" tentent de promouvoir le numérique.",
    solution: {
      name: "TalentKréyol — Plateforme emploi & freelance Antilles",
      type: "Plateforme web + IA matching",
      description: "Plateforme d'emploi et de freelance dédiée aux Antilles. Matching IA entre compétences des jeunes et besoins locaux. Section \"remote\" pour travailler pour des entreprises hexagonales/internationales depuis la Martinique. Mise en avant des opportunités d'entrepreneuriat local. Mentorat par des Antillais de la diaspora.",
      impact: "Créer des opportunités attractives pour retenir/faire revenir les talents. Développer le télétravail depuis les Antilles.",
      techStack: "Next.js, IA matching (embeddings compétences), profils, messagerie, visio intégrée",
      monetisation: "Commission recrutement + abonnement entreprises + formation"
    }
  },
  {
    id: 8,
    rank: 8,
    title: "Insécurité & narcotrafic",
    criticite: 9,
    pertinence: 5,
    score: 72,
    icon: "🔒",
    color: "#C0392B",
    summary: "Hausse des violences physiques et sexuelles en 2025. Guadeloupe : 28 homicides dont 17 par arme à feu. Martinique : petite délinquance préoccupante (vols, cambriolages) surtout à Fort-de-France. Narcotrafic = zone de transit Amérique du Sud → Europe.",
    sources: ["SSMSI (bilan 2025)", "Martinique la 1ère", "RCI", "Antilla"],
    details: "Le sentiment d'insécurité grandit. Les conducteurs de BHNS signalent des agressions. Les infractions numériques augmentent de 14% en 2025. Les jeunes sont particulièrement exposés.",
    solution: {
      name: "SafeZone972 — Sécurité communautaire",
      type: "Application d'entraide",
      description: "App de signalement citoyen anonyme (zones à risque, incidents). Réseau d'entraide de quartier. Alertes géolocalisées. Mise en relation rapide avec les forces de l'ordre. Parcours sécurisés suggérés par l'IA (évitement zones à risque la nuit). SANS remplacer la police — outil complémentaire.",
      impact: "Sentiment de sécurité amélioré. Données utiles pour la police. Solidarité de quartier.",
      techStack: "React Native, géolocalisation, signalement anonyme, notifications push, API cartographie",
      monetisation: "Gratuit citoyens. Partenariat préfecture/collectivités."
    }
  },
  {
    id: 9,
    rank: 9,
    title: "Tourisme en déclin",
    criticite: 7,
    pertinence: 8,
    score: 70,
    icon: "🏝️",
    color: "#F39C12",
    summary: "Nuitées hôtelières en baisse de 2,9% au T3 2025. Baisse de la clientèle hexagonale. Tourisme d'affaires -12,4%. Taux d'occupation à 75,2%. Défaillances d'entreprises touristiques en forte hausse (nombre doublé). Concurrence régionale (Sainte-Lucie, Dominique).",
    sources: ["INSEE", "IEDOM T2 2025", "Le Guide de la Martinique"],
    details: "Les sargasses, l'image post-crise sociale, le coût élevé et le manque d'expériences digitalisées freinent le tourisme. Le potentiel est sous-exploité : patrimoine culturel, gastronomie créole, randonnées volcaniques, rhum.",
    solution: {
      name: "Matinik XP — Expériences authentiques",
      type: "Marketplace + IA concierge",
      description: "Plateforme de réservation d'expériences authentiques martiniquaises : visites chez les producteurs de rhum, sorties pêche traditionnelle, cours de cuisine créole, randonnées guidées Montagne Pelée, yole tours. Concierge IA conversationnel (français + anglais + créole) qui personnalise l'itinéraire selon les goûts. Contenu UGC des voyageurs. Partenariats avec les micro-entrepreneurs locaux.",
      impact: "Capter la dépense touristique dans l'économie locale (pas que dans les hôtels). Valoriser le patrimoine. Créer des revenus pour les acteurs locaux.",
      techStack: "Next.js, Stripe, Claude API concierge, calendrier réservation, UGC photos/avis",
      monetisation: "Commission 10-15% sur réservations + abonnement prestataires"
    }
  },
  {
    id: 10,
    rank: 10,
    title: "Souveraineté alimentaire & agriculture locale",
    criticite: 7,
    pertinence: 8,
    score: 68,
    icon: "🌱",
    color: "#2ECC71",
    summary: "La Martinique importe l'essentiel de son alimentation. L'agriculture locale souffre de la hausse des coûts, de la concurrence des importations, de la diminution des terres agricoles et de la contamination chlordécone. Les jeunes se détournent du secteur.",
    sources: ["KaribInfo (Congrès des Élus)", "Martinique la 1ère (loi Duplomb)", "Le Guide de la Martinique"],
    details: "Paradoxe : les produits locaux sont parfois plus chers que les importés dans les supermarchés. Les circuits courts existent (marchés) mais sont peu digitalisés. Le potentiel en agriculture bio/raisonnée est énorme mais sous-exploité.",
    solution: {
      name: "Panié Péyi — Marketplace agriculture locale",
      type: "Application + logistique",
      description: "Marketplace directe producteur → consommateur. Paniers hebdomadaires en pré-commande. Carte interactive des marchés locaux avec horaires et produits disponibles. Module logistique mutualisé pour la livraison (optimisation tournées IA). Traçabilité : chaque produit indique le producteur, la parcelle (avec statut chlordécone), la date de récolte.",
      impact: "Marge juste pour les agriculteurs. Prix plus bas pour les consommateurs (pas d'intermédiaire). Relance de l'agriculture locale.",
      techStack: "React Native, Stripe, optimisation de tournées (OR-Tools), cartographie producteurs, module abonnement",
      monetisation: "Commission 8-12% + abonnement premium (livraison prioritaire)"
    }
  }
];

const ProblemCard = ({ problem, isExpanded, onToggle }) => {
  const [showSolution, setShowSolution] = useState(false);
  
  return (
    <div style={{
      marginBottom: 16,
      borderRadius: 12,
      overflow: "hidden",
      border: `2px solid ${isExpanded ? problem.color : "#e0e0e0"}`,
      transition: "all 0.3s ease",
      background: "#fff",
      boxShadow: isExpanded ? `0 4px 20px ${problem.color}22` : "0 1px 4px rgba(0,0,0,0.06)"
    }}>
      <div 
        onClick={onToggle}
        style={{
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: isExpanded ? `${problem.color}08` : "#fff"
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: problem.color, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 16, flexShrink: 0
        }}>
          {problem.rank}
        </div>
        <span style={{ fontSize: 24, flexShrink: 0 }}>{problem.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#1a1a2e" }}>{problem.title}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: `${problem.color}15`, color: problem.color, fontWeight: 600 }}>
              Criticité {problem.criticite}/10
            </span>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "#f0f0f0", color: "#666", fontWeight: 600 }}>
              Faisabilité tech {problem.pertinence}/10
            </span>
          </div>
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: `conic-gradient(${problem.color} ${problem.score}%, #eee ${problem.score}%)`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: problem.color
          }}>{problem.score}</div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ borderTop: `1px solid ${problem.color}20`, paddingTop: 16 }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#333", margin: "0 0 12px" }}>{problem.summary}</p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#555", margin: "0 0 12px" }}>{problem.details}</p>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 16 }}>
              <strong>Sources :</strong> {problem.sources.join(" • ")}
            </div>

            <div 
              onClick={() => setShowSolution(!showSolution)}
              style={{
                padding: "14px 18px",
                background: `linear-gradient(135deg, ${problem.color}, ${problem.color}CC)`,
                borderRadius: 10,
                cursor: "pointer",
                color: "#fff",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>Solution proposée</div>
                  <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>{problem.solution.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>{problem.solution.type}</div>
                </div>
                <div style={{ fontSize: 20 }}>{showSolution ? "▲" : "▼"}</div>
              </div>

              {showSolution && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
                  <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 10px" }}>{problem.solution.description}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                    <div style={{ background: "rgba(255,255,255,0.12)", padding: 10, borderRadius: 8 }}>
                      <div style={{ fontSize: 10, opacity: 0.7, textTransform: "uppercase" }}>Impact</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>{problem.solution.impact}</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.12)", padding: 10, borderRadius: 8 }}>
                      <div style={{ fontSize: 10, opacity: 0.7, textTransform: "uppercase" }}>Monétisation</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>{problem.solution.monetisation}</div>
                    </div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.12)", padding: 10, borderRadius: 8, marginTop: 10 }}>
                    <div style={{ fontSize: 10, opacity: 0.7, textTransform: "uppercase" }}>Stack technique</div>
                    <div style={{ fontSize: 12, marginTop: 4, fontFamily: "monospace" }}>{problem.solution.techStack}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [expandedId, setExpandedId] = useState(1);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? problems : 
    filter === "critical" ? problems.filter(p => p.criticite >= 9) :
    problems.filter(p => p.pertinence >= 9);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", fontFamily: "'Segoe UI', -apple-system, sans-serif" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "40px 20px 30px", color: "#fff", textAlign: "center"
      }}>
        <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 3, opacity: 0.6, marginBottom: 8 }}>
          Rapport de recherche approfondie
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px", lineHeight: 1.2 }}>
          Problématiques Martinique & Antilles
        </h1>
        <p style={{ fontSize: 14, opacity: 0.7, margin: "0 0 20px" }}>
          10 enjeux critiques classés par score • Solutions tech & IA concrètes
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { key: "all", label: "Tous (10)" },
            { key: "critical", label: "Criticité max" },
            { key: "feasible", label: "Haute faisabilité" }
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: "7px 16px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.3)",
              background: filter === f.key ? "#fff" : "transparent",
              color: filter === f.key ? "#1a1a2e" : "#fff",
              cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s"
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{
        background: "linear-gradient(90deg, #E74C3C, #E67E22, #F39C12, #27AE60, #3498DB, #9B59B6)",
        padding: "12px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8
      }}>
        {[
          { n: "40%", l: "surcoût alimentaire" },
          { n: "-1,5%", l: "activité T3 2025" },
          { n: "14,4%", l: "chômage" },
          { n: "+10%", l: "défaillances entreprises" },
          { n: "32K", l: "tests chlordécone 2025" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center", flex: 1, minWidth: 80 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{s.n}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ 
          background: "#fff", borderRadius: 10, padding: 16, marginBottom: 20,
          border: "1px solid #e0e0e0", fontSize: 13, lineHeight: 1.7, color: "#555"
        }}>
          <strong style={{ color: "#1a1a2e" }}>Méthodologie :</strong> Recherche croisée sur RCI, Martinique la 1ère, Antilla, KaribInfo, France-Antilles, INSEE, IEDOM, ARS Martinique, Préfecture, data.gouv.fr, forums locaux et rapports officiels. Score = Criticité × Faisabilité technique d'une solution. Chaque problème est accompagné d'une proposition de solution tech/IA concrète et réalisable.
        </div>

        {filtered.map(p => (
          <ProblemCard
            key={p.id}
            problem={p}
            isExpanded={expandedId === p.id}
            onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
          />
        ))}

        <div style={{
          marginTop: 24, padding: 20, borderRadius: 12,
          background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
          color: "#fff", textAlign: "center"
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Ma recommandation</div>
          <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.7, margin: "0 0 12px" }}>
            Commence par <strong>MTTracker</strong> (ton projet en cours) + <strong>PrixAntiy</strong> (comparateur de prix). 
            Ce sont les 2 projets avec le meilleur ratio impact/effort. Ils touchent le quotidien de TOUS les Martiniquais, 
            nécessitent peu d'infra et peuvent être bootstrappés avec des agents IA.
          </p>
          <p style={{ fontSize: 12, opacity: 0.6, margin: 0 }}>
            Mars 2026 • Sources : INSEE, IEDOM, ARS, RCI, Martinique 1ère, Antilla, KaribInfo
          </p>
        </div>
      </div>
    </div>
  );
}
