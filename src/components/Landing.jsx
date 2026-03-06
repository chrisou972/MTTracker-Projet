import { useState, useEffect, useRef } from "react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(247);
  const [activeScreen, setActiveScreen] = useState(0);
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  const sanitizeEmail = (raw) => {
    if (typeof raw !== "string") return "";
    return raw
      .slice(0, 100)
      .replace(/<[^>]*>/g, "")        // strip HTML
      .replace(/['"`;${}()\\]/g, "")   // strip injection chars
      .replace(/[\x00-\x1F]/g, "")     // strip control chars + null bytes
      .replace(/javascript:/gi, "")    // strip JS protocol
      .replace(/on\w+=/gi, "")         // strip event handlers
      .replace(/\s+/g, "")            // no spaces in email
      .trim();
  };
  const isValidEmail = (e) => {
    if (!e || e.length > 100 || e.length < 5) return false;
    // RFC 5322 simplified — strict enough for registration
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)) return false;
    // Block obvious injection attempts that passed sanitization
    if (/[<>'"\\;{}()$]/.test(e)) return false;
    return true;
  };
  const handleSubmit = () => { if (!isValidEmail(email)) return; setSubmitted(true); setCount(c => c + 1); };

  useEffect(() => { const iv = setInterval(() => setActiveScreen(s => (s + 1) % 3), 3500); return () => clearInterval(iv); }, []);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true })); });
    }, { threshold: 0.15 });
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const setRef = (id) => (el) => { if (el) { el.dataset.id = id; refs.current[id] = el; } };
  const isVis = (id) => visible[id];

  const T = { grad:"linear-gradient(160deg,#0a2540 0%,#0d6b58 50%,#14b8a6 100%)", gradDk:"linear-gradient(160deg,#0a1628 0%,#0a2540 50%,#0d3f35 100%)", bg:"#f0f2f5", card:"#ffffff", text:"#1a2332", sub:"#6b7a8d", accent:"#14b8a6", accentDk:"#0d6b58", coral:"#ff6b6b", mango:"#ffb347" };

  const SCREENS = [
    { title:"Lignes autour de toi", sub:"📍 Sainte-Marie — Derrière-Morne", lines:["NA22 — Basse-Pointe ↔ Mahault","SMR5 — Sainte-Marie Boucle","TME-1 — Trinité ↔ Morne des Esses"], color:T.accent },
    { title:"Suivi en temps réel", sub:"🚌 TCSP A — En route", lines:["⏱ 12:34 de trajet","📍 3.2 km parcourus","🟢 Bus à Acajou"], color:T.mango },
    { title:"Signale un souci", sub:"⚠️ Signalements actifs", lines:["🚨 Accident — Ligne 22","⏰ Retard — NC01","✅ RAS — Ligne 30"], color:T.coral },
  ];

  const css = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
