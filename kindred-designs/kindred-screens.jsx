// kindred-screens.jsx — all screen components → window exports
// depends on: React (global), window.KD (data), window.KindredDesignSystem_0a4553

const { useState, useEffect, useRef } = React;
const { PROFILES, CONNECTIONS, INTEREST_CATS } = window.KD;
const DS = window.KindredDesignSystem_0a4553 || {};

// ── Shared micro-components ────────────────────────────────────────────

function GradAvatar({ gradient, size = 44, online = false }) {
  const dot = Math.max(10, Math.round(size * 0.25));
  return (
    <div style={{ position:'relative', flexShrink:0, width:size, height:size }}>
      <div style={{ width:size, height:size, borderRadius:'50%', background:gradient }} />
      {online && (
        <div style={{ position:'absolute', bottom:1, right:1, width:dot, height:dot,
          borderRadius:'50%', background:'var(--sage-400)', border:'2px solid var(--surface-base)' }} />
      )}
    </div>
  );
}

function InterestPill({ label, selected, onToggle, catColor }) {
  return (
    <button onClick={onToggle} style={{
      padding:'7px 15px', borderRadius:99, cursor:'pointer', fontSize:13,
      fontWeight: selected ? 600 : 500, fontFamily:'var(--font-sans)',
      background: selected ? 'var(--coral-50)' : 'var(--surface-raised)',
      color: selected ? 'var(--coral-600)' : 'var(--text-secondary)',
      border: `1.5px solid ${selected ? 'var(--coral-300)' : 'var(--border-subtle)'}`,
      transform: selected ? 'scale(1.04)' : 'scale(1)',
      transition:'all 0.14s cubic-bezier(0.34,1.56,0.64,1)', outline:'none',
    }}>{label}</button>
  );
}

function ScreenDivider() {
  return <div style={{ height:8, background:'var(--surface-base)', flexShrink:0 }} />;
}

// ── Onboarding Flow ────────────────────────────────────────────────────

function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age,  setAge]  = useState('');
  const [city, setCity] = useState('');
  const [selInterests, setSelInterests] = useState(new Set(['Coffee','Hiking','Photography']));
  const [activeCat, setActiveCat] = useState('outdoors');

  const toggleInterest = item => setSelInterests(prev => {
    const n = new Set(prev);
    n.has(item) ? n.delete(item) : n.add(item);
    return n;
  });

  const next = () => {
    if (step < 3) { setStep(s => s + 1); }
    else onComplete({ name: name || 'Jamie', city: city || 'Brooklyn, NY', interests: selInterests });
  };

  const progBar = (
    <div style={{ display:'flex', gap:5, marginBottom:24 }}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ height:4, flex:1, borderRadius:2,
          background: i <= step ? 'var(--coral-500)' : 'var(--border-subtle)',
          transition:'background 0.3s' }} />
      ))}
    </div>
  );

  if (step === 0) return <OBWelcome onStart={next} />;
  if (step === 1) return <OBAbout progBar={progBar} name={name} setName={setName} age={age} setAge={setAge} city={city} setCity={setCity} onNext={next} />;
  if (step === 2) return <OBInterests progBar={progBar} sel={selInterests} toggle={toggleInterest} cat={activeCat} setCat={setActiveCat} onNext={next} />;
  return <OBReady progBar={progBar} name={name || 'Jamie'} count={selInterests.size} onFinish={next} />;
}

