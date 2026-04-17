import { PALETTE, THEMES, TYPE, alpha, contrastText } from '../tokens.js';
import { Tag, SectionHeader, SectionLabel, StatusBadge, ExternalLink } from '../components/shared.jsx';
import usePageMeta from '../usePageMeta.js';

// ── Static data (module-scope — created once, not per render) ─────────────────
const HEADING_WEIGHTS = [
  { weight: 400, label: 'Regular 400' },
  { weight: 500, label: 'Medium 500' },
  { weight: 600, label: 'SemiBold 600' },
  { weight: 700, label: 'Bold 700' },
  { weight: 800, label: 'ExtraBold 800' },
];

const BODY_WEIGHTS = [
  { weight: 300, label: 'Light 300' },
  { weight: 400, label: 'Regular 400' },
  { weight: 900, label: 'Black 900' },
  { weight: 900, label: 'Black 900 Italic', italic: true },
];

const HEADING_SCALE = [
  { name: 'Headings/XL',  size: '3.5rem',   px: '56px', weight: 800, lh: '1'   },
  { name: 'Headings/LG',  size: '2.5rem',   px: '40px', weight: 800, lh: '1.1' },
  { name: 'Headings/MD',  size: '1.75rem',  px: '28px', weight: 700, lh: '1.2' },
  { name: 'Headings/SM',  size: '1.375rem', px: '22px', weight: 700, lh: '1.3' },
];

const BODY_SCALE = [
  { name: 'Body/Intro', size: '1.125rem', px: '18px', weight: 300, lh: '1.8' },
  { name: 'Body/XL',    size: '1.25rem',  px: '20px', weight: 400, lh: '1.6', isDefault: true },
  { name: 'Body/LG',    size: '1.125rem', px: '18px', weight: 400, lh: '1.7' },
  { name: 'Body/MD',    size: '1rem',     px: '16px', weight: 400, lh: '1.7' },
  { name: 'Body/SM',    size: '0.875rem', px: '14px', weight: 300, lh: '1.6' },
  { name: 'Body/XS',    size: '0.75rem',  px: '12px', weight: 300, lh: '1.5' },
];

const MONO_SCALE = [
  { name: 'Mono/LG', size: '1rem',     px: '16px', weight: 500, ls: '0.35em' },
  { name: 'Mono/MD', size: '0.875rem', px: '14px', weight: 400, ls: '0.3em',  isDefault: true },
  { name: 'Mono/SM', size: '0.75rem',  px: '12px', weight: 300, ls: '0.25em' },
];

const PALETTE_SCALES = [
  { name: 'DOWNRIVER : BLUE',  steps: Object.entries(PALETTE.downriver).map(([step, hex]) => ({ step, hex })) },
  { name: 'JAGUAR : PURPLE',   steps: Object.entries(PALETTE.jaguar).map(([step, hex]) => ({ step, hex })) },
];

const TOKEN_GROUPS = [
  { name: 'BACKGROUNDS', tokens: [
    { name: 'bg',        midnight: 'jaguar.950', primal: 'jaguar.50' },
    { name: 'bgSurface', midnight: 'jaguar.900', primal: 'jaguar.100' },
  ]},
  { name: 'TEXT', tokens: [
    { name: 'text',          midnight: 'jaguar.50',  primal: 'jaguar.900' },
    { name: 'textSecondary', midnight: 'jaguar.300', primal: 'jaguar.800' },
    { name: 'textMuted',     midnight: 'jaguar.400', primal: 'jaguar.700' },
    { name: 'textFaint',     midnight: 'jaguar.600', primal: 'jaguar.300' },
  ]},
  { name: 'ACCENT', tokens: [
    { name: 'accent',          midnight: 'downriver.300', primal: 'downriver.500' },
    { name: 'accentSecondary', midnight: 'downriver.200', primal: 'downriver.400' },
    { name: 'accentLabel',     midnight: 'jaguar.400',    primal: 'downriver.500' },
    { name: 'accentFaint',     midnight: 'jaguar.500',    primal: 'jaguar.300' },
  ]},
  { name: 'EFFECTS', tokens: [
    { name: 'pulseColor', midnight: 'downriver.300', primal: 'downriver.400' },
    { name: 'selection',  midnight: 'downriver.400', primal: 'downriver.200' },
  ]},
];

