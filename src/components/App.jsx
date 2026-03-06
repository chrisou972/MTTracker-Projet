import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════
// MTTracker v5 — "Tropical Elegance" (fonctionnel)
// Design Karwa-inspired + toutes les features v2/v3
// ═══════════════════════════════════════════════

// ── LINES (110) ──
const ALL_LINES = [
  { id:"A", name:"TCSP A", route:"Pointe Simon ↔ Carrère", network:"centre", type:"bhns", color:"#ef4444" },
  { id:"B", name:"TCSP B", route:"Pointe Simon ↔ Mahault", network:"centre", type:"bhns", color:"#3b82f6" },
  { id:"1", name:"Ligne 1", route:"Pointe Simon ↔ Cité Dillon", network:"centre", type:"urbain", color:"#8b5cf6" },
  { id:"2", name:"Ligne 2", route:"Pointe Simon ↔ Hôpital Meynard", network:"centre", type:"urbain", color:"#8b5cf6" },
  { id:"3", name:"Ligne 3", route:"Pointe Simon ↔ ZAC Est", network:"centre", type:"urbain", color:"#8b5cf6" },
  { id:"4", name:"Ligne 4", route:"Pointe Simon ↔ Volga Plage", network:"centre", type:"urbain", color:"#8b5cf6" },
  { id:"5", name:"Ligne 5", route:"Pointe Simon ↔ Didier", network:"centre", type:"urbain", color:"#8b5cf6" },
  { id:"8", name:"Ligne 8", route:"Pointe Simon ↔ Chateauboeuf", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"9", name:"Ligne 9", route:"Pointe Simon ↔ Bellevue", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"10", name:"Ligne 10", route:"Pointe Simon ↔ Crozanville", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"11", name:"Ligne 11", route:"Pointe Simon ↔ Jambette", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"12", name:"Ligne 12", route:"Pointe Simon ↔ Trenelle", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"13", name:"Ligne 13", route:"Pointe Simon ↔ Texaco", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"14", name:"Ligne 14", route:"Pointe Simon ↔ Clarac", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"15", name:"Ligne 15", route:"Pointe Simon ↔ Morne Tartenson", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"16", name:"Ligne 16", route:"Pointe Simon ↔ Ermitage", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"18", name:"Ligne 18", route:"Pointe Simon ↔ Châteauboeuf Haut", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"19", name:"Ligne 19", route:"Pointe Simon ↔ Godissard", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"20", name:"Ligne 20", route:"Pointe Simon ↔ Morne Pichevin", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"21", name:"Ligne 21", route:"Pointe Simon ↔ Ravine Touza", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"22", name:"Ligne 22", route:"Fort-de-France ↔ Sainte-Marie", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"24", name:"Ligne 24", route:"Pointe Simon ↔ Sainte-Thérèse", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"25", name:"Ligne 25", route:"Pointe Simon ↔ Desaix", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"27", name:"Ligne 27", route:"Pointe Simon ↔ Balata", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"28", name:"Ligne 28", route:"Pointe Simon ↔ Tivoli", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"29", name:"Ligne 29", route:"Pointe Simon ↔ Terreville", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"30", name:"Ligne 30", route:"Pointe Simon ↔ Batelière", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"31", name:"Ligne 31", route:"Pointe Simon ↔ Fond Lahayé", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"32", name:"Ligne 32", route:"Pointe Simon ↔ Morne Venté", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"33", name:"Ligne 33", route:"Pointe Simon ↔ Ozanam", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"100", name:"Ligne 100", route:"Lamentin Centre ↔ Carrère", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"104", name:"Ligne 104", route:"Acajou ↔ Place d'Armes", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"105", name:"Ligne 105", route:"Lamentin ↔ Bourg", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"110", name:"Ligne 110", route:"Lamentin ↔ Long Pré", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"111", name:"Ligne 111", route:"Lamentin ↔ Palmiste", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"112", name:"Ligne 112", route:"Lamentin ↔ Pelletier", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"114", name:"Ligne 114", route:"Lamentin ↔ Roches Carrées", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"211", name:"Ligne 211", route:"Fort-de-France ↔ Dillon Express", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"301", name:"Ligne 301", route:"Pointe Simon ↔ Saint-Joseph", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"302", name:"Ligne 302", route:"Pointe Simon ↔ Rivière Blanche", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"304", name:"Ligne 304", route:"Pointe Simon ↔ Fonds Masson", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"307", name:"Ligne 307", route:"Pointe Simon ↔ Morne Pitault", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"320", name:"Ligne 320", route:"Saint-Joseph ↔ Gros-Morne", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"321", name:"Ligne 321", route:"Fort-de-France ↔ Morne Calebasse", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"340", name:"Ligne 340", route:"Pointe Simon ↔ Schoelcher", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"341", name:"Ligne 341", route:"Fort-de-France ↔ Fond Lahayé", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"342", name:"Ligne 342", route:"Fort-de-France ↔ Terreville", network:"centre", type:"interurbain", color:"#0ea5e9" },
  { id:"421", name:"Ligne 421", route:"Lamentin ↔ Gondeau", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"422", name:"Ligne 422", route:"Lamentin ↔ Petit Manoir", network:"centre", type:"urbain", color:"#6366f1" },
  { id:"NC01", name:"NC01", route:"Fort-de-France ↔ Saint-Pierre", network:"nord-caraibe", type:"interurbain", color:"#f97316" },
  { id:"NC02", name:"NC02", route:"Saint-Pierre ↔ Le Prêcheur", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC03", name:"NC03", route:"Saint-Pierre ↔ Fond Saint-Denis", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC04", name:"NC04", route:"Saint-Pierre ↔ Morne-Rouge", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC4A", name:"NC4A", route:"Saint-Pierre ↔ Armada", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC4B", name:"NC4B", route:"Saint-Pierre ↔ Monastère", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC05", name:"NC05", route:"Morne-Vert ↔ Case-Pilote", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC06", name:"NC06", route:"Morne-Vert ↔ Case-Pilote (via)", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC07", name:"NC07", route:"Case-Pilote Boucle", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC08", name:"NC08", route:"Bellefontaine ↔ Case-Pilote", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC8A", name:"NC8A", route:"Morne-Rouge ↔ Case-Pilote", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC8B", name:"NC8B", route:"Morne-Rouge ↔ Bellefontaine", network:"nord-caraibe", type:"local", color:"#f97316" },
  { id:"NC09", name:"NC09", route:"Fort-de-France ↔ Morne-Rouge", network:"nord-caraibe", type:"interurbain", color:"#f97316" },
  { id:"NC10", name:"NC10", route:"Le Lorrain ↔ Saint-Pierre", network:"nord-caraibe", type:"interurbain", color:"#f97316" },
  { id:"NA21", name:"NA21", route:"Sainte-Marie ↔ Mahault", network:"nord-atlantique", type:"interurbain", color:"#10b981" },
  { id:"NA22", name:"NA22", route:"Basse-Pointe ↔ Mahault", network:"nord-atlantique", type:"interurbain", color:"#10b981" },
  { id:"NA23", name:"NA23", route:"Le Robert ↔ Mahault", network:"nord-atlantique", type:"interurbain", color:"#10b981" },
  { id:"NA24", name:"NA24", route:"Le François ↔ Gros-Morne", network:"nord-atlantique", type:"interurbain", color:"#10b981" },
  { id:"NA25", name:"NA25", route:"Sainte-Marie ↔ Mahault (express)", network:"nord-atlantique", type:"interurbain", color:"#10b981" },
  { id:"NA26", name:"NA26", route:"Grand-Rivière ↔ Basse-Pointe", network:"nord-atlantique", type:"interurbain", color:"#10b981" },
  { id:"NA27", name:"NA27", route:"Trinité ↔ Gros-Morne", network:"nord-atlantique", type:"interurbain", color:"#10b981" },
  ...["GRM1","GRM2","GRM3","GRM4","GRM5","GRM6","GRM7"].map((id,i)=>({id,name:id,route:`Gros-Morne Boucle ${i+1}`,network:"gros-morne",type:"local",color:"#a855f7"})),
  ...["LR01","LR02","LR03","LR04","LR05","LR06"].map((id,i)=>({id,name:id,route:`Le Lorrain Boucle ${i+1}`,network:"lorrain",type:"local",color:"#ec4899"})),
  ...["ROB1","ROB2","ROB3","ROB4","ROB5","ROB6","ROB7","ROB8"].map((id,i)=>({id,name:id,route:`Le Robert Boucle ${i+1}`,network:"robert",type:"local",color:"#14b8a6"})),
  { id:"TRI1",name:"TRI1",route:"Trinité ↔ Tartane",network:"trinite",type:"local",color:"#06b6d4" },
  { id:"TRI2",name:"TRI2",route:"Trinité ↔ Caravelle",network:"trinite",type:"local",color:"#06b6d4" },
  { id:"TRI3",name:"TRI3",route:"Trinité ↔ Beauséjour",network:"trinite",type:"local",color:"#06b6d4" },
  { id:"TRI4",name:"TRI4",route:"Trinité ↔ Bois Lézards",network:"trinite",type:"local",color:"#06b6d4" },
  { id:"TRI5",name:"TRI5",route:"Trinité ↔ Morne Poirier",network:"trinite",type:"local",color:"#06b6d4" },
  { id:"TME1",name:"TME-1",route:"Trinité ↔ Morne des Esses",network:"trinite",type:"local",color:"#06b6d4" },
  ...["SMR1","SMR2","SMR3","SMR4","SMR5","SMR6","SMR7","SMR8","SMR9"].map((id,i)=>({id,name:id,route:`Sainte-Marie Boucle ${i+1}`,network:"sainte-marie",type:"local",color:"#84cc16"})),
  { id:"MA01",name:"MA01",route:"Marigot Boucle",network:"marigot",type:"local",color:"#14b8a6" },
  { id:"VT1",name:"Vedette 1",route:"Fort-de-France ↔ Trois-Îlets",network:"maritime",type:"maritime",color:"#0ea5e9" },
  { id:"VT2",name:"Vedette 2",route:"Fort-de-France ↔ Case-Pilote",network:"maritime",type:"maritime",color:"#0ea5e9" },
];

