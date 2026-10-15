// Resolve saved lighting before the first paint; Auto uses the browser's local clock.
(()=>{
  const key='busted-mood';
  const phases=['night','night','night','night','night','dawn','dawn','morning','morning','morning','morning','morning','noon','noon','noon','noon','afternoon','afternoon','afternoon','evening','evening','evening','night','night'];
  let stored=null;
  try{stored=localStorage.getItem(key);}catch{}
  // Migrate an existing tab's preview when no persistent preference exists.
  if(stored===null)try{stored=sessionStorage.getItem(key);}catch{}
  const saved=stored==='deep-night'?'night':stored==='dusk'?'evening':stored;
  const mode=saved==='auto'||phases.includes(saved)?saved:'auto';
  if(stored!==null)try{localStorage.setItem(key,mode);sessionStorage.removeItem(key);}catch{}
  document.documentElement.dataset.lightingMode=mode;
  document.documentElement.dataset.phase=mode==='auto'?phases[new Date().getHours()]:mode;
})();