@keyframes fadeUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
*{box-sizing:border-box;margin:0;padding:0;}html{scroll-behavior:smooth;}body{font-family:'DM Sans',sans-serif;background:${T.bg};color:${T.text};}::selection{background:${T.accent}33;}`;

  return (
    <div style={{maxWidth:480,margin:"0 auto",background:T.bg,minHeight:"100vh"}}>
      <style>{css}</style>

      {/* HERO */}
      <div style={{background:T.grad,borderRadius:"0 0 32px 32px",padding:"40px 24px 48px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{position:"absolute",bottom:-30,left:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.03)"}}/>
        <div style={{fontFamily:"Outfit",fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:20,letterSpacing:1,position:"relative",zIndex:1}}>🚌 MARTINIQUE TRANSPORT</div>
        <h1 style={{fontFamily:"Outfit",fontSize:36,fontWeight:900,lineHeight:1.1,marginBottom:12,position:"relative",zIndex:1}}>
          Sav kòté<br/><span style={{color:T.mango}}>bis-la yé</span>
        </h1>
        <p style={{fontSize:16,lineHeight:1.5,color:"rgba(255,255,255,0.7)",marginBottom:28,maxWidth:340,position:"relative",zIndex:1}}>
          Tracking communautaire des bus en Martinique. Anonyme. Gratuit. Par nous, pour nous.
        </p>
        {!submitted?(
          <div style={{display:"flex",gap:8,position:"relative",zIndex:1}}>
            <input placeholder="Ton email pour la bêta" value={email} onChange={e=>setEmail(sanitizeEmail(e.target.value))}
              style={{flex:1,padding:"14px 18px",borderRadius:14,border:"none",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(10px)",color:"#fff",fontSize:15,fontFamily:"DM Sans",outline:"none"}}/>
            <button onClick={handleSubmit} style={{padding:"14px 22px",borderRadius:14,border:"none",background:T.mango,color:T.text,fontWeight:800,fontFamily:"Outfit",fontSize:15,cursor:"pointer",flexShrink:0}}>Rejoindre</button>
          </div>
        ):(
          <div style={{background:"rgba(255,255,255,0.1)",borderRadius:14,padding:16,textAlign:"center",position:"relative",zIndex:1}}>
            <div style={{fontSize:20,marginBottom:4}}>🎉</div>
            <div style={{fontWeight:700,fontFamily:"Outfit"}}>Bienvenue dans l'aventure !</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.6)"}}>On te contacte dès le lancement.</div>
          </div>
        )}
        <div style={{textAlign:"center",marginTop:14,fontSize:12,color:"rgba(255,255,255,0.4)",position:"relative",zIndex:1}}>{count} martiniquais inscrits</div>
      </div>

      {/* PHONE MOCKUP */}
      <div ref={setRef("phone")} style={{padding:"32px 24px",textAlign:"center",opacity:isVis("phone")?1:0,transform:isVis("phone")?"translateY(0)":"translateY(30px)",transition:"all 0.6s"}}>
        <div style={{background:T.card,borderRadius:28,boxShadow:"0 12px 48px rgba(0,0,0,0.12)",padding:20,maxWidth:280,margin:"0 auto"}}>
          <div style={{width:80,height:6,borderRadius:3,background:T.bg,margin:"0 auto 16px"}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div style={{fontFamily:"Outfit",fontSize:16,fontWeight:900}}><span style={{color:T.accent}}>MT</span><span style={{color:T.sub}}>Tracker</span></div>
            <div style={{padding:"3px 8px",borderRadius:99,background:`${T.coral}15`,fontSize:8,fontWeight:700,color:T.coral}}>En ligne</div>
          </div>
          {SCREENS.map((scr,i)=>(
            <div key={i} style={{display:activeScreen===i?"block":"none",animation:"fadeIn 0.4s"}}>
              <div style={{background:T.bg,borderRadius:16,padding:14,marginBottom:10,textAlign:"left"}}>
                <div style={{fontSize:13,fontWeight:800,fontFamily:"Outfit",color:T.text,marginBottom:2}}>{scr.title}</div>
                <div style={{fontSize:10,color:T.sub,marginBottom:10}}>{scr.sub}</div>
                {scr.lines.map((line,j)=>(
                  <div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:j<scr.lines.length-1?`1px solid #e5e7eb`:"none"}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:scr.color,flexShrink:0}}/><div style={{fontSize:11,color:T.text}}>{line}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{display:"flex",gap:6,justifyContent:"center"}}>
            {[0,1,2].map(i=>(<div key={i} style={{width:activeScreen===i?20:6,height:6,borderRadius:3,background:activeScreen===i?T.accent:`${T.accent}33`,transition:"all 0.3s"}}/>))}
          </div>
        </div>
      </div>

      {/* LE PROBLÈME */}
      <div ref={setRef("prob")} style={{padding:"32px 24px",opacity:isVis("prob")?1:0,transform:isVis("prob")?"translateY(0)":"translateY(30px)",transition:"all 0.6s"}}>
        <div style={{fontSize:12,fontWeight:700,fontFamily:"Outfit",color:T.accent,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Le problème</div>
        <h2 style={{fontFamily:"Outfit",fontSize:26,fontWeight:900,lineHeight:1.2,marginBottom:20}}>Aucun moyen de savoir où est ton bus</h2>
        <div style={{display:"flex",gap:12}}>
          {[{n:"0",l:"bus trackés\nen temps réel",c:T.coral},{n:"40%",l:"de retards\nestimés",c:T.mango},{n:"3",l:"lignes le\ndimanche",c:T.accent}].map((s,i)=>(
            <div key={i} style={{flex:1,background:T.card,borderRadius:16,padding:"16px 10px",textAlign:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:28,fontWeight:900,fontFamily:"Outfit",color:s.c,lineHeight:1}}>{s.n}</div>
              <div style={{fontSize:10,color:T.sub,marginTop:6,whiteSpace:"pre-line",lineHeight:1.3}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <div ref={setRef("how")} style={{padding:"32px 24px",opacity:isVis("how")?1:0,transform:isVis("how")?"translateY(0)":"translateY(30px)",transition:"all 0.6s"}}>
        <div style={{fontSize:12,fontWeight:700,fontFamily:"Outfit",color:T.accent,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Comment ça marche</div>
        <h2 style={{fontFamily:"Outfit",fontSize:26,fontWeight:900,lineHeight:1.2,marginBottom:20}}>3 taps, c'est tout</h2>
        {[{n:"1",t:"Choisis ta ligne",d:"110 lignes répertoriées. L'app détecte celles autour de toi.",i:"📍"},
          {n:"2",t:"Monte dans le bus",d:"Un tap pour dire \"je suis monté\". Ton GPS anonyme aide les autres.",i:"🚌"},
          {n:"3",t:"Signale un souci",d:"Retard, panne, bus plein — la communauté est prévenue.",i:"⚠️"}
        ].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:16,marginBottom:20}}>
            <div style={{width:44,height:44,borderRadius:14,background:`linear-gradient(135deg,${T.accent},${T.accentDk})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"Outfit",fontWeight:900,fontSize:18,flexShrink:0}}>{s.n}</div>
            <div><div style={{fontFamily:"Outfit",fontWeight:700,fontSize:16,marginBottom:2}}>{s.t} {s.i}</div><div style={{fontSize:13,color:T.sub,lineHeight:1.5}}>{s.d}</div></div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div ref={setRef("feat")} style={{padding:"32px 24px",opacity:isVis("feat")?1:0,transform:isVis("feat")?"translateY(0)":"translateY(30px)",transition:"all 0.6s"}}>
        <div style={{fontSize:12,fontWeight:700,fontFamily:"Outfit",color:T.accent,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Fonctionnalités</div>
        <h2 style={{fontFamily:"Outfit",fontSize:26,fontWeight:900,lineHeight:1.2,marginBottom:20}}>Tout ce qu'il faut</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[{i:"📍",t:"Autour de moi",d:"Lignes proches de ta position"},{i:"⏱️",t:"ETA estimé",d:"Temps d'approche du bus"},
            {i:"🛡️",t:"100% anonyme",d:"Aucun compte, aucune donnée"},{i:"📡",t:"Temps réel",d:"Positions communautaires"},
            {i:"⚠️",t:"Signalements",d:"Retards, pannes en direct"},{i:"🗺️",t:"110 lignes",d:"TCSP, Centre, Nord, Maritime"}
          ].map((f,i)=>(
            <div key={i} style={{background:T.card,borderRadius:16,padding:16,boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:24,marginBottom:8}}>{f.i}</div>
              <div style={{fontFamily:"Outfit",fontWeight:700,fontSize:13,marginBottom:4}}>{f.t}</div>
              <div style={{fontSize:11,color:T.sub,lineHeight:1.4}}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VIE PRIVÉE */}
      <div ref={setRef("priv")} style={{padding:"32px 24px",opacity:isVis("priv")?1:0,transform:isVis("priv")?"translateY(0)":"translateY(30px)",transition:"all 0.6s"}}>
        <div style={{background:T.gradDk,borderRadius:24,padding:28,color:"#fff",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-30,right:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.03)"}}/>
          <div style={{fontSize:12,fontWeight:700,fontFamily:"Outfit",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Vie privée</div>
          <h2 style={{fontFamily:"Outfit",fontSize:24,fontWeight:900,lineHeight:1.2,marginBottom:16}}>Anonyme par conception</h2>
          {[{i:"🚫",t:"Aucun compte requis"},{i:"📍",t:"GPS éphémère — jamais stocké"},{i:"🔀",t:"Position bruitée ±20m"},{i:"🔐",t:"Chiffrement TLS 1.3"},{i:"🇪🇺",t:"Conforme RGPD"}].map((p,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:14,color:"rgba(255,255,255,0.8)",marginBottom:10}}>
              <span style={{fontSize:18}}>{p.i}</span> {p.t}
            </div>
          ))}
        </div>
      </div>

      {/* COUVERTURE */}
      <div ref={setRef("cov")} style={{padding:"32px 24px",opacity:isVis("cov")?1:0,transform:isVis("cov")?"translateY(0)":"translateY(30px)",transition:"all 0.6s"}}>
        <div style={{fontSize:12,fontWeight:700,fontFamily:"Outfit",color:T.accent,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Couverture</div>
        <h2 style={{fontFamily:"Outfit",fontSize:26,fontWeight:900,lineHeight:1.2,marginBottom:16}}>110 lignes, toute l'île</h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {[{n:"TCSP",c:2,cl:"#ef4444"},{n:"Centre",c:47,cl:"#6366f1"},{n:"Nord Caraïbe",c:14,cl:"#f97316"},{n:"Nord Atlantique",c:7,cl:"#10b981"},
            {n:"Gros-Morne",c:7,cl:"#a855f7"},{n:"Le Lorrain",c:6,cl:"#ec4899"},{n:"Le Robert",c:8,cl:"#14b8a6"},{n:"La Trinité",c:6,cl:"#06b6d4"},
            {n:"Sainte-Marie",c:9,cl:"#84cc16"},{n:"Maritime",c:2,cl:"#0ea5e9"}
          ].map((net,i)=>(
            <div key={i} style={{padding:"8px 14px",borderRadius:99,background:T.card,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:net.cl}}/><span style={{fontSize:12,fontWeight:600}}>{net.n}</span><span style={{fontSize:11,color:T.sub}}>{net.c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div ref={setRef("cta")} style={{padding:"32px 24px 48px",textAlign:"center",opacity:isVis("cta")?1:0,transform:isVis("cta")?"translateY(0)":"translateY(30px)",transition:"all 0.6s"}}>
        <h2 style={{fontFamily:"Outfit",fontSize:28,fontWeight:900,lineHeight:1.2,marginBottom:8}}>An nou tracké<br/>bis-la ansanm</h2>
        <p style={{fontSize:14,color:T.sub,marginBottom:24}}>Rejoins la bêta — c'est gratuit et anonyme</p>
        {!submitted?(
          <div style={{display:"flex",gap:8,maxWidth:360,margin:"0 auto"}}>
            <input placeholder="Ton email" value={email} onChange={e=>setEmail(sanitizeEmail(e.target.value))}
              style={{flex:1,padding:"14px 18px",borderRadius:14,border:`2px solid ${T.accent}33`,background:T.card,color:T.text,fontSize:15,fontFamily:"DM Sans",outline:"none"}}
              onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=`${T.accent}33`}/>
            <button onClick={handleSubmit} style={{padding:"14px 22px",borderRadius:14,border:"none",background:`linear-gradient(135deg,${T.accent},${T.accentDk})`,color:"#fff",fontWeight:800,fontFamily:"Outfit",fontSize:15,cursor:"pointer",flexShrink:0,boxShadow:`0 6px 20px ${T.accent}33`}}>Go !</button>
          </div>
        ):(
          <div style={{background:T.card,borderRadius:16,padding:20,boxShadow:"0 4px 16px rgba(0,0,0,0.06)",maxWidth:300,margin:"0 auto"}}>
            <div style={{fontSize:24,marginBottom:4}}>🎉</div>
            <div style={{fontFamily:"Outfit",fontWeight:700}}>Tu es inscrit !</div>
            <div style={{fontSize:13,color:T.sub}}>On te contacte bientôt.</div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{background:T.gradDk,borderRadius:"24px 24px 0 0",padding:"28px 24px",color:"rgba(255,255,255,0.4)",textAlign:"center"}}>
        <div style={{fontFamily:"Outfit",fontSize:18,fontWeight:900,marginBottom:4}}><span style={{color:"#fff"}}>MT</span><span style={{color:"rgba(255,255,255,0.4)"}}>Tracker</span></div>
        <div style={{fontSize:12,marginBottom:12}}>Tracking communautaire des bus en Martinique</div>
        <div style={{fontSize:10,lineHeight:1.6}}>Données GTFS open data • Licence Ouverte v2.0<br/>100% anonyme • Conforme RGPD<br/>Made with ❤️ en Martinique</div>
      </div>
    </div>
  );
}