function OBWelcome({ onStart }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between',
      padding:'64px 28px 48px', background:'linear-gradient(170deg,#FF9278 0%,#FF5733 45%,#7A1806 100%)' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
        <div style={{ width:80, height:80, borderRadius:26, background:'rgba(255,255,255,0.18)',
          backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
          <svg width="46" height="46" viewBox="0 0 44 44" fill="none">
            <path d="M26 8 C18 9 6 15 6 22 C6 29 18 35 26 36" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round"/>
            <path d="M18 8 C26 9 38 15 38 22 C38 29 26 35 18 36" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontSize:44, fontWeight:800, color:'#fff', letterSpacing:'-1.5px' }}>kindred</span>
        <span style={{ fontSize:15, color:'rgba(255,255,255,0.80)', letterSpacing:'0.04em', textTransform:'uppercase', fontWeight:600 }}>find your people</span>
      </div>
      <div style={{ textAlign:'center', maxWidth:320 }}>
        <p style={{ fontSize:30, fontWeight:700, color:'#fff', lineHeight:1.2, letterSpacing:'-0.5px', marginBottom:14 }}>Friends who actually get you</p>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.78)', lineHeight:1.65 }}>Meet people who share your passions — coffee dates, hiking buddies, game nights and more.</p>
      </div>
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:12 }}>
        <button onClick={onStart} style={{ width:'100%', height:56, borderRadius:99, background:'#fff', border:'none',
          cursor:'pointer', fontSize:17, fontWeight:700, color:'var(--coral-600)', fontFamily:'var(--font-sans)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.18)', transition:'transform 0.12s' }}
          onMouseDown={e=>e.currentTarget.style.transform='scale(0.97)'}
          onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
          Get started
        </button>
        <button style={{ width:'100%', height:46, borderRadius:99, background:'rgba(255,255,255,0.14)',
          border:'1px solid rgba(255,255,255,0.30)', cursor:'pointer', fontSize:15, fontWeight:600,
          color:'rgba(255,255,255,0.92)', fontFamily:'var(--font-sans)' }}>
          Already have an account
        </button>
      </div>
    </div>
  );
}

function OBAbout({ progBar, name, setName, age, setAge, city, setCity, onNext }) {
  const inp = { width:'100%', height:52, borderRadius:'var(--radius-input)', border:'1.5px solid var(--border-default)',
    padding:'0 16px', fontSize:16, fontFamily:'var(--font-sans)', color:'var(--text-primary)',
    background:'var(--surface-raised)', outline:'none', boxSizing:'border-box' };
  const lbl = { fontSize:13, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' };
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'28px 24px 36px', background:'var(--surface-base)' }}>
      {progBar}
      <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.10em', color:'var(--text-tertiary)', marginBottom:6 }}>Step 2 of 4</p>
      <h2 style={{ fontSize:28, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px', lineHeight:1.2, marginBottom:6 }}>A little about you</h2>
      <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.5, marginBottom:28 }}>This is how you'll show up to potential friends.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:18, flex:1 }}>
        <div><label style={lbl}>Your name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Kim" style={inp} /></div>
        <div style={{ display:'flex', gap:12 }}>
          <div style={{ width:90 }}><label style={lbl}>Age</label><input value={age} onChange={e=>setAge(e.target.value)} placeholder="28" type="number" style={inp} /></div>
          <div style={{ flex:1 }}><label style={lbl}>City</label><input value={city} onChange={e=>setCity(e.target.value)} placeholder="Brooklyn, NY" style={inp} /></div>
        </div>
        <div><label style={lbl}>Bio <span style={{ fontWeight:400, color:'var(--text-tertiary)' }}>(optional)</span></label>
          <textarea placeholder="What should potential friends know about you?" style={{ ...inp, height:96, padding:'12px 16px', resize:'none', lineHeight:1.5 }} />
        </div>
      </div>
      <button onClick={onNext} style={{ width:'100%', height:56, borderRadius:99, background:'var(--coral-500)', border:'none',
        cursor:'pointer', fontSize:17, fontWeight:700, color:'#fff', marginTop:24, fontFamily:'var(--font-sans)',
        boxShadow:'0 6px 20px rgba(255,87,51,0.35)' }}>Continue</button>
    </div>
  );
}

