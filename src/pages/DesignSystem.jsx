import { PALETTE, THEMES, TYPE, alpha, contrastText } from '../tokens.js';
import { Tag, SectionHeader, SectionLabel, StatusBadge, ExternalLink } from '../components/shared.jsx';

// ─── Style shorthand helpers (module-scope — created once, not per render) ────
/** @param {string} color @param {Object} [extra] @returns {Object} */
const μ = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.4em', color, ...extra });
/** @param {string} color @param {Object} [extra] @returns {Object} */
const β = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.5em', color, ...extra });

const DesignSystem = ({ t, onBack }) => {

  const headingWeights = [
    { weight: 400, label: 'Regular 400' },
    { weight: 500, label: 'Medium 500' },
    { weight: 600, label: 'SemiBold 600' },
    { weight: 700, label: 'Bold 700' },
    { weight: 800, label: 'ExtraBold 800' },
  ];
  const bodyWeights = [
    { weight: 300, label: 'Light 300' },
    { weight: 400, label: 'Regular 400' },
    { weight: 900, label: 'Black 900' },
    { weight: 900, label: 'Black 900 Italic', italic: true },
  ];
  const headingScale = [
    { name: 'Headings/XL',  size: '3.5rem',   px: '56px', weight: 800, lh: '1'    },
    { name: 'Headings/LG',  size: '2.5rem',   px: '40px', weight: 800, lh: '1.1'  },
    { name: 'Headings/MD',  size: '1.75rem',  px: '28px', weight: 700, lh: '1.2'  },
    { name: 'Headings/SM',  size: '1.375rem', px: '22px', weight: 700, lh: '1.3'  },
  ];
  const bodyScale = [
    { name: 'Body/Intro', size: '1.125rem', px: '18px', weight: 300, lh: '1.8' },
    { name: 'Body/XL',    size: '1.25rem',  px: '20px', weight: 400, lh: '1.6', isDefault: true },
    { name: 'Body/LG',    size: '1.125rem', px: '18px', weight: 400, lh: '1.7' },
    { name: 'Body/MD',    size: '1rem',     px: '16px', weight: 400, lh: '1.7' },
    { name: 'Body/SM',    size: '0.875rem', px: '14px', weight: 300, lh: '1.6' },
    { name: 'Body/XS',    size: '0.75rem',  px: '12px', weight: 300, lh: '1.5' },
  ];
  const monoScale = [
    { name: 'Mono/LG', size: '1rem',      px: '16px', weight: 500, ls: '0.35em' },
    { name: 'Mono/MD', size: '0.875rem',  px: '14px', weight: 400, ls: '0.3em',  isDefault: true },
    { name: 'Mono/SM', size: '0.75rem',   px: '12px', weight: 300, ls: '0.25em' },
  ];

  // Palette scales (50→950)
  const paletteScales = [
    { name: 'DOWNRIVER : BLUE',   steps: Object.entries(PALETTE.downriver).map(([step, hex]) => ({ step, hex })) },
    { name: 'JAGUAR : PURPLE',  steps: Object.entries(PALETTE.jaguar).map(([step, hex]) => ({ step, hex })) },
  ];

  // Theme token mapping
  const tokenGroups = [
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
      { name: 'accent',      midnight: 'downriver.300', primal: 'downriver.500' },
      { name: 'accentSecondary',  midnight: 'downriver.200', primal: 'downriver.400' },
      { name: 'accentLabel', midnight: 'jaguar.400',    primal: 'downriver.500' },
      { name: 'accentFaint',   midnight: 'jaguar.500',    primal: 'jaguar.300' },
    ]},
    { name: 'EFFECTS', tokens: [
      { name: 'pulseColor', midnight: 'downriver.300', primal: 'downriver.400' },
      { name: 'selection',  midnight: 'downriver.400', primal: 'downriver.200' },
    ]},
  ];

  return (
    <div style={{ maxWidth:960, margin:'0 auto', padding:'160px 24px 160px' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ marginBottom:112, display:'flex', flexDirection:'column', gap:8 }}>
        <button onClick={onBack} style={{ alignSelf:'flex-start', ...μ(t.textMuted, { letterSpacing:'0.3em' }), background:'none', border:'none', cursor:'crosshair', marginBottom:32, display:'flex', alignItems:'center', gap:8, transition:'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = t.accent}
          onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
        >← RETURN</button>
        <h1 style={{ fontSize:'clamp(3.5rem,10vw,7.5rem)', fontWeight:900, fontStyle:'italic', textTransform:'uppercase', letterSpacing:'-0.07em', color:'transparent', WebkitTextStroke:t.stroke, lineHeight:0.85 }}>BRAND</h1>
        <h1 style={{ fontSize:'clamp(3.5rem,10vw,7.5rem)', fontWeight:900, fontStyle:'italic', textTransform:'uppercase', letterSpacing:'-0.07em', color:t.text, lineHeight:0.85 }}>OPERATING<br/>SYSTEM.</h1>
        <p style={{ ...μ(t.textMuted, { fontSize:12, lineHeight:2 }), maxWidth:480, marginTop:32 }}>
          Visual language / token library / interactive primitives.<br/>The atoms that compose lauwverse.
        </p>
      </div>

      {/* ── 01 TYPOGRAPHY ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="01" title="FOUNDATION // TYPE" sub="Syne + Inter + JetBrains Mono" t={t} />

        {/* Font family cards — one card per typeface */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:1, background:t.border, border:`1px solid ${t.border}`, marginBottom:64 }}>

          {/* Syne — section headings */}
          <div style={{ padding:'40px', background:t.bg }}>
            <span style={{ ...μ(t.accentLabel), padding:'4px 10px', border:`1px solid ${t.borderStrong}`, display:'inline-block', marginBottom:28 }}>HEADINGS</span>
            <div style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, color:t.text, lineHeight:1, marginBottom:24 }}>Syne</div>
            <div style={{ fontFamily:'Syne, sans-serif', fontSize:15, color:t.textMuted, lineHeight:1.8, fontWeight:400, marginBottom:36 }}>
              AaBbCcDdEeFfGg<br/>HhIiJjKkLlMmNn<br/>01234567890
            </div>
            <div style={{ border:`1px solid ${t.border}`, display:'flex', flexDirection:'column' }}>
              {headingWeights.map(({ weight, label }, i, arr) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontFamily:'Syne, sans-serif', fontSize:14, fontWeight:weight, color:t.textSecondary }}>{label}</span>
                  <span style={μ(t.textFaint)}>Aa</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inter — body & display */}
          <div style={{ padding:'40px', background:t.bg }}>
            <span style={{ ...μ(t.accentLabel), padding:'4px 10px', border:`1px solid ${t.borderStrong}`, display:'inline-block', marginBottom:28 }}>BODY & DISPLAY</span>
            <div style={{ fontFamily:'Inter, sans-serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, fontStyle:'italic', color:t.text, lineHeight:1, marginBottom:24 }}>Inter</div>
            <div style={{ fontFamily:'Inter, sans-serif', fontSize:15, color:t.textMuted, lineHeight:1.8, fontWeight:400, marginBottom:36 }}>
              AaBbCcDdEeFfGg<br/>HhIiJjKkLlMmNn<br/>01234567890
            </div>
            <div style={{ border:`1px solid ${t.border}`, display:'flex', flexDirection:'column' }}>
              {bodyWeights.map(({ weight, label, italic }, i, arr) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:weight, fontStyle: italic ? 'italic' : 'normal', color:t.textSecondary }}>{label}</span>
                  <span style={μ(t.textFaint)}>Aa</span>
                </div>
              ))}
            </div>
          </div>

          {/* JetBrains Mono — UI labels */}
          <div style={{ padding:'40px', background:t.bg }}>
            <span style={{ ...μ(t.accentLabel), padding:'4px 10px', border:`1px solid ${t.borderStrong}`, display:'inline-block', marginBottom:28 }}>UI LABELS</span>
            <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'clamp(1.5rem,3.5vw,2.5rem)', fontWeight:500, color:t.text, lineHeight:1, marginBottom:24 }}>JetBrains<br/>Mono</div>
            <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:13, color:t.textMuted, lineHeight:1.8, fontWeight:300, marginBottom:36 }}>
              AaBbCcDdEeFfGg<br/>HhIiJjKkLlMmNn<br/>01234567890
            </div>
            <div style={{ border:`1px solid ${t.border}`, display:'flex', flexDirection:'column' }}>
              {[
                { weight: 300, label: 'Light 300' },
                { weight: 500, label: 'Medium 500' },
              ].map(({ weight, label }, i, arr) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:14, fontWeight:weight, color:t.textSecondary }}>{label}</span>
                  <span style={μ(t.textFaint)}>Aa</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Headings scale */}
        <div style={{ marginBottom:56 }}>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>HEADINGS SCALE : SYNE</span>
          <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
            {headingScale.map((item, i, arr) => (
              <div key={item.name} style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'20px 24px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none', flexWrap:'wrap', gap:8 }}>
                <span style={{ fontFamily:'Syne, sans-serif', fontSize:item.size, fontWeight:item.weight, color:t.text, lineHeight:item.lh }}>{item.name}</span>
                <span style={μ(t.textFaint, { fontSize:12 })}>{item.size} / {item.px}  {item.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body scale */}
        <div style={{ marginBottom:56 }}>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>BODY SCALE : INTER</span>
          <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
            {bodyScale.map((item, i, arr) => (
              <div key={item.name} style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'16px 24px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none', flexWrap:'wrap', gap:8 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
                  <span style={{ fontFamily:'Inter, sans-serif', fontSize:item.size, fontWeight:item.weight, color:t.text, lineHeight:item.lh }}>{item.name}</span>
                  {item.isDefault && <span style={{ ...μ(t.accentLabel), padding:'2px 8px', border:`1px solid ${t.borderStrong}` }}>DEFAULT</span>}
                </div>
                <span style={μ(t.textFaint)}>{item.size} / {item.px}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mono scale */}
        <div>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>MONO SCALE : JETBRAINS MONO</span>
          <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
            {monoScale.map((item, i, arr) => (
              <div key={item.name} style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'16px 24px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none', flexWrap:'wrap', gap:8 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:item.size, fontWeight:item.weight, letterSpacing:item.ls, textTransform:'uppercase', color:t.text }}>{item.name}</span>
                  {item.isDefault && <span style={{ ...μ(t.accentLabel), padding:'2px 8px', border:`1px solid ${t.borderStrong}` }}>DEFAULT</span>}
                </div>
                <span style={μ(t.textFaint)}>{item.size} / {item.px}  {item.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 COLOR SYSTEM ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="02" title="FOUNDATION // COLOR" sub="Palette 50→950 · WCAG" t={t} />

        {/* Palette scales — swatches with WCAG contrast text */}
        {paletteScales.map(scale => (
          <div key={scale.name} style={{ marginBottom:48 }}>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:16 }}>{scale.name}</span>
            <div style={{ display:'flex', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
              {scale.steps.map(({ step, hex }) => {
                const txtColor = contrastText(hex);
                return (
                  <div key={step} style={{ flex:1, background:hex, display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'12px 6px', minHeight:80 }}>
                    <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', color:txtColor, letterSpacing:'0.15em' }}>{step}</span>
                    <span style={{ ...TYPE.mono.sm, fontSize:'0.5625rem', color:txtColor, letterSpacing:'0.05em', textTransform:'uppercase' }}>{hex}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Theme token mapping */}
        <div style={{ marginTop:64 }}>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>TOKEN MAPPING</span>
          <div style={{ display:'grid', gridTemplateColumns:'140px 1fr 1fr', gap:16, marginBottom:16, paddingBottom:10, borderBottom:`1px solid ${t.border}` }}>
            <div />
            <span style={μ(t.textMuted)}>MIDNIGHT</span>
            <span style={μ(t.textMuted)}>PRIMAL</span>
          </div>
          {tokenGroups.map(group => (
            <div key={group.name} style={{ marginBottom:32 }}>
              <span style={{ ...μ(t.textFaint, { fontSize:'0.625rem' }), display:'block', marginBottom:10 }}>{group.name}</span>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {group.tokens.map(token => {
                  const mVal = THEMES.midnight[token.name];
                  const pVal = THEMES.primal[token.name];
                  return (
                    <div key={token.name} style={{ display:'grid', gridTemplateColumns:'140px 1fr 1fr', gap:16, alignItems:'center' }}>
                      <span style={μ(t.textFaint)}>{token.name}</span>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:32, height:18, background:mVal, border:`1px solid rgba(255,255,255,0.06)`, flexShrink:0 }} />
                        <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', color:t.textFaint, letterSpacing:'0.08em', textTransform:'none' }}>{token.midnight}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:32, height:18, background:pVal, border:`1px solid rgba(0,0,0,0.08)`, flexShrink:0 }} />
                        <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', color:t.textFaint, letterSpacing:'0.08em', textTransform:'none' }}>{token.primal}</span>
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
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="03" title="COMPONENTS // TAGS" sub="SM · MD · LG : Default + Hover" t={t} />

        {/* Tag sizes — full width showcase */}
        <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
          {[
            { size: 'sm', label: 'TAG / SM', desc: '0.5625rem · 3px 8px. Card footers, metadata, lineage', examples: ['SOCIAL AI', 'DESIGN', 'VIBE_CODE', 'WCAG'] },
            { size: 'md', label: 'TAG / MD', desc: '0.625rem · 4px 12px. Signal badges, process tools, filters', examples: ['BUILD', 'READING', 'THINKING', 'CLAUDE'] },
            { size: 'lg', label: 'TAG / LG', desc: '0.75rem · 5px 14px. Prominent labels, standalone usage', examples: ['AI', 'PRODUCT', 'WEB3'] },
          ].map((row, i, arr) => (
            <div key={row.size} style={{ display:'grid', gridTemplateColumns:'200px 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ padding:'28px 24px', borderRight:`1px solid ${t.border}`, display:'flex', flexDirection:'column', justifyContent:'center', gap:6 }}>
                <span style={μ(t.accentLabel)}>{row.label}</span>
                <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none', lineHeight:1.6 }}>{row.desc}</span>
              </div>
              <div style={{ padding:'28px 24px', display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                {row.examples.map(ex => (
                  <Tag key={ex} t={t} size={row.size}>{ex}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tag hover behaviour note */}
        <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:12 }}>
          <span style={μ(t.textFaint, { fontSize:10 })}>HOVER</span>
          <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.08em', textTransform:'none' }}>border → accent · color → accentSecondary</span>
        </div>
      </section>

      {/* ── 04 BUTTONS & LINKS ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="04" title="COMPONENTS // ACTIONS" sub="Buttons · Links · Navigation" t={t} />

        {/* Buttons — state matrix */}
        <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
          {[
            {
              label: 'PRIMARY_CTA',
              desc: 'Hero action. Bold accent underline',
              states: [
                { name: 'DEFAULT', el: <button style={{ ...β(t.text), background:'none', border:'none', borderBottom:`2px solid ${t.accent}`, paddingBottom:4, cursor:'crosshair' }}>DISCOVER</button> },
                { name: 'HOVER', el: <button style={{ ...β(t.accentSecondary), background:'none', border:'none', borderBottom:`2px solid ${t.accentSecondary}`, paddingBottom:4, cursor:'crosshair' }}>DISCOVER</button> },
              ],
            },
            {
              label: 'SECONDARY_LINK',
              desc: 'Subdued. Dim accent underline',
              states: [
                { name: 'DEFAULT', el: <button style={{ ...β(t.accentFaint), background:'none', border:'none', borderBottom:`1px solid ${t.accentFaint}`, paddingBottom:4, cursor:'crosshair' }}>BRAND_OS →</button> },
                { name: 'HOVER', el: <button style={{ ...β(t.accent), background:'none', border:'none', borderBottom:`1px solid ${t.accent}`, paddingBottom:4, cursor:'crosshair' }}>BRAND_OS →</button> },
              ],
            },
            {
              label: 'NAV_LINK',
              desc: 'Section navigation. Active shows accent underline',
              states: [
                { name: 'DEFAULT', el: <span style={{ ...μ(t.text), borderBottom:'2px solid transparent', paddingBottom:4 }}>LAB</span> },
                { name: 'HOVER', el: <span style={{ ...μ(t.accentFaint), borderBottom:`2px solid ${t.accentFaint}`, paddingBottom:4 }}>LAB</span> },
                { name: 'ACTIVE', el: <span style={{ ...μ(t.text), borderBottom:`2px solid ${t.accent}`, paddingBottom:4 }}>LAB</span> },
              ],
            },
            {
              label: 'THEME_TOGGLE',
              desc: 'Nav element. Bordered box, fill on hover',
              states: [
                { name: 'DEFAULT', el: <button style={{ ...μ(t.accentSecondary), padding:'6px 14px', border:`1px solid ${t.borderStrong}`, background:'transparent', cursor:'crosshair', letterSpacing:'0.3em' }}>{t.toggleLabel}</button> },
                { name: 'HOVER', el: <button style={{ ...μ(t.accent), padding:'6px 14px', border:`1px solid ${t.borderStrong}`, background:t.bgHover, cursor:'crosshair', letterSpacing:'0.3em' }}>{t.toggleLabel}</button> },
              ],
            },
            {
              label: 'EXTERNAL_LINK',
              desc: 'Mono label + arrow. Opens in new tab',
              states: [
                { name: 'DEFAULT', el: <span style={{ ...μ(t.accentLabel), display:'flex', alignItems:'center', gap:8 }}>ENTER_KIZUNA <ExternalLink size={10}/></span> },
                { name: 'HOVER', el: <span style={{ ...μ(t.accent), display:'flex', alignItems:'center', gap:8 }}>ENTER_KIZUNA <ExternalLink size={10}/></span> },
              ],
            },
          ].map((item, i, arr) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'200px 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ padding:'28px 24px', borderRight:`1px solid ${t.border}`, display:'flex', flexDirection:'column', justifyContent:'center', gap:6 }}>
                <span style={μ(t.accentLabel)}>{item.label}</span>
                <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none', lineHeight:1.6 }}>{item.desc}</span>
              </div>
              <div style={{ padding:'28px 24px', display:'flex', gap:32, alignItems:'center' }}>
                {item.states.map(s => (
                  <div key={s.name} style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'flex-start' }}>
                    <span style={μ(t.textFaint, { fontSize:9 })}>{s.name}</span>
                    {s.el}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 INDICATORS & STATUS ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="05" title="COMPONENTS // STATUS" sub="Indicators · Badges" t={t} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
          {/* Active indicator */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>ACTIVE_INDICATOR</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Pulsing dot. Live / in-progress state</span>
            </div>
            <div style={{ display:'flex', gap:32, alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:t.pulseColor, boxShadow:`0 0 8px ${t.pulseShadow}`, animation:'pulse 2s infinite' }} />
                <span style={μ(t.pulseColor)}>ACTIVE</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:t.accentFaint }} />
                <span style={μ(t.textFaint)}>INACTIVE</span>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>STATUS_BADGE</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Project lifecycle: live, archive, version</span>
            </div>
            <div style={{ display:'flex', gap:16, alignItems:'center' }}>
              <StatusBadge status="LIVE" t={t} active />
              <StatusBadge status="ARCHIVE" t={t} />
              <StatusBadge status="v1.7" t={t} />
            </div>
          </div>

          {/* Section label */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>SECTION_LABEL</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Filled + stroke headline pair</span>
            </div>
            <div style={{ transform:'scale(0.65)', transformOrigin:'left center' }}>
              <SectionLabel filled="Signal" outline="Feed" t={t} />
            </div>
          </div>

          {/* Filter button */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>FILTER_BUTTON</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Toggle filter. Active / inactive states</span>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', letterSpacing:'0.25em', color:t.text, background:alpha(t.accent, 0.12), border:`1px solid ${t.accent}`, padding:'6px 14px' }}>ACTIVE</span>
              <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', letterSpacing:'0.25em', color:t.textFaint, border:`1px solid ${t.border}`, padding:'6px 14px' }}>INACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 SPACING & GRID ── */}
      <section style={{ marginBottom:64 }}>
        <SectionHeader num="06" title="FOUNDATION // LAYOUT" sub="Grid · Spacing · Borders" t={t} />

        <div style={{ display:'flex', flexDirection:'column', gap:48 }}>
          {/* Grid system */}
          <div>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>GRID</span>
            <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
              {[
                { prop: 'MAX_WIDTH', value: '960px', desc: 'Content container' },
                { prop: 'GUTTER', value: '24px', desc: 'Horizontal padding' },
                { prop: 'GAP_CELL', value: '1px', desc: 'Grid cell separator' },
              ].map((row, i, arr) => (
                <div key={row.prop} style={{ display:'grid', gridTemplateColumns:'160px 100px 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ padding:'14px 20px', ...μ(t.text) }}>{row.prop}</span>
                  <span style={{ padding:'14px 20px', ...μ(t.accent), borderLeft:`1px solid ${t.border}` }}>{row.value}</span>
                  <span style={{ padding:'14px 20px', fontFamily:'JetBrains Mono, monospace', fontSize:11, color:t.textFaint, letterSpacing:'0.08em', textTransform:'none', borderLeft:`1px solid ${t.border}` }}>{row.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing scale */}
          <div>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>SPACING SCALE</span>
            <div style={{ display:'flex', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
              {[
                { label: 'XS', value: '8px' },
                { label: 'SM', value: '16px' },
                { label: 'MD', value: '24px' },
                { label: 'LG', value: '48px' },
                { label: 'XL', value: '64px' },
                { label: '2XL', value: '96px' },
                { label: '3XL', value: '128px' },
                { label: '4XL', value: '192px' },
              ].map(step => (
                <div key={step.label} style={{ flex:1, background:t.bg, padding:'20px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
                  <div style={{ width:parseInt(step.value), height:parseInt(step.value), maxWidth:'100%', maxHeight:48, background:alpha(t.accent, 0.15), border:`1px solid ${alpha(t.accent, 0.3)}` }} />
                  <span style={μ(t.text, { fontSize:10 })}>{step.label}</span>
                  <span style={μ(t.textFaint, { fontSize:9 })}>{step.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Border tokens */}
          <div>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>BORDERS</span>
            <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
              {[
                { name: 'border', style: `1px solid ${t.border}`, desc: 'Default separator' },
                { name: 'borderStrong', style: `1px solid ${t.borderStrong}`, desc: 'Emphasis / interactive' },
                { name: 'accent', style: `2px solid ${t.accent}`, desc: 'Active state / CTA' },
              ].map((row, i, arr) => (
                <div key={row.name} style={{ display:'grid', gridTemplateColumns:'160px 1fr 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ padding:'16px 20px', ...μ(t.text) }}>{row.name}</span>
                  <div style={{ padding:'16px 20px', borderLeft:`1px solid ${t.border}`, display:'flex', alignItems:'center' }}>
                    <div style={{ width:'100%', borderBottom:row.style }} />
                  </div>
                  <span style={{ padding:'16px 20px', fontFamily:'JetBrains Mono, monospace', fontSize:11, color:t.textFaint, letterSpacing:'0.08em', textTransform:'none', borderLeft:`1px solid ${t.border}` }}>{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DesignSystem;
