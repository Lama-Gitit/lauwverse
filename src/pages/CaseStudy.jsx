import { PALETTE, alpha } from '../tokens.js';
import { Tag, SectionHeader, HeroBgCanvas, ArrowUpRight } from '../components/shared.jsx';

// ── Panel: fixed palette values for WCAG AA on jaguar[700] surface ───────────
// These are NOT theme-dependent — the panel always uses the deep-purple bg
// to provide visible contrast for the responsibilities + tag chips.
const PANEL_BG    = PALETTE.jaguar[700];
const PANEL_LABEL = PALETTE.jaguar[300];
const PANEL_VARS  = {
  '--tag-color':       PALETTE.jaguar[100],             // ~7.5:1 on jaguar[700]
  '--border':          alpha(PALETTE.jaguar[100], 0.22), // visible chip border
  '--accent':          PALETTE.downriver[200],
  '--accent-secondary': PALETTE.downriver[100],
};

/** @param {{ study: import('../data.js').CaseStudy, t: import('../tokens.js').Theme, onBack: Function, onTagClick?: Function }} props */
const CaseStudy = ({ study, t, onBack, onTagClick }) => (
  <main className="cs animate-in">

    {/* ── HERO ── */}
    <header className="cs__hero">
      <HeroBgCanvas t={t} variant={study.heroBg || 'noise'} />
      <div className="cs__hero-content">

        <button className="cs__back" onClick={onBack}>← RETURN</button>

        {/* Single h1 — outline + filled two-span technique */}
        <h1 className="cs__headline">
          <span className="cs__headline-outline">{study.headline.outline}</span>
          <span className="cs__headline-filled">{study.headline.filled}</span>
        </h1>

        {/* Subline + external CTA */}
        <div className="cs__subline-row">
          <p>
            <span className="cs__subline-main">{study.subline.split(' for ')[0].toUpperCase()}</span>
            <span className="cs__subline-for">FOR {study.subline.split(' for ')[1]?.toUpperCase()}</span>
          </p>
          <a href={study.url} target="_blank" rel="noopener noreferrer" className="cs__visit-link">
            VISIT KIZUNA <ArrowUpRight size={10} />
          </a>
        </div>

        {/* Responsibilities + Tags — hardcoded purple panel for WCAG contrast */}
        <div className="cs__meta-panel">
          <div className="cs__meta-cell" style={{ ...PANEL_VARS, background: PANEL_BG }}>
            <span className="cs__meta-label" style={{ color: PANEL_LABEL }}>RESPONSIBILITIES</span>
            <div className="cs__meta-chips">
              {study.role.split(' · ').map((role, i) => (
                <Tag key={i} t={{ ...t, accentLabel: PALETTE.jaguar[100] }} size="sm"
                  onClick={() => onTagClick?.(role)}>{role}</Tag>
              ))}
            </div>
          </div>
          <div className="cs__meta-cell" style={{ ...PANEL_VARS, background: PANEL_BG }}>
            <span className="cs__meta-label" style={{ color: PANEL_LABEL }}>TAGS</span>
            <div className="cs__meta-chips">
              {study.tags.map(tag => (
                <Tag key={tag} t={{ ...t, accentLabel: PALETTE.jaguar[100] }} size="sm"
                  onClick={() => onTagClick?.(tag)}>{tag}</Tag>
              ))}
              <Tag t={{ ...t, accentLabel: PALETTE.jaguar[100] }} size="sm">2026</Tag>
            </div>
          </div>
        </div>

        {/* Metric cards */}
        <div className="cs__metrics" role="list">
          {study.metrics.map((m, i) => (
            <div key={i} className="cs__metric" role="listitem">
              <span className="cs__metric-value">{m.value}</span>
              <span className="cs__metric-label">{m.label}</span>
            </div>
          ))}
        </div>

      </div>
    </header>

    {/* ── PAGE BODY ── */}
    <div className="cs__body">

      {/* 01 CHALLENGE */}
      <section className="cs__section" aria-label="Challenge">
        <SectionHeader num="01" title={`CHALLENGE // ${study.challenge.title}`} t={t} />
        <div className="cs__challenge-grid">
          <div className="cs__challenge-copy">
            {study.challenge.paragraphs.map((p, i) => (
              <p key={i} className="cs__body-para">{p}</p>
            ))}
          </div>
          <aside className="cs__aside">
            <blockquote className="cs__pullquote">"{study.challenge.pullQuote}"</blockquote>
          </aside>
        </div>
      </section>

      <div className="cs__img-break" role="img" aria-label="Challenge visual — before state">
        <span className="cs__img-label">CHALLENGE VISUAL / BEFORE STATE</span>
      </div>

      {/* 02 SOLUTION */}
      <section className="cs__section" aria-label="Solution">
        <SectionHeader num="02" title="SOLUTION // WHAT WE BUILT" t={t} />
        <ul className="cs__feature-grid">
          {study.solution.features.map((f, i) => (
            <li key={i} className="cs__feature-cell">
              <span className="cs__feature-name">{f.name}</span>
              <p className="cs__feature-desc">{f.desc}</p>
            </li>
          ))}
        </ul>
        <div className="cs__differentiator">
          <p className="cs__body-para">{study.solution.differentiator}</p>
        </div>
        <div className="cs__craft-note">
          <span className="cs__craft-label">AI VS. CRAFT</span>
          <p className="cs__feature-desc">{study.solution.craftNote}</p>
        </div>
      </section>

      <div className="cs__img-break cs__img-break--2up" role="img" aria-label="Solution screenshots">
        <div className="cs__img-cell"><span className="cs__img-label">DASHBOARD SCREENSHOT</span></div>
        <div className="cs__img-cell"><span className="cs__img-label">FEATURE DETAIL</span></div>
      </div>

      {/* 03 PROCESS */}
      <section className="cs__section" aria-label="Process">
        <SectionHeader num="03" title="PROCESS // HOW WE GOT HERE" t={t} />
        <ol className="cs__process-list">
          {study.process.map((step, i) => (
            <li key={i} className="cs__process-step">
              <span className="cs__process-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <span className="cs__process-phase">{step.phase}</span>
                <p className="cs__feature-desc">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        {study.ahaQuote && (
          <div className="cs__aha">
            <span className="cs__aha-label">AHA MOMENT</span>
            <p className="cs__aha-quote">{study.ahaQuote}</p>
          </div>
        )}
      </section>

      <div className="cs__img-break" role="img" aria-label="Process visual — Figma board">
        <span className="cs__img-label">PROCESS VISUAL / FIGMA BOARD</span>
      </div>

      {/* 04 IMPACT */}
      <section className="cs__section" aria-label="Impact">
        <SectionHeader num="04" title="IMPACT // WHAT HAPPENED" t={t} />
        <div className="cs__impact-grid">
          <ul className="cs__impact-bullets">
            {study.impact.bullets.map((b, i) => (
              <li key={i} className="cs__impact-bullet">
                <span className="cs__impact-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="cs__impact-text">{b}</span>
              </li>
            ))}
          </ul>
          <div className="cs__reflection">
            <span className="cs__reflection-label">REFLECTION</span>
            <p className="cs__body-para">{study.impact.reflection}</p>
          </div>
        </div>
      </section>

      {/* 05 VISUALS */}
      <section className="cs__section" aria-label="Visuals">
        <SectionHeader num="05" title="VISUALS // THE CRAFT" t={t} />
        <div className="cs__gallery-hero" role="img" aria-label="Brand identity key visual">
          <span className="cs__img-label">BRAND IDENTITY / KEY VISUAL</span>
        </div>
        <ul className="cs__gallery-grid">
          {['Dashboard Overview', 'Member Intelligence', 'Design System', 'Smart Raffles'].map((label, i) => (
            <li key={i} className="cs__gallery-cell">
              <span className="cs__img-label" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="cs__img-label">{label.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FOOTER NAV */}
      <nav className="cs__footer-nav" aria-label="Case study navigation">
        <button className="cs__footer-back" onClick={onBack}>← ALL PROJECTS</button>
        <a href={study.url} target="_blank" rel="noopener noreferrer" className="cs__footer-link">
          VISIT KIZUNA <ArrowUpRight size={12} />
        </a>
      </nav>

    </div>
  </main>
);

export default CaseStudy;