function OBInterests({ progBar, sel, toggle, cat, setCat, onNext }) {
  const cats = INTEREST_CATS;
  const ready = sel.size >= 3;
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--surface-base)', overflow:'hidden' }}>
      <div style={{ padding:'28px 24px 16px', flexShrink:0 }}>
        {progBar}
        <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.10em', color:'var(--text-tertiary)', marginBottom:6 }}>Step 3 of 4</p>
        <h2 style={{ fontSize:28, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px', lineHeight:1.2, marginBottom:4 }}>What are you into?</h2>
        <p style={{ fontSize:14, color:'var(--text-tertiary)' }}>{sel.size} selected · pick at least 3</p>
      </div>
      <div style={{ overflowX:'auto', padding:'0 24px 14px', display:'flex', gap:8, flexShrink:0 }}>
        {Object.entries(cats).map(([key, c]) => (
          <button key={key} onClick={() => setCat(key)} style={{
            flexShrink:0, padding:'6px 14px', borderRadius:99, border:'none', cursor:'pointer',
            fontSize:13, fontWeight:600, fontFamily:'var(--font-sans)',
            background: cat===key ? c.color : 'var(--surface-raised)',
            color: cat===key ? '#fff' : 'var(--text-secondary)',
            boxShadow: cat===key ? 'none' : 'var(--shadow-sm)',
            transition:'all 0.15s'
          }}>{c.label}</button>
        ))}
        <div style={{ flexShrink:0, width:8 }} />
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 16px' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {cats[cat].items.map(item => (
            <InterestPill key={item} label={item} selected={sel.has(item)} onToggle={() => toggle(item)} catColor={cats[cat].color} />
          ))}
        </div>
      </div>
      <div style={{ padding:'12px 24px 36px', flexShrink:0 }}>
        <button onClick={onNext} disabled={!ready} style={{
          width:'100%', height:56, borderRadius:99, border:'none', fontFamily:'var(--font-sans)',
          cursor: ready ? 'pointer' : 'not-allowed',
          background: ready ? 'var(--coral-500)' : 'var(--neutral-200)',
          color: ready ? '#fff' : 'var(--text-disabled)',
          fontSize:17, fontWeight:700,
          boxShadow: ready ? '0 6px 20px rgba(255,87,51,0.35)' : 'none',
          transition:'all 0.2s'
        }}>{ready ? `Continue with ${sel.size} interests` : 'Pick at least 3'}</button>
      </div>
    </div>
  );
}

function OBReady({ progBar, name, count, onFinish }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn(true), 80); return () => clearTimeout(t); }, []);
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'40px 28px', background:'var(--surface-base)', textAlign:'center' }}>
      <div style={{ fontSize:80, marginBottom:24, transform: in_ ? 'scale(1)' : 'scale(0.3)',
        opacity: in_ ? 1 : 0, transition:'transform 0.55s cubic-bezier(0.34,1.56,0.64,1),opacity 0.3s' }}>🎉</div>
      <h2 style={{ fontSize:32, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px', marginBottom:10 }}>You're all set, {name}!</h2>
      <p style={{ fontSize:16, color:'var(--text-secondary)', lineHeight:1.65, marginBottom:40, maxWidth:280 }}>
        You picked {count} interests. We'll show you people who match your vibe.
      </p>
      <button onClick={onFinish} style={{ width:'100%', height:56, borderRadius:99, background:'var(--coral-500)', border:'none',
        cursor:'pointer', fontSize:17, fontWeight:700, color:'#fff', fontFamily:'var(--font-sans)',
        boxShadow:'0 6px 20px rgba(255,87,51,0.35)' }}>Find my people</button>
    </div>
  );
}

// ── Discover Screen ────────────────────────────────────────────────────

