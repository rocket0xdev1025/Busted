// The published calendar date, not an announced release hour.
export const RELEASE_DATE = Date.UTC(2026, 10, 19);

export function getCountdown(now) {
  const remaining = Math.max(0, Math.ceil((RELEASE_DATE - now) / 1000));
  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor(remaining % 86400 / 3600),
    minutes: Math.floor(remaining % 3600 / 60),
    seconds: remaining % 60,
    reached: remaining === 0
  };
}

export function initGamedayCountdown() {
  const section = document.querySelector('#gameday');
  if (!section) return () => {};
  const timer = section.querySelector('[role="timer"]');
  const status = section.querySelector('#gameday-status');
  const units = [...section.querySelectorAll('[data-countdown]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let previousLabel;
  function cancelDigitAnimations() {
    for (const unit of units) {
      for (const animation of unit.getAnimations()) animation.cancel();
    }
  }
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) cancelDigitAnimations();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelDigitAnimations();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) cancelDigitAnimations();
    }, {threshold: 0}).observe(section);
  }

  return now => {
    const values = getCountdown(now.getTime());
    for (const unit of units) {
      const next = String(values[unit.dataset.countdown]).padStart(2, '0');
      if (unit.textContent === next) continue;
      const hadValue = unit.textContent !== '--';
      unit.textContent = next;
      if (hadValue && visible && !document.hidden && !reducedMotion.matches) {
        for (const animation of unit.getAnimations()) animation.cancel();
        unit.animate([
          {transform: 'translateY(12%)', opacity: .25},
          {transform: 'translateY(0)', opacity: 1}
        ], {duration: 360, easing: 'cubic-bezier(.16,1,.3,1)'});
      }
    }
    // A timer is deliberately not a live region: screen readers can inspect it
    // without having the seconds interrupt their reading.
    const label = values.reached
      ? 'The GTA VI release date has arrived.'
      : `${values.days} days, ${values.hours} hours, ${values.minutes} minutes and ${values.seconds} seconds until the GTA VI release date.`;
    if (label !== previousLabel) {
      timer.setAttribute('aria-label', label);
      previousLabel = label;
    }
    const message = values.reached
      ? 'The release date has arrived. The crew keeps growing.'
      : 'Counting down to the release date. Exact launch time TBA.';
    if (status.textContent !== message) status.textContent = message;
    section.dataset.countdownState = values.reached ? 'reached' : 'counting';
  };
}
