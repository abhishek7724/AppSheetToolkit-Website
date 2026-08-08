(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open'); menuButton?.setAttribute('aria-expanded','false');
  }));
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { reveals.forEach(el => el.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, {threshold:.12});
  reveals.forEach((el,i) => { el.style.transitionDelay = `${Math.min((i%4)*55,165)}ms`; observer.observe(el); });
})();

/* Product tour tabs */
(() => {
  const tour = document.querySelector('[data-tour]');
  if (!tour) return;
  const tabs = [...tour.querySelectorAll('.tour-tab')];
  const slides = [...tour.querySelectorAll('.tour-slide')];
  const show = i => {
    tabs.forEach((tab, n) => {
      const on = n === i;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    slides.forEach((slide, n) => {
      slide.hidden = n !== i;
      slide.classList.toggle('is-active', n === i);
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => show(i));
    tab.addEventListener('keydown', e => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = (i + step + tabs.length) % tabs.length;
      show(next); tabs[next].focus();
    });
  });
})();
