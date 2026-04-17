import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import './app.css';

import { PALETTE, TYPE, THEMES, alpha, TREE_BLUEPRINT, themeToVars } from './tokens.js';
import { CASE_STUDIES } from './data.js';
import {
  Tag, SectionLabel, GlossaryPanel,
  ArrowRight, ArrowUpRight, Twitter, Mail, Check,
} from './components/shared.jsx';

// ─── LAZY PAGE ROUTES ─────────────────────────────────────────────────────────
const CaseStudy  = lazy(() => import('./pages/CaseStudy.jsx'));
const DesignSystem = lazy(() => import('./pages/DesignSystem.jsx'));

// ─── HERO SCENE (canvas) ──────────────────────────────────────────────────────
const HeroScene = ({ scrollY, theme, density = 300, fogLevel = 80, fogTopOpacity = 0, fogBottomOpacity = 50 }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef(null);

  // Store mutable props in refs so the render loop reads them live
  // without the useEffect needing to restart
  const propsRef = useRef({ density, fogLevel, fogTopOpacity, fogBottomOpacity });
  propsRef.current = { density, fogLevel, fogTopOpacity, fogBottomOpacity };

  // Stars and particles are created once and persist across density changes
  const starsRef = useRef(null);
  const particlesRef = useRef(null);
  if (!starsRef.current) {
    starsRef.current = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.55,
      r: Math.random() < 0.08 ? 1.4 + Math.random() * 0.8 : Math.random() * 1.0 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.2,
      bloom: Math.random() < 0.12,
    }));
  }
  if (!particlesRef.current) {
    particlesRef.current = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random(),
      y: 0.3 + Math.random() * 0.4,
      vy: -(0.00015 + Math.random() * 0.0006),
      vx: (Math.random() - 0.5) * 0.00012,
      size: 1 + Math.random() * (i % 5 === 0 ? 4 : 2.5),
      alpha: Math.random(),
      phase: Math.random() * Math.PI * 2,
      wobble: 0.0001 + Math.random() * 0.0002,
    }));
  }

  useEffect(() => {
    const isDark = theme === 'midnight';
    const stars = starsRef.current;
    const particles = particlesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // ── seeded RNG — stable per-layer across frames ──────────────────────────
    const seededRng = (seed) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };

    // ── blueprint treeline — parabolic valley, SPIRE/SHARD mix ───────────────
    const valleyCurve = (cx) => Math.pow(Math.abs(cx - 0.5) * 2, 2.2);

    const layerConfigs = [
      { factor: 0.30, scale: 0.45, opacity: 0.30, groundBase: 0.92 },
      { factor: 0.35, scale: 0.60, opacity: 0.60, groundBase: 0.95 },
      { factor: 0.35, scale: 0.80, opacity: 1.00, groundBase: 0.98 },
    ];

    // Pre-generate a large pool of trees per layer (max density 500)
    // At render time, only draw up to propsRef.current.density
    const maxDensity = 500;
    const treeLayers = layerConfigs.map((cfg, layerIdx) => {
      const poolSize = Math.round(maxDensity * cfg.factor);
      const rng = seededRng(layerIdx * 7919 + 1);
      const trees = Array.from({ length: poolSize }, () => {
        const cx = rng();
        const centerDip = valleyCurve(cx);
        const baseH = 120 + centerDip * 280;
        const scaleVar = 0.7 + rng() * 0.5;
        const groundY = cfg.groundBase + (rng() - 0.5) * 0.03;
        return { cx, baseH, scaleVar, groundY };
      });
      return { trees, factor: cfg.factor, scale: cfg.scale, opacity: cfg.opacity };
    });

    // ── draw blueprint tree via Path2D ───────────────────────────────────────
    // SVG viewBox is 256×696 — centre at x=128, base at y=696
    const drawBlueprintTree = (ctx, tree, layerScale, w, h, color) => {
      const px = tree.cx * w;
      const py = tree.groundY * h;
      const treePixelH = (tree.baseH / 100) * h * 0.25 * layerScale * tree.scaleVar;
      const scaleFactor = treePixelH / 696;

      ctx.save();
      ctx.translate(px, py);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.translate(-128, -696);  // anchor at centre-bottom of 256×696 viewBox
      ctx.fillStyle = color;
      ctx.fill(TREE_BLUEPRINT);
      ctx.restore();
    };

    stateRef.current = { t: 0 };

    const drawDiamond = (ctx, x, y, r) => {
      ctx.beginPath();
      ctx.moveTo(x,     y - r);
      ctx.lineTo(x + r, y);
      ctx.lineTo(x,     y + r);
      ctx.lineTo(x - r, y);
      ctx.closePath();
    };

    // ── render loop ───────────────────────────────────────────────────────────
    const render = (now) => {
      rafRef.current = requestAnimationFrame(render);
      const s = stateRef.current;
      s.t = now * 0.001;

      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      // ── sky ──
      if (isDark) {
        // gradient: deep top → brighter blue near horizon → dark at bottom
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0,    PALETTE.jaguar[950]);
        sky.addColorStop(0.45, PALETTE.downriver[700]);
        sky.addColorStop(0.62, PALETTE.downriver[600]);
        sky.addColorStop(0.80, PALETTE.jaguar[900]);
        sky.addColorStop(1,    PALETTE.jaguar[950]);
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        // horizon glow — bright bloom behind the treetops
        const glow = ctx.createRadialGradient(w * 0.5, h * 0.65, 0, w * 0.5, h * 0.65, w * 0.55);
        glow.addColorStop(0,   alpha(PALETTE.downriver[500], 0.30));
        glow.addColorStop(0.3, alpha(PALETTE.jaguar[700], 0.18));
        glow.addColorStop(1,   'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);

        const a2 = 0.06 + 0.04 * Math.sin(s.t * 0.5);
        const glow2 = ctx.createRadialGradient(w * 0.5, h * 0.62, 0, w * 0.5, h * 0.62, w * 0.35);
        glow2.addColorStop(0, alpha(PALETTE.downriver[400], a2));
        glow2.addColorStop(1, 'transparent');
        ctx.fillStyle = glow2;
        ctx.fillRect(0, 0, w, h);
      } else {
        // flat white — no gradient, no glow, no line
        ctx.fillStyle = PALETTE.jaguar[50];
        ctx.fillRect(0, 0, w, h);
      }

      // ── stars (midnight only) — varied sizes, some with bloom ──
      if (isDark) {
        for (const star of stars) {
          const sa = 0.3 + 0.7 * Math.sin(star.phase + s.t * star.speed);
          const sx = star.x * w;
          const sy = star.y * h;
          if (star.bloom) {
            ctx.save();
            ctx.shadowColor = PALETTE.downriver[200];
            ctx.shadowBlur = 6 + 4 * sa;
            ctx.beginPath();
            ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
            ctx.fillStyle = alpha(PALETTE.jaguar[50], sa * 0.9);
            ctx.fill();
            ctx.restore();
          } else {
            ctx.beginPath();
            ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
            ctx.fillStyle = alpha(PALETTE.jaguar[200], sa * 0.85);
            ctx.fill();
          }
        }
      }

      // ── layered treeline — back to front, increasing darkness ──
      const curDensity = propsRef.current.density;
      for (const layer of treeLayers) {
        const count = Math.round(curDensity * layer.factor);
        const layerAlpha = isDark ? layer.opacity : layer.opacity * 0.35;
        const treeCol = isDark
          ? alpha(PALETTE.jaguar[950], layerAlpha)
          : alpha(PALETTE.jaguar[300], layerAlpha * 0.6);
        for (let i = 0; i < count && i < layer.trees.length; i++) drawBlueprintTree(ctx, layer.trees[i], layer.scale, w, h, treeCol);
      }

      // particles — subtle floating diamonds above treeline
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + p.wobble * Math.sin(s.t * 1.1 + p.phase);
        p.alpha += 0.006 + Math.abs(p.vy) * 4;
        if (p.y < -0.05 || p.x < -0.05 || p.x > 1.05 || p.alpha > 1) {
          p.x     = Math.random();
          p.y     = 0.55 + Math.random() * 0.25;
          p.alpha = 0;
          p.vx    = (Math.random() - 0.5) * 0.00012;
          p.vy    = -(0.00015 + Math.random() * 0.0005);
          p.size  = 1 + Math.random() * 3;
        }
        const fade = Math.sin(p.alpha * Math.PI);
        ctx.save();
        ctx.globalAlpha = fade * (isDark ? 0.55 : 0.30);
        ctx.shadowColor = PALETTE.downriver[300];
        ctx.shadowBlur  = p.size > 2.5 ? 8 : 4;
        drawDiamond(ctx, p.x * w, p.y * h, p.size);
        ctx.fillStyle = isDark
          ? alpha(PALETTE.downriver[200], 0.85)
          : alpha(PALETTE.downriver[400], 0.5);
        ctx.fill();
        ctx.restore();
      }

      // ground fog — reads live from propsRef
      const bgColor = isDark ? PALETTE.jaguar[950] : PALETTE.jaguar[50];
      const p = propsRef.current;
      const fogStart = p.fogLevel / 100;
      const topAlpha = p.fogTopOpacity / 100;
      const botAlpha = p.fogBottomOpacity / 100;
      const fog = ctx.createLinearGradient(0, h * fogStart, 0, h);
      fog.addColorStop(0, 'transparent');
      fog.addColorStop(0.3, alpha(bgColor, topAlpha));
      fog.addColorStop(0.7, alpha(bgColor, botAlpha));
      fog.addColorStop(1, bgColor);
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w, h);
      // solid fill at very bottom
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, h * 0.95, w, h * 0.05 + 1);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: Math.max(0, 1 - scrollY / 480),
        transition: 'opacity 0.08s linear',
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PATTERNS — Composed layouts and interaction flows
// ═══════════════════════════════════════════════════════════════════════════════

