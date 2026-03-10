export default function PortfolioSections({ section, index, isVisible }) {
  return (
    <section className={`portfolio-section ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <div className="section-number">{String(index + 1).padStart(2, '0')}</div>
      <div className="section-grid">
        <div className={`section-text ${isVisible ? 'slide-in-left' : ''}`}>
          <span className="section-icon-large">{section.icon}</span>
          <h2>{section.title}</h2>
          <span className="section-badge">{section.subtitle}</span>
          <p className="section-content">{section.content}</p>
        </div>
        <div className={`section-visual ${isVisible ? 'slide-in-right' : ''}`}>
          <div className="visual-card" style={{ background: section.gradient }}>
            <div className="visual-circle circle-1"></div>
            <div className="visual-circle circle-2"></div>
            <div className="visual-circle circle-3"></div>
            <span className="visual-emoji">{section.bigEmoji}</span>
          </div>
        </div>
      </div>
      <div className="section-glow" style={{ background: section.gradient }}></div>
    </section>
  );
}
