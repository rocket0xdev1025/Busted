import {initStarfield} from './stars.js';
import {initGamedayCountdown} from './gameday.js?v=20261012-gameday';
import {initMovementCTAs} from './movement.js?v=20261012-telegram';
import {QUOTE_POOLS} from './quotes.js';
const CONTRACT='0xd5D49D68a555f3C50cCDa9BD9a8691692E5ce172';
const moods=[
  {id:'dawn',name:'Dawn',from:5,to:7,color:'#ffbc93',icon:'horizon'},
  {id:'morning',name:'Morning',from:7,to:12,color:'#ffe4a5',icon:'sun'},
  {id:'noon',name:'Noon',from:12,to:16,color:'#93dfff',icon:'sun'},
  {id:'afternoon',name:'Afternoon',from:16,to:19,color:'#ffb45c',icon:'sun'},
  {id:'evening',name:'Evening',from:19,to:22,color:'#d497ff',icon:'horizon'},
  {id:'night',name:'Night',from:22,to:5,color:'#b89aff',icon:'moon'}
];
const root=document.documentElement;
const updateGamedayCountdown=initGamedayCountdown();
let manualMood=moods.some(m=>m.id===root.dataset.lightingMode)?root.dataset.lightingMode:null;
let preferenceSaved=true;
const clock=document.querySelector('#local-time');
const dialog=document.querySelector('#vibe-dialog');
const phaseForHour=hour=>moods.find(m=>m.from<m.to?hour>=m.from&&hour<m.to:hour>=m.from||hour<m.to);

for(const group of document.querySelectorAll('.mood-options')){
  for(const mood of [{id:'auto',name:'Auto',color:'var(--pink)',icon:'clock'},...moods]){
    const button=document.createElement('button');
    button.className='mood-button';button.dataset.mood=mood.id;button.type='button';
    button.setAttribute('aria-label',mood.id==='auto'?"Use automatic lighting from your browser's local time":`Keep ${mood.name.toLowerCase()} lighting`);button.setAttribute('aria-pressed','false');
    button.innerHTML=`<span class="mood-orb ${mood.icon}" style="--orb-color:${mood.color}" aria-hidden="true">${mood.icon==='moon'?'':`<svg><use href="#${mood.icon==='clock'?'clock':'sun'}"/></svg>`}</span><span>${mood.name}</span>`;
    button.addEventListener('click',()=>setMode(mood.id));group.append(button);
  }
}

function setMode(id){
  manualMood=id==='auto'?null:id;
  try{localStorage.setItem('busted-mood',manualMood||'auto');preferenceSaved=true;}catch{preferenceSaved=false;}
  try{sessionStorage.removeItem('busted-mood');}catch{}
  updateTime();
}
function updateTime(){
  const now=new Date();const mood=moods.find(m=>m.id===manualMood)||phaseForHour(now.getHours());
  root.dataset.phase=mood.id;root.dataset.lightingMode=manualMood||'auto';
  clock.textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  clock.dateTime=now.toISOString();
  const modeLabel=manualMood?(preferenceSaved?'saved':'selected'):'auto';
  document.querySelector('#phase-label').textContent=`${mood.name} / ${modeLabel}`;
  document.querySelector('#vibe-label').textContent=manualMood?mood.name:`Auto / ${mood.name}`;
  const status=document.querySelector('#lighting-status');
  const message=manualMood
    ?(preferenceSaved?`${mood.name} saved for your next visit. Choose Auto to follow your browser's local time.`:`${mood.name} selected for this visit.`)
    :(preferenceSaved?"Auto changes the lighting with your browser's local time.":"Auto follows your browser's local time for this visit.");
  if(status.textContent!==message)status.textContent=message;
  for(const button of document.querySelectorAll('[data-mood]'))button.setAttribute('aria-pressed',String(button.dataset.mood===(manualMood||'auto')));
  updateGamedayCountdown(now);
}
document.querySelector('#vibe-open').addEventListener('click',()=>dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
document.querySelector('#year').textContent=new Date().getFullYear();
updateTime();setInterval(updateTime,1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateTime();});
window.addEventListener('storage',event=>{
  if(event.key!=='busted-mood'&&event.key!==null)return;
  const saved=event.newValue==='deep-night'?'night':event.newValue==='dusk'?'evening':event.newValue;
  manualMood=moods.some(m=>m.id===saved)?saved:null;preferenceSaved=true;
  updateTime();
});

const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');navigation.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');navigation.classList.toggle('open',open);});
for(const link of navigation.querySelectorAll('a'))link.addEventListener('click',closeMenu);
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});

