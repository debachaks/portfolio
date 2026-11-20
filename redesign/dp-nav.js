window.DP_VIEWS = {
  home: { label: 'Home', icon: 'home', bg: 'oklch(0.2 0.01 260)' },
  lab: { label: 'The Lab', icon: 'description', bg: 'oklch(0.45 0.15 255)' },
  kitchen: { label: 'The Kitchen', icon: 'bakery_dining', bg: 'oklch(0.55 0.14 50)' }
};
window.dpGo = function (c, to, ev) {
  if (c.__busy || to === c.state.view) return; c.__busy = true;
  const el = c.wipeRef && c.wipeRef.current;
  const x = ev && ev.clientX != null ? ev.clientX : innerWidth / 2, y = ev && ev.clientY != null ? ev.clientY : innerHeight / 2;
  c.setState({ to });
  let a1, a2;
  try { a1 = el && el.animate([{ clipPath: `circle(0% at ${x}px ${y}px)` }, { clipPath: `circle(150% at ${x}px ${y}px)` }], { duration: 550, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }); } catch (e) {}
  setTimeout(() => {
    c.setState({ view: to }); window.scrollTo(0, 0);
    try { history.replaceState(null, '', to === 'home' ? location.pathname : '#' + to); } catch (e) {}
    setTimeout(() => {
      try { a1 && a1.cancel(); a2 = el && el.animate([{ clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)' }], { duration: 600, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }); } catch (e) {}
      setTimeout(() => { try { a2 && a2.cancel(); } catch (e) {} if (el) el.style.clipPath = 'circle(0% at 50% 50%)'; c.__busy = false; }, 650);
    }, 120);
  }, el ? 560 : 0);
};
window.dpShellVals = function (c) {
  const V = window.DP_VIEWS, st = c.state;
  return {
    wipeRef: c.wipeRef, wipeBg: V[st.to || 'lab'].bg, wipeIcon: V[st.to || 'lab'].icon,
    isHome: st.view === 'home', isLab: st.view === 'lab', isKitchen: st.view === 'kitchen', showDock: st.view !== 'home',
    goHome: () => window.dpGo(c, 'home'), openLab: e => window.dpGo(c, 'lab', e), openKitchen: e => window.dpGo(c, 'kitchen', e),
    dock: Object.entries(V).map(([k, v]) => ({ label: v.label, icon: v.icon, go: e => window.dpGo(c, k, e), bg: k === st.view ? v.bg : 'transparent' }))
  };
};
