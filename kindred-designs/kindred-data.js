'use strict';

window.KD = (function () {

  const PROFILES = [
    { id:1, name:'Alex Kim',     age:28, city:'Brooklyn, NY',  distance:'0.8 mi', mutual:4,
      gradient:'linear-gradient(155deg,#FF9278,#FF5733,#7A1806)',
      bio:"Always down for a new hiking trail or a really good pour-over. I know every specialty coffee shop in a 3-mile radius.",
      interests:['Hiking','Coffee','Indie films','Photography'] },
    { id:2, name:'Sam Rivera',   age:31, city:'Williamsburg',  distance:'1.2 mi', mutual:6,
      gradient:'linear-gradient(155deg,#A8CCF5,#3B5790,#0A1020)',
      bio:"Musician, home cook, occasional 5am runner. Looking for someone to hit up the farmers market with.",
      interests:['Guitar','Cooking','Running','Farmers markets'] },
    { id:3, name:'Jordan Lee',   age:26, city:'Park Slope',    distance:'2.1 mi', mutual:3,
      gradient:'linear-gradient(155deg,#88D4AB,#22A063,#0E4A2E)',
      bio:"Rock climber by weekend, designer by week. Will absolutely convince you to host a game night.",
      interests:['Bouldering','Board games','Yoga','Design'] },
    { id:4, name:'Casey Morgan', age:29, city:'Bushwick',      distance:'0.5 mi', mutual:2,
      gradient:'linear-gradient(155deg,#C4B0F5,#5B2FD4,#2A1260)',
      bio:"Video game dev by day, competitive Scrabble player by night. My cat is named after a Miyazaki character.",
      interests:['Gaming','Sci-fi','Anime','Cooking'] },
    { id:5, name:'Morgan Chen',  age:33, city:'DUMBO',         distance:'1.8 mi', mutual:5,
      gradient:'linear-gradient(155deg,#FFD4A0,#F0A800,#523800)',
      bio:"Architect who loves jazz, long walks across bridges, and finding the best noodles in every neighbourhood.",
      interests:['Jazz','Architecture','Travel','Food'] },
    { id:6, name:'Riley Park',   age:27, city:'Astoria',       distance:'3.2 mi', mutual:3,
      gradient:'linear-gradient(155deg,#FFB3C6,#E8274A,#6B0020)',
      bio:"Elementary school teacher who spends summers at camp. Into true crime podcasts and terrible reality TV.",
      interests:['Podcasts','Reality TV','Teaching','Volunteering'] },
  ];

  const CONNECTIONS = [
    { id:1, name:'Sam Rivera',   city:'Williamsburg', mutual:6, gradient:'linear-gradient(155deg,#A8CCF5,#3B5790)', active:'Active now', unread:2, lastMsg:"That sounds perfect. Sunday it is 🙌" },
    { id:2, name:'Jordan Lee',   city:'Park Slope',   mutual:3, gradient:'linear-gradient(155deg,#88D4AB,#22A063)', active:'1h ago',     unread:0, lastMsg:'I love good light' },
    { id:3, name:'Morgan Chen',  city:'DUMBO',        mutual:5, gradient:'linear-gradient(155deg,#FFD4A0,#F0A800)', active:'Yesterday',  unread:0, lastMsg:'The jazz bar was amazing!' },
    { id:4, name:'Casey Morgan', city:'Bushwick',     mutual:2, gradient:'linear-gradient(155deg,#C4B0F5,#5B2FD4)', active:'2 days ago', unread:1, lastMsg:'Want to try that new ramen spot?' },
  ];

  const REQUESTS = [
    { id:5, name:'Alex Kim',  city:'Brooklyn', mutual:4, gradient:'linear-gradient(155deg,#FF9278,#FF5733)', time:'2h ago',    note:"Hey! Saw you're into specialty coffee too 👋" },
    { id:6, name:'Riley Park', city:'Astoria', mutual:3, gradient:'linear-gradient(155deg,#FFB3C6,#E8274A)', time:'Yesterday', note:'We have so many interests in common!' },
  ];

  const MESSAGES = {
    1: [
      { from:'them', text:"Hey! I saw you're into specialty coffee too — have you been to Onyx in Bushwick?", time:'10:12 AM' },
      { from:'me',   text:'Yes!! Their single origin stuff is amazing. I go like every Saturday morning', time:'10:14 AM' },
      { from:'them', text:'Same. We should grab one sometime 😄', time:'10:15 AM' },
      { from:'me',   text:"Absolutely — I'm usually free Sunday mornings too if you want company on the farmers market run", time:'10:17 AM' },
      { from:'them', text:'That sounds perfect. Sunday it is 🙌', time:'10:18 AM' },
    ],
    2: [
      { from:'them', text:'Hey! Loved your photography work on your profile', time:'Yesterday' },
      { from:'me',   text:'Thank you! Are you into photography too?', time:'Yesterday' },
      { from:'them', text:'More of a subject than a photographer haha. But I love good light', time:'Yesterday' },
    ],
    3: [
      { from:'me',   text:'That jazz bar you recommended was incredible', time:'Monday' },
      { from:'them', text:"Right?! I knew you'd love it. The quartet on Thursdays is even better", time:'Monday' },
      { from:'me',   text:'The jazz bar was amazing!', time:'Monday' },
    ],
    4: [
      { from:'them', text:'Want to try that new ramen spot?', time:'2 days ago' },
    ],
  };

  const INTEREST_CATS = {
    outdoors: { label:'Outdoors',      color:'#22A063', items:['Hiking','Cycling','Rock climbing','Camping','Running','Swimming','Skiing','Surfing'] },
    food:     { label:'Food & Drink',  color:'#A37100', items:['Coffee','Cooking','Farmers markets','Wine','Baking','Food tours','Ramen','Brunch'] },
    arts:     { label:'Arts & Culture',color:'#C22D0C', items:['Indie films','Photography','Museums','Theater','Literature','Painting','Architecture','Poetry'] },
    music:    { label:'Music',         color:'#5B2FD4', items:['Live music','Guitar','Piano','Jazz','Electronic','Vinyl','Karaoke','Concerts'] },
    gaming:   { label:'Gaming',        color:'#2A3F74', items:['Board games','Video games','D&D','Trivia','Chess','Puzzles','Anime','Sci-fi'] },
    wellness: { label:'Wellness',      color:'#178050', items:['Yoga','Meditation','Pilates','Journaling','Nature walks','Fitness','Breathwork','Tai chi'] },
    social:   { label:'Social',        color:'#E83D1A', items:['Volunteering','Dancing','Travel','Language learning','Trivia nights','Book clubs','Dog parks','Debate'] },
  };

  const MY_PROFILE = {
    name:'Jamie', age:28, city:'Brooklyn, NY',
    bio:"Always down for a new hiking trail or a really good pour-over. I know every specialty coffee shop in a 3-mile radius.",
    gradient:'linear-gradient(155deg,#FF9278,#FF5733,#7A1806)',
    interests:['Coffee','Hiking','Photography','Cooking','Indie films'],
    stats:{ connections:4, wavesSent:12, profileViews:89 },
  };

  return { PROFILES, CONNECTIONS, REQUESTS, MESSAGES, INTEREST_CATS, MY_PROFILE };
})();
