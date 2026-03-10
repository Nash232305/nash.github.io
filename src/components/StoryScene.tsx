import { useEffect, useRef } from 'react';

/*  ─── Cada escena es un SVG animado con JavaScript ─── */

const SCENES = {
  /* 1. Historia — casa + corazón + estrellas */
  historia: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    // Cielo nocturno
    const sky = el('rect', { width: 300, height: 300, fill: '#1a1033', rx: 24 });
    svg.appendChild(sky);
    // Estrellas que parpadean
    for (let i = 0; i < 25; i++) {
      const star = el('circle', {
        cx: Math.random() * 300, cy: Math.random() * 150,
        r: Math.random() * 2 + 0.5, fill: '#fff', opacity: 0.3
      });
      svg.appendChild(star);
      ctx.stars.push(star);
    }
    // Colinas
    const hill = el('ellipse', { cx: 150, cy: 310, rx: 200, ry: 80, fill: '#2d5016' });
    svg.appendChild(hill);
    // Casa
    const houseBody = el('rect', { x: 110, y: 170, width: 80, height: 70, fill: '#e8a87c', rx: 4 });
    const roof = el('polygon', { points: '100,175 150,130 200,175', fill: '#d35400' });
    const door = el('rect', { x: 140, y: 210, width: 20, height: 30, fill: '#6b3a2a', rx: 3 });
    const windowL = el('rect', { x: 118, y: 190, width: 14, height: 14, fill: '#ffeaa7', rx: 2 });
    const windowR = el('rect', { x: 168, y: 190, width: 14, height: 14, fill: '#ffeaa7', rx: 2 });
    [houseBody, roof, door, windowL, windowR].forEach(e => svg.appendChild(e));
    ctx.windowL = windowL; ctx.windowR = windowR;
    // Corazón flotante sobre la casa
    const heart = el('path', {
      d: 'M150,110 C150,100 140,90 130,90 C115,90 115,110 150,130 C185,110 185,90 170,90 C160,90 150,100 150,110Z',
      fill: '#e74c3c', opacity: 0.8
    });
    svg.appendChild(heart);
    ctx.heart = heart;
    ctx.t = 0;
  },
  historiaAnimate: (ctx) => {
    ctx.t += 0.02;
    ctx.stars.forEach((s, i) => {
      s.setAttribute('opacity', 0.2 + Math.sin(ctx.t * 2 + i) * 0.5);
    });
    const glow = Math.sin(ctx.t * 3) > 0 ? '#ffeaa7' : '#f9ca24';
    ctx.windowL.setAttribute('fill', glow);
    ctx.windowR.setAttribute('fill', glow);
    ctx.heart.setAttribute('transform', `translate(0,${Math.sin(ctx.t * 1.5) * 6}) scale(${1 + Math.sin(ctx.t * 2) * 0.08})`);
  },

  /* 2. Presente — campus/libro/laptop */
  presente: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#0d1b2a', rx: 24 });
    svg.appendChild(bg);
    // Escritorio
    const desk = el('rect', { x: 40, y: 190, width: 220, height: 12, fill: '#8d6e63', rx: 3 });
    svg.appendChild(desk);
    // Laptop
    const screen = el('rect', { x: 100, y: 120, width: 100, height: 70, fill: '#2c3e50', rx: 6 });
    const display = el('rect', { x: 106, y: 126, width: 88, height: 58, fill: '#0f3460', rx: 3 });
    const base = el('rect', { x: 85, y: 190, width: 130, height: 6, fill: '#95a5a6', rx: 2 });
    [screen, display, base].forEach(e => svg.appendChild(e));
    ctx.display = display;
    // Code lines en la pantalla
    ctx.codeLines = [];
    for (let i = 0; i < 5; i++) {
      const line = el('rect', {
        x: 114, y: 134 + i * 10,
        width: 30 + Math.random() * 40, height: 4,
        fill: ['#43e97b', '#667eea', '#f093fb', '#4facfe', '#fda085'][i],
        rx: 2, opacity: 0
      });
      svg.appendChild(line);
      ctx.codeLines.push(line);
    }
    // Libro abierto
    const bookL = el('path', { d: 'M55,165 Q55,155 70,155 L90,155 L90,188 L70,188 Q55,188 55,178Z', fill: '#e74c3c' });
    const bookR = el('path', { d: 'M90,155 L110,155 Q125,155 125,165 L125,178 Q125,188 110,188 L90,188Z', fill: '#c0392b' });
    [bookL, bookR].forEach(e => svg.appendChild(e));
    // Taza de café
    const cup = el('rect', { x: 200, y: 170, width: 20, height: 20, fill: '#fff', rx: 3 });
    svg.appendChild(cup);
    // Vapor
    ctx.vapors = [];
    for (let i = 0; i < 3; i++) {
      const v = el('path', {
        d: `M${206 + i * 5},170 Q${208 + i * 5},160 ${206 + i * 5},150`,
        stroke: 'rgba(255,255,255,0.3)', strokeWidth: 1.5, fill: 'none'
      });
      svg.appendChild(v);
      ctx.vapors.push(v);
    }
    ctx.t = 0;
  },
  presenteAnimate: (ctx) => {
    ctx.t += 0.03;
    ctx.codeLines.forEach((line, i) => {
      const appear = (ctx.t * 2 + i * 0.5) % 4;
      line.setAttribute('opacity', appear < 2 ? Math.min(appear, 1) : Math.max(0, 2 - (appear - 2)));
      line.setAttribute('width', String(30 + Math.sin(ctx.t + i) * 15));
    });
    ctx.vapors.forEach((v, i) => {
      v.setAttribute('opacity', String(0.2 + Math.sin(ctx.t * 2 + i) * 0.2));
      v.setAttribute('transform', `translate(0,${Math.sin(ctx.t * 1.5 + i) * 3})`);
    });
    const pulse = 1 + Math.sin(ctx.t * 4) * 0.01;
    ctx.display.setAttribute('fill', `hsl(${220 + Math.sin(ctx.t) * 20}, 60%, ${20 + Math.sin(ctx.t * 2) * 5}%)`);
  },

  /* 3. Futuro — cohete despegando */
  futuro: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#0c0032', rx: 24 });
    svg.appendChild(bg);
    // Estrellas
    ctx.stars = [];
    for (let i = 0; i < 30; i++) {
      const s = el('circle', {
        cx: Math.random() * 300, cy: Math.random() * 300,
        r: Math.random() * 1.5 + 0.5, fill: '#fff', opacity: 0.4
      });
      svg.appendChild(s);
      ctx.stars.push(s);
    }
    // Cohete
    const rocketG = el('g', {});
    const body = el('path', { d: 'M145,180 L150,100 L155,180Z', fill: '#e0e0e0' });
    const nose = el('ellipse', { cx: 150, cy: 105, rx: 8, ry: 15, fill: '#e74c3c' });
    const finL = el('path', { d: 'M145,175 L130,190 L145,185Z', fill: '#3498db' });
    const finR = el('path', { d: 'M155,175 L170,190 L155,185Z', fill: '#3498db' });
    const windowR = el('circle', { cx: 150, cy: 140, r: 6, fill: '#85c1e9' });
    [body, nose, finL, finR, windowR].forEach(e => rocketG.appendChild(e));
    svg.appendChild(rocketG);
    ctx.rocket = rocketG;
    // Llamas de fuego
    ctx.flames = [];
    for (let i = 0; i < 5; i++) {
      const flame = el('ellipse', {
        cx: 147 + Math.random() * 6, cy: 185 + i * 5,
        rx: 3 + Math.random() * 4, ry: 5 + Math.random() * 6,
        fill: i < 2 ? '#f39c12' : '#e74c3c', opacity: 0.8
      });
      svg.appendChild(flame);
      ctx.flames.push(flame);
    }
    // Planeta abajo
    const planet = el('circle', { cx: 150, cy: 280, r: 50, fill: '#1abc9c', opacity: 0.3 });
    svg.appendChild(planet);
    ctx.t = 0;
  },
  futuroAnimate: (ctx) => {
    ctx.t += 0.03;
    ctx.rocket.setAttribute('transform', `translate(0,${Math.sin(ctx.t * 2) * 8})`);
    ctx.flames.forEach((f, i) => {
      f.setAttribute('ry', String(5 + Math.random() * 8));
      f.setAttribute('rx', String(2 + Math.random() * 5));
      f.setAttribute('opacity', String(0.5 + Math.random() * 0.5));
      f.setAttribute('cy', String(185 + i * 5 + Math.sin(ctx.t * 2) * 8));
    });
    ctx.stars.forEach((s, i) => {
      const cy = parseFloat(s.getAttribute('cy')) + 0.5;
      s.setAttribute('cy', String(cy > 300 ? 0 : cy));
      s.setAttribute('opacity', String(0.2 + Math.sin(ctx.t + i) * 0.4));
    });
  },

  /* 4. Métodos — camino con estaciones */
  metodos: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#0a2e1f', rx: 24 });
    svg.appendChild(bg);
    // Camino serpenteante
    const path1 = el('path', {
      d: 'M50,280 Q100,240 150,250 Q200,260 200,220 Q200,180 150,170 Q100,160 100,120 Q100,80 150,60 Q200,40 250,50',
      stroke: '#38f9d7', strokeWidth: 4, fill: 'none', strokeDasharray: '8,6', opacity: 0.6
    });
    svg.appendChild(path1);
    ctx.road = path1;
    // Marcadores/estaciones
    const stations = [
      { x: 50, y: 280, color: '#f6d365', label: '📚' },
      { x: 150, y: 250, color: '#43e97b', label: '💻' },
      { x: 200, y: 220, color: '#4facfe', label: '🤝' },
      { x: 150, y: 170, color: '#f093fb', label: '🎯' },
      { x: 100, y: 120, color: '#fa709a', label: '🚀' },
      { x: 250, y: 50, color: '#ffeaa7', label: '⭐' }
    ];
    ctx.stationEls = [];
    stations.forEach((s, i) => {
      const g = el('g', { opacity: 0 });
      const c = el('circle', { cx: s.x, cy: s.y, r: 14, fill: s.color, opacity: 0.8 });
      const t = el('text', { x: s.x, y: s.y + 5, 'text-anchor': 'middle', 'font-size': 14 });
      t.textContent = s.label;
      g.appendChild(c);
      g.appendChild(t);
      svg.appendChild(g);
      ctx.stationEls.push(g);
    });
    // Persona caminante (punto)
    ctx.walker = el('circle', { cx: 50, cy: 280, r: 6, fill: '#fff' });
    svg.appendChild(ctx.walker);
    ctx.t = 0;
    ctx.dashOffset = 0;
  },
  metodosAnimate: (ctx) => {
    ctx.t += 0.015;
    ctx.dashOffset -= 0.8;
    ctx.road.setAttribute('stroke-dashoffset', String(ctx.dashOffset));
    ctx.stationEls.forEach((s, i) => {
      const reveal = Math.max(0, Math.min(1, ctx.t * 2 - i * 0.4));
      s.setAttribute('opacity', String(reveal));
      s.setAttribute('transform', `scale(${0.5 + reveal * 0.5})`);
      s.setAttribute('transform-origin', `${s.firstChild.getAttribute('cx')}px ${s.firstChild.getAttribute('cy')}px`);
    });
    const walkerX = 50 + Math.sin(ctx.t) * 30;
    const walkerY = 280 - ctx.t * 15 % 240;
    ctx.walker.setAttribute('cx', String(walkerX + 100));
    ctx.walker.setAttribute('cy', String(Math.max(50, walkerY)));
    ctx.walker.setAttribute('opacity', String(0.6 + Math.sin(ctx.t * 4) * 0.4));
  },

  /* 5. Medidas — trofeo + gráfica subiendo */
  medidas: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#2d1b4e', rx: 24 });
    svg.appendChild(bg);
    // Barras de gráfica
    ctx.bars = [];
    const colors = ['#fa709a', '#fee140', '#f093fb', '#43e97b', '#4facfe'];
    for (let i = 0; i < 5; i++) {
      const bar = el('rect', {
        x: 50 + i * 44, y: 250, width: 30, height: 0,
        fill: colors[i], rx: 4, opacity: 0.8
      });
      svg.appendChild(bar);
      ctx.bars.push({ el: bar, target: 40 + i * 25, current: 0 });
    }
    // Trofeo
    const trophy = el('g', { transform: 'translate(130,40)' });
    const cupBody = el('path', { d: 'M10,20 Q10,50 20,50 L20,60 L0,60 L0,65 L40,65 L40,60 L20,60 Q30,50 30,20Z', fill: '#f1c40f' });
    const handleL = el('path', { d: 'M10,25 Q0,25 0,35 Q0,45 10,45', stroke: '#f1c40f', strokeWidth: 3, fill: 'none' });
    const handleR = el('path', { d: 'M30,25 Q40,25 40,35 Q40,45 30,45', stroke: '#f1c40f', strokeWidth: 3, fill: 'none' });
    const star = el('text', { x: 20, y: 42, 'text-anchor': 'middle', 'font-size': 16 });
    star.textContent = '⭐';
    [cupBody, handleL, handleR, star].forEach(e => trophy.appendChild(e));
    svg.appendChild(trophy);
    ctx.trophy = trophy;
    ctx.t = 0;
  },
  medidasAnimate: (ctx) => {
    ctx.t += 0.02;
    ctx.bars.forEach((b) => {
      b.current += (b.target - b.current) * 0.03;
      b.el.setAttribute('height', String(b.current));
      b.el.setAttribute('y', String(250 - b.current));
    });
    ctx.trophy.setAttribute('transform', `translate(130,${40 + Math.sin(ctx.t * 2) * 5})`);
  },

  /* 6. Pasión — llama + corazón pulsante */
  pasion: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#1a0a2e', rx: 24 });
    svg.appendChild(bg);
    // Llama grande
    ctx.flameParts = [];
    const flamePaths = [
      { d: 'M150,260 Q120,200 130,150 Q140,100 150,80 Q160,100 170,150 Q180,200 150,260Z', fill: '#e74c3c' },
      { d: 'M150,260 Q130,210 140,170 Q145,130 150,110 Q155,130 160,170 Q170,210 150,260Z', fill: '#f39c12' },
      { d: 'M150,260 Q140,220 145,190 Q148,160 150,140 Q152,160 155,190 Q160,220 150,260Z', fill: '#f1c40f' },
    ];
    flamePaths.forEach(fp => {
      const p = el('path', { d: fp.d, fill: fp.fill, opacity: 0.9 });
      svg.appendChild(p);
      ctx.flameParts.push(p);
    });
    // Partículas de fuego
    ctx.sparks = [];
    for (let i = 0; i < 12; i++) {
      const sp = el('circle', {
        cx: 140 + Math.random() * 20, cy: 100 + Math.random() * 60,
        r: 2 + Math.random() * 2, fill: '#f39c12', opacity: 0
      });
      svg.appendChild(sp);
      ctx.sparks.push({ el: sp, speed: 0.5 + Math.random() * 1.5, phase: Math.random() * Math.PI * 2 });
    }
    ctx.t = 0;
  },
  pasionAnimate: (ctx) => {
    ctx.t += 0.03;
    ctx.flameParts.forEach((p, i) => {
      const scale = 1 + Math.sin(ctx.t * (3 + i) + i) * 0.06;
      const tx = Math.sin(ctx.t * 2 + i * 2) * 3;
      p.setAttribute('transform', `translate(${tx},0) scale(${scale})`);
      p.setAttribute('transform-origin', '150px 260px');
    });
    ctx.sparks.forEach((s) => {
      const y = parseFloat(s.el.getAttribute('cy')) - s.speed;
      const newY = y < 60 ? 160 : y;
      s.el.setAttribute('cy', String(newY));
      s.el.setAttribute('cx', String(parseFloat(s.el.getAttribute('cx')) + Math.sin(ctx.t * 3 + s.phase) * 0.5));
      s.el.setAttribute('opacity', String(Math.max(0, (newY - 60) / 100 * 0.8)));
    });
  },

  /* 7. Fortalezas — estrella radiante */
  fortalezas: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#0a192f', rx: 24 });
    svg.appendChild(bg);
    // Rayos de luz
    ctx.rays = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const ray = el('line', {
        x1: 150, y1: 150,
        x2: 150 + Math.cos(angle) * 120, y2: 150 + Math.sin(angle) * 120,
        stroke: '#4facfe', strokeWidth: 2, opacity: 0.3
      });
      svg.appendChild(ray);
      ctx.rays.push(ray);
    }
    // Estrella central
    const starPath = 'M150,80 L165,130 L220,130 L175,160 L190,215 L150,180 L110,215 L125,160 L80,130 L135,130Z';
    ctx.star = el('path', { d: starPath, fill: '#f1c40f', stroke: '#f39c12', strokeWidth: 2 });
    svg.appendChild(ctx.star);
    // Partículas orbitando
    ctx.orbitals = [];
    for (let i = 0; i < 8; i++) {
      const orb = el('circle', {
        cx: 150, cy: 150, r: 4, fill: '#00f2fe', opacity: 0.7
      });
      svg.appendChild(orb);
      ctx.orbitals.push({ el: orb, radius: 70 + i * 10, speed: 0.5 + i * 0.15, phase: (i / 8) * Math.PI * 2 });
    }
    ctx.t = 0;
  },
  fortalezasAnimate: (ctx) => {
    ctx.t += 0.02;
    ctx.star.setAttribute('transform', `rotate(${ctx.t * 10}, 150, 150) scale(${1 + Math.sin(ctx.t * 2) * 0.05})`);
    ctx.star.setAttribute('transform-origin', '150px 150px');
    ctx.rays.forEach((r, i) => {
      r.setAttribute('opacity', String(0.15 + Math.sin(ctx.t * 3 + i) * 0.2));
      r.setAttribute('stroke-width', String(1.5 + Math.sin(ctx.t * 2 + i * 0.5) * 1));
    });
    ctx.orbitals.forEach((o) => {
      const angle = ctx.t * o.speed + o.phase;
      o.el.setAttribute('cx', String(150 + Math.cos(angle) * o.radius));
      o.el.setAttribute('cy', String(150 + Math.sin(angle) * o.radius));
      o.el.setAttribute('opacity', String(0.4 + Math.sin(ctx.t + o.phase) * 0.3));
    });
  },

  /* 8. Impacto — globo terráqueo girando */
  impacto: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#021c1e', rx: 24 });
    svg.appendChild(bg);
    // Planeta
    const planetG = el('g', {});
    const globe = el('circle', { cx: 150, cy: 150, r: 80, fill: '#1abc9c' });
    planetG.appendChild(globe);
    // Continentes simplificados (líneas meridianas + paralelos)
    ctx.meridians = [];
    for (let i = 0; i < 5; i++) {
      const offset = -60 + i * 30;
      const m = el('ellipse', {
        cx: 150 + offset, cy: 150, rx: 15, ry: 78,
        fill: 'none', stroke: '#0ba360', strokeWidth: 1.5, opacity: 0.4
      });
      planetG.appendChild(m);
      ctx.meridians.push(m);
    }
    for (let i = 0; i < 3; i++) {
      const p = el('ellipse', {
        cx: 150, cy: 120 + i * 30, rx: 78, ry: 8,
        fill: 'none', stroke: '#0ba360', strokeWidth: 1.5, opacity: 0.3
      });
      planetG.appendChild(p);
    }
    // Masas de tierra simples
    const land1 = el('ellipse', { cx: 130, cy: 130, rx: 25, ry: 18, fill: '#27ae60', opacity: 0.6 });
    const land2 = el('ellipse', { cx: 170, cy: 160, rx: 20, ry: 25, fill: '#27ae60', opacity: 0.5 });
    const land3 = el('ellipse', { cx: 140, cy: 185, rx: 15, ry: 10, fill: '#27ae60', opacity: 0.4 });
    [land1, land2, land3].forEach(e => planetG.appendChild(e));
    ctx.lands = [land1, land2, land3];
    svg.appendChild(planetG);
    ctx.planetG = planetG;
    // Corazones flotando alrededor
    ctx.hearts = [];
    for (let i = 0; i < 6; i++) {
      const h = el('text', { x: 150, y: 150, 'font-size': 16, opacity: 0 });
      h.textContent = '💚';
      svg.appendChild(h);
      ctx.hearts.push({ el: h, angle: (i / 6) * Math.PI * 2, dist: 100 + i * 5 });
    }
    ctx.t = 0;
  },
  impactoAnimate: (ctx) => {
    ctx.t += 0.015;
    ctx.meridians.forEach((m, i) => {
      const offset = ((ctx.t * 30 + i * 30) % 150) - 75;
      m.setAttribute('cx', String(150 + offset));
      m.setAttribute('opacity', String(0.3 - Math.abs(offset) / 300));
    });
    ctx.lands.forEach((l, i) => {
      const cx = parseFloat(l.getAttribute('cx')) + 0.3;
      l.setAttribute('cx', String(cx > 230 ? 70 : cx));
      l.setAttribute('opacity', String(0.5 - Math.abs(cx - 150) / 300));
    });
    ctx.hearts.forEach((h, i) => {
      const angle = ctx.t * 0.5 + h.angle;
      h.el.setAttribute('x', String(150 + Math.cos(angle) * h.dist));
      h.el.setAttribute('y', String(150 + Math.sin(angle) * h.dist));
      h.el.setAttribute('opacity', String(0.4 + Math.sin(ctx.t * 2 + i) * 0.3));
    });
  },

  /* 9. Filosofía — faro de luz */
  filosofia: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#1a0e2e', rx: 24 });
    svg.appendChild(bg);
    // Ondas de agua
    ctx.waves = [];
    for (let i = 0; i < 4; i++) {
      const w = el('path', {
        d: `M0,${240 + i * 15} Q75,${235 + i * 15} 150,${240 + i * 15} Q225,${245 + i * 15} 300,${240 + i * 15}`,
        stroke: '#3498db', strokeWidth: 2, fill: 'none', opacity: 0.3
      });
      svg.appendChild(w);
      ctx.waves.push(w);
    }
    // Mar
    const sea = el('rect', { x: 0, y: 245, width: 300, height: 55, fill: '#1a3a5c', rx: 0 });
    svg.appendChild(sea);
    // Faro
    const tower = el('path', { d: 'M140,240 L144,120 L156,120 L160,240Z', fill: '#ecf0f1' });
    svg.appendChild(tower);
    const top = el('rect', { x: 138, y: 110, width: 24, height: 15, fill: '#e74c3c', rx: 3 });
    svg.appendChild(top);
    const roofTop = el('polygon', { points: '135,112 150,95 165,112', fill: '#c0392b' });
    svg.appendChild(roofTop);
    // Haz de luz (cono)
    ctx.beam = el('path', {
      d: 'M150,115 L20,40 L280,40Z',
      fill: 'url(#beamGrad)', opacity: 0.15
    });
    const defs = el('defs', {});
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    grad.id = 'beamGrad';
    const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#f1c40f');
    const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', 'transparent');
    grad.appendChild(s1); grad.appendChild(s2);
    defs.appendChild(grad);
    svg.appendChild(defs);
    svg.appendChild(ctx.beam);
    // Luz pulsante
    ctx.light = el('circle', { cx: 150, cy: 115, r: 8, fill: '#f1c40f', opacity: 0.9 });
    svg.appendChild(ctx.light);
    ctx.t = 0;
  },
  filosofiaAnimate: (ctx) => {
    ctx.t += 0.02;
    const rot = Math.sin(ctx.t * 0.8) * 25;
    ctx.beam.setAttribute('transform', `rotate(${rot}, 150, 115)`);
    ctx.beam.setAttribute('opacity', String(0.1 + Math.sin(ctx.t * 2) * 0.06));
    ctx.light.setAttribute('r', String(6 + Math.sin(ctx.t * 3) * 3));
    ctx.light.setAttribute('opacity', String(0.7 + Math.sin(ctx.t * 3) * 0.3));
    ctx.waves.forEach((w, i) => {
      const shift = Math.sin(ctx.t * 1.5 + i * 0.8) * 10;
      w.setAttribute('transform', `translate(${shift}, 0)`);
    });
  },

  /* 10. Personas — figuras unidas con corazón */
  personas: (svg, ctx) => {
    svg.setAttribute('viewBox', '0 0 300 300');
    const bg = el('rect', { width: 300, height: 300, fill: '#1e0a3c', rx: 24 });
    svg.appendChild(bg);
    // Personas en semicírculo
    ctx.people = [];
    const positions = [
      { x: 80, y: 200 }, { x: 130, y: 170 }, { x: 150, y: 155 },
      { x: 170, y: 170 }, { x: 220, y: 200 }
    ];
    const pColors = ['#667eea', '#43e97b', '#f093fb', '#4facfe', '#fa709a'];
    positions.forEach((pos, i) => {
      const g = el('g', {});
      const head = el('circle', { cx: pos.x, cy: pos.y - 15, r: 10, fill: pColors[i] });
      const body = el('path', {
        d: `M${pos.x},${pos.y - 5} Q${pos.x - 8},${pos.y + 10} ${pos.x - 12},${pos.y + 30} M${pos.x},${pos.y - 5} Q${pos.x + 8},${pos.y + 10} ${pos.x + 12},${pos.y + 30}`,
        stroke: pColors[i], strokeWidth: 3, fill: 'none', strokeLinecap: 'round'
      });
      g.appendChild(head); g.appendChild(body);
      svg.appendChild(g);
      ctx.people.push(g);
    });
    // Líneas de conexión
    ctx.connections = [];
    for (let i = 0; i < positions.length - 1; i++) {
      const line = el('line', {
        x1: positions[i].x, y1: positions[i].y - 15,
        x2: positions[i + 1].x, y2: positions[i + 1].y - 15,
        stroke: '#c471f5', strokeWidth: 1.5, opacity: 0, strokeDasharray: '4,4'
      });
      svg.appendChild(line);
      ctx.connections.push(line);
    }
    // Corazón central grande
    const heartPath = 'M150,110 C150,95 135,80 120,80 C100,80 100,105 150,135 C200,105 200,80 180,80 C165,80 150,95 150,110Z';
    ctx.heart = el('path', { d: heartPath, fill: '#e74c3c', opacity: 0.8 });
    svg.appendChild(ctx.heart);
    // Partículas de amor
    ctx.loveParts = [];
    for (let i = 0; i < 10; i++) {
      const p = el('text', { x: 100 + Math.random() * 100, y: 80 + Math.random() * 60, 'font-size': 10, opacity: 0 });
      p.textContent = '💜';
      svg.appendChild(p);
      ctx.loveParts.push({ el: p, vy: -0.3 - Math.random() * 0.5, phase: Math.random() * Math.PI * 2 });
    }
    ctx.t = 0;
  },
  personasAnimate: (ctx) => {
    ctx.t += 0.02;
    ctx.people.forEach((p, i) => {
      p.setAttribute('transform', `translate(0,${Math.sin(ctx.t * 1.5 + i * 0.8) * 4})`);
    });
    ctx.connections.forEach((c, i) => {
      const reveal = Math.min(1, ctx.t * 0.5 - i * 0.3);
      c.setAttribute('opacity', String(Math.max(0, reveal * 0.5)));
      c.setAttribute('stroke-dashoffset', String(-ctx.t * 10));
    });
    ctx.heart.setAttribute('transform', `translate(0,${Math.sin(ctx.t * 1.2) * 5}) scale(${1 + Math.sin(ctx.t * 2) * 0.05})`);
    ctx.heart.setAttribute('transform-origin', '150px 110px');
    ctx.loveParts.forEach((lp) => {
      let y = parseFloat(lp.el.getAttribute('y')) + lp.vy;
      if (y < 60) { y = 140; lp.el.setAttribute('x', String(100 + Math.random() * 100)); }
      lp.el.setAttribute('y', String(y));
      lp.el.setAttribute('opacity', String(Math.max(0, (y - 60) / 80 * 0.6)));
    });
  }
};

/* helper — crea un element SVG */
function el(tag, attrs) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

export default function StoryScene({ sceneId }) {
  const svgRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // Limpiar SVG previo
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const initFn = SCENES[sceneId];
    const animFn = SCENES[sceneId + 'Animate'];
    if (!initFn) return;

    const ctx = { stars: [], t: 0 };
    initFn(svg, ctx);

    if (animFn) {
      const loop = () => {
        animFn(ctx);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sceneId]);

  return (
    <div className="scene-wrapper">
      <svg ref={svgRef} className="scene-svg" />
    </div>
  );
}