// ─── LAB ARTIFACT CANVAS ─────────────────────────────────────────────────────
// Each project gets a unique generative canvas — a living visual fingerprint.
const LabCanvas = ({ type, theme, animating = false }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const animatingRef = useRef(animating);
  const renderRef = useRef(null);
  const hasDrawnRef = useRef(false);

  useEffect(() => { animatingRef.current = animating; }, [animating]);

  // Start/stop animation loop based on animating prop
  useEffect(() => {
    if (animating && renderRef.current) {
      rafRef.current = requestAnimationFrame(renderRef.current);
    }
    if (!animating) {
      cancelAnimationFrame(rafRef.current);
    }
  }, [animating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isDark = theme === 'midnight';

    let cw = 0, ch = 0;
    let drawStaticFrame = null; // set by each canvas type
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * devicePixelRatio;
      canvas.height = ch * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      // Redraw static frame on resize if not actively animating
      if (!animatingRef.current && drawStaticFrame) {
        requestAnimationFrame(drawStaticFrame);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const W = () => cw;
    const H = () => ch;

    if (type === 'network') {
      // ── KIZUNA: Network graph — nodes connected by lines ──
      const nodes = Array.from({ length: 40 }, () => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        r: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      }));

      const drawFrame = (now) => {
        const w = W(), h = H();
        ctx.clearRect(0, 0, w, h);
        const time = now * 0.001;
        const nodeColor = isDark ? PALETTE.downriver[300] : PALETTE.downriver[500];
        const lineColor = isDark ? PALETTE.downriver[300] : PALETTE.downriver[400];

        if (animatingRef.current) {
          for (const n of nodes) {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > 1) n.vx *= -1;
            if (n.y < 0 || n.y > 1) n.vy *= -1;
          }
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = (nodes[i].x - nodes[j].x) * w;
            const dy = (nodes[i].y - nodes[j].y) * h;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              const a = (1 - dist / 100) * 0.3;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
              ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
              ctx.strokeStyle = alpha(lineColor, a);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        for (const n of nodes) {
          const pulse = 0.5 + 0.5 * Math.sin(n.phase + time * 0.8);
          ctx.beginPath();
          ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2);
          ctx.fillStyle = alpha(nodeColor, 0.3 + pulse * 0.5);
          ctx.fill();
          if (n.r > 3) {
            ctx.beginPath();
            ctx.arc(n.x * w, n.y * h, n.r + 4 * pulse, 0, Math.PI * 2);
            ctx.fillStyle = alpha(nodeColor, pulse * 0.1);
            ctx.fill();
          }
        }
      };

      const render = (now) => {
        drawFrame(now);
        if (animatingRef.current) {
          rafRef.current = requestAnimationFrame(render);
        }
      };
      renderRef.current = render;
      drawStaticFrame = drawFrame;

      // Draw initial static frame after layout (rAF ensures dimensions are ready)
      requestAnimationFrame((now) => {
        drawFrame(now);
        hasDrawnRef.current = true;
      });

      if (animatingRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }

    } else if (type === 'swarm') {
      // ── WOLVES: Pack movement — coordinated swarm particles ──
      const wolves = Array.from({ length: 60 }, (_, i) => {
        const pack = Math.floor(i / 15);
        const cx = 0.2 + pack * 0.25;
        const cy = 0.3 + (pack % 2) * 0.3;
        return {
          x: cx + (Math.random() - 0.5) * 0.15,
          y: cy + (Math.random() - 0.5) * 0.15,
          pack, speed: 0.0004 + Math.random() * 0.0006,
          angle: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 2,
          trail: [],
        };
      });
      const packTargets = [
        { x: 0.3, y: 0.4 }, { x: 0.7, y: 0.6 },
        { x: 0.5, y: 0.3 }, { x: 0.6, y: 0.7 },
      ];

      const drawFrame = (now) => {
        const w = W(), h = H();
        ctx.clearRect(0, 0, w, h);
        const time = now * 0.001;
        const wolfColor = isDark ? PALETTE.jaguar[300] : PALETTE.jaguar[600];
        const trailColor = isDark ? PALETTE.jaguar[500] : PALETTE.jaguar[400];

        for (let p = 0; p < 4; p++) {
          packTargets[p].x = 0.3 + 0.4 * Math.sin(time * 0.15 + p * 1.5);
          packTargets[p].y = 0.3 + 0.3 * Math.cos(time * 0.12 + p * 2.0);
        }

        for (const wolf of wolves) {
          const target = packTargets[wolf.pack];
          const dx = target.x - wolf.x;
          const dy = target.y - wolf.y;
          const targetAngle = Math.atan2(dy, dx);
          let angleDiff = targetAngle - wolf.angle;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          if (animatingRef.current) {
            wolf.angle += angleDiff * 0.03;
            wolf.x += Math.cos(wolf.angle) * wolf.speed;
            wolf.y += Math.sin(wolf.angle) * wolf.speed;
            wolf.trail.push({ x: wolf.x, y: wolf.y });
            if (wolf.trail.length > 12) wolf.trail.shift();
          }

          for (let i = 0; i < wolf.trail.length - 1; i++) {
            const a = (i / wolf.trail.length) * 0.15;
            ctx.beginPath();
            ctx.arc(wolf.trail[i].x * w, wolf.trail[i].y * h, wolf.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = alpha(trailColor, a);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(wolf.x * w, wolf.y * h, wolf.size, 0, Math.PI * 2);
          ctx.fillStyle = alpha(wolfColor, 0.7);
          ctx.fill();
        }
      };

      const render = (now) => {
        drawFrame(now);
        if (animatingRef.current) {
          rafRef.current = requestAnimationFrame(render);
        }
      };
      renderRef.current = render;
      drawStaticFrame = drawFrame;

      // Draw initial static frame after layout (rAF ensures dimensions are ready)
      requestAnimationFrame((now) => {
        drawFrame(now);
        hasDrawnRef.current = true;
      });

      if (animatingRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [type, theme]);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};

// ─── LAB ARTIFACTS DATA ──────────────────────────────────────────────────────
const LAB_FEATURED = [
  {
    title: 'KIZUNA',
    desc: 'Discord-native community intelligence platform. Turns messages, voice hours, and real contribution into automatic recognition through Smart Raffles.',
    url: '#kizuna',
    tags: ['COMMUNITY AI', 'PRODUCT'],
    status: 'LIVE',
    active: true,
    canvas: 'network',
  },
  {
    title: 'WOLVES',
    desc: 'Premier network for builders. Brand architecture and design system for a professional space where founders, creators, investors, and operators level up together.',
    url: 'https://www.wolves.co',
    tags: ['BRAND', 'NETWORK'],
    status: 'LIVE',
    active: false,
    canvas: 'swarm',
  },
];

const LAB_INDEX = [
  { title: 'LAUWVERSE_OS', desc: 'This site. Interactive portfolio, behavioral design playground, and living brand system.', url: '/case/lauwverse-os', tags: ['VIBE_CODE'], status: 'LIVE' },
  { title: 'BRAND_OS', desc: 'Design token library and interactive primitives powering every Lauwverse surface.', url: '#design', tags: ['DESIGN'], status: 'v1.7' },
];

// ─── LAB CARD (featured, with hover-activated canvas) ────────────────────────
const LabCard = ({ project, theme, t, onTagClick, onNavigate }) => {
  const [hovered, setHovered] = useState(false);
  const isInternal = project.url.startsWith('#');
  const handleClick = isInternal ? (e) => {
    e.preventDefault();
    const slug = project.url.slice(1);
    onNavigate?.(slug);
    window.scrollTo({ top:0 });
  } : undefined;
  return (
    <article>
      <a className="lab-card__link" href={project.url}
        target={isInternal ? undefined : '_blank'}
        rel={isInternal ? undefined : 'noopener noreferrer'}
        onClick={handleClick}
        style={{ background: hovered ? t.bgHover : t.bg }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="lab-card__visual">
          <LabCanvas type={project.canvas} theme={theme} animating={hovered} />
          <h3 className="lab-card__title" style={{
            ...TYPE.display.xl, color:t.text,
            textShadow: theme === 'midnight' ? '0 2px 20px rgba(3,2,14,0.8)' : '0 2px 20px rgba(240,240,249,0.6)',
          }}>{project.title}</h3>
        </div>

        <div className="lab-card__body">
          <p style={{ ...TYPE.body.sm, color:t.textMuted }}>{project.desc}</p>
        </div>

        <div className="lab-card__footer">
          <div className="lab-card__tags">
            {project.tags.map(tag => (
              <Tag key={tag} t={t} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick(tag); }}>{tag}</Tag>
            ))}
          </div>
          <span style={{ ...TYPE.mono.sm, fontSize:'0.6875rem', letterSpacing:'0.25em', color: hovered ? t.accent : t.accentFaint, transition:'color 0.3s' }}>ENTER &#8599;</span>
        </div>
      </a>
    </article>
  );
};

// ─── Style shorthand helpers (module-scope — created once, not per render) ────
/** @param {string} color @param {Object} [extra] @returns {Object} */
const μ = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.4em', color, ...extra });   // micro label
/** @param {string} color @param {Object} [extra] @returns {Object} */
const τ = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.2em', color, ...extra });   // tiny label
/** @param {string} color @param {Object} [extra] @returns {Object} */
const β = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.5em', color, ...extra });   // btn

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme]           = useState('midnight');
  const [emailCopied, setEmailCopied] = useState(false);
  const [page, setPage]             = useState('home');
  const [treeDensityTarget] = useState(() => 200 + Math.floor(Math.random() * 200));
  const [treeDensity, setTreeDensity] = useState(20);
  const fogLevel = 75;
  const fogTopOpacity = 0;
  const fogBottomOpacity = 100;
  const [mousePos, setMousePos]     = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered]   = useState(false);
  const [scrollY, setScrollY]       = useState(0);
  const [signalFilter, setSignalFilter] = useState('ALL');
  const [glossaryTag, setGlossaryTag]   = useState(null);
  const textRef = useRef(null);
  const t = THEMES[theme];

  const openGlossary = (tag) => setGlossaryTag(tag);
  const closeGlossary = () => setGlossaryTag(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(scrollTimerRef.current); };
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const ids = ['lab', 'signal', 'protocol'];
    const observers = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [page]);

  // Animate tree density from sparse → target over ~30 seconds (feels alive)
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 60000;
    const from = 20;
    const to = treeDensityTarget;
    const ease = (t) => 1 - Math.pow(1 - t, 2.5); // gentle ease-out
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setTreeDensity(Math.round(from + (to - from) * ease(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [treeDensityTarget]);

  // Mobile menu — Escape to close + body scroll lock
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const factor = 16;
    setMousePos({
      x: ((e.clientX - (rect.left + rect.width / 2))  / (rect.width  / 2)) * factor,
      y: ((e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)) * (factor / 2),
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@lauwverse.io');
    } catch {
      // Clipboard API unavailable — still show feedback so UX doesn't break
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const signalLog = [
    { date: '15.APR', title: 'Behavior_vs_Sentiment_Manifesto',  type: 'THINKING', source: 'Lauwverse',    note: 'Why sentiment is the wrong north star for AI products.',         link: '/signal/behavior-vs-sentiment' },
    { date: '12.APR', title: 'Kizuna_v2_Spec_Sprint',            type: 'BUILD',    source: 'Kizuna',       note: 'Smart Raffles v2 and contribution signal tuning.',               link: null },
    { date: '04.APR', title: 'Lauwverse_Portfolio_Rebuild',      type: 'BUILD',    source: 'Self',         note: 'New hero, expanded Lab, full SEO + GEO pass.',                  link: null },
    { date: '01.APR', title: 'Claude_Code_Skills_Architecture',  type: 'READING',  source: 'Anthropic Docs', note: 'How Claude Code skill injection works under the hood.',        link: null },
    { date: '28.MAR', title: 'Agentic_Interface_Sprint',         type: 'BUILD',    source: 'Kizuna',       note: 'Designing for AI agents as first-class users.',                 link: null },
    { date: '25.MAR', title: 'Community_Signal_Processing',      type: 'THINKING', source: 'Research',     note: 'What real contribution looks like vs. what gets counted.',      link: null },
    { date: '22.MAR', title: 'Neural_Design_Tokens_v2',          type: 'BUILD',    source: 'Brand OS',     note: 'Semantic token architecture for dual-theme systems.',           link: null },
  ];

  const signalTypes = ['ALL', 'BUILD', 'READING', 'THINKING'];
  const filteredSignal = signalFilter === 'ALL' ? signalLog : signalLog.filter(s => s.type === signalFilter);

  const lineage = [
    { year: '2020-NOW',  entity: 'LAUW_STUDIO',   role: 'Design Partner',   tags: ['AI', 'PRODUCT', 'VIBE CODE'] },
    { year: '2011-2025', entity: 'LEAD_DESIGNER',  role: 'UX/UI Design',    tags: ['WCAG', 'ENTERPRISE', 'BEHAVIOR', 'DESIGN SYSTEMS'] },
  ];

  const isGlitching = isHovered || isScrolling;

  const glitchShadow = isGlitching
    ? `${mousePos.x}px ${mousePos.y}px ${t.glitchA}, ${-mousePos.x}px ${-mousePos.y}px ${t.glitchB}, 0 0 30px ${t.glitchGlow}`
    : 'none';

  const futureTitleStyle = {
    ...TYPE.display.hero,
    cursor: 'default', userSelect: 'none',
    color: 'transparent',
    WebkitTextStroke: t.stroke,
    textShadow: glitchShadow,
    transition: 'color 0.5s ease',
    animationDuration: '0.80s',
    animationName: isGlitching ? 'delayed-shard-jitter' : 'none',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'steps(1)',
  };

  return (
    <div className="site" style={themeToVars(t)}>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <header>
      <nav className="nav">
        <button className="nav__brand" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} aria-label="Back to top">
          <div className="nav__pulse" />
          <span style={{ ...μ(t.text), transition:'color 0.5s ease' }}>LAUWVERSE</span>
        </button>
        <div className="nav__links">
          {[{ label:'LAB', id:'lab' }, { label:'SIGNAL', id:'signal' }, { label:'ORIGIN', id:'protocol' }].map(({ label, id }) => (
            <button key={id}
              className={`nav__link${activeSection === id ? ' nav__link--active' : ''}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })}
              style={{ ...TYPE.mono.sm, letterSpacing: '0.4em' }}
            >{label}</button>
          ))}
          <button className="nav__theme-toggle"
            onClick={() => setTheme(theme === 'midnight' ? 'primal' : 'midnight')}
            style={μ(t.accentSecondary)}
          >{t.toggleLabel}</button>
        </div>
        {/* Hamburger — mobile only */}
        <button
          className={`nav__hamburger${mobileMenuOpen ? ' nav__hamburger--open' : ''}`}
          onClick={() => setMobileMenuOpen(v => !v)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="nav__hamburger-bar" />
          <span className="nav__hamburger-bar" />
          <span className="nav__hamburger-bar" />
        </button>
      </nav>
      </header>

      {/* ── MOBILE MENU ──────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`mobile-menu${mobileMenuOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {[{ label:'LAB', id:'lab' }, { label:'SIGNAL', id:'signal' }, { label:'ORIGIN', id:'protocol' }].map(({ label, id }) => (
            <button
              key={id}
              className="mobile-menu__link"
              onClick={() => {
                setMobileMenuOpen(false);
                setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' }), 300);
              }}
            >{label}</button>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <button
            className="mobile-menu__theme-toggle"
            onClick={() => setTheme(theme === 'midnight' ? 'primal' : 'midnight')}
          >
            {t.toggleLabel}
          </button>
          <div className="mobile-menu__contact">
            <a
              href="https://twitter.com/lauwverse"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu__contact-link"
            >
              <Twitter size={14} /> @LAUWVERSE
            </a>
            <button className="mobile-menu__contact-link" onClick={copyEmail}>
              {emailCopied
                ? <><Check size={14} /> COPIED!</>
                : <><Mail  size={14} /> HELLO@LAUWVERSE.IO</>
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
      {page === 'design' ? (
        <Suspense fallback={null}>
          <DesignSystem t={t} onBack={() => setPage('home')} />
        </Suspense>
      ) : CASE_STUDIES[page] ? (
        <Suspense fallback={null}>
          <CaseStudy study={CASE_STUDIES[page]} t={t} onBack={() => { setPage('home'); window.scrollTo({ top:0 }); }} onTagClick={openGlossary} />
        </Suspense>
      ) : (<>

        {/* HERO — full width */}
        <section className="hero animate-in">
          <HeroScene scrollY={scrollY} theme={theme} density={treeDensity} fogLevel={fogLevel} fogTopOpacity={fogTopOpacity} fogBottomOpacity={fogBottomOpacity} />

          {/* HERO TITLE — parallax cross (single semantic h1) */}
          <h1 className="hero__titles">
            <span style={{ ...TYPE.display.hero, color:t.text, transform:`translateY(${scrollY*0.12}px)`, willChange:'transform', transition:'color 0.5s ease', display:'block' }}>PRIMAL</span>
            <span ref={textRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setMousePos({x:0,y:0}); }} style={{ display:'inline-block', overflow:'visible', transform:`translateY(${-scrollY*0.18}px)`, willChange:'transform' }}>
              <span style={{ ...futureTitleStyle, display:'block' }}>FUTURE.</span>
            </span>
          </h1>

          {/* HERO INTRODUCTION — tagline + subline + actions */}
          <div className="hero__intro">
            <div className="hero__intro-copy">
              <p className="hero__tagline-line" style={{ ...TYPE.body.xl, color:t.text }}>
                Designing for behavior, not sentiment.
              </p>
              <p className="hero__subline" style={{ ...TYPE.mono.md, color:t.textMuted }}>
                BEHAVIORAL PRODUCTS AND BRAND SYSTEMS FOR AI COMPANIES.
              </p>
            </div>
            <div className="hero__actions">
              <button className="hero__cta hero__cta--primary"
                onClick={() => document.getElementById('lab')?.scrollIntoView({ behavior:'smooth', block:'start' })}
                style={TYPE.label.md}
              >
                <span className="hero__cta-label">ENTER THE LAB</span>
                <span className="hero__cta-shadow" aria-hidden="true" />
              </button>
              <button className="hero__cta hero__cta--secondary"
                onClick={() => document.getElementById('signal')?.scrollIntoView({ behavior:'smooth', block:'start' })}
                style={TYPE.mono.sm}
              >
                SIGNAL FEED
                <span className="hero__cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

      <main id="main-content" className="main">

        {/* LAB ARTIFACTS */}
        <section id="lab" className="section section--lab">
          <SectionLabel filled="Lab" outline="Output" tagline="What I make. Products, systems, and the things in between." t={t} />

          {/* Featured — 2-column canvas cards */}
          <div role="list" className="lab__grid">
            {LAB_FEATURED.map(project => (
              <LabCard key={project.title} project={project} theme={theme} t={t} onTagClick={openGlossary} onNavigate={setPage} />
            ))}
          </div>

          {/* Index — full-width horizontal bars */}
          <div className="lab__index">
            {LAB_INDEX.map(project => (
              <a key={project.title} className="lab__index-item"
                href={project.url === '#design' ? undefined : project.url}
                target={project.url.startsWith('http') ? '_blank' : undefined}
                rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={project.url === '#design' ? (e) => { e.preventDefault(); setPage('design'); window.scrollTo({ top:0 }); } : undefined}
              >
                <div className="lab__index-info">
                  <h3 style={{ ...TYPE.display.lg, color:t.text, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{project.title}</h3>
                  <p style={{ ...TYPE.body.sm, color:t.textMuted, flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{project.desc}</p>
                </div>
                <div className="lab__index-meta">
                  {project.tags.map(tag => (
                    <Tag key={tag} t={t} onClick={(e) => { e.preventDefault(); e.stopPropagation(); openGlossary(tag); }}>{tag}</Tag>
                  ))}
                  <ArrowRight size={14} style={{ color:t.accent }} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── SIGNAL — Living Log ── */}
        <section id="signal" className="section section--signal">
          <SectionLabel filled="Signal" outline="Feed" tagline="Low noise log. Signals I pick up and can't stop thinking about." t={t} />

          {/* Filter buttons */}
          <div className="signal__filters">
            {signalTypes.map(type => (
              <button key={type} className="signal__filter-btn"
                onClick={(e) => {
                  setSignalFilter(type);
                  const parent = e.currentTarget.parentElement;
                  parent.classList.remove('filter-glitch');
                  void parent.offsetWidth;
                  parent.classList.add('filter-glitch');
                }}
                style={{
                  ...TYPE.mono.sm, fontSize:'0.625rem', letterSpacing:'0.25em',
                  color: signalFilter === type ? t.text : t.textFaint,
                  background: signalFilter === type ? alpha(t.accent, 0.12) : 'transparent',
                  border: `1px solid ${signalFilter === type ? t.accent : t.border}`,
                }}
                onMouseEnter={e => { if (signalFilter !== type) { e.currentTarget.style.borderColor = t.borderStrong; e.currentTarget.style.color = t.textMuted; }}}
                onMouseLeave={e => { if (signalFilter !== type) { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textFaint; }}}
              >{type}</button>
            ))}
            <span className="signal__count" aria-live="polite" aria-atomic="true" style={{ ...TYPE.mono.sm, fontSize:'0.5625rem', letterSpacing:'0.2em', color:t.textFaint }}>
              {filteredSignal.length} ENTRIES
            </span>
          </div>

          {/* Log entries */}
          <ol className="signal__list">
            {filteredSignal.map((entry, i) => {
              const inner = (
                <>
                  <div className="signal__entry-info">
                    <time style={τ(t.textMuted, { minWidth:56, flexShrink:0, fontSize:'0.6875rem' })}>{entry.date}</time>
                    <div className="signal__entry-text">
                      <h3 className="signal__entry-title">{entry.title}</h3>
                      {entry.note && <p className="signal__entry-note" style={{ ...TYPE.body.sm, color:t.textMuted, marginTop:2 }}>{entry.note}</p>}
                    </div>
                  </div>
                  <div className="signal__entry-meta">
                    <span style={{ ...TYPE.mono.sm, fontSize:'0.5625rem', letterSpacing:'0.15em', color:t.textFaint, textTransform:'none' }}>{entry.source}</span>
                    <Tag t={t} size="md" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openGlossary(entry.type); }}>{entry.type}</Tag>
                  </div>
                </>
              );
              return entry.link ? (
                <li key={`${entry.date}-${entry.title}`}
                  className="signal__entry signal__entry--animate signal__entry--linked"
                  style={{ animationDelay:`${i * 0.04}s` }}
                >
                  <a href={entry.link} className="signal__entry-link">{inner}</a>
                </li>
              ) : (
                <li key={`${entry.date}-${entry.title}`}
                  className="signal__entry signal__entry--animate"
                  style={{ animationDelay:`${i * 0.04}s` }}
                >
                  {inner}
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── ORIGIN — Lineage + Process + Connect ── */}
        <section id="protocol" className="section section--origin">
          <SectionLabel filled="Origin" outline="Arc" tagline="How I got here. How I work. How to reach me." t={t} />

          {/* ABOUT */}
          <div className="origin__subsection" style={{ marginBottom:64 }}>
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>ABOUT</h3>
            <p style={{ ...TYPE.body.md, color:t.textSecondary, maxWidth:640, lineHeight:1.6 }}>
              I'm Laurens, a product designer working at the intersection of behavioral design, UX/UI, and AI.
              Lauwverse is my lab and my lens. I build products, interfaces, and brand systems for AI companies
              and the teams building with AI, with one rule: design for behavior, not sentiment.
              Kizuna, a community intelligence platform, is the current flagship coming out of the lab.
            </p>
          </div>

          {/* LINEAGE */}
          <div className="origin__subsection">
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>LINEAGE</h3>
            <ul className="lineage__list">
              {lineage.map((item, i) => (
                <li key={i} className="lineage__item">
                  <div className="lineage__item-info">
                    <time style={τ(t.textMuted, { minWidth:88, flexShrink:0 })}>{item.year}</time>
                    <div>
                      <h3 className="lineage__item-entity" style={{ color:t.text }}>{item.entity}</h3>
                      <p className="lineage__item-role" style={{ color:t.textMuted }}>{item.role}</p>
                    </div>
                  </div>
                  <div className="lineage__item-tags">
                    {item.tags.map(tag => (
                      <Tag key={tag} t={t} onClick={() => openGlossary(tag)}>{tag}</Tag>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* PROCESS */}
          <div className="origin__subsection">
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>PROCESS</h3>
            <div className="process__grid">
              {[
                {
                  phase: 'THINK', num: '01',
                  desc: 'Pattern recognition before execution. Map the behavior you want to create or break before touching a pixel. Example: before redesigning a Discord onboarding, audit which first-session actions predict month-two retention.',
                  tools: [
                    { name: 'Claude', url: 'https://claude.ai' },
                    { name: 'Perplexity', url: 'https://perplexity.ai' },
                    { name: 'Gemini', url: 'https://gemini.google.com' },
                  ],
                },
                {
                  phase: 'DESIGN', num: '02',
                  desc: 'Systems before aesthetics. Translate behavioral intent into spatial logic and reusable primitives. Example: every Kizuna screen starts from a signal, not a layout.',
                  tools: [
                    { name: 'Figma', url: 'https://figma.com' },
                    { name: 'Stitch', url: 'https://stitchdesign.io' },
                    { name: 'Affinity', url: 'https://affinity.serif.com' },
                  ],
                },
                {
                  phase: 'BUILD', num: '03',
                  desc: 'Ship at the speed of thought. Vibe-code first, refine after, instrument everything that matters. Example: this site was rebuilt, measured, and re-shipped inside a week.',
                  tools: [
                    { name: 'Claude', url: 'https://claude.ai' },
                    { name: 'Vercel', url: 'https://vercel.com' },
                    { name: 'Gemini', url: 'https://gemini.google.com' },
                    { name: 'Lovable', url: 'https://lovable.dev' },
                  ],
                },
              ].map((col) => (
                <div key={col.phase} className="process__phase">
                  <div className="process__phase-header">
                    <div className="process__phase-num">
                      <span style={{ ...TYPE.numeral.xl, color:t.textFaint }}>{col.num}</span>
                    </div>
                    <span style={{ ...TYPE.display.xl, color:t.text, display:'block' }}>{col.phase}</span>
                  </div>
                  <div className="process__phase-body">
                    <p style={{ ...TYPE.body.md, fontWeight:300, color:t.textSecondary }}>{col.desc}</p>
                  </div>
                  <div className="process__tools">
                    {col.tools.map(tool => (
                      <Tag key={tool.name} t={t} size="md" onClick={() => openGlossary(tool.name)}>{tool.name}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>CONNECT</h3>
            <div className="connect__grid">
              <a className="connect__item" href="https://x.com/lauwverse" target="_blank" rel="noopener noreferrer">
                <div className="connect__item-info">
                  <Twitter size={14} style={{ color:t.textMuted }} />
                  <span style={β(t.textSecondary)}>X_NETWORK</span>
                </div>
                <ArrowUpRight size={14} style={{ color:t.accent }} />
              </a>
              <button className="connect__item" onClick={copyEmail} aria-label={emailCopied ? 'Email copied' : 'Copy email address'}>
                <div className="connect__item-info">
                  <Mail size={14} style={{ color:t.textMuted }} />
                  <span style={β(t.textSecondary)} aria-hidden="true">{emailCopied ? 'EMAIL_SYNCED' : 'VAULT_EMAIL'}</span>
                </div>
                <Check size={14} style={{ color:t.accent, opacity: emailCopied ? 1 : 0, transition:'opacity 0.3s' }} aria-hidden="true" />
              </button>
              <span className="sr-only" aria-live="assertive" aria-atomic="true">
                {emailCopied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site__footer">
        <span style={μ(t.textMuted)}>SYSTEM_v1.7 // PARAMETERS_STABLE</span>
      </footer>
      </>)}

      {/* Glossary off-canvas */}
      {glossaryTag && <GlossaryPanel tag={glossaryTag} t={t} onClose={closeGlossary} />}
    </div>
  );
}
