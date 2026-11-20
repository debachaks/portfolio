window.makeViz = function (React) {
  const h = React.createElement;
  const INK = 'oklch(0.22 0.02 50)', PAPER = 'oklch(0.97 0.012 80)', FAINT = 'oklch(0.22 0.02 50 / 0.22)', LF = 'oklch(0.97 0.012 80 / 0.12)';
  const S = (vb, kids, opt) => h('svg', { viewBox: vb, width: '100%', height: '100%', preserveAspectRatio: (opt && opt.par) || 'xMidYMid meet', style: { display: 'block', overflow: opt && opt.clip ? 'hidden' : 'visible' } }, ...kids);
  const css = (animation, extra) => Object.assign({ transformBox: 'fill-box', transformOrigin: 'center', animation }, extra || {});
  const mdot = (path, dur, begin, r, fill) => h('circle', { r: r || 2.5, fill }, h('animateMotion', { path, dur: dur + 's', begin: begin + 's', repeatCount: 'indefinite' }));
  const anim = (attr, values, dur, begin, extra) => h('animate', Object.assign({ attributeName: attr, values, dur: dur + 's', begin: begin + 's', repeatCount: 'indefinite' }, extra || {}));
  const T = (x, y, s, fill, size, anchor) => h('text', { x, y, fill, fontSize: size || 8, fontFamily: 'JetBrains Mono, monospace', textAnchor: anchor || 'middle' }, s);
  const sine = (x0, x1, y, per, ampFn, step) => { let d = ''; for (let x = x0; x <= x1; x += (step || 2)) d += (x === x0 ? 'M' : 'L') + x + ' ' + (y + Math.sin(x / per * 2 * Math.PI) * ampFn(x)).toFixed(1) + ' '; return d; };
  const icon = (name, size, color, extra) => h('span', { style: Object.assign({ fontFamily: 'Material Symbols Rounded', fontSize: size, color, lineHeight: 1 }, extra || {}) }, name);

  function viz(key, A) {
    switch (key) {
      case 'wifi': { const xs = [20, 62, 114, 156]; return S('0 0 200 100', [
        ...xs.map(x => h('path', { d: `M${x + 13} 74 L100 46`, stroke: FAINT, strokeDasharray: '2 3', fill: 'none' })),
        ...xs.map(x => h('rect', { x, y: 74, width: 26, height: 16, rx: 2, fill: 'none', stroke: INK, strokeWidth: 1.2 })),
        ...xs.map((x, i) => mdot(`M${x + 13} 74 L100 46`, 1.6, -i * 0.4, 2.2, A)),
        ...[10, 20, 30].map((r, j) => h('path', { d: `M${100 - r} 40 A${r} ${r} 0 0 1 ${100 + r} 40`, fill: 'none', stroke: A, strokeWidth: 1.8, strokeLinecap: 'round' }, anim('opacity', '0.1;1;0.1', 1.8, -1.8 + j * 0.3))),
        h('circle', { cx: 100, cy: 44, r: 4, fill: A })]); }
      case 'power': { const a = [.9, .3, .7, .2, 1, .45], b = [.35, .8, .4, .75, .3, .7]; return S('0 0 200 100', [
        h('line', { x1: 18, x2: 188, y1: 86, y2: 86, stroke: INK }),
        ...a.map((v, i) => h('rect', { x: 28 + i * 26, y: 22, width: 14, height: 64, rx: 2, fill: i === 2 ? A : INK, opacity: i === 2 ? 1 : .75, style: css('bar 4.5s cubic-bezier(.4,0,.2,1) infinite', { transformOrigin: '50% 100%', '--a': v, '--b': b[i] }) })),
        h('line', { x1: 18, x2: 188, y1: 54, y2: 54, stroke: A, strokeDasharray: '3 3' }), T(188, 49, 'equilibrium', A, 7, 'end')]); }
      case 'anomaly': { let d = ''; for (let x = 62; x <= 196; x += 5) { const y = x === 147 ? 16 : 56 + Math.sin(x * 1.7) * 5 + Math.sin(x * .53) * 3; d += (x === 62 ? 'M' : 'L') + x + ' ' + y.toFixed(1) + ' '; } return S('0 0 200 100', [
        h('rect', { x: 12, y: 32, width: 36, height: 40, rx: 3, fill: 'none', stroke: INK, strokeWidth: 1.2 }), h('rect', { x: 22, y: 42, width: 16, height: 20, rx: 2, fill: A, opacity: .25 }),
        ...[0, 1, 2, 3].flatMap(k => [h('line', { x1: 6, x2: 12, y1: 37 + k * 10, y2: 37 + k * 10, stroke: INK }), h('line', { x1: 48, x2: 54, y1: 37 + k * 10, y2: 37 + k * 10, stroke: INK })]),
        h('path', { d, fill: 'none', stroke: INK, strokeWidth: 1.2, strokeDasharray: 400, style: { animation: 'draw 3.5s ease-in-out infinite' } }),
        h('circle', { cx: 147, cy: 16, r: 6, fill: 'none', stroke: A, strokeWidth: 1.5, style: css('ring 1.75s ease-out infinite') }), h('circle', { cx: 147, cy: 16, r: 2.5, fill: A }), T(165, 12, 'flagged', A, 7, 'start')]); }
      case 'crowd': { const nodes = [0, 1, 2, 3, 4, 5].map(i => { const t = (i * 60 + 30) * Math.PI / 180; return [100 + 78 * Math.cos(t), 52 + 36 * Math.sin(t)]; }); return S('0 0 200 100', [
        ...nodes.map(([x, y]) => h('line', { x1: x, y1: y, x2: 100, y2: 52, stroke: FAINT })), ...nodes.map(([x, y], i) => mdot(`M${x} ${y} L100 52`, 1.5, -i * 0.25, 2.2, A)),
        ...nodes.map(([x, y]) => h('circle', { cx: x, cy: y, r: 5, fill: PAPER, stroke: INK, strokeWidth: 1.2 })),
        h('circle', { cx: 100, cy: 52, r: 8, fill: 'none', stroke: A, style: css('ring 1.5s ease-out infinite') }), h('circle', { cx: 100, cy: 52, r: 8, fill: A }),
        h('text', { x: 100, y: 55.5, fill: PAPER, fontSize: 10, textAnchor: 'middle', fontFamily: 'serif' }, 'Σ')]); }
      case 'attention': return S('0 0 200 100', [
        h('path', { d: sine(0, 200, 50, 14, x => (x > 105 && x < 155) ? 24 : 6), fill: 'none', stroke: INK, strokeWidth: 1.2 }),
        h('rect', { x: 0, y: 14, width: 44, height: 72, rx: 5, fill: A, fillOpacity: .15, stroke: A, style: { animation: 'sweep 4s ease-in-out infinite alternate' } }), T(100, 98, 'attention window', A, 7)]);
      case 'phase': return S('0 0 200 100', [
        h('path', { d: sine(-40, 240, 34, 40, () => 14), fill: 'none', stroke: INK, strokeWidth: 1.4 }),
        h('path', { d: sine(-40, 240, 66, 40, () => 14), fill: 'none', stroke: A, strokeWidth: 1.6, style: { animation: 'phase 4s ease-in-out infinite' } })], { clip: true });
      case 'lstm': { const cells = [0, 1, 2, 3].map(i => 34 + i * 42); return S('0 0 200 100', [
        h('path', { d: sine(2, 26, 50, 8, () => 6), fill: 'none', stroke: INK }), h('line', { x1: 26, x2: 196, y1: 50, y2: 50, stroke: FAINT }),
        ...cells.map(x => h('path', { d: `M${x + 8} 34 C${x + 8} 20 ${x + 22} 20 ${x + 22} 34`, fill: 'none', stroke: FAINT })),
        ...cells.map(x => h('rect', { x, y: 34, width: 30, height: 32, rx: 7, fill: A, fillOpacity: .06, stroke: INK, strokeWidth: 1.2 }, anim('fill-opacity', '0.7;0.06;0.06', 3, ((x + 15 - 26) / 170) * 3 - 0.2, { keyTimes: '0;0.25;1' }))),
        mdot('M26 50 L196 50', 3, 0, 3, A), h('circle', { cx: 196, cy: 50, r: 4, fill: 'none', stroke: A })]); }
      case 'fpga': return S('0 0 200 100', [
        h('rect', { x: 50, y: 6, width: 100, height: 88, rx: 6, fill: 'none', stroke: INK, strokeWidth: 1.2 }),
        ...[0, 1, 2, 3, 4].flatMap(k => [h('line', { x1: 62 + k * 19, x2: 62 + k * 19, y1: 0, y2: 6, stroke: INK }), h('line', { x1: 62 + k * 19, x2: 62 + k * 19, y1: 94, y2: 100, stroke: INK })]),
        ...[0, 1, 2, 3].flatMap(r => [0, 1, 2, 3].map(c => h('rect', { x: 62 + c * 20, y: 16 + r * 19, width: 15, height: 13, rx: 2, fill: A }, anim('opacity', '0.12;0.95;0.12', 2.4, (r + c) * 0.18 - 2.4))))]);
      case 'mlops': { const names = ['ingest', 'train', 'track', 'deploy', 'monitor']; return S('0 0 300 130', [
        h('line', { x1: 30, x2: 270, y1: 70, y2: 70, stroke: FAINT, strokeWidth: 2 }), h('path', { d: 'M270 56 C270 10 30 10 30 56', fill: 'none', stroke: FAINT, strokeDasharray: '3 4' }),
        mdot('M270 56 C270 10 30 10 30 56', 4, 0, 2.5, A), T(150, 26, 'retrain', A, 8), ...[0, 1, 2].map(i => mdot('M30 70 L270 70', 3, -i, 3, INK)),
        ...names.map((n, i) => h('circle', { cx: 30 + i * 60, cy: 70, r: 13, fill: PAPER, stroke: INK, strokeWidth: 1.2 })),
        ...names.map((n, i) => h('circle', { cx: 30 + i * 60, cy: 70, r: 5, fill: A }, anim('opacity', '0.2;1;0.2', 3, i * 0.6 - 3))),
        ...names.map((n, i) => T(30 + i * 60, 104, n, INK, 9))]); }
      case 'prioritize': { const labels = ['Task A', 'Task B', 'Task C', 'Urgent']; return S('0 0 300 130', labels.map((l, i) => h('g', { style: { animation: 'reorder 5s cubic-bezier(.6,0,.2,1) infinite', '--dy': i === 3 ? '-84px' : '28px' } },
        h('rect', { x: 50, y: 12 + i * 28, width: 200, height: 22, rx: 6, fill: i === 3 ? A : PAPER, stroke: INK, strokeWidth: 1.2 }),
        h('circle', { cx: 66, cy: 23 + i * 28, r: 4, fill: i === 3 ? PAPER : FAINT }), T(80, 26 + i * 28, l, i === 3 ? PAPER : INK, 9, 'start'))).concat([0, 1, 2, 3].map(i => T(30, 26 + i * 28, String(i + 1), FAINT, 10)))); }
      case 'classify': { const outs = [32, 65, 98]; return S('0 0 300 130', [
        h('path', { d: sine(10, 104, 65, 12, x => (x > 50 && x < 80) ? 22 : 6), fill: 'none', stroke: INK, strokeWidth: 1.2 }),
        h('rect', { x: 120, y: 42, width: 64, height: 46, rx: 8, fill: A, fillOpacity: .12, stroke: INK, strokeWidth: 1.2 }), T(152, 68, 'CNN · LSTM', INK, 8),
        ...outs.map(y => h('line', { x1: 184, y1: 65, x2: 250, y2: y, stroke: FAINT })), ...outs.map((y, i) => mdot(`M184 65 L250 ${y}`, 4.5, i * 1.5 - 4.5, 2.2, A)),
        ...outs.map((y, i) => h('circle', { cx: 258, cy: y, r: 8, fill: A, stroke: INK }, anim('fill-opacity', '1;0.08;0.08', 4.5, i * 1.5 - 4.5, { calcMode: 'discrete', keyTimes: '0;0.33;1' }))),
        T(258, 124, 'up to 98%', A, 8)]); }
    }
    return null;
  }

  function fund(A, step) {
    const data = [30, 65, 100, 135, 170], rev = [40, 80, 120, 160], on = k => step >= k, cur = k => step === k, kids = [];
    data.forEach((y, i) => { const p = `M40 ${y} L176 100`; kids.push(h('path', { d: p, stroke: on(2) ? A : FAINT, fill: 'none' })); if (cur(1) || cur(2)) kids.push(mdot(p, 1.2, -i * 0.2, 2.6, A)); });
    rev.forEach((y, i) => { const p1 = `M204 100 L320 ${y}`, p2 = `M340 ${y} L456 100`; kids.push(h('path', { d: p1, stroke: on(3) ? A : FAINT, fill: 'none' }), h('path', { d: p2, stroke: on(4) ? A : FAINT, fill: 'none' }));
      if (cur(2) || cur(3)) kids.push(mdot(p1, 1.2, -i * 0.25, 2.6, A)); if (cur(3) || cur(4)) kids.push(mdot(p2, 1.2, -i * 0.25, 2.6, A)); });
    kids.push(h('path', { d: 'M484 100 L582 100', stroke: on(5) ? A : FAINT, fill: 'none' })); if (cur(4) || cur(5)) kids.push(mdot('M484 100 L582 100', 1, 0, 3, A));
    const node = (cx, cy, r, k, label) => [h('circle', { cx, cy, r, fill: on(k) ? A : PAPER, stroke: on(k) ? A : INK, strokeWidth: 1.4, style: { transition: 'fill .4s' } }),
      cur(k) ? h('circle', { cx, cy, r, fill: 'none', stroke: A, style: css('ring 1.2s ease-out infinite') }) : null, label ? T(cx, cy + 3.5, label, on(k) ? PAPER : INK, 9) : null];
    data.forEach(y => kids.push(...node(30, y, 9, 1)));
    kids.push(...node(190, 100, 16, 2, 'S')); rev.forEach((y, i) => kids.push(...node(330, y, 12, 3, 'R' + (i + 1)))); kids.push(...node(470, 100, 16, 4, 'E')); kids.push(...node(600, 100, 19, 5, step >= 5 ? '✓' : 'D'));
    [[30, 'Data team · 5'], [190, 'Supervisor'], [330, '4 specialist reviewers'], [470, 'Evidence checker'], [600, 'Decision owner']].forEach(([x, l]) => kids.push(T(x, 208, l, INK, 10)));
    return S('0 0 640 215', kids.filter(Boolean));
  }

  function record(A, label) {
    return S('0 0 300 300', [
      h('circle', { cx: 150, cy: 150, r: 146, fill: 'oklch(0.3 0.02 50)' }),
      h('g', { style: css('spin 3s linear infinite') },
        h('circle', { cx: 150, cy: 150, r: 128, fill: INK }), ...[112, 98, 84, 70].map(r => h('circle', { cx: 150, cy: 150, r, fill: 'none', stroke: PAPER, strokeOpacity: .12 })),
        h('path', { d: 'M150 30 A120 120 0 0 1 250 90', stroke: PAPER, strokeOpacity: .35, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' }),
        h('circle', { cx: 150, cy: 150, r: 44, fill: A }), h('text', { x: 150, y: 156, fill: PAPER, fontSize: 16, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace' }, label), h('circle', { cx: 150, cy: 150, r: 3, fill: PAPER })),
      h('line', { x1: 280, y1: 24, x2: 214, y2: 128, stroke: PAPER, strokeWidth: 5, strokeLinecap: 'round' }), h('circle', { cx: 280, cy: 24, r: 10, fill: PAPER })]);
  }

  function scope(key, A, fault) {
    const grid = []; for (let x = 0; x <= 600; x += 50) grid.push(h('line', { x1: x, x2: x, y1: 0, y2: 220, stroke: LF })); for (let y = 0; y <= 220; y += 44) grid.push(h('line', { x1: 0, x2: 600, y1: y, y2: y, stroke: LF }));
    const LA = 'oklch(0.82 0.12 150)';
    if (key === 'proton') {
      let d = ''; for (let x = 0; x <= 1200; x += 4) d += (x ? 'L' : 'M') + x + ' ' + (110 + Math.sin(x / 100 * 2 * Math.PI) * 14 + Math.sin(x / 25 * 2 * Math.PI) * 6 + Math.sin(x / 12.5 * 2 * Math.PI) * 3).toFixed(1) + ' ';
      return S('0 0 600 220', [...grid,
        h('line', { x1: 0, x2: 600, y1: 70, y2: 70, stroke: LA, strokeOpacity: .5, strokeDasharray: '6 6' }), h('line', { x1: 0, x2: 600, y1: 150, y2: 150, stroke: LA, strokeOpacity: .5, strokeDasharray: '6 6' }),
        T(596, 64, 'consensus band', LA, 10, 'end'),
        h('path', { d, fill: 'none', stroke: LA, strokeWidth: 2, style: { animation: 'scrollW 2s linear infinite', '--w': '-100px' } }),
        fault ? h('g', { key: 'f' + fault }, h('path', { d: 'M430 110 L440 20 L450 200 L460 110', stroke: A, strokeWidth: 3, fill: 'none', strokeLinejoin: 'round' }),
          h('circle', { cx: 445, cy: 60, r: 26, fill: 'none', stroke: A, strokeWidth: 2, style: css('ring 1s ease-out 2') }),
          h('rect', { x: 300, y: 8, width: 290, height: 26, rx: 4, fill: A }), T(445, 25, 'FAULT FLAGGED · ATTRIBUTED', PAPER, 11)) : null,
        T(8, 212, 'zero-label detector · contrastive learning', 'oklch(0.97 0.012 80 / 0.5)', 10, 'start')].filter(Boolean), { clip: true });
    }
    if (key === 'zs') {
      const st = [['extract', 90], ['transform', 250], ['load', 410]];
      return S('0 0 600 220', [...grid, h('line', { x1: 40, x2: 540, y1: 100, y2: 100, stroke: LF, strokeWidth: 3 }),
        ...[0, 1, 2, 3, 4].map(i => mdot('M40 100 L540 100', 3, -i * 0.6, 5, LA)),
        h('path', { d: 'M330 100 L330 190', stroke: A, strokeDasharray: '4 4' }), mdot('M330 100 L330 190', 3, -1.4, 5, A), T(340, 186, 'QC reject', A, 10, 'start'),
        h('path', { d: 'M330 84 L346 100 L330 116 L314 100 Z', fill: A }),
        ...st.map(([l, x]) => h('rect', { x: x - 50, y: 72, width: 100, height: 56, rx: 8, fill: INK, stroke: LA })), ...st.map(([l, x]) => T(x, 104, l, LA, 12)),
        h('ellipse', { cx: 550, cy: 76, rx: 30, ry: 10, fill: 'none', stroke: LA }), h('path', { d: 'M520 76 L520 124 A30 10 0 0 0 580 124 L580 76', fill: 'none', stroke: LA }),
        T(170, 40, '−30% execution time', LA, 12), T(470, 40, '−25% SQL error rate', A, 12)]);
    }
    const atoms = [80, 210, 340, 470];
    return S('0 0 600 220', [...grid,
      h('path', { d: sine(0, 600, 60, 30, x => 10 + 22 * Math.exp(-Math.pow((x - 300) / 90, 2))), fill: 'none', stroke: LA, strokeWidth: 2 }),
      T(8, 20, 'EEG', LA, 10, 'start'), T(8, 125, 'atoms', A, 10, 'start'),
      ...atoms.map((cx, i) => h('path', { d: sine(cx - 50, cx + 50, 165, 10 + i * 4, x => 30 * Math.exp(-Math.pow((x - cx) / 22, 2)), 1), fill: 'none', stroke: A, strokeWidth: 2 }, anim('opacity', '0;1;1;0', 4, i * 0.8 - 4))),
      T(592, 212, 'matching pursuit: signal ≈ Σ atoms', 'oklch(0.97 0.012 80 / 0.5)', 10, 'end')], { clip: true });
  }

  function gateScene(mode, A) {
    const k = [];
    if (mode === 'lab') {
      for (let x = 0; x <= 1200; x += 60) k.push(h('line', { x1: x, x2: x, y1: 0, y2: 800, stroke: A, strokeOpacity: .12 }));
      for (let y = 0; y <= 800; y += 60) k.push(h('line', { x1: 0, x2: 1200, y1: y, y2: y, stroke: A, strokeOpacity: .12 }));
      k.push(h('path', { d: sine(0, 1440, 560, 240, () => 70, 6), fill: 'none', stroke: A, strokeWidth: 2.5, strokeOpacity: .7, style: { animation: 'scrollW 4s linear infinite', '--w': '-240px' } }));
      k.push(h('path', { d: sine(0, 1320, 620, 120, () => 26, 4), fill: 'none', stroke: A, strokeWidth: 1.5, strokeOpacity: .45, style: { animation: 'scrollW 2.5s linear infinite', '--w': '-120px' } }));
      [[120, 120], [980, 160], [1040, 560], [160, 600]].forEach(([x, y], i) => k.push(h('rect', { x, y, width: 70, height: 70, rx: 8, fill: 'none', stroke: A, strokeOpacity: .5, style: css(`floatY ${6 + i}s ease-in-out ${-i}s infinite`) })));
    } else if (mode === 'stage') {
      [0, 1, 2, 3, 4].forEach(i => k.push(h('circle', { cx: 600, cy: 380, r: 160, fill: 'none', stroke: A, strokeWidth: 2, style: css(`ring 4s ease-out ${-i * 0.8}s infinite`) })));
      for (let i = 0; i < 48; i++) k.push(h('rect', { x: i * 25 + 4, y: 560, width: 15, height: 240, rx: 7, fill: A, fillOpacity: .5, style: css(`eq ${0.6 + (i % 5) * 0.17}s ease-in-out ${-i * 0.09}s infinite`, { transformOrigin: '50% 100%' }) }));
    } else {
      k.push(h('circle', { cx: 600, cy: 900, r: 560, fill: A, fillOpacity: .1 }), h('circle', { cx: 600, cy: 900, r: 360, fill: A, fillOpacity: .14 }));
      [180, 340, 500, 660, 820, 980].forEach((x, i) => k.push(h('path', { d: `M${x} 760 q -30 -50 0 -100 q 30 -50 0 -100 q -30 -50 0 -100`, fill: 'none', stroke: PAPER, strokeOpacity: .35, strokeWidth: 4, strokeLinecap: 'round', style: { animation: `steamBig 4s ease-out ${-i * 0.7}s infinite` } })));
      for (let i = 0; i < 26; i++) k.push(h('circle', { cx: (i * 97) % 1200, cy: 820, r: 2 + (i % 3), fill: PAPER, fillOpacity: .5, style: { animation: `rise ${7 + (i % 5)}s linear ${-i * 0.6}s infinite` } }));
    }
    return S('0 0 1200 800', k, { par: 'xMidYMid slice', clip: true });
  }

  const FLOAT = { lab: ['memory', 'developer_board', 'bolt', 'sensors', 'science', 'troubleshoot'], stage: ['music_note', 'mic', 'graphic_eq', 'queue_music', 'piano', 'headphones'], kitchen: ['bakery_dining', 'cake', 'cookie', 'egg', 'local_cafe', 'icecream'] };
  function floaters(mode, A) {
    const pos = [['5%', '14%', 44], ['42%', '6%', 28], ['88%', '10%', 38], ['55%', '84%', 46], ['3%', '78%', 32], ['93%', '62%', 28]];
    return h('div', { key: mode, style: { position: 'absolute', inset: 0 } }, ...FLOAT[mode].map((n, i) => h('span', { key: i, style: { position: 'absolute', left: pos[i][0], top: pos[i][1], opacity: .3, animation: `popIn .7s cubic-bezier(.2,.8,.2,1.3) ${i * 0.08}s both` } },
      icon(n, pos[i][2], A, { display: 'block', animation: `floatY ${5 + i * 0.7}s ease-in-out ${-i}s infinite` }))));
  }

  function ticker(items, A) {
    const all = items.concat(items);
    return h('div', { style: { display: 'flex', width: 'max-content', animation: 'slideX 70s linear infinite' } }, ...all.map((n, i) => h('span', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10, padding: '0 28px', whiteSpace: 'nowrap', fontSize: 13 } },
      icon(n[2], 18, A), h('span', { style: { fontFamily: 'JetBrains Mono, monospace', opacity: .6 } }, n[0]), n[1])));
  }

  function eqBars(A, playing) {
    return S('0 0 300 100', Array.from({ length: 30 }, (_, i) => h('rect', { key: i, x: i * 10 + 2, y: 0, width: 6, height: 100, rx: 3, fill: A,
      style: playing ? css(`eq ${0.5 + (i % 4) * 0.15}s ease-in-out ${-i * 0.07}s infinite`, { transformOrigin: '50% 100%' }) : { transformBox: 'fill-box', transformOrigin: '50% 100%', transform: `scaleY(${0.12 + 0.1 * Math.abs(Math.sin(i))})`, transition: 'transform .4s' } })), { par: 'none' });
  }

  function dough(A, run) {
    return S('0 0 200 170', [
      h('circle', { cx: 160, cy: 36, r: 26, fill: 'none', stroke: FAINT, strokeWidth: 5 }),
      h('circle', { key: 't' + run, cx: 160, cy: 36, r: 26, fill: 'none', stroke: A, strokeWidth: 5, strokeLinecap: 'round', strokeDasharray: 164, strokeDashoffset: run ? 0 : 164, transform: 'rotate(-90 160 36)', style: run ? { animation: 'timer164 6s linear forwards' } : {} }),
      h('ellipse', { key: 'd' + run, cx: 80, cy: 118, rx: 50, ry: 16, fill: 'oklch(0.9 0.05 80)', stroke: INK, strokeWidth: 1.2, style: run ? css('proof 6s cubic-bezier(.3,0,.2,1) forwards', { transformOrigin: '50% 100%' }) : {} }),
      h('path', { d: 'M20 116 Q80 190 140 116 Z', fill: INK }), h('line', { x1: 14, x2: 146, y1: 116, y2: 116, stroke: INK, strokeWidth: 3, strokeLinecap: 'round' })]);
  }

  return { viz, fund, record, scope, gateScene, floaters, ticker, eqBars, dough, icon };
};
