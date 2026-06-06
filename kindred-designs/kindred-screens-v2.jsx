// kindred-screens-v2.jsx — activity-first redesign

const { useState, useEffect, useRef } = React;
const { CAT, MEETUPS, GROUPS, LFG_POSTS, GROUP_MSGS, DM_CONNS, DM_MSGS } = window.KDv2;

// ── Shared helpers ─────────────────────────────────────────────────────

const iBtn = { background:'none', border:'none', cursor:'pointer', padding:6, display:'flex', alignItems:'center', color:'var(--text-secondary)' };

function CatPill({ cat, size='sm' }) {
  const c = CAT[cat] || { color:'var(--text-secondary)', bg:'var(--surface-sunken)' };
  const fs = size==='sm' ? 11 : 12;
  return (
    <span style={{ padding:`2px 8px`, borderRadius:99, fontSize:fs, fontWeight:700,
      background:c.bg, color:c.color, flexShrink:0 }}>{cat}</span>
  );
}

function SectionHead({ title, sub, action, onAction }) {
  return (
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:12 }}>
      <div>
        <span style={{ fontSize:16, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.2px' }}>{title}</span>
        {sub && <span style={{ fontSize:12, color:'var(--text-tertiary)', marginLeft:8 }}>{sub}</span>}
      </div>
      {action && <button onClick={onAction} style={{ ...iBtn, padding:'2px 0', fontSize:13, fontWeight:600, color:'var(--coral-500)' }}>{action} →</button>}
    </div>
  );
}

function GoingStack({ going, cap }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
      <div style={{ display:'flex' }}>
        {going.slice(0,4).map((p,i) => (
          <div key={i} style={{ width:22, height:22, borderRadius:'50%', background:p.g,
            border:'2px solid var(--surface-raised)', marginLeft: i>0 ? -8 : 0 }} />
        ))}
      </div>
      <span style={{ fontSize:12, color:'var(--text-tertiary)' }}>
        {going.length} going{cap ? ` · ${cap - going.length} spots left` : ''}
      </span>
    </div>
  );
}

// ── Meetup card ────────────────────────────────────────────────────────