function DiscoverScreen({ accent, onToast }) {
  const [idx, setIdx]   = useState(0);
  const [anim, setAnim] = useState(null);

  const advance = dir => {
    setAnim(dir);
    setTimeout(() => { setIdx(i => (i + 1) % PROFILES.length); setAnim(null); }, 290);
  };

  const handlePass    = () => advance('left');
  const handleWave    = () => { onToast('wave', PROFILES[idx]); advance('up'); };
  const handleConnect = () => { onToast(PROFILES[idx].mutual >= 4 ? 'match' : 'connect', PROFILES[idx]); advance('right'); };

  const cur  = PROFILES[idx];
  const nxt  = PROFILES[(idx+1) % PROFILES.length];
  const bk   = PROFILES[(idx+2) % PROFILES.length];

  const tx = anim==='left' ? 'translateX(-130%) rotate(-15deg)'
           : anim==='right' ? 'translateX(130%) rotate(15deg)'
           : anim==='up'    ? 'translateY(-120%) rotate(-6deg)' : 'none';

  const primary = accent || 'var(--coral-500)';
  const glow    = accent ? `0 6px 20px ${accent}55` : '0 6px 20px rgba(255,87,51,0.42)';

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'10px 20px 8px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:10, background:primary, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 44 44" fill="none"><path d="M26 8C18 9 6 15 6 22C6 29 18 35 26 36" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M18 8C26 9 38 15 38 22C38 29 26 35 18 36" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontSize:20, fontWeight:800, letterSpacing:'-0.5px', color:'var(--text-primary)' }}>kindred</span>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          <button style={{ background:'none', border:'none', cursor:'pointer', padding:6, display:'flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          </button>
          <button style={{ background:'none', border:'none', cursor:'pointer', padding:6, position:'relative', display:'flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span style={{ position:'absolute', top:4, right:4, width:7, height:7, borderRadius:'50%', background:primary, border:'1.5px solid var(--surface-base)' }}/>
          </button>
        </div>
      </div>

      {/* Card stack */}
      <div style={{ flex:1, padding:'0 16px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:'0 22px', transform:'scale(0.88) translateY(22px)',
          transformOrigin:'top center', borderRadius:24, background:bk.gradient, opacity:0.5, zIndex:1 }}/>
        <div style={{ position:'absolute', inset:'0 11px', transform:'scale(0.94) translateY(11px)',
          transformOrigin:'top center', borderRadius:24, background:nxt.gradient, opacity:0.75, zIndex:2 }}/>
        <div style={{ position:'absolute', inset:0, zIndex:3,
          transition: anim ? 'transform 0.29s ease-in, opacity 0.29s' : 'none',
          transform:tx, opacity:anim?0:1 }}>
          <div style={{ height:'100%', borderRadius:24, overflow:'hidden', background:cur.gradient,
            boxShadow:'var(--shadow-profile)', display:'flex', flexDirection:'column',
            justifyContent:'flex-end', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,18,38,0.88) 0%,rgba(13,18,38,0.10) 52%,transparent 100%)' }}/>
            <div style={{ position:'relative', padding:'0 20px 18px' }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:3 }}>
                <span style={{ fontSize:28, fontWeight:800, color:'#fff', letterSpacing:'-0.5px' }}>{cur.name}</span>
                <span style={{ fontSize:20, fontWeight:500, color:'rgba(255,255,255,0.75)' }}>{cur.age}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:8, color:'rgba(255,255,255,0.65)', fontSize:13 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {cur.city} · {cur.distance}
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.83)', lineHeight:1.5, margin:'0 0 10px',
                display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{cur.bio}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {cur.interests.map(t => (
                  <span key={t} style={{ padding:'3px 10px', background:'rgba(255,255,255,0.16)',
                    backdropFilter:'blur(8px)', borderRadius:99, fontSize:12, color:'#fff',
                    fontWeight:500, border:'1px solid rgba(255,255,255,0.22)' }}>{t}</span>
                ))}
                {cur.mutual > 0 && <span style={{ padding:'3px 10px', background:'rgba(255,191,0,0.22)', borderRadius:99,
                  fontSize:12, color:'#FFD340', fontWeight:600, border:'1px solid rgba(255,191,0,0.28)' }}>✦ {cur.mutual} in common</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:18, padding:'14px 16px 16px', flexShrink:0 }}>
        <button onClick={handlePass} style={{ width:52, height:52, borderRadius:'50%', background:'var(--surface-raised)',
          border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'var(--shadow-md)', color:'var(--neutral-400)',
          transition:'transform 0.12s cubic-bezier(0.34,1.56,0.64,1)' }}
          onMouseDown={e=>e.currentTarget.style.transform='scale(0.90)'}
          onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <button onClick={handleWave} style={{ width:52, height:52, borderRadius:'50%', background:'var(--amber-50)',
          border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'var(--shadow-md)', fontSize:22,
          transition:'transform 0.12s cubic-bezier(0.34,1.56,0.64,1)' }}
          onMouseDown={e=>e.currentTarget.style.transform='scale(0.90)'}
          onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>👋</button>
        <button onClick={handleConnect} style={{ width:68, height:68, borderRadius:'50%', background:primary,
          border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:glow, color:'#fff',
          transition:'transform 0.12s cubic-bezier(0.34,1.56,0.64,1)' }}
          onMouseDown={e=>e.currentTarget.style.transform='scale(0.92)'}
          onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
    </div>
  );
}

