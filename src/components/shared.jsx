import { useEffect, useRef } from 'react';
import { PALETTE, TYPE } from '../tokens.js';
import { TAG_GLOSSARY, glossaryKey } from '../data.js';

// ─── INLINE SVG ICONS (no external deps) ─────────────────────────────────────
const Icon = ({ size = 14, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>{children}</svg>
);
export const ArrowUpRight  = ({ size, style }) => <Icon size={size} style={style}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></Icon>;
export const ArrowRight    = ({ size, style }) => <Icon size={size} style={style}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></Icon>;
export const ExternalLink  = ({ size, style }) => <Icon size={size} style={style}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>;
export const Check         = ({ size, style }) => <Icon size={size} style={style}><polyline points="20 6 9 12 4 9"/></Icon>;
export const Twitter       = ({ size, style }) => <Icon size={size} style={style}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.37 4.07 3.58 1.64.9a4.53 4.53 0 0 0-.61 2.27c0 1.56.8 2.94 2 3.75A4.49 4.49 0 0 1 .96 6v.06c0 2.18 1.55 4 3.6 4.42a4.52 4.52 0 0 1-2.04.08 4.53 4.53 0 0 0 4.22 3.14A9.05 9.05 0 0 1 0 15.54 12.8 12.8 0 0 0 6.92 17.5c8.3 0 12.84-6.88 12.84-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 22 2.92a9 9 0 0 1-2.6.71A4.52 4.52 0 0 0 21.5 1 9 9 0 0 1 23 3z"/></Icon>;
export const Mail          = ({ size, style }) => <Icon size={size} style={style}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Icon>;
// Reserved icons — not currently used in the UI but kept for future reference
export const _Settings      = ({ size, style }) => <Icon size={size} style={style}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>;
export const _MousePointer  = ({ size, style }) => <Icon size={size} style={style}><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></Icon>;
export const _Wind          = ({ size, style }) => <Icon size={size} style={style}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></Icon>;
export const _Palette       = ({ size, style }) => <Icon size={size} style={style}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></Icon>;
export const _Activity      = ({ size, style }) => <Icon size={size} style={style}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>;

// ─── TAG (category label, reusable across all sections) ─────────────────────
// Sizes: sm (default), md, lg — all use mono.sm base with size-specific overrides
export const Tag = ({ children, t, size = 'sm', onClick }) => (
  <span className={`tag tag--${size}${onClick ? ' tag--clickable' : ''}`}
    style={{ '--tag-color': t.accentLabel }}
    onClick={onClick}
    onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } } : undefined}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
  >{children}</span>
);

// ─── OFF-CANVAS GLOSSARY PANEL ──────────────────────────────────────────────
export const GlossaryPanel = ({ tag, t, onClose }) => {
  const entry = TAG_GLOSSARY[glossaryKey(tag)];
  if (!entry) return null;

  return (
    <>
      <div className="glossary-overlay" role="presentation" onClick={onClose} />
      <aside className="glossary-panel">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:40 }}>
          <Tag t={t} size="md">{tag}</Tag>
          <button className="glossary-panel__close" onClick={onClose}
            style={{ ...TYPE.mono.sm, letterSpacing:'0.3em', color:t.textMuted, background:'none', border:'none', cursor:'crosshair' }}
          >CLOSE ×</button>
        </div>
        <h2 style={{ ...TYPE.heading.lg, color:t.text, marginBottom:12 }}>{entry.title}</h2>
        <p style={{ ...TYPE.body.intro, color:t.accent, marginBottom:32 }}>{entry.tagline}</p>
        <p style={{ ...TYPE.body.md, color:t.textSecondary }}>{entry.body}</p>
        {entry.url && (
          <a href={entry.url} target="_blank" rel="noopener noreferrer"
            className="glossary-panel__link"
            style={{ ...TYPE.mono.sm, letterSpacing:'0.4em', color:t.accentLabel, marginTop:40, display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none' }}
          >{entry.title.toUpperCase()} <ArrowUpRight size={12} /></a>
        )}
      </aside>
    </>
  );
};

// ─── STATUS BADGE (static indicator for live/archive/version states) ────────
export const StatusBadge = ({ status, t, active = false }) => (
  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
    <div style={{
      width: 5, height: 5, borderRadius: '50%',
      background: active ? t.pulseColor : t.accentFaint,
      boxShadow: active ? `0 0 6px ${t.pulseShadow}` : 'none',
      animation: active ? 'pulse 2s infinite' : 'none',
    }} />
    <span style={{
      ...TYPE.mono.sm, fontSize: '0.5625rem',
      letterSpacing: '0.25em',
      color: active ? t.pulseColor : t.textFaint,
    }}>{status}</span>
  </div>
);