let toastTimer;
function showToast(message){const toast=document.querySelector('.toast');toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3000);}
async function copyContract(){
  try{
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(CONTRACT);
    else{
      const field=document.createElement('textarea');field.value=CONTRACT;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();
      const copied=document.execCommand('copy');field.remove();if(!copied)throw new Error('Copy unavailable');
    }
    showToast('Contract copied. You know the drill.');
  }catch{showToast('Copy unavailable — select the contract address below.');const text=document.querySelector('.full-copy span');const range=document.createRange();range.selectNodeContents(text);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);text.scrollIntoView({block:'center',behavior:'smooth'});}
}
for(const button of document.querySelectorAll('.copy-address'))button.addEventListener('click',copyContract);

// Keep one milestone group open, including browsers without native details grouping.
const rewardStages=[...document.querySelectorAll('.reward-stage')];
for(const stage of rewardStages)stage.addEventListener('toggle',()=>{
  if(stage.open)for(const other of rewardStages)if(other!==stage)other.open=false;
});

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches&&'IntersectionObserver' in window){
  root.classList.add('js-motion');
  const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}},{threshold:.08});
  document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));
}
const shortcut=document.querySelector('.vibe-shortcut');
if('IntersectionObserver' in window){let heroVisible=true,lightingVisible=false;shortcut.classList.add('is-hidden');const shortcutObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target.classList.contains('hero'))heroVisible=entry.isIntersecting;else lightingVisible=entry.isIntersecting;}shortcut.classList.toggle('is-hidden',heroVisible||lightingVisible);},{threshold:0});shortcutObserver.observe(document.querySelector('.hero'));shortcutObserver.observe(document.querySelector('.lighting'));}
const scene=document.querySelector('.hero-scene');
if(matchMedia('(pointer: fine)').matches&&!reducedMotion.matches){
  let nextX=0,nextY=0,pending=false;
  document.querySelector('.hero').addEventListener('pointermove',event=>{nextX=(event.clientX/innerWidth-.5)*-12;nextY=(event.clientY/innerHeight-.5)*-8;if(!pending){pending=true;requestAnimationFrame(()=>{scene.style.setProperty('--mx',`${nextX}px`);scene.style.setProperty('--my',`${nextY}px`);pending=false;});}});
  document.querySelector('.hero').addEventListener('pointerleave',()=>{scene.style.setProperty('--mx','0px');scene.style.setProperty('--my','0px');});
}

// Three independent shuffle bags keep every rotation varied and attributed.
const archive=document.querySelector('.quote-archive');
const poolNames=['viceCity','miamiVice','gta'];
const categoryNames=['Vice City / the neon years','Miami Vice / after hours','Across the GTA series'];
const bags={};const previous={};
const quoteRows=[...archive.querySelectorAll('.quote-row')];
let quotesPaused=reducedMotion.matches;
let archiveVisible=false;
function nextQuote(name){
  if(!bags[name]?.length){
    bags[name]=[...QUOTE_POOLS[name]];
    for(let i=bags[name].length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bags[name][i],bags[name][j]]=[bags[name][j],bags[name][i]];}
    if(bags[name].at(-1)===previous[name])bags[name].unshift(bags[name].pop());
  }
  return previous[name]=bags[name].pop();
}
function shuffleQuotes(){
  quoteRows.forEach((row,index)=>{
    const quote=nextQuote(poolNames[index]);
    row.href=quote.url;
    row.querySelector('blockquote').textContent=`“${quote.text}”`;
    const attribution=row.querySelector('p');attribution.replaceChildren(document.createTextNode(`${quote.character} `));
    const game=document.createElement('span');game.textContent=`/ ${quote.game}`;attribution.append(game);
    let category=row.querySelector('.quote-category');
    if(!category){category=document.createElement('span');category.className='quote-category';row.querySelector('div').prepend(category);}
    category.textContent=categoryNames[index];
    row.classList.remove('quote-enter');requestAnimationFrame(()=>row.classList.add('quote-enter'));
  });
}
const pauseQuotes=document.querySelector('#pause-quotes');
function updateQuoteControl(){pauseQuotes.textContent=quotesPaused?'Play':'Pause';pauseQuotes.setAttribute('aria-pressed',String(quotesPaused));pauseQuotes.setAttribute('aria-label',`${quotesPaused?'Resume':'Pause'} automatic quote rotation`);}
pauseQuotes.addEventListener('click',()=>{quotesPaused=!quotesPaused;updateQuoteControl();});
document.querySelector('#shuffle-quotes').addEventListener('click',shuffleQuotes);
document.querySelector('#quote-library-size').textContent=`${Object.values(QUOTE_POOLS).flat().length} lines / on shuffle`;
new IntersectionObserver(entries=>{archiveVisible=entries[0].isIntersecting;},{threshold:.15}).observe(archive);
setInterval(()=>{if(archiveVisible&&!quotesPaused&&!document.hidden&&!archive.matches(':hover')&&!archive.contains(document.activeElement))shuffleQuotes();},20000);
shuffleQuotes();updateQuoteControl();

initMovementCTAs(reducedMotion);

initStarfield();