function MeetupCard({ m, joined, onJoin, onClick, compact=false }) {
  const c = CAT[m.category] || CAT.Food;
  const hdr = `linear-gradient(140deg, ${c.pill}40, ${c.pill}18)`;
  return (
    <div onClick={onClick} style={{
      flexShrink: compact ? 0 : 1, width: compact ? 196 : '100%',
      borderRadius:16, overflow:'hidden', background:'var(--surface-raised)',
      boxShadow:'var(--shadow-sm)', cursor:'pointer', transition:'transform 0.15s, box-shadow 0.15s'
    }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-md)';}}
      onMouseLeave={e=>{e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-sm)';}}>
      <div style={{ height: compact ? 62 : 76, background:hdr, display:'flex', alignItems:'flex-end', padding:'8px 12px', position:'relative' }}>
        <CatPill cat={m.category} />
      </div>
      <div style={{ padding:'10px 12px 12px' }}>
        <p style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', lineHeight:1.3, margin:'0 0 4px',
          ...(compact ? { display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' } : {}) }}>
          {m.title}
        </p>
        <p style={{ fontSize:12, color:'var(--text-tertiary)', margin:`0 0 ${compact?0:10}px` }}>
          {m.date} · {m.location}
        </p>
        {!compact && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
            <GoingStack going={m.going} cap={m.cap} />
            <button onClick={e=>{e.stopPropagation(); onJoin(m.id);}} style={{
              padding:'6px 14px', borderRadius:99, fontSize:12, fontWeight:700, border:'none',
              cursor:'pointer', fontFamily:'var(--font-sans)', flexShrink:0,
              background: joined ? 'var(--sage-50)' : 'var(--coral-500)',
              color: joined ? 'var(--sage-500)' : '#fff',
              boxShadow: joined ? 'none' : '0 3px 10px rgba(255,87,51,0.28)'
            }}>{joined ? '✓ Going' : "I'm in"}</button>
          </div>
        )}
        {compact && <p style={{ fontSize:11, color:'var(--text-tertiary)', margin:0 }}>{m.going.length} going</p>}
      </div>
    </div>
  );
}

// ── Group card ─────────────────────────────────────────────────────────

function GroupCard({ g, joined, onJoin, onClick }) {
  const c = CAT[g.category] || CAT.Gaming;
  const initials = g.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return (
    <div onClick={onClick} style={{ padding:'14px 14px', borderRadius:16, background:'var(--surface-raised)',
      boxShadow:'var(--shadow-sm)', cursor:'pointer', transition:'transform 0.15s, box-shadow 0.15s' }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='var(--shadow-md)';}}
      onMouseLeave={e=>{e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-sm)';}}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:10 }}>
        <div style={{ width:46, height:46, borderRadius:14, background:c.bg, display:'flex',
          alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontSize:14, fontWeight:800, color:c.color, letterSpacing:'-0.3px' }}>{initials}</span>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
            <span style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)', lineHeight:1.3 }}>{g.name}</span>
            <button onClick={e=>{e.stopPropagation(); onJoin(g.id);}} style={{
              flexShrink:0, padding:'5px 12px', borderRadius:99, fontSize:12, fontWeight:700,
              border: joined ? '1.5px solid var(--border-default)' : 'none',
              background: joined ? 'transparent' : 'var(--coral-500)',
              color: joined ? 'var(--text-secondary)' : '#fff',
              cursor:'pointer', fontFamily:'var(--font-sans)',
              boxShadow: joined ? 'none' : '0 3px 10px rgba(255,87,51,0.28)'
            }}>{joined ? 'Joined' : 'Join'}</button>
          </div>
          <p style={{ fontSize:12, color:'var(--text-tertiary)', margin:'2px 0 0' }}>{g.members} members · {g.activity}</p>
        </div>
      </div>
      {g.lfg && (
        <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px',
          borderRadius:8, background:'var(--coral-50)', marginBottom:8 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--coral-500)' }}/>
          <span style={{ fontSize:12, color:'var(--coral-600)', fontWeight:600 }}>Looking for {g.need} more players</span>
        </div>
      )}
      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
        {g.interests.map(t => (
          <span key={t} style={{ padding:'2px 8px', borderRadius:99, fontSize:11, fontWeight:500,
            background:c.bg, color:c.color }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── LFG post ───────────────────────────────────────────────────────────

function LFGPostCard({ post, interested, onInterest }) {
  const c = CAT[post.category] || CAT.Food;
  return (
    <div style={{ padding:'14px 14px', borderRadius:16, background:'var(--surface-raised)', boxShadow:'var(--shadow-sm)' }}>
      <div style={{ display:'flex', gap:10, marginBottom:10 }}>
        <div style={{ width:38, height:38, borderRadius:'50%', background:post.grad, flexShrink:0 }}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>{post.name}</div>
          <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.5, margin:0 }}>"{post.text}"</p>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:12, color:'var(--text-tertiary)' }}>{post.when}</span>
          <span style={{ color:'var(--border-default)' }}>·</span>
          <CatPill cat={post.category} />
          <span style={{ fontSize:12, color:'var(--text-tertiary)' }}>{post.n + (interested?1:0)} interested</span>
        </div>
        <button onClick={onInterest} style={{
          padding:'6px 14px', borderRadius:99, fontSize:12, fontWeight:700, border:'none',
          cursor:'pointer', fontFamily:'var(--font-sans)',
          background: interested ? 'var(--coral-50)' : 'var(--coral-500)',
          color: interested ? 'var(--coral-600)' : '#fff',
          boxShadow: interested ? 'none' : '0 3px 10px rgba(255,87,51,0.28)'
        }}>{interested ? '✓ Interested' : "I'm interested"}</button>
      </div>
    </div>
  );
}

// ── Home Screen ────────────────────────────────────────────────────────

function HomeScreenV2({ joinedMeetups, joinedGroups, intPosts, onJoinMeetup, onJoinGroup, onPostInterest, onDetail, onTab }) {
  const suggestedGroups = GROUPS.filter(g => !joinedGroups.has(g.id)).slice(0, 3);
  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      {/* Header */}
      <div style={{ padding:'12px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:10, background:'var(--coral-500)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 44 44" fill="none"><path d="M26 8C18 9 6 15 6 22C6 29 18 35 26 36" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M18 8C26 9 38 15 38 22C38 29 26 35 18 36" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontSize:20, fontWeight:800, letterSpacing:'-0.5px', color:'var(--text-primary)' }}>kindred</span>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          <button style={iBtn}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding:'10px 20px 16px' }}>
        <h1 style={{ fontSize:26, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px', lineHeight:1.2 }}>Find your people</h1>
        <p style={{ fontSize:14, color:'var(--text-tertiary)', marginTop:2 }}>Brooklyn, NY · 6 events this week</p>
      </div>

      {/* Meetups this week */}
      <div style={{ marginBottom:26 }}>
        <div style={{ padding:'0 20px' }}><SectionHead title="Meetups this week" action="See all" onAction={()=>onTab('meet')}/></div>
        <div style={{ overflowX:'auto', padding:'0 20px 6px', display:'flex', gap:12 }}>
          {MEETUPS.map(m => (
            <MeetupCard key={m.id} m={m} compact joined={joinedMeetups.has(m.id)} onJoin={onJoinMeetup} onClick={()=>onDetail('meetup', m.id)}/>
          ))}
          <div style={{ flexShrink:0, width:4 }}/>
        </div>
      </div>

      {/* Groups for you */}
      <div style={{ padding:'0 20px', marginBottom:26 }}>
        <SectionHead title="Groups for you" action="Browse all" onAction={()=>onTab('meet')}/>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {suggestedGroups.map(g => (
            <GroupCard key={g.id} g={g} joined={false} onJoin={onJoinGroup} onClick={()=>onDetail('group', g.id)}/>
          ))}
          {suggestedGroups.length === 0 && (
            <p style={{ fontSize:14, color:'var(--text-tertiary)', textAlign:'center', padding:'20px 0' }}>
              You've joined all the groups! Check back for new ones.
            </p>
          )}
        </div>
      </div>

      {/* LFG posts */}
      <div style={{ padding:'0 20px 32px' }}>
        <SectionHead title="Looking for…" sub="casual invites nearby"/>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {LFG_POSTS.map(p => (
            <LFGPostCard key={p.id} post={p} interested={intPosts.has(p.id)} onInterest={()=>onPostInterest(p.id)}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Meet Screen ────────────────────────────────────────────────────────

function MeetScreenV2({ joinedMeetups, joinedGroups, onJoinMeetup, onJoinGroup, onDetail }) {
  const [tab, setTab] = useState('events');
  const [catF, setCatF] = useState('All');
  const cats = ['All', ...Object.keys(CAT)];

  const filteredMeetups = catF==='All' ? MEETUPS : MEETUPS.filter(m => m.category===catF);
  const filteredGroups  = catF==='All' ? GROUPS  : GROUPS.filter(g => g.category===catF);

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'12px 20px 0', flexShrink:0 }}>
        <h2 style={{ fontSize:22, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px', marginBottom:14 }}>Meet up</h2>
        {/* Tab switcher */}
        <div style={{ display:'flex', background:'var(--surface-sunken)', borderRadius:10, padding:3, marginBottom:12 }}>
          {[['events','Events'],['groups','Groups']].map(([id,label]) => (
            <button key={id} onClick={()=>setTab(id)} style={{
              flex:1, height:34, borderRadius:8, border:'none', cursor:'pointer',
              fontSize:13, fontWeight:600, fontFamily:'var(--font-sans)',
              background: tab===id ? 'var(--surface-raised)' : 'transparent',
              color: tab===id ? 'var(--text-primary)' : 'var(--text-tertiary)',
              boxShadow: tab===id ? 'var(--shadow-sm)' : 'none',
              transition:'all 0.15s'
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div style={{ overflowX:'auto', padding:'0 20px 12px', display:'flex', gap:7, flexShrink:0 }}>
        {cats.map(cat => (
          <button key={cat} onClick={()=>setCatF(cat)} style={{
            flexShrink:0, padding:'6px 14px', borderRadius:99, border:'none', cursor:'pointer',
            fontSize:12, fontWeight:600, fontFamily:'var(--font-sans)',
            background: catF===cat ? 'var(--coral-500)' : 'var(--surface-raised)',
            color: catF===cat ? '#fff' : 'var(--text-secondary)',
            boxShadow: catF===cat ? '0 3px 10px rgba(255,87,51,0.28)' : 'var(--shadow-xs)',
            transition:'all 0.15s'
          }}>{cat}</button>
        ))}
        <div style={{ flexShrink:0, width:4 }}/>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 20px 24px', display:'flex', flexDirection:'column', gap:10 }}>
        {tab==='events'
          ? filteredMeetups.map(m => <MeetupCard key={m.id} m={m} joined={joinedMeetups.has(m.id)} onJoin={onJoinMeetup} onClick={()=>onDetail('meetup', m.id)}/>)
          : filteredGroups.map(g => <GroupCard key={g.id} g={g} joined={joinedGroups.has(g.id)} onJoin={onJoinGroup} onClick={()=>onDetail('group', g.id)}/>)
        }
      </div>
    </div>
  );
}

// ── Chat list + room ───────────────────────────────────────────────────

function ChatListRow({ item, onClick }) {
  const isGroup = item.type === 'group';
  const c = isGroup ? (CAT[item.category] || CAT.Gaming) : null;
  const initials = isGroup ? item.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '';
  return (
    <div onClick={onClick} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 8px',
      borderRadius:14, cursor:'pointer', background: item.unread ? 'var(--coral-50)' : 'transparent',
      transition:'background 0.15s' }}
      onMouseEnter={e=>{if(!item.unread)e.currentTarget.style.background='var(--surface-sunken)';}}
      onMouseLeave={e=>{if(!item.unread)e.currentTarget.style.background='transparent';}}>
      {isGroup
        ? <div style={{ width:46, height:46, borderRadius:14, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontSize:13, fontWeight:800, color:c.color }}>{initials}</span>
          </div>
        : <div style={{ position:'relative', flexShrink:0 }}>
            <div style={{ width:46, height:46, borderRadius:'50%', background:item.grad }}/>
            {item.active==='Active now' && <div style={{ position:'absolute', bottom:1, right:1, width:12, height:12, borderRadius:'50%', background:'var(--sage-400)', border:'2px solid var(--surface-base)'}}/>}
          </div>
      }
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:2 }}>
          <span style={{ fontSize:15, fontWeight: item.unread ? 700 : 600, color:'var(--text-primary)' }}>{item.name}</span>
          {item.active && <span style={{ fontSize:11, color:'var(--text-tertiary)', flexShrink:0 }}>{item.active}</span>}
          {isGroup && <span style={{ fontSize:11, color:'var(--text-tertiary)', flexShrink:0 }}>{item.members} members</span>}
        </div>
        <p style={{ fontSize:13, color: item.unread ? 'var(--text-secondary)' : 'var(--text-tertiary)', margin:0,
          overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{item.lastMsg}</p>
      </div>
      {item.unread > 0 && <div style={{ width:20, height:20, borderRadius:'50%', background:'var(--coral-500)', color:'#fff', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.unread}</div>}
    </div>
  );
}

function ChatRoomV2({ chatKey, groupMessages, dmMessages, dmConns, onBack, onSend }) {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const isGroup = chatKey.startsWith('group-');
  const id = parseInt(chatKey.split('-')[1]);
  const groupData = isGroup ? GROUPS.find(g=>g.id===id) : null;
  const dmData    = !isGroup ? dmConns.find(c=>c.id===id) : null;
  const msgs = isGroup ? (groupMessages[id]||[]) : (dmMessages[id]||[]);

  const name = isGroup ? groupData?.name : dmData?.name;
  const active = !isGroup && dmData?.active;
  const c = isGroup ? (CAT[groupData?.category] || CAT.Gaming) : null;
  const initials = isGroup ? (groupData?.name||'').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '';

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [msgs, chatKey]);

  const send = () => {
    if (!input.trim()) return;
    onSend(chatKey, input.trim());
    setInput('');
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'10px 16px', display:'flex', alignItems:'center', gap:10,
        borderBottom:'1px solid var(--border-subtle)', flexShrink:0, background:'var(--surface-raised)' }}>
        <button onClick={onBack} style={iBtn}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
        {isGroup
          ? <div style={{ width:38, height:38, borderRadius:12, background:c?.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ fontSize:12, fontWeight:800, color:c?.color }}>{initials}</span>
            </div>
          : <div style={{ width:38, height:38, borderRadius:'50%', background:dmData?.grad, flexShrink:0 }}/>
        }
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)', lineHeight:1.2 }}>{name}</div>
          <div style={{ fontSize:11, fontWeight:600, color: active==='Active now' ? 'var(--sage-400)' : 'var(--text-tertiary)' }}>
            {isGroup ? `${groupData?.members} members` : active==='Active now' ? '● Active now' : active}
          </div>
        </div>
      </div>
      {/* Messages */}
      <div ref={scrollRef} style={{ flex:1, overflowY:'auto', padding:'14px 16px 8px',
        display:'flex', flexDirection:'column', gap:7, background:'var(--surface-base)' }}>
        {msgs.map((msg, i) => {
          const mine = isGroup ? msg.mine : msg.from==='me';
          return (
            <div key={i} style={{ display:'flex', justifyContent: mine ? 'flex-end' : 'flex-start', gap:7, alignItems:'flex-end' }}>
              {isGroup && !mine && <div style={{ width:26, height:26, borderRadius:'50%', background:msg.g, flexShrink:0, marginBottom:2 }}/>}
              <div style={{ maxWidth:'76%' }}>
                {isGroup && !mine && <div style={{ fontSize:11, fontWeight:600, color:'var(--text-tertiary)', marginBottom:2 }}>{msg.from}</div>}
                <div style={{
                  padding:'9px 13px',
                  borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: mine ? 'var(--coral-500)' : 'var(--surface-raised)',
                  color: mine ? '#fff' : 'var(--text-primary)',
                  fontSize:14, lineHeight:1.45,
                  boxShadow: mine ? '0 2px 8px rgba(255,87,51,0.20)' : 'var(--shadow-xs)'
                }}>
                  {msg.text}
                  <div style={{ fontSize:10, opacity:0.6, marginTop:3, textAlign: mine ? 'right' : 'left' }}>{msg.time}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Input */}
      <div style={{ padding:'10px 16px 16px', display:'flex', gap:10, alignItems:'center',
        borderTop:'1px solid var(--border-subtle)', background:'var(--surface-raised)', flexShrink:0 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
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

function ChatScreenV2({ activeChatId, setActiveChatId, joinedGroups, groupMessages, dmMessages, dmConns, onSend }) {
  if (activeChatId) {
    return <ChatRoomV2 chatKey={activeChatId} groupMessages={groupMessages} dmMessages={dmMessages}
      dmConns={dmConns} onBack={()=>setActiveChatId(null)} onSend={onSend}/>;
  }

  const groupChats = GROUPS.filter(g=>joinedGroups.has(g.id)).map(g => ({
    type:'group', id:g.id, name:g.name, members:g.members, category:g.category,
    lastMsg:(GROUP_MSGS[g.id]||[]).slice(-1)[0]?.text || 'No messages yet', unread:0
  }));

  const dmList = dmConns.map(c => ({
    type:'dm', id:c.id, name:c.name, grad:c.grad, active:c.active, unread:c.unread, lastMsg:c.lastMsg
  }));

  const totalUnread = dmConns.reduce((s,c) => s+c.unread, 0);

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 20px 8px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <h2 style={{ fontSize:22, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px' }}>Messages</h2>
        {totalUnread > 0 && <span style={{ padding:'3px 10px', borderRadius:99, fontSize:12, fontWeight:700,
          background:'var(--coral-50)', color:'var(--coral-600)', border:'1px solid var(--coral-200)' }}>{totalUnread} new</span>}
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'4px 16px 16px' }}>
        {groupChats.length > 0 && (
          <div style={{ marginBottom:8 }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', padding:'6px 8px 8px' }}>Group chats</p>
            {groupChats.map(item => <ChatListRow key={`g${item.id}`} item={item} onClick={()=>setActiveChatId(`group-${item.id}`)}/>)}
          </div>
        )}
        {groupChats.length === 0 && (
          <div style={{ padding:'16px 8px 20px', borderBottom:'1px solid var(--border-subtle)', marginBottom:8 }}>
            <p style={{ fontSize:13, color:'var(--text-tertiary)', textAlign:'center' }}>
              Join a group to get a group chat
            </p>
          </div>
        )}
        <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', padding:'6px 8px 8px' }}>Direct messages</p>
        {dmList.map(item => <ChatListRow key={`d${item.id}`} item={item} onClick={()=>setActiveChatId(`dm-${item.id}`)}/>)}
      </div>
    </div>
  );
}

// ── Profile screen v2 ──────────────────────────────────────────────────

function ProfileScreenV2({ profile, joinedGroups }) {
  const [interests, setInterests] = useState([...profile.interests]);
  const [notifs, setNotifs] = useState(true);
  const [loc,    setLoc]    = useState(true);
  const [avail,  setAvail]  = useState(true);

  const myGroups = GROUPS.filter(g => joinedGroups.has(g.id));

  const Toggle = ({ val, set }) => (
    <div onClick={()=>set(!val)} style={{ width:46, height:27, borderRadius:14,
      background: val ? 'var(--coral-500)' : 'var(--neutral-300)', cursor:'pointer',
      position:'relative', transition:'background 0.22s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3.5, left: val ? 22 : 3.5, width:20, height:20, borderRadius:'50%',
        background:'#fff', boxShadow:'var(--shadow-sm)', transition:'left 0.22s cubic-bezier(0.34,1.56,0.64,1)'}}/>
    </div>
  );

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <div style={{ position:'relative', height:200, background:profile.gradient, flexShrink:0 }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,18,38,0.5) 0%,transparent 60%)' }}/>
        <button style={{ position:'absolute', top:14, right:16, background:'rgba(255,255,255,0.18)',
          backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.28)',
          borderRadius:99, padding:'6px 16px', color:'#fff', fontSize:13, fontWeight:600,
          cursor:'pointer', fontFamily:'var(--font-sans)' }}>Edit profile</button>
        <div style={{ position:'absolute', bottom:16, left:20 }}>
          <div style={{ fontSize:26, fontWeight:800, color:'#fff', letterSpacing:'-0.5px', marginBottom:3 }}>{profile.name}, {profile.age}</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.72)' }}>{profile.city}</div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display:'flex', background:'var(--surface-raised)', borderBottom:'8px solid var(--surface-base)' }}>
        {[{n:profile.stats.connections,l:'friends'},{n:profile.stats.groups,l:'groups'},{n:profile.stats.meetups,l:'meetups'}].map((s,i,arr) => (
          <div key={s.l} style={{ flex:1, textAlign:'center', padding:'14px 0', borderRight: i<arr.length-1 ? '1px solid var(--border-subtle)' : 'none' }}>
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
      <div style={{ height:8, background:'var(--surface-base)' }}/>
      {/* Interests */}
      <div style={{ padding:'14px 20px', background:'var(--surface-raised)' }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', marginBottom:10 }}>Interests</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
          {interests.map(tag => (
            <span key={tag} onClick={()=>setInterests(p=>p.filter(t=>t!==tag))} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:99, background:'var(--coral-50)', color:'var(--coral-600)', border:'1.5px solid var(--coral-200)', fontSize:13, fontWeight:600, cursor:'pointer' }}>
              {tag} <span style={{ opacity:0.5, fontSize:16, lineHeight:1 }}>×</span>
            </span>
          ))}
          <span style={{ display:'inline-flex', alignItems:'center', padding:'6px 12px', borderRadius:99, border:'1.5px dashed var(--border-default)', fontSize:13, color:'var(--text-tertiary)', cursor:'pointer' }}>+ Add</span>
        </div>
      </div>
      <div style={{ height:8, background:'var(--surface-base)' }}/>
      {/* My groups */}
      {myGroups.length > 0 && (
        <div style={{ padding:'14px 20px', background:'var(--surface-raised)' }}>
          <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', marginBottom:12 }}>My groups</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {myGroups.map(g => {
              const c = CAT[g.category] || CAT.Gaming;
              return (
                <div key={g.id} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontSize:11, fontWeight:800, color:c.color }}>{g.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</span>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{g.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-tertiary)' }}>{g.members} members · Next: {g.nextMeetup}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ height:8, background:'var(--surface-base)' }}/>
      {/* Settings */}
      <div style={{ padding:'14px 20px', background:'var(--surface-raised)' }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-tertiary)', marginBottom:14 }}>Settings</div>
        {[{label:'Push notifications',sub:'New messages and meetup reminders',val:notifs,set:setNotifs},{label:'Share location',sub:'Show distance on your profile',val:loc,set:setLoc},{label:'Available to hang',sub:"Let people know you're free",val:avail,set:setAvail}].map((row,i,arr) => (
          <React.Fragment key={row.label}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div><div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:1 }}>{row.label}</div><div style={{ fontSize:12, color:'var(--text-tertiary)' }}>{row.sub}</div></div>
              <Toggle val={row.val} set={row.set}/>
            </div>
            {i<arr.length-1 && <div style={{ height:1, background:'var(--border-subtle)', margin:'14px 0' }}/>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ height:32 }}/>
    </div>
  );
}

// ── Detail view: Meetup ────────────────────────────────────────────────

function MeetupDetailV2({ meetupId, joinedMeetups, onJoin, onClose }) {
  const m = MEETUPS.find(x => x.id === meetupId);
  if (!m) return null;
  const c = CAT[m.category] || CAT.Food;
  const joined = joinedMeetups.has(m.id);
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ height:130, background:`linear-gradient(140deg, ${c.pill}50, ${c.pill}28)`, position:'relative', flexShrink:0 }}>
        <button onClick={onClose} style={{ position:'absolute', top:12, left:12, width:34, height:34, borderRadius:'50%',
          background:'rgba(255,255,255,0.88)', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ position:'absolute', bottom:14, left:18, right:18 }}>
          <CatPill cat={m.category} />
          <h2 style={{ fontSize:22, fontWeight:800, color:c.color, letterSpacing:'-0.3px', lineHeight:1.2, marginTop:6 }}>{m.title}</h2>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'18px 20px 24px' }}>
        <div style={{ display:'flex', gap:20, marginBottom:18, flexWrap:'wrap' }}>
          {[{icon:'📅',val:m.date},{icon:'📍',val:m.location},{icon:'👤',val:`Hosted by ${m.host}`}].map(row => (
            <div key={row.val} style={{ fontSize:13, color:'var(--text-secondary)' }}>{row.icon} {row.val}</div>
          ))}
        </div>
        <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.65, marginBottom:20 }}>{m.desc}</p>
        <div style={{ marginBottom:20 }}>
          <p style={{ fontSize:13, fontWeight:600, color:'var(--text-tertiary)', marginBottom:10 }}>
            {m.going.length} going{m.cap ? ` · ${m.cap - m.going.length} spots left` : ''}
          </p>
          <div style={{ display:'flex', gap:8 }}>
            {m.going.map((p,i) => <div key={i} style={{ width:40, height:40, borderRadius:'50%', background:p.g }}/>)}
          </div>
        </div>
        <button onClick={()=>onJoin(m.id)} style={{
          width:'100%', height:52, borderRadius:99, fontSize:16, fontWeight:700, border:'none',
          cursor:'pointer', fontFamily:'var(--font-sans)',
          background: joined ? 'var(--sage-50)' : 'var(--coral-500)',
          color: joined ? 'var(--sage-500)' : '#fff',
          boxShadow: joined ? 'none' : '0 6px 20px rgba(255,87,51,0.35)'
        }}>{joined ? '✓ You\'re going!' : "I'm in — RSVP"}</button>
      </div>
    </div>
  );
}

// ── Detail view: Group ─────────────────────────────────────────────────

function GroupDetailV2({ groupId, joinedGroups, onJoin, onClose }) {
  const g = GROUPS.find(x => x.id === groupId);
  if (!g) return null;
  const c = CAT[g.category] || CAT.Gaming;
  const joined = joinedGroups.has(g.id);
  const initials = g.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--border-subtle)', flexShrink:0 }}>
        <button onClick={onClose} style={iBtn}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
        <div style={{ width:40, height:40, borderRadius:12, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontSize:13, fontWeight:800, color:c.color }}>{initials}</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)' }}>{g.name}</div>
          <div style={{ fontSize:12, color:'var(--text-tertiary)' }}>{g.members} members</div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'18px 20px 24px' }}>
        {g.lfg && (
          <div style={{ padding:'10px 14px', borderRadius:12, background:'var(--coral-50)', border:'1px solid var(--coral-100)', marginBottom:16 }}>
            <p style={{ fontSize:13, fontWeight:700, color:'var(--coral-600)', marginBottom:2 }}>Looking for {g.need} more</p>
            <p style={{ fontSize:12, color:'var(--coral-500)', margin:0 }}>This group is actively recruiting</p>
          </div>
        )}
        <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.65, marginBottom:18 }}>{g.desc}</p>
        <div style={{ display:'flex', gap:16, marginBottom:18, flexWrap:'wrap' }}>
          {[{label:'Members',val:g.members},{label:'Activity',val:g.activity},{label:'Next meetup',val:g.nextMeetup}].map(row => (
            <div key={row.label}><div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--text-tertiary)', marginBottom:3 }}>{row.label}</div><div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{row.val}</div></div>
          ))}
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--text-tertiary)', marginBottom:8 }}>Interests</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {g.interests.map(t => <span key={t} style={{ padding:'4px 10px', borderRadius:99, fontSize:12, fontWeight:500, background:c.bg, color:c.color }}>{t}</span>)}
          </div>
        </div>
        <div style={{ padding:'12px 14px', borderRadius:12, background:'var(--surface-sunken)', marginBottom:20 }}>
          <p style={{ fontSize:11, fontWeight:600, color:'var(--text-tertiary)', marginBottom:4 }}>Recent activity</p>
          <p style={{ fontSize:14, color:'var(--text-secondary)', margin:0, fontStyle:'italic' }}>"{g.lastMsg}"</p>
        </div>
        <button onClick={()=>onJoin(g.id)} style={{
          width:'100%', height:52, borderRadius:99, fontSize:16, fontWeight:700, border:'none',
          cursor:'pointer', fontFamily:'var(--font-sans)',
          background: joined ? 'var(--surface-sunken)' : 'var(--coral-500)',
          color: joined ? 'var(--text-secondary)' : '#fff',
          boxShadow: joined ? 'none' : '0 6px 20px rgba(255,87,51,0.35)'
        }}>{joined ? '✓ Member — open chat' : 'Join this group'}</button>
      </div>
    </div>
  );
}

// ── Exports ────────────────────────────────────────────────────────────
Object.assign(window, {
  HomeScreenV2, MeetScreenV2, ChatScreenV2, ChatRoomV2,
  ProfileScreenV2, MeetupDetailV2, GroupDetailV2,
  CatPill, SectionHead,
});