const SPACING_STEPS = [
  { label: 'XS',  value: '8px'  },
  { label: 'SM',  value: '16px' },
  { label: 'MD',  value: '24px' },
  { label: 'LG',  value: '48px' },
  { label: 'XL',  value: '64px' },
  { label: '2XL', value: '96px' },
  { label: '3XL', value: '128px'},
  { label: '4XL', value: '192px'},
];

const GRID_PROPS = [
  { prop: 'MAX_WIDTH', value: '960px',  desc: 'Content container' },
  { prop: 'GUTTER',    value: '24px',   desc: 'Horizontal padding' },
  { prop: 'GAP_CELL',  value: '1px',    desc: 'Grid cell separator' },
];

/** @param {{ t: import('../tokens.js').Theme, onBack: Function }} props */
const DesignSystem = ({ t, onBack }) => {
  usePageMeta({
    title: 'Brand OS — Design System',
    description: 'Design token library and interactive primitives powering every Lauwverse surface. Typography, color, components, and layout.',
    path: '/design',
  });
  return (
  <main className="ds__page animate-in">

    {/* ── PAGE HEADER ── */}
    <header className="ds__header">
      <button className="ds__back" onClick={onBack}>← RETURN</button>

      {/* Single h1 — outline + filled two-span technique */}
      <h1 className="ds__headline">
        <span className="ds__headline-outline">BRAND</span>
        <span className="ds__headline-filled">OPERATING<br />SYSTEM.</span>
      </h1>

      <p className="ds__header-sub">
        Visual language / token library / interactive primitives.<br />
        The atoms that compose lauwverse.
      </p>
    </header>

    {/* ── 01 TYPOGRAPHY ── */}
    <section className="ds__section" aria-label="Typography">
      <SectionHeader num="01" title="FOUNDATION // TYPE" sub="Syne + Inter + JetBrains Mono" t={t} />

      {/* Font family cards */}
      <div className="ds__font-grid">

        {/* Syne — section headings */}
        <div className="ds__font-card">
          <span className="ds__font-badge">HEADINGS</span>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, color: 'var(--text)', lineHeight: 1, marginBottom: 24 }}>Syne</div>
          <div className="ds__font-specimen" style={{ fontFamily: 'Syne, sans-serif' }}>
            AaBbCcDdEeFfGg<br />HhIiJjKkLlMmNn<br />01234567890
          </div>
          <div className="ds__font-weights">
            {HEADING_WEIGHTS.map(({ weight, label }) => (
              <div key={label} className="ds__font-weight-row">
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: weight, color: 'var(--text-secondary)' }}>{label}</span>
                <span className="ds__font-weight-aa">Aa</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inter — body & display */}
        <div className="ds__font-card">
          <span className="ds__font-badge">BODY & DISPLAY</span>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1, marginBottom: 24 }}>Inter</div>
          <div className="ds__font-specimen" style={{ fontFamily: 'Inter, sans-serif' }}>
            AaBbCcDdEeFfGg<br />HhIiJjKkLlMmNn<br />01234567890
          </div>
          <div className="ds__font-weights">
            {BODY_WEIGHTS.map(({ weight, label, italic }) => (
              <div key={label} className="ds__font-weight-row">
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: weight, fontStyle: italic ? 'italic' : 'normal', color: 'var(--text-secondary)' }}>{label}</span>
                <span className="ds__font-weight-aa">Aa</span>
              </div>
            ))}
          </div>
        </div>

        {/* JetBrains Mono — UI labels */}
        <div className="ds__font-card">
          <span className="ds__font-badge">UI LABELS</span>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 500, color: 'var(--text)', lineHeight: 1, marginBottom: 24 }}>JetBrains<br />Mono</div>
          <div className="ds__font-specimen" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 300 }}>
            AaBbCcDdEeFfGg<br />HhIiJjKkLlMmNn<br />01234567890
          </div>
          <div className="ds__font-weights">
            {[{ weight: 300, label: 'Light 300' }, { weight: 500, label: 'Medium 500' }].map(({ weight, label }) => (
              <div key={label} className="ds__font-weight-row">
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: weight, color: 'var(--text-secondary)' }}>{label}</span>
                <span className="ds__font-weight-aa">Aa</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Headings scale */}
      <div className="ds__scale-group">
        <span className="ds__scale-label">HEADINGS SCALE : SYNE</span>
        <div className="ds__scale-table">
          {HEADING_SCALE.map(item => (
            <div key={item.name} className="ds__scale-row">
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: item.size, fontWeight: item.weight, color: 'var(--text)', lineHeight: item.lh }}>{item.name}</span>
              <span className="ds__scale-meta">{item.size} / {item.px}  {item.weight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body scale */}
      <div className="ds__scale-group">
        <span className="ds__scale-label">BODY SCALE : INTER</span>
        <div className="ds__scale-table">
          {BODY_SCALE.map(item => (
            <div key={item.name} className="ds__scale-row">
              <div className="ds__scale-row-inner">
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: item.size, fontWeight: item.weight, color: 'var(--text)', lineHeight: item.lh }}>{item.name}</span>
                {item.isDefault && <span className="ds__default-badge">DEFAULT</span>}
              </div>
              <span className="ds__scale-meta">{item.size} / {item.px}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mono scale */}
      <div className="ds__scale-group">
        <span className="ds__scale-label">MONO SCALE : JETBRAINS MONO</span>
        <div className="ds__scale-table">
          {MONO_SCALE.map(item => (
            <div key={item.name} className="ds__scale-row">
              <div className="ds__scale-row-inner">
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: item.size, fontWeight: item.weight, letterSpacing: item.ls, textTransform: 'uppercase', color: 'var(--text)' }}>{item.name}</span>
                {item.isDefault && <span className="ds__default-badge">DEFAULT</span>}
              </div>
              <span className="ds__scale-meta">{item.size} / {item.px}  {item.weight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 02 COLOR SYSTEM ── */}
    <section className="ds__section" aria-label="Colour system">
      <SectionHeader num="02" title="FOUNDATION // COLOR" sub="Palette 50→950 · WCAG" t={t} />

      {/* Palette swatches — inline bg is the DEMONSTRATION (intentional) */}
      {PALETTE_SCALES.map(scale => (
        <div key={scale.name} className="ds__palette-group">
          <span className="ds__scale-label">{scale.name}</span>
          <div className="ds__palette-strip">
            {scale.steps.map(({ step, hex }) => {
              const txtColor = contrastText(hex);
              return (
                <div key={step} style={{ flex: 1, background: hex, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 6px', minHeight: 80 }}>
                  <span style={{ ...TYPE.mono.sm, fontSize: '0.625rem', color: txtColor, letterSpacing: '0.15em' }}>{step}</span>
                  <span style={{ ...TYPE.mono.sm, fontSize: '0.5625rem', color: txtColor, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{hex}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Token mapping */}
      <div className="ds__token-section">
        <span className="ds__scale-label">TOKEN MAPPING</span>
        <div className="ds__token-header">
          <div />
          <span className="ds__token-col-label">MIDNIGHT</span>
          <span className="ds__token-col-label">PRIMAL</span>
        </div>
        {TOKEN_GROUPS.map(group => (
          <div key={group.name} className="ds__token-group">
            <span className="ds__token-group-label">{group.name}</span>
            <div className="ds__token-rows">
              {group.tokens.map(token => {
                const mVal = THEMES.midnight[token.name];
                const pVal = THEMES.primal[token.name];
                return (
                  <div key={token.name} className="ds__token-row">
                    <span className="ds__token-name">{token.name}</span>
                    {/* Swatch bg is the live token value — intentional inline */}
                    <div className="ds__token-value">
                      <div className="ds__token-swatch" style={{ background: mVal, border: '1px solid rgba(255,255,255,0.06)' }} />
                      <span className="ds__token-ref">{token.midnight}</span>
                    </div>
                    <div className="ds__token-value">
                      <div className="ds__token-swatch" style={{ background: pVal, border: '1px solid rgba(0,0,0,0.08)' }} />
                      <span className="ds__token-ref">{token.primal}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── 03 TAGS ── */}
    <section className="ds__section" aria-label="Tag components">
      <SectionHeader num="03" title="COMPONENTS // TAGS" sub="SM · MD · LG : Default + Hover" t={t} />

      <div className="ds__component-table">
        {[
          { size: 'sm', label: 'TAG / SM', desc: '0.5625rem · 3px 8px. Card footers, metadata, lineage',          examples: ['SOCIAL AI', 'DESIGN', 'VIBE_CODE', 'WCAG'] },
          { size: 'md', label: 'TAG / MD', desc: '0.625rem · 4px 12px. Signal badges, process tools, filters',    examples: ['BUILD', 'READING', 'THINKING', 'CLAUDE'] },
          { size: 'lg', label: 'TAG / LG', desc: '0.75rem · 5px 14px. Prominent labels, standalone usage',        examples: ['AI', 'PRODUCT', 'WEB3'] },
        ].map(row => (
          <div key={row.size} className="ds__component-row">
            <div className="ds__component-label-cell">
              <span className="ds__component-label">{row.label}</span>
              <span className="ds__component-desc">{row.desc}</span>
            </div>
            <div className="ds__component-content">
              {row.examples.map(ex => <Tag key={ex} t={t} size={row.size}>{ex}</Tag>)}
            </div>
          </div>
        ))}
      </div>

      <div className="ds__hover-note">
        <span className="ds__hover-note-label">HOVER</span>
        <span className="ds__hover-note-desc">border → accent · color → accentSecondary</span>
      </div>
    </section>

    {/* ── 04 BUTTONS & LINKS ── */}
    <section className="ds__section" aria-label="Action components">
      <SectionHeader num="04" title="COMPONENTS // ACTIONS" sub="Buttons · Links · Navigation" t={t} />

      {/* Button/link state matrix — inline styles intentional: they ARE the state demos */}
      <div className="ds__component-table">
        {[
          {
            label: 'PRIMARY_CTA', desc: 'Hero action. Bold accent underline',
            states: [
              { name: 'DEFAULT', el: <button style={{ ...TYPE.mono.sm, letterSpacing: '0.5em', color: t.text,           background: 'none', border: 'none', borderBottom: `2px solid ${t.accent}`,          paddingBottom: 4, cursor: 'crosshair' }}>DISCOVER</button> },
              { name: 'HOVER',   el: <button style={{ ...TYPE.mono.sm, letterSpacing: '0.5em', color: t.accentSecondary, background: 'none', border: 'none', borderBottom: `2px solid ${t.accentSecondary}`, paddingBottom: 4, cursor: 'crosshair' }}>DISCOVER</button> },
            ],
          },
          {
            label: 'SECONDARY_LINK', desc: 'Subdued. Dim accent underline',
            states: [
              { name: 'DEFAULT', el: <button style={{ ...TYPE.mono.sm, letterSpacing: '0.5em', color: t.accentFaint, background: 'none', border: 'none', borderBottom: `1px solid ${t.accentFaint}`, paddingBottom: 4, cursor: 'crosshair' }}>BRAND_OS →</button> },
              { name: 'HOVER',   el: <button style={{ ...TYPE.mono.sm, letterSpacing: '0.5em', color: t.accent,      background: 'none', border: 'none', borderBottom: `1px solid ${t.accent}`,      paddingBottom: 4, cursor: 'crosshair' }}>BRAND_OS →</button> },
            ],
          },
          {
            label: 'NAV_LINK', desc: 'Section navigation. Active shows accent underline',
            states: [
              { name: 'DEFAULT', el: <span style={{ ...TYPE.mono.sm, letterSpacing: '0.4em', color: t.text,      borderBottom: '2px solid transparent',    paddingBottom: 4 }}>LAB</span> },
              { name: 'HOVER',   el: <span style={{ ...TYPE.mono.sm, letterSpacing: '0.4em', color: t.accentFaint, borderBottom: `2px solid ${t.accentFaint}`, paddingBottom: 4 }}>LAB</span> },
              { name: 'ACTIVE',  el: <span style={{ ...TYPE.mono.sm, letterSpacing: '0.4em', color: t.text,      borderBottom: `2px solid ${t.accent}`,      paddingBottom: 4 }}>LAB</span> },
            ],
          },
          {
            label: 'THEME_TOGGLE', desc: 'Nav element. Bordered box, fill on hover',
            states: [
              { name: 'DEFAULT', el: <button style={{ ...TYPE.mono.sm, letterSpacing: '0.3em', color: t.accentSecondary, padding: '6px 14px', border: `1px solid ${t.borderStrong}`, background: 'transparent', cursor: 'crosshair' }}>{t.toggleLabel}</button> },
              { name: 'HOVER',   el: <button style={{ ...TYPE.mono.sm, letterSpacing: '0.3em', color: t.accent,          padding: '6px 14px', border: `1px solid ${t.borderStrong}`, background: t.bgHover,       cursor: 'crosshair' }}>{t.toggleLabel}</button> },
            ],
          },
          {
            label: 'EXTERNAL_LINK', desc: 'Mono label + arrow. Opens in new tab',
            states: [
              { name: 'DEFAULT', el: <span style={{ ...TYPE.mono.sm, letterSpacing: '0.4em', color: t.accentLabel, display: 'flex', alignItems: 'center', gap: 8 }}>ENTER_KIZUNA <ExternalLink size={10} /></span> },
              { name: 'HOVER',   el: <span style={{ ...TYPE.mono.sm, letterSpacing: '0.4em', color: t.accent,      display: 'flex', alignItems: 'center', gap: 8 }}>ENTER_KIZUNA <ExternalLink size={10} /></span> },
            ],
          },
        ].map((item, i) => (
          <div key={i} className="ds__component-row">
            <div className="ds__component-label-cell">
              <span className="ds__component-label">{item.label}</span>
              <span className="ds__component-desc">{item.desc}</span>
            </div>
            <div className="ds__component-states">
              {item.states.map(s => (
                <div key={s.name} className="ds__state-block">
                  <span className="ds__state-name">{s.name}</span>
                  {s.el}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── 05 INDICATORS & STATUS ── */}
    <section className="ds__section" aria-label="Status indicators">
      <SectionHeader num="05" title="COMPONENTS // STATUS" sub="Indicators · Badges" t={t} />

      <div className="ds__status-grid">

        <div className="ds__status-cell">
          <div className="ds__status-cell-header">
            <span className="ds__component-label">ACTIVE_INDICATOR</span>
            <span className="ds__component-desc">Pulsing dot. Live / in-progress state</span>
          </div>
          <div className="ds__status-preview">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Pulse colour is the token demo — intentional inline */}
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.pulseColor, boxShadow: `0 0 8px ${t.pulseShadow}`, animation: 'pulse 2s infinite' }} />
              <span style={{ ...TYPE.mono.sm, letterSpacing: '0.4em', color: t.pulseColor }}>ACTIVE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.accentFaint }} />
              <span style={{ ...TYPE.mono.sm, letterSpacing: '0.4em', color: 'var(--text-faint)' }}>INACTIVE</span>
            </div>
          </div>
        </div>

        <div className="ds__status-cell">
          <div className="ds__status-cell-header">
            <span className="ds__component-label">STATUS_BADGE</span>
            <span className="ds__component-desc">Project lifecycle: live, archive, version</span>
          </div>
          <div className="ds__status-preview">
            <StatusBadge status="LIVE" t={t} active />
            <StatusBadge status="ARCHIVE" t={t} />
            <StatusBadge status="v1.7" t={t} />
          </div>
        </div>

        <div className="ds__status-cell">
          <div className="ds__status-cell-header">
            <span className="ds__component-label">SECTION_LABEL</span>
            <span className="ds__component-desc">Filled + stroke headline pair</span>
          </div>
          <div style={{ transform: 'scale(0.65)', transformOrigin: 'left center' }}>
            <SectionLabel filled="Signal" outline="Feed" t={t} />
          </div>
        </div>

        <div className="ds__status-cell">
          <div className="ds__status-cell-header">
            <span className="ds__component-label">FILTER_BUTTON</span>
            <span className="ds__component-desc">Toggle filter. Active / inactive states</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Active/inactive filter state demos — intentional inline */}
            <span style={{ ...TYPE.mono.sm, fontSize: '0.625rem', letterSpacing: '0.25em', color: t.text,      background: alpha(t.accent, 0.12), border: `1px solid ${t.accent}`,  padding: '6px 14px' }}>ACTIVE</span>
            <span style={{ ...TYPE.mono.sm, fontSize: '0.625rem', letterSpacing: '0.25em', color: t.textFaint, border: `1px solid ${t.border}`,                                       padding: '6px 14px' }}>INACTIVE</span>
          </div>
        </div>

      </div>
    </section>

    {/* ── 06 SPACING & GRID ── */}
    <section className="ds__layout-section" aria-label="Layout and spacing">
      <SectionHeader num="06" title="FOUNDATION // LAYOUT" sub="Grid · Spacing · Borders" t={t} />

      <div className="ds__layout-subsections">

        {/* Grid system */}
        <div>
          <span className="ds__scale-label">GRID</span>
          <div className="ds__layout-table">
            {GRID_PROPS.map(row => (
              <div key={row.prop} className="ds__layout-row">
                <span className="ds__layout-cell">{row.prop}</span>
                <span className="ds__layout-cell ds__layout-cell--accent">{row.value}</span>
                <span className="ds__layout-cell ds__layout-cell--desc">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing scale — block dimensions ARE the demo */}
        <div>
          <span className="ds__scale-label">SPACING SCALE</span>
          <div className="ds__spacing-strip">
            {SPACING_STEPS.map(step => (
              <div key={step.label} className="ds__spacing-cell">
                <div style={{ width: parseInt(step.value), height: parseInt(step.value), maxWidth: '100%', maxHeight: 48, background: alpha(t.accent, 0.15), border: `1px solid ${alpha(t.accent, 0.3)}` }} />
                <span className="ds__spacing-label">{step.label}</span>
                <span className="ds__spacing-value">{step.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Border tokens — border styles ARE the demo */}
        <div>
          <span className="ds__scale-label">BORDERS</span>
          <div className="ds__border-table">
            {[
              { name: 'border',       style: `1px solid ${t.border}`,       desc: 'Default separator' },
              { name: 'borderStrong', style: `1px solid ${t.borderStrong}`,  desc: 'Emphasis / interactive' },
              { name: 'accent',       style: `2px solid ${t.accent}`,        desc: 'Active state / CTA' },
            ].map(row => (
              <div key={row.name} className="ds__border-row">
                <span className="ds__border-name">{row.name}</span>
                <div className="ds__border-preview">
                  <div className="ds__border-line" style={{ borderBottom: row.style }} />
                </div>
                <span className="ds__border-desc">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

  </main>
  );
};

export default DesignSystem;