// ─── SECTION LABEL ───────────────────────────────────────────────────────────
export const SectionLabel = ({ filled, outline, tagline, t }) => {
  const baseStyle = {
    fontFamily: 'Big Shoulders Display, Impact, sans-serif',
    fontSize: '2.5rem',
    fontWeight: 900,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: '-0.03em',
    lineHeight: 0.88,
    display: 'block',
  };
  return (
    <div className="section-label">
      <h2 className="section-label__titles" style={{ margin:0 }}>
        <span style={{ ...baseStyle, color: t.text, display:'block' }}>{filled}</span>
        <span style={{ ...baseStyle, color: 'transparent', WebkitTextStroke: t.stroke, display:'block' }}>{outline}</span>
      </h2>
      {tagline && (
        <p className="section-label__tagline" style={{ ...TYPE.body.md, color: t.textMuted }}>{tagline}</p>
      )}
    </div>
  );
};

// ─── SECTION HEADER (shared between CaseStudy + DesignSystem) ────────────────
// Hoisted to module scope — defining inside a component remounts on every render.
export const SectionHeader = ({ num, title, sub, t }) => (
  <h2 className="cs__section-heading" style={{ display:'flex', alignItems:'center', justifyContent: sub ? 'space-between' : 'flex-start', gap:16, margin:'0 0 48px', borderBottom:`1px solid ${t.border}`, paddingBottom:10 }}>
    <span style={{ display:'flex', alignItems:'baseline', gap:16 }}>
      <span style={{ ...TYPE.mono.sm, letterSpacing:'0.4em', color:t.accentFaint }}>{num}</span>
      <span style={{ ...TYPE.mono.sm, letterSpacing:'0.35em', color:t.text }}>{title}</span>
    </span>
    {sub && <span style={{ ...TYPE.mono.sm, color:t.textFaint }}>{sub}</span>}
  </h2>
);

