import { PALETTE, TYPE, alpha } from '../tokens.js';
import { Tag, SectionHeader, HeroBgCanvas, ArrowUpRight } from '../components/shared.jsx';

// ─── Style shorthand helpers (module-scope — created once, not per render) ────
/** @param {string} color @param {Object} [extra] @returns {Object} */
const μ = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.4em', color, ...extra });

const CaseStudy = ({ study, t, onBack, onTagClick }) => {

  return (
    <div className="animate-in">

      {/* ── HERO HEADER with generative background ── */}
      <div style={{ position:'relative', overflow:'hidden', borderBottom:`1px solid ${t.border}` }}>
        <HeroBgCanvas t={t} variant={study.heroBg || 'noise'} />
        <div style={{ position:'relative', zIndex:1, maxWidth:960, margin:'0 auto', padding:'120px 24px 64px' }}>

          <button onClick={onBack} style={{ alignSelf:'flex-start', ...μ(t.textMuted, { letterSpacing:'0.3em' }), background:'none', border:'none', cursor:'crosshair', marginBottom:40, display:'flex', alignItems:'center', gap:8, transition:'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = t.accent}
            onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
          >← RETURN</button>

          {/* Headline: single h1, two visual spans — outline + filled */}
          <h1 style={{ fontSize:'clamp(2.8rem,8vw,5.5rem)', fontWeight:900, fontStyle:'italic', textTransform:'uppercase', letterSpacing:'-0.07em', margin:0 }}>
            <span style={{ display:'block', color:'transparent', WebkitTextStroke:t.stroke, lineHeight:0.85 }}>{study.headline.outline}</span>
            <span style={{ display:'block', color:t.text, lineHeight:0.85 }}>{study.headline.filled}</span>
          </h1>

          {/* Subline + Visit CTA */}
          <div style={{ marginTop:32, display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
            <p>
              <span style={{ ...TYPE.mono.sm, fontSize:13, letterSpacing:'0.35em', color:t.text }}>{study.subline.split(' for ')[0].toUpperCase()}</span>
              <span style={{ ...TYPE.mono.sm, fontSize:12, letterSpacing:'0.3em', color:t.textSecondary, marginLeft:8 }}>FOR {study.subline.split(' for ')[1]?.toUpperCase()}</span>
            </p>
            <a href={study.url} target="_blank" rel="noopener noreferrer"
              style={{ ...μ(t.accent, { letterSpacing:'0.3em', fontSize:10 }), textDecoration:'none', display:'flex', alignItems:'center', gap:8, flexShrink:0, transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = t.accentSecondary}
              onMouseLeave={e => e.currentTarget.style.color = t.accent}
            >VISIT KIZUNA <ArrowUpRight size={10} /></a>
          </div>

          {/* ── Responsibilities + Meta row ──
              Panel uses jaguar[700] (#3E3284) — visibly elevated from page bg.
              CSS vars overridden on container: --tag-color & --border boosted
              for WCAG AA on the purple surface (jaguar[100] = ~7.5:1 contrast).  */}
          {(() => {
            const panelBg  = PALETTE.jaguar[700];
            const panelCss = {
              '--tag-color': PALETTE.jaguar[100],                  // AAA contrast on jaguar[700]
              '--border':    alpha(PALETTE.jaguar[100], 0.22),      // visible chip border
              '--accent':    PALETTE.downriver[200],                // hover accent on panel
              '--accent-secondary': PALETTE.downriver[100],
            };
            const labelCol = PALETTE.jaguar[300];
            return (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:alpha(PALETTE.jaguar[100], 0.3), border:`1px solid ${alpha(PALETTE.jaguar[100], 0.15)}`, marginTop:32 }}>

                {/* Left: Responsibilities — each chip opens glossary */}
                <div style={{ ...panelCss, background:panelBg, padding:'16px 20px', display:'flex', flexDirection:'column', gap:10 }}>
                  <span style={μ(labelCol, { fontSize:8 })}>RESPONSIBILITIES</span>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {study.role.split(' · ').map((role, i) => (
                      <Tag key={i} t={{ ...t, accentLabel: PALETTE.jaguar[100] }} size="sm"
                        onClick={() => onTagClick?.(role)}>{role}</Tag>
                    ))}
                  </div>
                </div>

                {/* Right: Tags + Year — left-aligned, all open glossary */}
                <div style={{ ...panelCss, background:panelBg, padding:'16px 20px', display:'flex', flexDirection:'column', gap:10 }}>
                  <span style={μ(labelCol, { fontSize:8 })}>TAGS</span>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {study.tags.map(tag => (
                      <Tag key={tag} t={{ ...t, accentLabel: PALETTE.jaguar[100] }} size="sm"
                        onClick={() => onTagClick?.(tag)}>{tag}</Tag>
                    ))}
                    <Tag t={{ ...t, accentLabel: PALETTE.jaguar[100] }} size="sm">2026</Tag>
                  </div>
                </div>

              </div>
            );
          })()}

          {/* Metric cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:t.border, border:`1px solid ${t.border}`, borderTop:'none', marginTop:0 }}>
            {study.metrics.map((m, i) => (
              <div key={i} style={{ background:t.bg, padding:'32px 24px', display:'flex', flexDirection:'column', gap:8 }}>
                <span style={{ fontFamily:'Big Shoulders Display, Impact, sans-serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, color:t.text, lineHeight:1 }}>{m.value}</span>
                <span style={μ(t.accentLabel, { fontSize:9 })}>{m.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── PAGE BODY ── */}
      <div style={{ maxWidth:960, margin:'0 auto', padding:'80px 24px 160px' }}>

      {/* ── 01 CHALLENGE ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="01" title={`CHALLENGE // ${study.challenge.title}`} t={t} />
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:64 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            {study.challenge.paragraphs.map((p, i) => (
              <p key={i} style={{ ...TYPE.body.md, color:t.text, lineHeight:1.8 }}>{p}</p>
            ))}
          </div>
          <aside style={{ borderLeft:`1px solid ${t.border}`, paddingLeft:32, display:'flex', alignItems:'flex-start' }}>
            <blockquote style={{ ...TYPE.body.intro, color:t.textSecondary, fontStyle:'italic', lineHeight:1.8, margin:0 }}>
              "{study.challenge.pullQuote}"
            </blockquote>
          </aside>
        </div>
      </section>

      {/* ── Image break: Challenge → Solution ── */}
      <div style={{ marginBottom:128, border:`1px solid ${t.border}`, aspectRatio:'21/9', display:'flex', alignItems:'center', justifyContent:'center', background:t.bgSurface }}>
        <span style={μ(t.textFaint, { fontSize:10 })}>CHALLENGE VISUAL / BEFORE STATE</span>
      </div>

      {/* ── 02 SOLUTION ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="02" title="SOLUTION // WHAT WE BUILT" t={t} />

        {/* Feature grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:t.border, border:`1px solid ${t.border}`, marginBottom:48 }}>
          {study.solution.features.map((f, i) => (
            <div key={i} style={{ background:t.bg, padding:'32px 24px', display:'flex', flexDirection:'column', gap:12 }}>
              <span style={μ(t.accentLabel, { fontSize:10 })}>{f.name}</span>
              <p style={{ ...TYPE.body.sm, color:t.text, lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Differentiator */}
        <div style={{ borderLeft:`2px solid ${t.accent}`, paddingLeft:24, marginBottom:32 }}>
          <p style={{ ...TYPE.body.md, color:t.text, lineHeight:1.8 }}>{study.solution.differentiator}</p>
        </div>

        {/* Craft note */}
        <div style={{ padding:'24px', border:`1px solid ${t.border}`, background:t.bgSurface }}>
          <span style={μ(t.accentFaint, { fontSize:9, marginBottom:8, display:'block' })}>AI VS. CRAFT</span>
          <p style={{ ...TYPE.body.sm, color:t.text, lineHeight:1.7 }}>{study.solution.craftNote}</p>
        </div>
      </section>

      {/* ── Image break: Solution → Process ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:t.border, border:`1px solid ${t.border}`, marginBottom:128 }}>
        <div style={{ background:t.bgSurface, aspectRatio:'16/10', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={μ(t.textFaint, { fontSize:10 })}>DASHBOARD SCREENSHOT</span>
        </div>
        <div style={{ background:t.bgSurface, aspectRatio:'16/10', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={μ(t.textFaint, { fontSize:10 })}>FEATURE DETAIL</span>
        </div>
      </div>

      {/* ── 03 PROCESS ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="03" title="PROCESS // HOW WE GOT HERE" t={t} />

        {/* Vertical timeline — no hover, not clickable */}
        <div style={{ display:'flex', flexDirection:'column', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
          {study.process.map((step, i) => (
            <div key={i} style={{ background:t.bg, padding:'28px 24px', display:'flex', alignItems:'flex-start', gap:24, borderLeft:`2px solid ${t.accent}` }}>
              <span style={μ(t.accentFaint, { fontSize:10, flexShrink:0, width:24 })}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <span style={μ(t.text, { fontSize:11, letterSpacing:'0.3em', display:'block', marginBottom:8 })}>{step.phase}</span>
                <p style={{ ...TYPE.body.sm, color:t.text, lineHeight:1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Aha moment */}
        {study.ahaQuote && (
          <div style={{ marginTop:48, borderLeft:`2px solid ${t.accent}`, paddingLeft:24 }}>
            <span style={μ(t.accentFaint, { fontSize:9, display:'block', marginBottom:8 })}>AHA MOMENT</span>
            <p style={{ ...TYPE.body.md, color:t.text, fontStyle:'italic', lineHeight:1.8 }}>{study.ahaQuote}</p>
          </div>
        )}
      </section>

      {/* ── Image break: Process → Impact ── */}
      <div style={{ marginBottom:128, border:`1px solid ${t.border}`, aspectRatio:'21/9', display:'flex', alignItems:'center', justifyContent:'center', background:t.bgSurface }}>
        <span style={μ(t.textFaint, { fontSize:10 })}>PROCESS VISUAL / FIGMA BOARD</span>
      </div>

      {/* ── 04 IMPACT ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="04" title="IMPACT // WHAT HAPPENED" t={t} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64 }}>
          {/* Bullets */}
          <div style={{ display:'flex', flexDirection:'column', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
            {study.impact.bullets.map((b, i) => (
              <div key={i} style={{ background:t.bg, padding:'20px 24px', display:'flex', alignItems:'center', gap:16 }}>
                <span style={μ(t.accentFaint, { fontSize:10 })}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ ...TYPE.body.sm, color:t.text }}>{b}</span>
              </div>
            ))}
          </div>

          {/* Reflection */}
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <span style={μ(t.accentFaint, { fontSize:9, marginBottom:12 })}>REFLECTION</span>
            <p style={{ ...TYPE.body.md, color:t.text, lineHeight:1.8 }}>{study.impact.reflection}</p>
          </div>
        </div>
      </section>

      {/* ── Closing visual gallery ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="05" title="VISUALS // THE CRAFT" t={t} />

        {/* Full-width feature image */}
        <div style={{ border:`1px solid ${t.border}`, aspectRatio:'21/9', display:'flex', alignItems:'center', justifyContent:'center', background:t.bgSurface, marginBottom:1 }}>
          <span style={μ(t.textFaint, { fontSize:10 })}>BRAND IDENTITY / KEY VISUAL</span>
        </div>

        {/* 2-up detail grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:t.border, border:`1px solid ${t.border}`, borderTop:'none' }}>
          {['Dashboard Overview', 'Member Intelligence', 'Design System', 'Smart Raffles'].map((label, i) => (
            <div key={i} style={{ background:t.bgSurface, aspectRatio:'16/10', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12 }}>
              <span style={μ(t.textFaint, { fontSize:10 })}>{String(i + 1).padStart(2, '0')}</span>
              <span style={μ(t.accentFaint, { fontSize:9 })}>{label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:`1px solid ${t.border}`, paddingTop:32 }}>
        <button onClick={onBack} style={{ ...μ(t.textMuted, { letterSpacing:'0.3em' }), background:'none', border:'none', cursor:'crosshair', transition:'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = t.accent}
          onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
        >← ALL PROJECTS</button>
        <a href={study.url} target="_blank" rel="noopener noreferrer" style={{ ...μ(t.accent, { letterSpacing:'0.3em' }), textDecoration:'none', display:'flex', alignItems:'center', gap:8, transition:'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = t.accentSecondary}
          onMouseLeave={e => e.currentTarget.style.color = t.accent}
        >VISIT KIZUNA <ArrowUpRight size={12} /></a>
      </div>
    </div>
  </div>
  );
};

export default CaseStudy;
