export default function Sidebar({ sections, onSelect, selected, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-avatar-ring">
          <div className="sidebar-avatar">👩🏾‍💻</div>
        </div>
        <h3 className="sidebar-name">Nash</h3>
        <span className="sidebar-role">Estudiante TEC · Limón, CR</span>
      </div>
      <nav>
        <ul>
          {sections.map((section, idx) => (
            <li key={idx} className={`sidebar-item ${selected === idx ? 'active' : ''}`}>
              <button onClick={() => onSelect(idx)}>
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.subtitle}</span>
                {selected === idx && <span className="nav-active-dot"></span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>Portafolio 2026</p>
      </div>
    </aside>
  );
}
