// Original campaign copy, separate from the attributed game quote archive.
export const MOVEMENT_CTAS = [
  'Get $BUSTED. Own the night.',
  'Join the crew. Get $BUSTED.',
  'Get $BUSTED. Hit the streets.',
  'Get $BUSTED. Make your move.',
  'Get $BUSTED. Ride with us.',
  'Get $BUSTED. Live the vice.',
  'Get $BUSTED. Find your crew.',
  'Get $BUSTED. Light it up.',
  'Get $BUSTED. Start the story.',
  'Get $BUSTED. Run with legends.',
  'Get $BUSTED. Chase the neon.',
  'Get $BUSTED. Bring the chaos.',
  'Get $BUSTED. Enter the city.',
  'Get $BUSTED. Take the wheel.',
  'Get $BUSTED. Choose your crew.',
  'Get $BUSTED. Answer the call.',
  'Get $BUSTED. Keep vice alive.',
  'Get $BUSTED. Roll with outlaws.',
  'Get $BUSTED. Leave your mark.',
  'Get $BUSTED. Live the culture.',
  'Get $BUSTED. Join the story.',
  'Get $BUSTED. Feel the neon.',
  'Get $BUSTED. Make some noise.',
  'Get $BUSTED. Meet your people.',
  'Get $BUSTED. Keep it moving.',
  'Get $BUSTED. Fuel the movement.',
  'Get $BUSTED. Come for the crew.',
  'Get $BUSTED. Stay for the vice.',
  'Get $BUSTED. This is your city.',
  'Get $BUSTED. The crew awaits.'
];

export function initMovementCTAs(reducedMotion) {
  const labels = [...document.querySelectorAll('[data-movement-cta]')];
  const links = [...document.querySelectorAll('.movement-link, .movement-callout a')];
  let bag = [];
  let previous;
  function rotate() {
    if (!bag.length) {
      bag = [...MOVEMENT_CTAS];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag.at(-1) === previous) bag.unshift(bag.pop());
    }
    previous = bag.pop();
    labels.forEach(label => { label.textContent = previous; });
  }
  rotate();
  setInterval(() => {
    if (!document.hidden && !reducedMotion.matches && !links.some(link => link.matches(':hover, :focus-within'))) rotate();
  }, 15000);
}
