// Two background layers keep the live sky behind both hero and page content.
export function initStarfield() {
  const skies = [...document.querySelectorAll('.living-sky')];
  const root = document.documentElement;
  let resizeTimer;
  function place(star) {
    star.style.left = `${(Math.random() * 100).toFixed(3)}%`;
    star.style.top = `${(Math.random() * 100).toFixed(3)}%`;
  }
  function placeMeteor(meteor) {
    meteor.style.left = `${(28 + Math.random() * 70).toFixed(2)}%`;
    meteor.style.top = `${(5 + Math.random() * 40).toFixed(2)}%`;
    const distance = Math.min(innerWidth * .7, 380 + Math.random() * 260);
    meteor.style.setProperty('--meteor-x', `${-distance.toFixed(1)}px`);
    meteor.style.setProperty('--meteor-y', `${(distance * .67).toFixed(1)}px`);
  }
  function build() {
    const count = Math.max(70, Math.min(220, Math.round(innerWidth * innerHeight / 8500)));
    for (const sky of skies) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < Math.round(count * 1.7); i++) {
        const star = document.createElement('i');
        star.className = `sky-star${i >= count ? ' extra-star' : ''}${Math.random() < .28 ? ' bright-star' : ''}`;
        place(star);
        const duration = 8 + Math.random() * 10;
        star.style.setProperty('--twinkle-time', `${duration.toFixed(2)}s`);
        star.style.setProperty('--twinkle-delay', `${(-Math.random() * duration).toFixed(2)}s`);
        star.style.setProperty('--star-size', `${(1.1 + Math.random() * 1.8).toFixed(2)}px`);
        star.style.setProperty('--star-peak', (.86 + Math.random() * .14).toFixed(2));
        star.style.setProperty('--star-color', ['#e9f6ff', '#b9dcff', '#e5d1ff', '#fff0d9'][Math.floor(Math.random() * 4)]);
        fragment.append(star);
      }
      sky.querySelector('.star-field').replaceChildren(fragment);
      const meteors = document.createDocumentFragment();
      for (let i = 0; i < 3; i++) {
        const meteor = document.createElement('i');
        meteor.className = 'meteor-streak';
        placeMeteor(meteor);
        const duration = 14 + Math.random() * 14;
        meteor.style.setProperty('--meteor-time', `${duration.toFixed(2)}s`);
        meteor.style.setProperty('--meteor-delay', `${(-Math.random() * duration).toFixed(2)}s`);
        meteor.style.setProperty('--meteor-length', `${(85 + Math.random() * 80).toFixed(1)}px`);
        meteors.append(meteor);
      }
      sky.querySelector('.meteor-field').replaceChildren(meteors);
    }
  }
  for (const sky of skies) {
    // Relocate only during darkness, never while a star or meteor shines.
    sky.addEventListener('animationiteration', event => {
      if (event.target.classList.contains('sky-star')) place(event.target);
      else if (event.target.classList.contains('meteor-streak')) placeMeteor(event.target);
    });
  }
  function visibility() { root.toggleAttribute('data-sky-paused', document.hidden); }
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 180); });
  build();
  visibility();
}
