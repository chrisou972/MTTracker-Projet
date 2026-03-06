// ═══════════════════════════════════════════════
// MTTracker — Base de données des lignes de bus
// 110 lignes répertoriées — Mars 2026
// Sources : martiniquemobilites.mq, martiniquetransport.mq
// ═══════════════════════════════════════════════

export const ALL_LINES = [
  // ── TCSP (BHNS) ──
  { id:"A", name:"TCSP A", route:"Pointe Simon ↔ Carrère", network:"centre", type:"bhns", color:"#ef4444" },
  { id:"B", name:"TCSP B", route:"Pointe Simon ↔ Mahault", network:"centre", type:"bhns", color:"#3b82f6" },
  
  // ── RÉSEAU CENTRE (Fort-de-France, Lamentin, Schoelcher, St-Joseph) ──
  { id:"1", name:"Ligne 1", route:"Coridon ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"2", name:"Ligne 2", route:"Moutte ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"3", name:"Ligne 3", route:"Redoute ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"4", name:"Ligne 4", route:"Ravine Vilaine ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"5", name:"Ligne 5", route:"Didier ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"8", name:"Ligne 8", route:"Chateauboeuf ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"9", name:"Ligne 9", route:"Petite ZAC Montgeralde ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"10", name:"Ligne 10", route:"Langellier Bellevue ↔ Nardal", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"11", name:"Ligne 11", route:"Jambette ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"12", name:"Ligne 12", route:"Trenelle ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"13", name:"Ligne 13", route:"Texaco ↔ Aliker", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"14", name:"Ligne 14", route:"Boucle Clarac", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"15", name:"Ligne 15", route:"La Ferme ↔ Nardal", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"16", name:"Ligne 16", route:"Régal Sauveur ↔ Nardal", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"18", name:"Ligne 18", route:"Fond Cacao ↔ Nardal", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"19", name:"Ligne 19", route:"Godissard ↔ Aliker", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"20", name:"Ligne 20", route:"Sacré Coeur ↔ Aliker", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"21", name:"Ligne 21", route:"Bois Thibault ↔ Aliker", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"22", name:"Ligne 22", route:"Morne Calebasse ↔ Nardal", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"24", name:"Ligne 24", route:"Sainte-Thérèse ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"25", name:"Ligne 25", route:"Desaix ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"27", name:"Ligne 27", route:"Balata ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"28", name:"Ligne 28", route:"Tivoli ↔ Perrinon", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"29", name:"Ligne 29", route:"Terreville ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"30", name:"Ligne 30", route:"Batelière ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"31", name:"Ligne 31", route:"Fond Lahayé ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"32", name:"Ligne 32", route:"ZAC de Rivière ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"33", name:"Ligne 33", route:"Ozanam ↔ Clemenceau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"100", name:"Ligne 100", route:"Express Lamentin", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"104", name:"Ligne 104", route:"Acajou ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"105", name:"Ligne 105", route:"Bourg Lamentin ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"110", name:"Ligne 110", route:"Long Pré ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"111", name:"Ligne 111", route:"Palmiste ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"112", name:"Ligne 112", route:"Pelletier ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"114", name:"Ligne 114", route:"Roches Carrées ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"211", name:"Ligne 211", route:"Navette Dillon ↔ Centre-ville", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"301", name:"Ligne 301", route:"Saint-Joseph Bourg ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"302", name:"Ligne 302", route:"Rivière Blanche ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"303", name:"Ligne 303", route:"Gros-Morne ↔ Saint-Joseph", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"304", name:"Ligne 304", route:"Fonds Masson ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"307", name:"Ligne 307", route:"Morne Pitault ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"320", name:"Ligne 320", route:"Saint-Joseph ↔ Lamentin", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"321", name:"Ligne 321", route:"Morne Calebasse ↔ Lamentin", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"340", name:"Ligne 340", route:"Schoelcher ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"341", name:"Ligne 341", route:"Fond Lahayé ↔ Schoelcher", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"342", name:"Ligne 342", route:"Terreville ↔ Schoelcher", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"421", name:"Ligne 421", route:"Gondeau ↔ CH Mangot Vulcin", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"422", name:"Ligne 422", route:"Basse Gondeau ↔ Petit Manoir", network:"centre", type:"urbain", color:"#6366f1" },

  // ── RÉSEAU NORD CARAÏBE ──
  { id:"NC01", name:"NC01", route:"Saint-Pierre ↔ Pointe Simon", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC02", name:"NC02", route:"Prêcheur ↔ Saint-Pierre", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC03", name:"NC03", route:"Fond Saint-Denis ↔ Saint-Pierre", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC04", name:"NC04", route:"Armada ↔ Saint-Pierre ↔ Monastère", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC4A", name:"NC4A", route:"Saint-Pierre Boucle Armada", network:"nord-caraibe", type:"local", color:"#f59e0b" },
  { id:"NC4B", name:"NC4B", route:"Saint-Pierre ↔ Marouba ↔ Monastère", network:"nord-caraibe", type:"local", color:"#f59e0b" },
  { id:"NC05", name:"NC05", route:"Morne-Vert ↔ Saint-Pierre", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC06", name:"NC06", route:"Morne-Vert ↔ Case-Pilote", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC07", name:"NC07", route:"Case-Pilote (Maniba ↔ Choiseul)", network:"nord-caraibe", type:"local", color:"#f59e0b" },
  { id:"NC08", name:"NC08", route:"Bellefontaine ↔ Case-Pilote", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC8A", name:"NC8A", route:"Gare Morne-Rouge ↔ Église Morne-Rouge", network:"nord-caraibe", type:"local", color:"#f59e0b" },
  { id:"NC8B", name:"NC8B", route:"Église Morne-Rouge ↔ Gare Morne-Rouge", network:"nord-caraibe", type:"local", color:"#f59e0b" },
  { id:"NC09", name:"NC09", route:"Morne-Rouge ↔ Fort-de-France", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },
  { id:"NC10", name:"NC10", route:"Saint-Pierre ↔ Le Lorrain", network:"nord-caraibe", type:"interurbain", color:"#f59e0b" },

  // ── RÉSEAU NORD ATLANTIQUE ──
  { id:"NA21", name:"NA21", route:"Sainte-Marie ↔ Mahault (express)", network:"nord-atlantique", type:"interurbain", color:"#22c55e" },
  { id:"NA22", name:"NA22", route:"Basse-Pointe ↔ Mahault", network:"nord-atlantique", type:"interurbain", color:"#22c55e" },
  { id:"NA23", name:"NA23", route:"Le Robert (Courbaril) ↔ Mahault", network:"nord-atlantique", type:"interurbain", color:"#22c55e" },
  { id:"NA24", name:"NA24", route:"François/Robert ↔ Vert-Pré/Gros-Morne", network:"nord-atlantique", type:"interurbain", color:"#22c55e" },
  { id:"NA25", name:"NA25", route:"Sainte-Marie ↔ Mahault", network:"nord-atlantique", type:"interurbain", color:"#22c55e" },
  { id:"NA26", name:"NA26", route:"Grand-Rivière ↔ Basse-Pointe", network:"nord-atlantique", type:"interurbain", color:"#22c55e" },
  { id:"NA27", name:"NA27", route:"Trinité ↔ Gros-Morne/Saint-Joseph", network:"nord-atlantique", type:"interurbain", color:"#22c55e" },

  // ── GROS-MORNE (local) ──
  { id:"GRM1", name:"GRM-1", route:"Gare Routière ↔ Borelli ↔ Poirier", network:"gros-morne", type:"local", color:"#8b5cf6" },
  { id:"GRM2", name:"GRM-2", route:"Gare Routière ↔ Tracée Vert-Pré", network:"gros-morne", type:"local", color:"#8b5cf6" },
  { id:"GRM3", name:"GRM-3", route:"Gare Routière ↔ Trou Laguerre", network:"gros-morne", type:"local", color:"#8b5cf6" },
  { id:"GRM4", name:"GRM-4", route:"Gare Routière ↔ Glotin ↔ Bérault", network:"gros-morne", type:"local", color:"#8b5cf6" },
  { id:"GRM5", name:"GRM-5", route:"Gare Routière ↔ Morne des Olives", network:"gros-morne", type:"local", color:"#8b5cf6" },
  { id:"GRM6", name:"GRM-6", route:"Gare Routière ↔ Sinaï ↔ Dumaine", network:"gros-morne", type:"local", color:"#8b5cf6" },
  { id:"GRM7", name:"GRM-7", route:"Gare Routière ↔ Tamarins ↔ Bois Lézards", network:"gros-morne", type:"local", color:"#8b5cf6" },

  // ── LORRAIN (local) ──
  { id:"LR01", name:"LR01", route:"Lorrain Bourg ↔ Morne Capot", network:"lorrain", type:"local", color:"#ec4899" },
  { id:"LR02", name:"LR02", route:"Maxime ↔ Bon Repos", network:"lorrain", type:"local", color:"#ec4899" },
  { id:"LR03", name:"LR03", route:"Morne Savon ↔ Macédoine", network:"lorrain", type:"local", color:"#ec4899" },
  { id:"LR04", name:"LR04", route:"Morne Céron ↔ Moreau", network:"lorrain", type:"local", color:"#ec4899" },
  { id:"LR05", name:"LR05", route:"Castel Brando ↔ Fonds Carabin", network:"lorrain", type:"local", color:"#ec4899" },
  { id:"LR06", name:"LR06", route:"Hôpital ↔ Morne Bois Séguineau", network:"lorrain", type:"local", color:"#ec4899" },

  // ── ROBERT (local) ──
  { id:"ROB1", name:"ROB-1", route:"Pointe Fort ↔ Lazaret ↔ Pointe Lynch", network:"robert", type:"local", color:"#06b6d4" },
  { id:"ROB2", name:"ROB-2", route:"Vert-Pré ↔ Lestrade ↔ Café", network:"robert", type:"local", color:"#06b6d4" },
  { id:"ROB3", name:"ROB-3", route:"Vert-Pré ↔ Bois Neuf ↔ Ermitage ↔ L'Heureux", network:"robert", type:"local", color:"#06b6d4" },
  { id:"ROB4", name:"ROB-4", route:"Bois Désir ↔ Ermitage ↔ Galette ↔ Augrain", network:"robert", type:"local", color:"#06b6d4" },
  { id:"ROB5", name:"ROB-5", route:"Cannelle ↔ Fonds Brûlé ↔ Raisin ↔ Berthou", network:"robert", type:"local", color:"#06b6d4" },
  { id:"ROB6", name:"ROB-6", route:"Duchesne ↔ Four à Chaux", network:"robert", type:"local", color:"#06b6d4" },
  { id:"ROB7", name:"ROB-7", route:"Mansarde ↔ Bois Thibault", network:"robert", type:"local", color:"#06b6d4" },
  { id:"ROB8", name:"ROB-8", route:"Pointe Rouge ↔ Pointe Savane", network:"robert", type:"local", color:"#06b6d4" },

  // ── TRINITÉ (local) ──
  { id:"TRI1", name:"TRI-1", route:"Gare Routière Trinité ↔ Tartane", network:"trinite", type:"local", color:"#0891b2" },
  { id:"TRI2", name:"TRI-2", route:"Gare Routière Trinité ↔ Caravelle", network:"trinite", type:"local", color:"#0891b2" },
  { id:"TRI3", name:"TRI-3", route:"Gare Routière Trinité ↔ Beauséjour", network:"trinite", type:"local", color:"#0891b2" },
  { id:"TRI4", name:"TRI-4", route:"Gare Routière Trinité ↔ Bois Lézards", network:"trinite", type:"local", color:"#0891b2" },
  { id:"TRI5", name:"TRI-5", route:"Gare Routière Trinité ↔ Morne Poirier", network:"trinite", type:"local", color:"#0891b2" },

  // ── TRINITÉ - MORNE DES ESSES ──
  { id:"TME1", name:"TME-1", route:"Trinité ↔ Morne des Esses", network:"trinite", type:"local", color:"#0891b2" },

  // ── SAINTE-MARIE (local) ──
  { id:"SMR1", name:"SMR-1", route:"Gare Routière Ste-Marie ↔ Pérou", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR2", name:"SMR-2", route:"Gare Routière Ste-Marie ↔ Bezaudin", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR3", name:"SMR-3", route:"Gare Routière Ste-Marie ↔ Fond Saint-Jacques", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR4", name:"SMR-4", route:"Gare Routière Ste-Marie ↔ La Trace", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR5", name:"SMR-5", route:"Gare Routière Ste-Marie ↔ Morne des Esses", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR6", name:"SMR-6", route:"Gare Routière Ste-Marie ↔ Union", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR7", name:"SMR-7", route:"Gare Routière Ste-Marie ↔ Reculée", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR8", name:"SMR-8", route:"Sainte-Marie ↔ Zone du Bac (Trinité)", network:"sainte-marie", type:"local", color:"#a855f7" },
  { id:"SMR9", name:"SMR-9", route:"Sainte-Marie ↔ Le Marigot", network:"sainte-marie", type:"local", color:"#a855f7" },

  // ── MARIGOT ──
  { id:"MA01", name:"MA01", route:"Marigot Boucle", network:"marigot", type:"local", color:"#14b8a6" },

  // ── MARITIME ──
  { id:"VT1", name:"Vedette 1", route:"Fort-de-France ↔ Trois-Îlets", network:"maritime", type:"maritime", color:"#0ea5e9" },
  { id:"VT2", name:"Vedette 2", route:"Fort-de-France ↔ Case-Pilote", network:"maritime", type:"maritime", color:"#0ea5e9" },
];

export const NETWORKS = {
  "centre": { label: "Centre (Mozaïk/RTM)", icon: "🏙️", desc: "Fort-de-France, Lamentin, Schoelcher, St-Joseph" },
  "nord-caraibe": { label: "Nord Caraïbe", icon: "🌊", desc: "Saint-Pierre, Prêcheur, Morne-Vert, Case-Pilote" },
  "nord-atlantique": { label: "Nord Atlantique", icon: "🌴", desc: "Trinité, Sainte-Marie, Robert, Basse-Pointe" },
  "gros-morne": { label: "Gros-Morne", icon: "⛰️", desc: "Desserte locale Gros-Morne" },
  "lorrain": { label: "Le Lorrain", icon: "🏔️", desc: "Desserte locale Le Lorrain" },
  "robert": { label: "Le Robert", icon: "🐠", desc: "Desserte locale Le Robert" },
  "trinite": { label: "La Trinité", icon: "🏖️", desc: "Desserte locale Trinité + TME" },
  "sainte-marie": { label: "Sainte-Marie", icon: "🌾", desc: "Desserte locale Sainte-Marie" },
  "marigot": { label: "Le Marigot", icon: "🎣", desc: "Desserte locale Le Marigot" },
  "maritime": { label: "Maritime", icon: "⛴️", desc: "Vedettes Tropicales / Blue Lines" },
};

export const TYPE_LABELS = { bhns:"BHNS", urbain:"Urbain", interurbain:"Interurbain", local:"Local", maritime:"Maritime" };
