window.dpReveal = function () {
  const KF = {
    up: [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }],
    left: [{ opacity: 0, transform: 'translateX(-50px)' }, { opacity: 1, transform: 'none' }],
    right: [{ opacity: 0, transform: 'translateX(50px)' }, { opacity: 1, transform: 'none' }],
    scale: [{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }],
    fade: [{ opacity: 0 }, { opacity: 1 }],
    line: [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }]
  };
  const io = window.__dpIO || (window.__dpIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.__a && e.target.__a.play(); io.unobserve(e.target); }
  }), { threshold: 0.12 }));
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (el.__rv) return; el.__rv = true;
    const t = el.dataset.reveal;
    const a = el.animate(KF[t] || KF.up, { duration: t === 'line' ? 1400 : 900, easing: 'cubic-bezier(.2,.7,.2,1)', delay: +(el.dataset.delay || 0), fill: 'both' });
    a.pause(); el.__a = a; io.observe(el);
  });
};
