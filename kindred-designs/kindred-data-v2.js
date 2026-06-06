'use strict';

window.KDv2 = (function () {

  const CAT = {
    Outdoors: { color:'#178050', bg:'#EEF9F3', pill:'#22A063' },
    Food:     { color:'#8A5C00', bg:'#FFF8EE', pill:'#F0A800' },
    Gaming:   { color:'#2A3F74', bg:'#EEF1F9', pill:'#3B5790' },
    Arts:     { color:'#B02408', bg:'#FFF2EF', pill:'#C22D0C' },
    Music:    { color:'#4B24B8', bg:'#F2EEFF', pill:'#5B2FD4' },
    Coffee:   { color:'#7A5400', bg:'#FFF8EE', pill:'#A37100' },
    Wellness: { color:'#167A4C', bg:'#EDFAF4', pill:'#22A063' },
  };

  const MEETUPS = [
    { id:1, title:'Sunday Farmers Market Walk',   date:'Sun · 9am', location:'Carroll Gardens', category:'Food',
      going:[{g:'linear-gradient(135deg,#A8CCF5,#3B5790)'},{g:'linear-gradient(135deg,#88D4AB,#22A063)'},{g:'linear-gradient(135deg,#FFD4A0,#F0A800)'}],
      cap:8,  host:'Sam Rivera',
      desc:'A slow walk through the market — sampling local produce, chatting with vendors, finding something weird to cook this week.' },
    { id:2, title:'Prospect Park Trail Run',       date:'Sat · 7am', location:'Prospect Park',   category:'Outdoors',
      going:[{g:'linear-gradient(135deg,#88D4AB,#22A063)'},{g:'linear-gradient(135deg,#C4B0F5,#5B2FD4)'}],
      cap:null, host:'Jordan Lee',
      desc:'Easy 4-mile loop through the park. All paces welcome — we run together, not against each other.' },
    { id:3, title:'Board Game Night',              date:'Fri · 7pm', location:'Bushwick',         category:'Gaming',
      going:[{g:'linear-gradient(135deg,#C4B0F5,#5B2FD4)'},{g:'linear-gradient(135deg,#FFD4A0,#F0A800)'},{g:'linear-gradient(135deg,#FF9278,#FF5733)'},{g:'linear-gradient(135deg,#A8CCF5,#3B5790)'}],
      cap:8,  host:'Casey Morgan',
      desc:"Casey's place. Wingspan, Catan, Spirit Island on the table. BYOB, snacks provided, chaos guaranteed." },
    { id:4, title:'Specialty Coffee Crawl',        date:'Sat · 10am', location:'Williamsburg',    category:'Coffee',
      going:[{g:'linear-gradient(135deg,#FF9278,#FF5733)'},{g:'linear-gradient(135deg,#FFD4A0,#F0A800)'}],
      cap:10, host:'Alex Kim',
      desc:'Four of the best third-wave roasters in Williamsburg. Bring your palate, your opinions, and comfortable shoes.' },
    { id:5, title:'Jazz + Late-Night Noodles',     date:'Fri · 9pm', location:'East Village',     category:'Music',
      going:[{g:'linear-gradient(135deg,#FFD4A0,#F0A800)'},{g:'linear-gradient(135deg,#A8CCF5,#3B5790)'}],
      cap:null, host:'Morgan Chen',
      desc:'Live jazz at Nublu, followed by noodles at a place we refuse to reveal in advance. Trust the process.' },
    { id:6, title:'Intro Bouldering Session',      date:'Sun · 2pm', location:'Brooklyn Boulders', category:'Outdoors',
      going:[{g:'linear-gradient(135deg,#88D4AB,#22A063)'},{g:'linear-gradient(135deg,#FF9278,#FF5733)'},{g:'linear-gradient(135deg,#FFB3C6,#E8274A)'}],
      cap:6,  host:'Jordan Lee',
      desc:'No experience needed. Jordan will show you the basics. Harness rental included in the $22 day pass.' },
  ];

  const GROUPS = [
    { id:1, name:'Brooklyn Board Gamers',  members:24, activity:'Active daily',    category:'Gaming',
      interests:['Board games','Strategy','Trivia'],
      desc:'Weekly game nights, casual playthroughs, and the occasional weekend tournament. All games, all levels.',
      nextMeetup:'Fri 7pm', lastMsg:"Who's bringing Wingspan this week?",  lfg:false },
    { id:2, name:'Specialty Coffee Club',  members:18, activity:'Weekly meetups',  category:'Coffee',
      interests:['Coffee','Cafes','Roasting'],
      desc:"Third-wave coffee shops, blind cuppings, home brew sessions, and the occasional field trip to a roastery.",
      nextMeetup:'Sat 10am', lastMsg:'The Ethiopian at Onyx was incredible', lfg:false },
    { id:3, name:'Prospect Park Hikers',   members:41, activity:'Every weekend',   category:'Outdoors',
      interests:['Hiking','Nature','Running'],
      desc:'Weekend hikes from casual park loops to day trips upstate. Dogs welcome, car-pooling arranged.',
      nextMeetup:'Sat 7am',  lastMsg:'Trail conditions are perfect right now', lfg:false },
    { id:4, name:'LFG: Tabletop RPG',      members:9,  activity:'Bi-weekly',       category:'Gaming',
      interests:["D&D",'5e','Storytelling'],
      desc:"Running a homebrew 5e campaign. Looking for 2 committed players who can do bi-weekly Saturdays. New players welcome — we're patient.",
      nextMeetup:'Every other Sat', lastMsg:'Session 4 recap is in the shared doc', lfg:true, need:2 },
    { id:5, name:'Jazz & Vinyl Heads',     members:15, activity:'Monthly events',  category:'Music',
      interests:['Jazz','Vinyl','Live music'],
      desc:'Monthly listening parties and concert outings. Bring a record you love and be ready to defend it.',
      nextMeetup:'Next weekend', lastMsg:'Anyone been to the new spot in Alphabet City?', lfg:false },
    { id:6, name:'Indie Film Club',        members:22, activity:'Bi-weekly',       category:'Arts',
      interests:['Indie films','Cinema','Discussion'],
      desc:'We watch a film together, then dissect it over drinks. No pretension — just genuine love of cinema.',
      nextMeetup:'Sat 7pm',  lastMsg:'Next pick: Aftersun or Past Lives?', lfg:false },
  ];

  const LFG_POSTS = [
    { id:1, name:'Sam Rivera',   grad:'linear-gradient(135deg,#A8CCF5,#3B5790)',
      text:"Anyone up for that new ramen spot in Bushwick this weekend? Heard the tonkotsu is life-changing.",
      when:'This Saturday evening', category:'Food', n:3 },
    { id:2, name:'Casey Morgan', grad:'linear-gradient(135deg,#C4B0F5,#5B2FD4)',
      text:"Need a 4th for Settlers of Catan Friday night. We have snacks, good vibes, and a generous longest-road policy.",
      when:'Friday 7pm', category:'Gaming', n:5 },
    { id:3, name:'Jordan Lee',   grad:'linear-gradient(135deg,#88D4AB,#22A063)',
      text:"Planning a sunrise hike at Breakneck Ridge next Saturday. 2.5h drive, absolutely worth it. Who's in?",
      when:'Next Saturday 5am', category:'Outdoors', n:7 },
    { id:4, name:'Morgan Chen',  grad:'linear-gradient(135deg,#FFD4A0,#F0A800)',
      text:'Looking for someone to check out the Nublu jazz residency on Friday. Going solo feels wrong.',
      when:'Friday 9pm', category:'Music', n:2 },
  ];

  const GROUP_MSGS = {
    1: [
      { from:'Sam R.',    g:'linear-gradient(135deg,#A8CCF5,#3B5790)', text:"Who's bringing Wingspan this week?",                          time:'2h ago',  mine:false },
      { from:'Jordan L.', g:'linear-gradient(135deg,#88D4AB,#22A063)', text:'I can! Also have Spirit Island if we want something heavier', time:'1h ago',  mine:false },
      { from:'You',       g:'linear-gradient(155deg,#FF9278,#FF5733)', text:'Both sound amazing',                                          time:'45m ago', mine:true  },
    ],
    2: [
      { from:'Alex K.',   g:'linear-gradient(135deg,#FF9278,#FF5733)', text:'The Ethiopian at Onyx was incredible last week',             time:'3h ago', mine:false },
      { from:'You',       g:'linear-gradient(155deg,#FF9278,#FF5733)', text:'Right? The florals were so distinct',                        time:'2h ago', mine:true  },
      { from:'Sam R.',    g:'linear-gradient(135deg,#A8CCF5,#3B5790)', text:'Are we going back this Saturday?',                           time:'1h ago', mine:false },
    ],
    3: [
      { from:'Jordan L.', g:'linear-gradient(135deg,#88D4AB,#22A063)', text:'Trail conditions are perfect right now',                    time:'4h ago', mine:false },
      { from:'Morgan C.', g:'linear-gradient(135deg,#FFD4A0,#F0A800)', text:'Saw a deer near the ravine trail yesterday',               time:'3h ago', mine:false },
      { from:'You',       g:'linear-gradient(155deg,#FF9278,#FF5733)', text:"Can't wait for Saturday",                                   time:'1h ago', mine:true  },
    ],
  };

  const DM_CONNS = [
    { id:10, name:'Sam Rivera',  grad:'linear-gradient(135deg,#A8CCF5,#3B5790)', active:'Active now', unread:2, lastMsg:"Sunday it is 🙌" },
    { id:11, name:'Jordan Lee',  grad:'linear-gradient(135deg,#88D4AB,#22A063)', active:'1h ago',     unread:0, lastMsg:'I love good light' },
    { id:12, name:'Morgan Chen', grad:'linear-gradient(135deg,#FFD4A0,#F0A800)', active:'Yesterday',  unread:0, lastMsg:'The jazz bar was amazing!' },
  ];

  const DM_MSGS = {
    10: [
      { from:'them', text:"Hey! Saw you're into specialty coffee — been to Onyx in Bushwick?", time:'10:12 AM' },
      { from:'me',   text:'Yes!! Their single origin stuff is incredible',                    time:'10:14 AM' },
      { from:'them', text:'We should grab one sometime 😄',                                   time:'10:15 AM' },
      { from:'me',   text:"I'm usually free Sunday mornings if you want company",            time:'10:17 AM' },
      { from:'them', text:'Sunday it is 🙌',                                                  time:'10:18 AM' },
    ],
    11: [
      { from:'them', text:'Loved your photography on your profile',    time:'Yesterday' },
      { from:'me',   text:'Thank you! Are you into photography too?',  time:'Yesterday' },
      { from:'them', text:'More subject than photographer haha',       time:'Yesterday' },
    ],
    12: [
      { from:'me',   text:'That jazz bar was incredible',             time:'Monday' },
      { from:'them', text:"Right?! Quartet on Thursdays is even better", time:'Monday' },
    ],
  };

  const MY_PROFILE = {
    name:'Jamie', age:28, city:'Brooklyn, NY',
    bio:"Always down for a new hiking trail or a really good pour-over. I know every specialty coffee shop in a 3-mile radius.",
    gradient:'linear-gradient(155deg,#FF9278,#FF5733,#7A1806)',
    interests:['Coffee','Hiking','Photography','Cooking','Indie films'],
    stats:{ connections:4, groups:3, meetups:12 },
  };

  return { CAT, MEETUPS, GROUPS, LFG_POSTS, GROUP_MSGS, DM_CONNS, DM_MSGS, MY_PROFILE };
})();