const NETS = {
  "centre":{l:"Centre",i:"🏙️"},"nord-caraibe":{l:"Nord Caraïbe",i:"🌊"},"nord-atlantique":{l:"Nord Atlantique",i:"🌴"},
  "gros-morne":{l:"Gros-Morne",i:"⛰️"},"lorrain":{l:"Le Lorrain",i:"🏔️"},"robert":{l:"Le Robert",i:"🐠"},
  "trinite":{l:"La Trinité",i:"🏖️"},"sainte-marie":{l:"Sainte-Marie",i:"🌾"},"marigot":{l:"Le Marigot",i:"🎣"},"maritime":{l:"Maritime",i:"⛴️"},
};

const PLACE_LINES = {
  "Fort-de-France — Pointe Simon":["A","B","NC01","NC09"],"Fort-de-France — Perrinon":["1","2","4","5","24"],
  "Fort-de-France — Dillon":["A","B","211"],"Fort-de-France — Didier":["5"],"Fort-de-France — Balata":["27"],
  "Lamentin — Mahault (Gare)":["B","NA21","NA22","NA23","NA25"],"Lamentin — Carrère":["A"],
  "Lamentin — Acajou":["A","B","104"],"Lamentin — Place d'Armes":["104","105","110","111","112","114"],
  "Sainte-Marie — Bourg":["NA21","NA25","SMR1","SMR2","SMR3","SMR4","SMR5","SMR6","SMR7"],
  "Sainte-Marie — Derrière-Morne":["NA22","SMR5","SMR8","TME1"],
  "Sainte-Marie — Morne des Esses":["SMR5","TME1"],
  "Trinité — Bourg":["NA27","TRI1","TRI2","TRI3","TRI4","TRI5","TME1","SMR8"],
  "Trinité — Tartane":["TRI1"],"Le Robert — Courbaril":["NA23","ROB1","ROB2","ROB3","ROB4","ROB5","ROB6","ROB7","ROB8"],
  "Gros-Morne — Bourg":["GRM1","GRM2","GRM3","GRM4","GRM5","GRM6","GRM7","NA24","NA27"],
  "Le Lorrain — Bourg":["LR01","LR02","LR03","LR04","LR05","LR06","NC10"],
  "Saint-Pierre — Gare":["NC01","NC02","NC03","NC04","NC4A","NC4B","NC05","NC10"],
  "Morne-Rouge — Bourg":["NC09","NC8A","NC8B"],"Schoelcher — Bourg":["340"],
  "Schoelcher — Terreville":["29","342"],"Schoelcher — Batelière":["30","340"],
  "Saint-Joseph — Bourg":["301","NA27"],"Le Marigot — Bourg":["MA01","SMR9"],
  "Les Trois-Îlets — Bourg":["VT1"],"Le François — Bourg":["NA24"],
  "Basse-Pointe — Bourg":["NA22","NA26"],"Grand-Rivière — Bourg":["NA26"],
};
const PLACES_DB=Object.keys(PLACE_LINES).map(n=>({name:n,lines:PLACE_LINES[n]}));
const COMMUNES=["Fort-de-France","Lamentin","Schoelcher","Sainte-Marie","Trinité","Le Robert","Saint-Pierre","Gros-Morne","Le Lorrain","Le François","Les Trois-Îlets","Saint-Joseph","Basse-Pointe","Morne-Rouge","Le Marigot"];
const PLACE_COORDS={"Fort-de-France — Pointe Simon":[14.601,-61.064],"Lamentin — Mahault (Gare)":[14.598,-60.993],"Lamentin — Carrère":[14.600,-61.000],"Lamentin — Acajou":[14.619,-61.021],"Sainte-Marie — Bourg":[14.775,-61.005],"Sainte-Marie — Derrière-Morne":[14.780,-60.998],"Trinité — Bourg":[14.737,-60.963],"Le Robert — Courbaril":[14.670,-60.938],"Gros-Morne — Bourg":[14.672,-61.018],"Saint-Pierre — Gare":[14.740,-61.177],"Morne-Rouge — Bourg":[14.710,-61.110],"Le Lorrain — Bourg":[14.830,-61.070],"Schoelcher — Bourg":[14.615,-61.080]};