// ─── HERO BG CANVAS ──────────────────────────────────────────────────────────
// variant: 'noise' (animated) | 'signal' (static) | 'grid' (static)
export const HeroBgCanvas = ({ t: theme, variant = 'noise' }) => {
  const ref  = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      c.width  = c.offsetWidth  * dpr;
      c.height = c.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const isDark = theme.bg === PALETTE.jaguar[950];
    const accentHex = PALETTE.downriver[300];
    const baseHex   = isDark ? PALETTE.jaguar[50] : PALETTE.jaguar[900];
    const toRgb = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
    const aRgb = toRgb(accentHex);
    const bRgb = toRgb(baseHex);

    if (variant === 'noise') {
      // ── Pre-generate particle field (once) ──────────────────────────────────
      const CELL       = 2;
      const NUM_LINES  = 6;
      const LINE_DELAY = 10;     // seconds between each line appearing
      const SWEEP_SECS = 2.5;    // each line sweeps center→outward over this duration
      const TOP_Y_FRAC = 0.79;   // first line ~40px lower than before
      const BOT_Y_FRAC = 0.977;  // last line ~16px from bottom border
      const WIDTH_MIN  = 0.50;   // top line: narrow, progressive growth
      const WIDTH_MAX  = 0.96;   // bottom line reaches near canvas edges

      const W = c.offsetWidth, H = c.offsetHeight;
      const particles = [];
      for (let y = 0; y < H; y += CELL) {
        const rowFade = Math.pow(1 - y / H, 1.6);
        const density = rowFade * 0.45;
        for (let x = 0; x < W; x += CELL) {
          if (Math.random() > density) continue;
          particles.push({
            x, y,
            isAccent: Math.random() < 0.15,
            speed: 0.35 + Math.random() * 2.8,
            phase: Math.random() * Math.PI * 2,
            weight: rowFade,
          });
        }
      }

      // ── RAF render loop ──────────────────────────────────────────────────────
      let startT = null;
      const render = (now) => {
        rafRef.current = requestAnimationFrame(render);
        const T = now * 0.001;
        if (startT === null) startT = T;

        const elapsed = T - startT;
        // All lines fully revealed after last line completes its sweep
        const totalDuration = (NUM_LINES - 1) * LINE_DELAY + SWEEP_SECS;
        const built = elapsed >= totalDuration;

        const w = c.offsetWidth, h = c.offsetHeight;
        ctx.clearRect(0, 0, w, h);

        // Noise: always flickers; dims slightly once all lines are built
        const noiseDim = built ? 0.72 : 1;
        for (const p of particles) {
          const flicker = 0.5 + 0.5 * Math.sin(T * p.speed + p.phase);
          const a = p.weight * flicker * (p.isAccent ? 0.45 : 0.22) * noiseDim;
          const rgb = p.isAccent ? aRgb : bRgb;
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})`;
          ctx.fillRect(p.x, p.y, CELL, CELL);
        }

        // Signal lines: top→bottom, i=0 is top (narrow), i=5 is bottom (widest)
        // Each line waits LINE_DELAY*i seconds before sweeping out.
        for (let i = 0; i < NUM_LINES; i++) {
          const lineStart   = i * LINE_DELAY;
          const lineElapsed = elapsed - lineStart;
          if (lineElapsed <= 0) continue;  // not yet time for this line

          // Ease-out quad sweep progress (0→1 over SWEEP_SECS)
          const sweepRaw = Math.min(1, lineElapsed / SWEEP_SECS);
          const sweepP   = 1 - Math.pow(1 - sweepRaw, 2);

          // y: evenly distributed from TOP_Y_FRAC to BOT_Y_FRAC (compact band)
          const t_frac = i / (NUM_LINES - 1);
          const lineY  = (TOP_Y_FRAC + (BOT_Y_FRAC - TOP_Y_FRAC) * t_frac) * h;

          // Width: grows from WIDTH_MIN (top) to WIDTH_MAX (bottom)
          const widthFrac = WIDTH_MIN + (WIDTH_MAX - WIDTH_MIN) * t_frac;
          const reach = (widthFrac * w / 2) * sweepP;

          // Opacity: bottom lines slightly brighter; gentle pulse once built
          const baseA  = 0.13 + t_frac * 0.10;
          const pulseA = built
            ? baseA + 0.018 * Math.sin(T * 0.45 + i * 0.7)
            : baseA * sweepP;

          ctx.strokeStyle = `rgba(${aRgb[0]},${aRgb[1]},${aRgb[2]},${pulseA.toFixed(3)})`;
          ctx.lineWidth   = 0.75 + t_frac * 0.75;  // bottom lines slightly heavier
          ctx.beginPath();
          ctx.moveTo(w / 2 - reach, lineY);
          ctx.lineTo(w / 2 + reach, lineY);
          ctx.stroke();
        }
      };
      rafRef.current = requestAnimationFrame(render);

    } else if (variant === 'signal') {
      // Static EKG waveform
      const w = c.offsetWidth, h = c.offsetHeight;
      const cx = w / 2, cy = h * 0.5;
      for (let line = 0; line < 5; line++) {
        const yOff = (line - 2) * 28;
        const amp  = 18 - Math.abs(line - 2) * 4;
        const a    = 0.18 - Math.abs(line - 2) * 0.03;
        ctx.strokeStyle = `rgba(${aRgb[0]},${aRgb[1]},${aRgb[2]},${a})`;
        ctx.lineWidth = line === 2 ? 1.5 : 0.75;
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const dist  = Math.abs(x - cx) / cx;
          const fade  = Math.max(0, 1 - dist * 1.2);
          const spike = (x > cx - 80 && x < cx + 80) ? Math.sin((x - cx + 80) / 160 * Math.PI * 4) * amp : 0;
          const y     = cy + yOff + spike * fade + Math.sin(x * 0.04) * 3 * fade;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 6) {
        ctx.fillStyle = `rgba(${bRgb[0]},${bRgb[1]},${bRgb[2]},0.015)`;
        ctx.fillRect(0, y, w, 1);
      }

    } else if (variant === 'grid') {
      // Static dot grid
      const w = c.offsetWidth, h = c.offsetHeight;
      const gap = 28;
      for (let x = gap; x < w; x += gap) {
        for (let y = gap; y < h; y += gap) {
          const dx = (x / w - 0.5) * 2, dy = (y / h - 0.5) * 2;
          const fade = Math.max(0, 1 - Math.sqrt(dx*dx+dy*dy) * 0.7);
          const isAcc = Math.random() < 0.06;
          const rgb = isAcc ? aRgb : bRgb;
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${fade * (isAcc ? 0.45 : 0.14)})`;
          ctx.beginPath(); ctx.arc(x, y, isAcc ? 1.5 : 1, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.lineWidth = 0.4;
      for (let x = gap; x < w - gap; x += gap * 3) {
        for (let y = gap; y < h - gap; y += gap * 3) {
          const dx = (x / w - 0.5) * 2, dy = (y / h - 0.5) * 2;
          const fade = Math.max(0, 1 - Math.sqrt(dx*dx+dy*dy) * 0.8);
          ctx.strokeStyle = `rgba(${aRgb[0]},${aRgb[1]},${aRgb[2]},${fade * 0.12})`;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + gap, y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + gap); ctx.stroke();
        }
      }
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [theme, variant]);

  return <canvas ref={ref} aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />;
};