// ── People Screen ──────────────────────────────────────────────────────

function PeopleScreen({ connections, requests, onChat, onAccept, onDecline }) {
  const [tab, setTab] = useState('connections');
  const unread = connections.reduce((s, c) => s + c.unread, 0);

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'10px 20px 0', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <span style={{ fontSize:22, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px' }}>Your people</span>
          {unread > 0 && <span style={{ padding:'3px 10px', borderRadius:99, fontSize:12, fontWeight:700,
            background:'var(--coral-50)', color:'var(--coral-600)', border:'1px solid var(--coral-200)' }}>{unread} new</span>}
        </div>
        <div style={{ display:'flex', background:'var(--surface-sunken)', borderRadius:10, padding:3, marginBottom:2 }}>
          {[['connections',`${connections.length} connections`],['requests',`${requests.length} requests`]].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex:1, height:34, borderRadius:8, border:'none', cursor:'pointer', fontSize:13, fontWeight:600,
              fontFamily:'var(--font-sans)',
              background: tab===id ? 'var(--surface-raised)' : 'transparent',
              color: tab===id ? 'var(--text-primary)' : 'var(--text-tertiary)',
              boxShadow: tab===id ? 'var(--shadow-sm)' : 'none',
              transition:'all 0.15s'
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'8px 16px 8px' }}>
        {tab === 'connections' ? connections.map(c => (
          <div key={c.id} onClick={() => onChat(c.id)} style={{
            display:'flex', alignItems:'center', gap:12, padding:'12px 8px',
            borderRadius:16, cursor:'pointer', marginBottom:2,
            background: c.unread ? 'var(--coral-50)' : 'transparent',
            transition:'background 0.15s'
          }}>
            <GradAvatar gradient={c.gradient} size={50} online={c.active==='Active now'} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:2 }}>
                <span style={{ fontSize:15, fontWeight: c.unread ? 700 : 600, color:'var(--text-primary)' }}>{c.name}</span>
                <span style={{ fontSize:11, color:'var(--text-tertiary)', flexShrink:0 }}>{c.active}</span>
              </div>
              <div style={{ fontSize:13, color: c.unread ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{c.lastMsg}</div>
            </div>
            {c.unread > 0 && <div style={{ width:20, height:20, borderRadius:'50%', background:'var(--coral-500)',
              color:'#fff', fontSize:11, fontWeight:700, display:'flex', alignItems:'center',
              justifyContent:'center', flexShrink:0 }}>{c.unread}</div>}
          </div>
        )) : requests.map(r => (
          <div key={r.id} style={{ padding:'14px 14px', borderRadius:16, background:'var(--surface-raised)',
            boxShadow:'var(--shadow-sm)', marginBottom:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
              <GradAvatar gradient={r.gradient} size={46} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)', marginBottom:2 }}>{r.name}</div>
                <div style={{ fontSize:12, color:'var(--text-tertiary)' }}>{r.city} · {r.mutual} shared interests · {r.time}</div>
              </div>
            </div>
            <div style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.5, padding:'8px 12px',
              background:'var(--surface-sunken)', borderRadius:10, marginBottom:12,
              fontStyle:'italic', borderLeft:'3px solid var(--border-default)' }}>"{r.note}"</div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => onDecline(r.id)} style={{ flex:1, height:40, borderRadius:99,
                background:'var(--surface-sunken)', border:'none', cursor:'pointer',
                fontSize:14, fontWeight:600, color:'var(--text-secondary)', fontFamily:'var(--font-sans)' }}>Decline</button>
              <button onClick={() => onAccept(r.id)} style={{ flex:2, height:40, borderRadius:99,
                background:'var(--coral-500)', border:'none', cursor:'pointer',
                fontSize:14, fontWeight:700, color:'#fff', fontFamily:'var(--font-sans)',
                boxShadow:'0 4px 12px rgba(255,87,51,0.32)' }}>Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Chat Screen ────────────────────────────────────────────────────────

function ChatScreen({ personId, connections, messages, onBack, onSend }) {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const person = connections.find(c => c.id === personId);
  const msgs = messages[personId] || [];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, personId]);

  const send = () => {
    if (!input.trim()) return;
    onSend(personId, input.trim());
    setInput('');
  };

  if (!person) return null;

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'10px 16px', display:'flex', alignItems:'center', gap:12,
        borderBottom:'1px solid var(--border-subtle)', flexShrink:0, background:'var(--surface-raised)' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:6, display:'flex', color:'var(--text-secondary)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <GradAvatar gradient={person.gradient} size={38} online={person.active==='Active now'} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)', lineHeight:1.2 }}>{person.name}</div>
          <div style={{ fontSize:11, fontWeight:600, color: person.active==='Active now' ? 'var(--sage-400)' : 'var(--text-tertiary)' }}>
            {person.active==='Active now' ? '● Active now' : person.active}
          </div>
        </div>
        <button style={{ background:'none', border:'none', cursor:'pointer', padding:6, display:'flex', color:'var(--text-secondary)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      <div style={{ padding:'6px 16px', flexShrink:0, background:'var(--coral-50)',
        borderBottom:'1px solid var(--coral-100)', display:'flex', alignItems:'center', gap:6 }}>
        <span style={{ fontSize:12, color:'var(--coral-600)', fontWeight:600 }}>✦ {person.mutual} shared interests</span>
        <span style={{ fontSize:12, color:'var(--text-tertiary)' }}>·</span>
        <span style={{ fontSize:12, color:'var(--text-tertiary)' }}>{person.city}</span>
      </div>

      <div ref={scrollRef} style={{ flex:1, overflowY:'auto', padding:'14px 16px 8px',
        display:'flex', flexDirection:'column', gap:8, background:'var(--surface-base)' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent: m.from==='me' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth:'78%', padding:'10px 14px',
              borderRadius: m.from==='me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.from==='me' ? 'var(--coral-500)' : 'var(--surface-raised)',
              color: m.from==='me' ? '#fff' : 'var(--text-primary)',
              fontSize:14, lineHeight:1.45,
              boxShadow: m.from==='me' ? '0 2px 8px rgba(255,87,51,0.22)' : 'var(--shadow-xs)'
            }}>
              {m.text}
              <div style={{ fontSize:10, opacity:0.6, marginTop:3, textAlign: m.from==='me' ? 'right' : 'left' }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding:'10px 16px 16px', display:'flex', alignItems:'center', gap:10,
        borderTop:'1px solid var(--border-subtle)', background:'var(--surface-raised)', flexShrink:0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()}
          placeholder="Type a message…"
          style={{ flex:1, height:42, borderRadius:21, border:'1.5px solid var(--border-default)',
            padding:'0 16px', fontSize:14, fontFamily:'var(--font-sans)', outline:'none',
            background:'var(--surface-base)', color:'var(--text-primary)' }}/>
        <button onClick={send} style={{ width:42, height:42, borderRadius:'50%', background:'var(--coral-500)',
          border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          flexShrink:0, boxShadow:'0 2px 8px rgba(255,87,51,0.30)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
}

// ── Inline toggle (no DS dependency) ──────────────────────────────────
function KToggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width:46, height:27, borderRadius:14,
      background: value ? 'var(--coral-500)' : 'var(--neutral-300)',
      cursor:'pointer', position:'relative', transition:'background 0.22s',
      flexShrink:0
    }}>
      <div style={{
        position:'absolute', top:3.5, left: value ? 22 : 3.5, width:20, height:20,
        borderRadius:'50%', background:'#fff', boxShadow:'var(--shadow-sm)',
        transition:'left 0.22s cubic-bezier(0.34,1.56,0.64,1)'
      }}/>
    </div>
  );
}