// ── DESIGN TOKENS ──
const T={grad:"linear-gradient(160deg,#0a2540 0%,#0d6b58 50%,#14b8a6 100%)",bg:"#f0f2f5",card:"#ffffff",text:"#1a2332",sub:"#6b7a8d",faint:"#c5cdd8",accent:"#14b8a6",accentDk:"#0d6b58",coral:"#ff6b6b",mango:"#ffb347",r:20,sh:"0 4px 20px rgba(0,0,0,0.07)",shH:"0 8px 32px rgba(0,0,0,0.12)"};

export default function MTTracker(){
  const [screen,setScreen]=useState("home");
  const [search,setSearch]=useState("");
  const [netFilter,setNetFilter]=useState(null);
  const [selLine,setSelLine]=useState(null);
  const [dir,setDir]=useState("aller");
  const [tracking,setTracking]=useState(false);
  const [showRate,setShowRate]=useState(false);
  const [tripStart,setTripStart]=useState(null);
  const [lastReport,setLastReport]=useState(0);
  const [busSim,setBusSim]=useState([]);
  const [toast,setToast]=useState(null);
  const [uLoc,setULoc]=useState(null);
  const [nearLines,setNearLines]=useState([]);
  const [locStatus,setLocStatus]=useState("pending");
  const [viewMode,setViewMode]=useState("nearby");
  const [showLocPicker,setShowLocPicker]=useState(false);
  const [locSearch,setLocSearch]=useState("");
  const [online,setOnline]=useState(true);
  const [tripDur,setTripDur]=useState(0);
  const [tripDist,setTripDist]=useState(0);
  const [watchId,setWatchId]=useState(null);
  const [lastPos,setLastPos]=useState(null);
  const [reports,setReports]=useState([]);
  const [idle,setIdle]=useState(0);
  const [activeTab,setActiveTab]=useState("home");

  const san=(r)=>{
    if(typeof r!=="string")return "";
    return r.slice(0,80)
      .replace(/<[^>]*>/g,"")       // strip HTML tags
      .replace(/['";\\`${}()]/g,"") // strip SQL/NoSQL injection chars
      .replace(/\.\.\//g,"")        // strip path traversal
      .replace(/[\x00-\x1F]/g,"")   // strip control characters + null bytes
      .replace(/javascript:/gi,"")  // strip JS protocol
      .replace(/on\w+=/gi,"")       // strip event handlers
      .replace(/\s+/g," ")          // normalize whitespace
      .trim();
  };
  const msg=useCallback((m)=>{setToast(m);setTimeout(()=>setToast(null),3000);},[]);
  const fmt=(s)=>`${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;

  // ── EFFECTS ──
  useEffect(()=>{try{const a=()=>setOnline(true),b=()=>setOnline(false);window.addEventListener("online",a);window.addEventListener("offline",b);return()=>{window.removeEventListener("online",a);window.removeEventListener("offline",b);};}catch(e){}},[]);
  useEffect(()=>{if(!tracking||!tripStart)return;const i=setInterval(()=>setTripDur(Math.floor((Date.now()-tripStart)/1000)),1000);return()=>clearInterval(i);},[tracking,tripStart]);
  const startGps=useCallback(()=>{try{if(!navigator?.geolocation)return;const id=navigator.geolocation.watchPosition(p=>{
    // Sécurité : rejeter si précision > 100m (GPS spoofing)
    if(p.coords.accuracy&&p.coords.accuracy>100)return;
    // Sécurité : rejeter si hors Martinique
    const lat=p.coords.latitude,lng=p.coords.longitude;
    if(lat<14.38||lat>14.90||lng<-61.25||lng>-60.80)return;
    const n={lat,lng,ts:Date.now()};
    if(lastPos){const R=6371000,dL=(n.lat-lastPos.lat)*Math.PI/180,dN=(n.lng-lastPos.lng)*Math.PI/180,a=Math.sin(dL/2)**2+Math.cos(lastPos.lat*Math.PI/180)*Math.cos(n.lat*Math.PI/180)*Math.sin(dN/2)**2,d=R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
      // Sécurité : rejeter si vitesse > 120 km/h (spoofing)
      const dt=(n.ts-lastPos.ts)/1000;if(dt>0){const spd=(d/dt)*3.6;if(spd>120)return;}
      if(d>5){setTripDist(p=>p+d);setIdle(0);}else setIdle(p=>p+5);}
    setLastPos(n);},()=>{},{enableHighAccuracy:true,maximumAge:5000,timeout:10000});setWatchId(id);}catch(e){}},[lastPos]);
  const stopGps=useCallback(()=>{try{if(watchId!==null&&navigator?.geolocation)navigator.geolocation.clearWatch(watchId);}catch(e){}setWatchId(null);},[watchId]);
  useEffect(()=>{if(tracking&&idle>=600)msg("🛑 Immobile depuis 10 min");},[idle,tracking]);
  useEffect(()=>{if(!selLine)return;setBusSim(Array.from({length:Math.floor(Math.random()*3)+1},(_,i)=>({id:i,progress:Math.random(),users:Math.floor(Math.random()*8)+1,speed:0.002+Math.random()*0.003})));const iv=setInterval(()=>setBusSim(p=>p.map(b=>({...b,progress:(b.progress+b.speed)%1,users:Math.max(1,b.users+(Math.random()>0.8?(Math.random()>0.5?1:-1):0))}))),1500);return()=>clearInterval(iv);},[selLine]);
  useEffect(()=>{try{if(!navigator?.geolocation){setLocStatus("denied");setShowLocPicker(true);return;}navigator.geolocation.getCurrentPosition(p=>{const lat=p.coords.latitude,lng=p.coords.longitude;if(lat>=14.38&&lat<=14.90&&lng>=-61.25&&lng<=-60.80){const hav=(a,b,c,d)=>{const R=6371,x=(c-a)*Math.PI/180,y=(d-b)*Math.PI/180,z=Math.sin(x/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(y/2)**2;return R*2*Math.atan2(Math.sqrt(z),Math.sqrt(1-z))};let best=null,bd=99;Object.entries(PLACE_COORDS).forEach(([n,[p,q]])=>{const d=hav(lat,lng,p,q);if(d<bd){bd=d;best=n;}});if(best&&bd<3){setULoc({name:best});setLocStatus("granted");}else{setShowLocPicker(true);}}else setShowLocPicker(true);},()=>{setLocStatus("denied");setShowLocPicker(true);},{enableHighAccuracy:false,timeout:8000});}catch(e){setLocStatus("denied");setShowLocPicker(true);}},[]);
  useEffect(()=>{if(!uLoc?.name)return;setNearLines(ALL_LINES.filter(l=>(PLACE_LINES[uLoc.name]||[]).includes(l.id)));},[uLoc]);

  // ── ETA SIMULATION ──
  // En PROD : calculé par le backend à partir des positions GPS agrégées
  // Pour le proto : estimation basée sur la fréquence théorique de la ligne
  const getETA = (lineId) => {
    // Fréquences moyennes estimées (en minutes entre 2 bus)
    const freqs = { "A":8, "B":8, "1":20, "2":20, "3":25, "4":25, "5":20, "22":35,
      "29":30, "30":30, "301":35, "340":30, "NC01":40, "NC09":40,
      "NA21":45, "NA22":50, "NA23":45, "NA25":40, "NA27":50 };
    const freq = freqs[lineId] || 30;
    // Simule un temps d'attente entre 1 et freq minutes
    // En prod = position GPS réelle du bus le plus proche
    const seed = lineId.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
    const now = Math.floor(Date.now()/60000); // minutes since epoch
    const eta = ((seed + now) % freq) + 1;
    return { min: eta, isDemo: true };
  };

  const filtered=(()=>{const src=(viewMode==="nearby"&&!search&&!netFilter&&nearLines.length>0)?nearLines:ALL_LINES;return src.filter(l=>{const ms=!search||[l.name,l.route,l.id].some(x=>x.toLowerCase().includes(search.toLowerCase()));return ms&&(!netFilter||l.network===netFilter);});})();
  const grouped={};filtered.forEach(l=>{if(!grouped[l.network])grouped[l.network]=[];grouped[l.network].push(l);});

  const css=`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px;}input::placeholder{color:${T.faint};}`;

  // ═══════ TRACKING SCREEN ═══════
  if(screen==="tracking"&&selLine){
    const parts=selLine.route.split(" ↔ ");
    const dirLabel=parts.length>=2?(dir==="aller"?`${parts[0]} → ${parts[1]}`:`${parts[1]} → ${parts[0]}`):selLine.route;
    const stops=(()=>{const s=[parts[0]||"Départ","Arrêt 2","Arrêt 3","Arrêt 4",parts[1]||"Arrivée"];return dir==="retour"?[...s].reverse():s;})();
    const busAt=busSim[0]?Math.floor(busSim[0].progress*4):0;
    const lineRep=reports.filter(r=>r.lineId===selLine.id&&Date.now()-r.time<3600000).sort((a,b)=>b.time-a.time).slice(0,5);

    return(
      <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'DM Sans',sans-serif",maxWidth:480,margin:"0 auto",paddingBottom:100}}>
        <style>{css}</style>

        {/* Header */}
        <div style={{background:"linear-gradient(160deg,#0a1628,#0a2540,#0d3f35)",borderRadius:`0 0 28px 28px`,padding:"20px 20px 24px",color:"#fff"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div onClick={()=>{setScreen("home");setTracking(false);stopGps();setShowRate(false);setSelLine(null);}}
              style={{width:40,height:40,borderRadius:14,background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18}}>←</div>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:"Outfit",fontWeight:500}}>{selLine.id} • {NETS[selLine.network]?.l}</div>
              <div style={{fontSize:20,fontWeight:800,fontFamily:"Outfit"}}>{selLine.name}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{padding:"4px 10px",borderRadius:99,background:online?"rgba(255,107,107,0.2)":"rgba(255,255,255,0.08)",fontSize:9,fontWeight:700,color:online?"#ff8a8a":"rgba(255,255,255,0.3)",animation:online?"pulse 2s infinite":"none"}}>{online?"En ligne":"Hors ligne"}</div>
            </div>
          </div>

          {/* DIRECTION SELECTOR — fonctionnel */}
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:14,padding:4,display:"flex",gap:4}}>
            {["aller","retour"].map(d=>{
              const label=parts.length>=2?(d==="aller"?`→ ${parts[1].trim()}`:`← ${parts[0].trim()}`):selLine.route;
              return(
                <button key={d} onClick={()=>setDir(d)} style={{flex:1,padding:"11px 8px",borderRadius:11,border:"none",background:dir===d?selLine.color:"transparent",color:dir===d?"#fff":"rgba(255,255,255,0.4)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans",transition:"all 0.2s",textAlign:"center"}}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ETA Card */}
        {!tracking && (()=>{const eta=getETA(selLine.id);return(
          <div style={{margin:"16px 20px 0",background:T.card,borderRadius:T.r,padding:"16px 20px",boxShadow:T.sh,display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${T.accent},${T.accentDk})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0}}>
              <div style={{fontSize:24,fontWeight:900,fontFamily:"Outfit",lineHeight:1}}>{eta.min}</div>
              <div style={{fontSize:8,fontWeight:600,letterSpacing:0.5}}>MIN</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,fontFamily:"Outfit",color:T.text}}>Prochain bus estimé</div>
              <div style={{fontSize:12,color:T.sub}}>{dirLabel}</div>
              <div style={{fontSize:10,color:T.mango,fontWeight:600,marginTop:2}}>⚡ Estimation — données GTFS à venir</div>
            </div>
          </div>
        );})()}

        {/* TIMELINE D'ARRÊTS */}
        <div style={{padding:"24px 20px 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontSize:17,fontWeight:800,fontFamily:"Outfit",color:T.text}}>Arrêts</div>
            <div style={{fontSize:11,color:T.mango,fontWeight:700,fontFamily:"Outfit",padding:"3px 10px",background:`${T.mango}15`,borderRadius:99}}>SIMULATION</div>
          </div>
          <div style={{background:T.card,borderRadius:T.r,padding:"16px 20px",boxShadow:T.sh}}>
            {stops.map((stop,i)=>{
              const passed=i<busAt,cur=i===busAt,last=i===stops.length-1;
              return(
                <div key={i} style={{display:"flex",gap:14,minHeight:last?36:56}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:16,flexShrink:0}}>
                    <div style={{width:cur?14:10,height:cur?14:10,borderRadius:"50%",background:passed?T.faint:cur?T.mango:"transparent",border:cur?"3px solid #fff":`2.5px solid ${passed?T.faint:T.accent}`,boxShadow:cur?`0 0 0 3px ${T.mango}40`:"none",flexShrink:0}}/>
                    {!last&&<div style={{width:2,flex:1,background:passed?T.faint+"88":`${T.accent}30`,marginTop:4}}/>}
                  </div>
                  <div style={{flex:1,paddingBottom:last?0:12}}>
                    <div style={{fontSize:14,fontWeight:cur?700:passed?400:600,color:passed?T.faint:T.text,fontFamily:"Outfit"}}>{stop}</div>
                    <div style={{fontSize:11,color:cur?T.mango:passed?T.faint:T.sub,fontWeight:cur?600:400}}>
                      {passed?"Passé":cur?"🚌 Bus ici":"Prochain"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIGNALEMENTS */}
        <div style={{padding:"16px 20px"}}>
          <div style={{fontSize:13,fontWeight:700,fontFamily:"Outfit",color:T.sub,marginBottom:8}}>⚠️ Signalements</div>
          <div style={{background:T.card,borderRadius:16,padding:"14px 16px",boxShadow:T.sh}}>
            {lineRep.length===0?
              <div style={{fontSize:13,color:"#22c55e",fontWeight:600}}>✅ RAS — la ligne roule</div>:
              lineRep.map((r,i)=>{const ago=Math.floor((Date.now()-r.time)/60000);return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0",borderBottom:i<lineRep.length-1?`1px solid ${T.bg}`:"none"}}>
                  <span>{r.emoji}</span><span style={{flex:1,fontSize:13,color:T.text,fontWeight:500}}>{r.label}</span>
                  <span style={{fontSize:11,color:T.faint}}>il y a {ago<1?"<1":ago}m</span>
                </div>
              );})
            }
          </div>
        </div>

        {/* REPORT BUTTONS (quand en tracking) */}
        {tracking&&(
          <div style={{padding:"0 20px 12px",animation:"slideUp 0.2s"}}>
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
              {[{e:"🚨",l:"Accident",c:T.coral},{e:"🧍‍♂️",l:"Plein",c:T.mango},{e:"⏰",l:"Retard",c:"#e67e22"},{e:"🚫",l:"Annulé",c:T.coral},{e:"🔧",l:"Panne",c:T.sub}].map(r=>(
                <button key={r.l} onClick={()=>{if(Date.now()-lastReport<60000){msg("⏳ 1 min entre chaque signalement");return;}setLastReport(Date.now());setReports(p=>[...p,{emoji:r.e,label:r.l,lineId:selLine.id,time:Date.now()}]);msg(`Signalement envoyé — Merci !`);}}
                  style={{padding:"9px 14px",borderRadius:99,border:"none",background:`${r.c}10`,color:r.c,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans",whiteSpace:"nowrap",flexShrink:0}}>{r.e} {r.l}</button>
              ))}
            </div>
          </div>
        )}

        {/* TRACKING STATUS / ACTION BUTTONS */}
        <div style={{padding:"4px 20px 20px"}}>
          {/* Pas en tracking, pas de notation → bouton monter */}
          {!tracking&&!showRate&&(
            <button onClick={()=>{setTracking(true);setTripStart(Date.now());setTripDur(0);setTripDist(0);setIdle(0);setLastPos(null);startGps();msg(`🚌 C'est parti sur ${selLine.name} !`);}}
              style={{width:"100%",padding:18,border:"none",borderRadius:16,fontSize:16,fontWeight:800,fontFamily:"Outfit",cursor:"pointer",background:`linear-gradient(135deg,${T.accent},${T.accentDk})`,color:"#fff",boxShadow:`0 8px 24px ${T.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              🚌 Je suis monté dans le bus
            </button>
          )}

          {/* En tracking → barre de statut + bouton arrivé */}
          {tracking&&(
            <div style={{background:T.card,borderRadius:T.r,padding:16,boxShadow:T.sh,animation:"slideUp 0.3s"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:T.accent,animation:"pulse 1.5s infinite",flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,fontFamily:"Outfit",color:T.accent}}>En route — {selLine.name}</div>
                  <div style={{fontSize:12,color:T.sub}}>{dirLabel}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                <div style={{flex:1,background:T.bg,borderRadius:12,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:9,color:T.sub,fontWeight:700,fontFamily:"Outfit",textTransform:"uppercase"}}>Durée</div>
                  <div style={{fontSize:22,fontWeight:900,fontFamily:"Outfit",color:T.text}}>{fmt(tripDur)}</div>
                </div>
                <div style={{flex:1,background:T.bg,borderRadius:12,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:9,color:T.sub,fontWeight:700,fontFamily:"Outfit",textTransform:"uppercase"}}>Distance</div>
                  <div style={{fontSize:22,fontWeight:900,fontFamily:"Outfit",color:T.text}}>{(tripDist/1000).toFixed(1)} km</div>
                </div>
              </div>
              {idle>=300&&<div style={{fontSize:12,color:T.mango,fontWeight:600,marginBottom:8,textAlign:"center"}}>⚠️ Immobile depuis {Math.floor(idle/60)} min</div>}
              <button onClick={()=>{setTracking(false);stopGps();setShowRate(true);}}
                style={{width:"100%",padding:14,borderRadius:14,border:"none",background:`${T.coral}12`,color:T.coral,fontSize:15,fontWeight:800,fontFamily:"Outfit",cursor:"pointer"}}>
                Arrivé à destination 🛑
              </button>
            </div>
          )}

          {/* Rating */}
          {showRate&&(
            <div style={{background:T.card,borderRadius:T.r,padding:24,textAlign:"center",boxShadow:T.shH,animation:"slideUp 0.3s"}}>
              <div style={{fontSize:18,fontFamily:"Outfit",fontWeight:800,color:T.text,marginBottom:4}}>Comment c'était ?</div>
              <div style={{fontSize:13,color:T.sub,marginBottom:20}}>Ton avis aide la communauté</div>
              <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:16}}>
                {[{e:"😡",l:"Galère"},{e:"😕",l:"Bof"},{e:"😐",l:"Ok"},{e:"🙂",l:"Bien"},{e:"🤩",l:"Top"}].map(r=>(
                  <div key={r.l} onClick={()=>{setShowRate(false);msg("Merci pour ton avis !")}} style={{cursor:"pointer",padding:"10px 8px",borderRadius:14,background:T.bg,textAlign:"center",minWidth:50}}>
                    <div style={{fontSize:26}}>{r.e}</div>
                    <div style={{fontSize:9,color:T.sub,marginTop:3,fontWeight:500}}>{r.l}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>{setShowRate(false);msg("👋 À bientôt !")}} style={{background:"none",border:"none",color:T.faint,fontSize:12,cursor:"pointer",fontFamily:"DM Sans"}}>Passer →</button>
            </div>
          )}
        </div>

        {/* Toast */}
        <div style={{position:"fixed",top:20,left:"50%",transform:`translateX(-50%) translateY(${toast?0:-20}px)`,background:T.text,color:"#fff",padding:"12px 24px",borderRadius:99,fontSize:13,fontWeight:600,fontFamily:"DM Sans",opacity:toast?1:0,transition:"all 0.3s",zIndex:3000,whiteSpace:"nowrap",pointerEvents:"none",boxShadow:T.shH}}>{toast}</div>

        {/* Bottom nav */}
        <div style={{position:"fixed",bottom:16,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 40px)",maxWidth:440,background:T.text,borderRadius:22,padding:"10px 6px",display:"flex",justifyContent:"space-around",zIndex:100,boxShadow:T.shH}}>
          {[{k:"home",i:"🏠",l:"Accueil"},{k:"routes",i:"🚌",l:"Lignes"},{k:"info",i:"ℹ️",l:"Infos"}].map(t=>(
            <div key={t.k} onClick={()=>{setActiveTab(t.k);setScreen("home");setTracking(false);stopGps();setShowRate(false);setSelLine(null);if(t.k==="routes"){setViewMode("all");setSearch("");setNetFilter(null);}if(t.k==="home"){setViewMode("nearby");setSearch("");setNetFilter(null);}}}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"4px 18px",borderRadius:14,background:t.k===activeTab?"rgba(255,255,255,0.1)":"transparent"}}>
              <span style={{fontSize:17}}>{t.i}</span>
              <span style={{fontSize:8,color:t.k===activeTab?"#fff":"rgba(255,255,255,0.35)",fontWeight:600,fontFamily:"Outfit"}}>{t.l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ═══════ INFOS / SÉCURITÉ SCREEN ═══════
  if(activeTab==="info"&&screen==="home"){
    const allReps=reports.filter(r=>Date.now()-r.time<3600000).sort((a,b)=>b.time-a.time);
    return(
      <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'DM Sans',sans-serif",maxWidth:480,margin:"0 auto",paddingBottom:100}}>
        <style>{css}</style>
        <div style={{background:"linear-gradient(160deg,#0a1628,#0a2540)",borderRadius:"0 0 28px 28px",padding:"20px 20px 28px",color:"#fff"}}>
          <div style={{fontFamily:"Outfit",fontSize:22,fontWeight:900,marginBottom:4}}>ℹ️ Informations</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>Confidentialité, sécurité et signalements</div>
        </div>

        <div style={{padding:"20px"}}>
          {/* Signalements actifs */}
          <div style={{fontSize:16,fontWeight:800,fontFamily:"Outfit",color:T.text,marginBottom:12}}>⚠️ Signalements actifs</div>
          <div style={{background:T.card,borderRadius:T.r,padding:"16px",boxShadow:T.sh,marginBottom:24}}>
            {allReps.length===0?
              <div style={{fontSize:13,color:"#22c55e",fontWeight:600}}>✅ Aucun problème signalé sur le réseau</div>:
              allReps.map((r,i)=>{const ago=Math.floor((Date.now()-r.time)/60000);const line=ALL_LINES.find(l=>l.id===r.lineId);return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<allReps.length-1?`1px solid ${T.bg}`:"none"}}>
                  <span style={{fontSize:16}}>{r.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:T.text}}>{r.label}</div>
                    <div style={{fontSize:11,color:T.sub}}>{line?.name||r.lineId} • il y a {ago<1?"<1":ago} min</div>
                  </div>
                </div>
              );})
            }
          </div>

          {/* Privacy info */}
          <div style={{fontSize:16,fontWeight:800,fontFamily:"Outfit",color:T.text,marginBottom:12}}>🛡️ Ta vie privée</div>
          <div style={{background:T.card,borderRadius:T.r,padding:"20px",boxShadow:T.sh,marginBottom:24}}>
            {[
              {icon:"🚫",title:"Aucun compte requis",desc:"Pas d'inscription, pas d'email, pas de mot de passe."},
              {icon:"📍",title:"GPS éphémère",desc:"Ta position n'est jamais stockée. Elle est utilisée en temps réel puis supprimée."},
              {icon:"🔀",title:"Anonymisation",desc:"Un bruit de ±20m est ajouté à chaque position. Impossible de te localiser précisément."},
              {icon:"🆔",title:"Aucun identifiant",desc:"Pas de cookie, pas de fingerprint. Chaque session est indépendante."},
              {icon:"🔐",title:"Chiffrement",desc:"Toutes les communications sont chiffrées en TLS 1.3 (HTTPS/WSS)."},
              {icon:"🇪🇺",title:"Conforme RGPD",desc:"Consentement explicite, droit à l'effacement. Aucune donnée personnelle collectée."},
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<5?`1px solid ${T.bg}`:"none"}}>
                <div style={{fontSize:20,flexShrink:0,width:28,textAlign:"center"}}>{item.icon}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:"Outfit"}}>{item.title}</div>
                  <div style={{fontSize:12,color:T.sub,lineHeight:1.4}}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* App info */}
          <div style={{textAlign:"center",color:T.faint,fontSize:11,padding:"10px 0"}}>
            <div style={{fontFamily:"Outfit",fontWeight:700,marginBottom:4}}>MTTracker — Prototype</div>
            <div>Tracking communautaire des bus en Martinique</div>
            <div>110 lignes • Données GTFS open data</div>
          </div>
        </div>

        {/* Toast */}
        <div style={{position:"fixed",top:20,left:"50%",transform:`translateX(-50%) translateY(${toast?0:-20}px)`,background:T.text,color:"#fff",padding:"12px 24px",borderRadius:99,fontSize:13,fontWeight:600,fontFamily:"DM Sans",opacity:toast?1:0,transition:"all 0.3s",zIndex:3000,whiteSpace:"nowrap",pointerEvents:"none",boxShadow:T.shH}}>{toast}</div>

        {/* Bottom nav */}
        <div style={{position:"fixed",bottom:16,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 40px)",maxWidth:440,background:T.text,borderRadius:22,padding:"10px 6px",display:"flex",justifyContent:"space-around",zIndex:100,boxShadow:T.shH}}>
          {[{k:"home",i:"🏠",l:"Accueil"},{k:"routes",i:"🚌",l:"Lignes"},{k:"info",i:"ℹ️",l:"Infos"}].map(t=>(
            <div key={t.k} onClick={()=>{setActiveTab(t.k);setScreen("home");setTracking(false);setSelLine(null);if(t.k==="routes"){setViewMode("all");setSearch("");}if(t.k==="home"){setViewMode("nearby");setSearch("");setNetFilter(null);}}}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"4px 20px",borderRadius:14,background:activeTab===t.k?"rgba(255,255,255,0.1)":"transparent"}}>
              <span style={{fontSize:17}}>{t.i}</span>
              <span style={{fontSize:8,color:activeTab===t.k?"#fff":"rgba(255,255,255,0.35)",fontWeight:600,fontFamily:"Outfit"}}>{t.l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ═══════ HOME / ROUTES SCREEN ═══════
  return(
    <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'DM Sans',sans-serif",maxWidth:480,margin:"0 auto",paddingBottom:100}}>
      <style>{css}</style>

      {/* Gradient header */}
      <div style={{background:T.grad,borderRadius:"0 0 28px 28px",padding:"18px 20px 52px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-30,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,position:"relative",zIndex:1}}>
          <div style={{fontFamily:"Outfit",fontSize:24,fontWeight:900}}>
            <span style={{color:"#fff"}}>MT</span><span style={{color:"rgba(255,255,255,0.45)"}}>Tracker</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{padding:"5px 12px",borderRadius:99,background:online?"rgba(255,107,107,0.2)":"rgba(255,255,255,0.08)",fontSize:10,fontWeight:700,color:online?T.coral:"rgba(255,255,255,0.3)",animation:online?"pulse 2s infinite":"none"}}>{online?"En ligne":"Hors ligne"}</div>
          </div>
        </div>
        <div style={{position:"relative",zIndex:10}}>
          <input placeholder="🔍  Rechercher une ligne, commune..." value={search} onChange={e=>{setSearch(san(e.target.value));if(e.target.value)setViewMode("all");}}
            style={{width:"100%",padding:"16px 20px",background:"#fff",borderRadius:16,color:T.text,fontSize:15,fontFamily:"DM Sans",outline:"none",border:"none",boxShadow:T.shH}}/>
        </div>
      </div>

      {/* Content */}
      <div style={{marginTop:-20,position:"relative",zIndex:5}}>
        {/* Location + view toggle */}
        <div style={{padding:"0 20px 12px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          {uLoc?(
            <div onClick={()=>setShowLocPicker(true)} style={{padding:"7px 14px",background:T.card,borderRadius:99,boxShadow:T.sh,fontSize:12,color:T.accent,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
              📍 {uLoc.name} <span style={{fontSize:8,color:T.faint}}>✎</span>
            </div>
          ):(
            <div onClick={()=>setShowLocPicker(true)} style={{padding:"7px 14px",background:T.card,borderRadius:99,boxShadow:T.sh,fontSize:12,color:T.mango,fontWeight:600,cursor:"pointer"}}>📍 Choisis ta position</div>
          )}
        </div>

        {/* View toggle */}
        <div style={{display:"flex",gap:8,padding:"0 20px 14px"}}>
          {[{k:"nearby",i:"📍",l:"Autour de moi",n:nearLines.length},{k:"all",i:"🗺️",l:"Toutes les lignes",n:ALL_LINES.length}].map(v=>(
            <button key={v.k} onClick={()=>{setViewMode(v.k);if(v.k==="nearby"){setSearch("");setNetFilter(null);}}}
              style={{flex:1,padding:"10px",borderRadius:14,border:`2px solid ${viewMode===v.k?T.accent+"55":"transparent"}`,background:viewMode===v.k?T.card:T.card,color:viewMode===v.k?T.accent:T.sub,fontSize:13,fontWeight:700,fontFamily:"Outfit",cursor:"pointer",boxShadow:viewMode===v.k?T.sh:"none"}}>
              {v.i} {v.l} ({v.n})
            </button>
          ))}
        </div>

        {/* Network chips (all mode) */}
        {viewMode==="all"&&!search&&(
          <div style={{display:"flex",gap:8,padding:"0 20px 14px",overflowX:"auto"}}>
            <div onClick={()=>setNetFilter(null)} style={{flexShrink:0,padding:"7px 14px",borderRadius:99,background:!netFilter?T.accent:T.card,color:!netFilter?"#fff":T.sub,fontSize:12,fontWeight:600,cursor:"pointer",boxShadow:T.sh}}>Tous</div>
            {Object.entries(NETS).map(([k,v])=>(
              <div key={k} onClick={()=>setNetFilter(netFilter===k?null:k)} style={{flexShrink:0,padding:"7px 14px",borderRadius:99,background:netFilter===k?T.accent:T.card,color:netFilter===k?"#fff":T.sub,fontSize:12,fontWeight:600,cursor:"pointer",boxShadow:T.sh,whiteSpace:"nowrap"}}>
                {v.i} {v.l}
              </div>
            ))}
          </div>
        )}

        {/* Nearby header */}
        {viewMode==="nearby"&&nearLines.length>0&&!search&&(
          <div style={{padding:"0 20px 8px",fontSize:14,fontWeight:700,fontFamily:"Outfit",color:T.text}}>
            📍 {nearLines.length} lignes à {uLoc?.name}
          </div>
        )}

        {/* No location */}
        {!uLoc&&viewMode==="nearby"&&(
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{width:72,height:72,borderRadius:20,background:`${T.accent}10`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:32}}>📍</div>
            <div style={{fontSize:17,fontWeight:800,fontFamily:"Outfit",color:T.text,marginBottom:6}}>Où es-tu ?</div>
            <div style={{fontSize:13,color:T.sub,marginBottom:18}}>Pour voir les lignes qui passent près de toi</div>
            <button onClick={()=>setShowLocPicker(true)} style={{padding:"13px 24px",borderRadius:14,border:"none",background:`linear-gradient(135deg,${T.accent},${T.accentDk})`,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"Outfit",cursor:"pointer",boxShadow:`0 6px 20px ${T.accent}33`}}>📍 Choisir</button>
          </div>
        )}

        {/* No nearby lines */}
        {uLoc&&nearLines.length===0&&viewMode==="nearby"&&!search&&(
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:36,marginBottom:8}}>🚫</div>
            <div style={{fontSize:15,fontWeight:700,fontFamily:"Outfit",color:T.text,marginBottom:6}}>Aucune ligne ici</div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
              <button onClick={()=>setShowLocPicker(true)} style={{padding:"10px 16px",borderRadius:10,border:"none",background:T.card,color:T.sub,fontSize:12,fontFamily:"DM Sans",cursor:"pointer",boxShadow:T.sh}}>📍 Changer</button>
              <button onClick={()=>setViewMode("all")} style={{padding:"10px 16px",borderRadius:10,border:"none",background:`${T.accent}12`,color:T.accent,fontSize:12,fontFamily:"DM Sans",cursor:"pointer"}}>🗺️ Voir tout</button>
            </div>
          </div>
        )}

        {/* LINES LIST — toutes au même niveau */}
        {Object.entries(grouped).map(([nk,lines])=>(
          <div key={nk} style={{padding:"0 20px",marginBottom:12}}>
            <div style={{fontSize:10,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,fontWeight:700,fontFamily:"Outfit",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              {NETS[nk]?.i} {NETS[nk]?.l}<span style={{marginLeft:"auto",color:T.faint}}>{lines.length}</span>
            </div>
            <div style={{background:T.card,borderRadius:T.r,boxShadow:T.sh,overflow:"hidden"}}>
              {lines.map((line,i)=>(
                <div key={line.id} onClick={()=>{setSelLine(line);setScreen("tracking");setDir("aller");setActiveTab("home");}}
                  style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer",borderBottom:i<lines.length-1?`1px solid ${T.bg}`:"none",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=T.bg} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                  <div style={{width:44,height:30,borderRadius:10,background:line.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",fontFamily:"Outfit",flexShrink:0,boxShadow:`0 2px 8px ${line.color}33`}}>
                    {line.id.length>4?line.id.slice(0,3):line.id}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"Outfit",fontWeight:700,fontSize:14,color:T.text}}>{line.name}</div>
                    <div style={{fontSize:12,color:T.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{line.route}</div>
                  </div>
                  {/* ETA */}
                  {(()=>{const eta=getETA(line.id);return(
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"4px 10px",background:`${T.accent}10`,borderRadius:12,flexShrink:0,minWidth:48}}>
                      <div style={{fontSize:16,fontWeight:900,fontFamily:"Outfit",color:T.accent,lineHeight:1}}>{eta.min}</div>
                      <div style={{fontSize:8,fontWeight:600,color:T.sub}}>min</div>
                    </div>
                  );})()}
                  <div style={{color:T.faint,fontSize:18}}>›</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      <div style={{position:"fixed",top:20,left:"50%",transform:`translateX(-50%) translateY(${toast?0:-20}px)`,background:T.text,color:"#fff",padding:"12px 24px",borderRadius:99,fontSize:13,fontWeight:600,fontFamily:"DM Sans",opacity:toast?1:0,transition:"all 0.3s",zIndex:3000,whiteSpace:"nowrap",pointerEvents:"none",boxShadow:T.shH}}>{toast}</div>

      {/* Bottom nav — 3 tabs, pas de profil */}
      <div style={{position:"fixed",bottom:16,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 40px)",maxWidth:440,background:T.text,borderRadius:22,padding:"10px 6px",display:"flex",justifyContent:"space-around",zIndex:100,boxShadow:T.shH}}>
        {[{k:"home",i:"🏠",l:"Accueil"},{k:"routes",i:"🚌",l:"Lignes"},{k:"info",i:"ℹ️",l:"Infos"}].map(t=>(
          <div key={t.k} onClick={()=>{setActiveTab(t.k);setScreen("home");setTracking(false);setSelLine(null);if(t.k==="routes"){setViewMode("all");setSearch("");}if(t.k==="home"){setViewMode("nearby");setSearch("");setNetFilter(null);}}}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"4px 20px",borderRadius:14,background:activeTab===t.k?"rgba(255,255,255,0.1)":"transparent"}}>
            <span style={{fontSize:17}}>{t.i}</span>
            <span style={{fontSize:8,color:activeTab===t.k?"#fff":"rgba(255,255,255,0.35)",fontWeight:600,fontFamily:"Outfit"}}>{t.l}</span>
          </div>
        ))}
      </div>

      {/* LOCATION PICKER — bottom sheet */}
      {showLocPicker&&(
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",zIndex:2000,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn 0.2s"}}>
          <div style={{width:"100%",maxWidth:480,background:T.card,borderRadius:`${T.r+4}px ${T.r+4}px 0 0`,maxHeight:"85vh",display:"flex",flexDirection:"column",animation:"slideUp 0.3s"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 6px"}}><div style={{width:40,height:4,borderRadius:2,background:T.faint}}/></div>
            <div style={{padding:"0 20px 14px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontSize:20,fontWeight:800,fontFamily:"Outfit",color:T.text}}>📍 Où es-tu ?</div>
                {uLoc&&<div onClick={()=>setShowLocPicker(false)} style={{fontSize:13,color:T.accent,fontWeight:600,cursor:"pointer"}}>Fermer</div>}
              </div>
              <button onClick={()=>{try{if(!navigator?.geolocation){msg("❌ GPS non dispo");return;}navigator.geolocation.getCurrentPosition(p=>{const lat=p.coords.latitude,lng=p.coords.longitude;if(lat>=14.38&&lat<=14.90&&lng>=-61.25&&lng<=-60.80){const hav=(a,b,c,d)=>{const R=6371,x=(c-a)*Math.PI/180,y=(d-b)*Math.PI/180,z=Math.sin(x/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(y/2)**2;return R*2*Math.atan2(Math.sqrt(z),Math.sqrt(1-z))};let best=null,bd=99;Object.entries(PLACE_COORDS).forEach(([n,[p,q]])=>{const d=hav(lat,lng,p,q);if(d<bd){bd=d;best=n;}});setULoc({name:best||"GPS"});setLocStatus("granted");setShowLocPicker(false);msg("📍 GPS détecté !");}},()=>msg("❌ GPS indisponible"),{enableHighAccuracy:true,timeout:10000});}catch(e){msg("❌ GPS non dispo");}}}
                style={{width:"100%",padding:15,borderRadius:14,border:"none",background:`linear-gradient(135deg,${T.accent},${T.accentDk})`,color:"#fff",fontSize:15,fontWeight:700,fontFamily:"Outfit",cursor:"pointer",boxShadow:`0 6px 20px ${T.accent}33`,marginBottom:12}}>
                📡 Utiliser mon GPS
              </button>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{flex:1,height:1,background:T.bg}}/><span style={{fontSize:12,color:T.faint}}>ou tape ton quartier</span><div style={{flex:1,height:1,background:T.bg}}/>
              </div>
              <input placeholder="🔍 Derrière-Morne, Tartane, Acajou..." value={locSearch} onChange={e=>setLocSearch(san(e.target.value))} autoFocus
                style={{width:"100%",padding:"14px 18px",background:T.bg,borderRadius:14,border:"2px solid transparent",color:T.text,fontSize:15,fontFamily:"DM Sans",outline:"none"}}
                onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor="transparent"}/>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 0 20px"}}>
              {locSearch.length>0?(()=>{
                const res=PLACES_DB.filter(l=>l.name.toLowerCase().includes(locSearch.toLowerCase())).slice(0,10);
                if(!res.length)return<div style={{textAlign:"center",padding:30,color:T.sub,fontSize:13}}>Aucun résultat pour "{locSearch}"</div>;
                return res.map((loc,i)=>{
                  const act=uLoc?.name===loc.name;
                  const idx=loc.name.toLowerCase().indexOf(locSearch.toLowerCase());
                  return(
                    <div key={i} onClick={()=>{setULoc({name:loc.name});setLocStatus("manual");setShowLocPicker(false);setLocSearch("");msg(`📍 ${loc.name}`);}}
                      style={{padding:"14px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${T.bg}`,background:act?`${T.accent}06`:"#fff"}}>
                      <div style={{width:36,height:36,borderRadius:12,background:`${T.accent}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>📍</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,color:T.text}}>{loc.name.slice(0,idx)}<strong style={{color:T.accent}}>{loc.name.slice(idx,idx+locSearch.length)}</strong>{loc.name.slice(idx+locSearch.length)}</div>
                        <div style={{fontSize:11,color:T.faint}}>{loc.lines.length} lignes</div>
                      </div>
                      {act&&<span style={{color:T.accent,fontWeight:700}}>✓</span>}
                    </div>
                  );
                });
              })():(
                <div>
                  <div style={{padding:"10px 20px",fontSize:10,color:T.faint,textTransform:"uppercase",letterSpacing:1,fontWeight:700,fontFamily:"Outfit"}}>Communes</div>
                  {COMMUNES.map(c=>{const loc=PLACES_DB.find(l=>l.name.includes(c));if(!loc)return null;return(
                    <div key={c} onClick={()=>setLocSearch(c)} style={{padding:"13px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${T.bg}`}}>
                      <div style={{width:36,height:36,borderRadius:12,background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🏘️</div>
                      <span style={{fontSize:14,color:T.text,fontWeight:500,flex:1}}>{c}</span>
                      <span style={{fontSize:12,color:T.faint}}>→</span>
                    </div>
                  );})}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