// ── Profile Screen ─────────────────────────────────────────────────────

function ProfileScreen({ profile }) {
  const [interests, setInterests] = useState([...profile.interests]);
  const [notifs, setNotifs] = useState(true);
  const [loc,    setLoc]    = useState(true);
  const [avail,  setAvail]  = useState(true);

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <div style={{ position:'relative', height:220, background:profile.gradient, flexShrink:0 }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,18,38,0.55) 0%,transparent 65%)' }}/>
        <button style={{ position:'absolute', top:14, right:16, background:'rgba(255,255,255,0.18)',
          backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.28)',
          borderRadius:99, padding:'6px 16px', color:'#fff', fontSize:13, fontWeight:600,
          cursor:'pointer', fontFamily:'var(--font-sans)' }}>Edit profile</button>
        <div style={{ position:'absolute', bottom:16, left:20 }}>
          <div style={{ fontSize:26, fontWeight:800, color:'#fff', letterSpacing:'-0.5px', marginBottom:3 }}>{profile.name}</div>
          <div style={{ display:'flex', alignItems:'center', gap:4, color:'rgba(255,255,255,0.72)', fontSize:13 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {profile.city}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', background:'var(--surface-raised)', borderBottom:'8px solid var(--surface-base)' }}>
        {[{n:profile.stats.connections,l:'connections'},{n:profile.stats.wavesSent,l:'waves sent'},{n:profile.stats.profileViews,l:'profile views'}].map((s,i,arr) => (
          <div key={s.l} style={{ flex:1, textAlign:'center', padding:'14px 0',
            borderRight: i<arr.length-1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <div style={{ fontSize:22, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px' }}>{s.n}</div>
            <div style={{ fontSize:11, color:'var(--text-tertiary)', fontWeight:500 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div style={{ padding:'14px 20px', background:'var(--surface-raised)' }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', marginBottom:8 }}>Bio</div>
        <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.65, margin:0 }}>{profile.bio}</p>
      </div>
      <ScreenDivider />

      {/* Interests */}
      <div style={{ padding:'14px 20px', background:'var(--surface-raised)' }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', marginBottom:10 }}>Your interests</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
          {interests.map(tag => (
            <span key={tag} onClick={() => setInterests(p => p.filter(t => t!==tag))}
              style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px',
                borderRadius:99, background:'var(--coral-50)', color:'var(--coral-600)',
                border:'1.5px solid var(--coral-200)', fontSize:13, fontWeight:600, cursor:'pointer' }}>
              {tag} <span style={{ opacity:0.55, fontSize:16, lineHeight:1 }}>×</span>
            </span>
          ))}
          <span style={{ display:'inline-flex', alignItems:'center', padding:'6px 12px',
            borderRadius:99, border:'1.5px dashed var(--border-default)',
            fontSize:13, color:'var(--text-tertiary)', cursor:'pointer' }}>+ Add more</span>
        </div>
      </div>
      <ScreenDivider />

      {/* Settings */}
      <div style={{ padding:'14px 20px', background:'var(--surface-raised)' }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', marginBottom:14 }}>Settings</div>
        {[
          {label:'Push notifications', sub:'New connections and messages', val:notifs, set:setNotifs},
          {label:'Share location',     sub:'Show distance on your profile', val:loc,    set:setLoc},
          {label:'Available to meet',  sub:"Let people know you're free this week", val:avail, set:setAvail},
        ].map((row, i, arr) => (
          <React.Fragment key={row.label}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:1 }}>{row.label}</div>
                <div style={{ fontSize:12, color:'var(--text-tertiary)' }}>{row.sub}</div>
              </div>
              <KToggle value={row.val} onChange={row.set}/>
            </div>
            {i < arr.length-1 && <div style={{ height:1, background:'var(--border-subtle)', margin:'14px 0' }}/>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ height:24 }} />
    </div>
  );
}

// ── Export all ─────────────────────────────────────────────────────────
Object.assign(window, {
  OnboardingFlow,
  DiscoverScreen,
  PeopleScreen,
  ChatScreen,
  ProfileScreen,
  GradAvatar,
});
