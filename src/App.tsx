import { useEffect, useRef, useState } from 'react';
import StoryScene from './components/StoryScene';
import './styles/App.css';

const chapters = [
  {
    id: 'historia',
    icon: '\u{1F3E0}',
    title: '\u00BFD\u00F3nde he estado?',
    subtitle: 'Mi Historia',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    content: 'Nac\u00ED en San Jos\u00E9, pero casi toda mi crianza fue en Lim\u00F3n, Costa Rica. Vengo de una familia liderada por mi madre soltera, quien con enorme esfuerzo y valent\u00EDa sac\u00F3 adelante a sus 4 hijos. Su ejemplo de sacrificio y fortaleza me ense\u00F1\u00F3 que no hay obst\u00E1culo imposible. Desde peque\u00F1a he sido amante de la tecnolog\u00EDa y el aprendizaje, siempre curiosa por entender c\u00F3mo funcionan las cosas y con ganas de superarme.'
  },
  {
    id: 'presente',
    icon: '\u{1F393}',
    title: '\u00BFD\u00F3nde estoy ahora?',
    subtitle: 'Mi Presente',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    content: 'Actualmente soy estudiante universitaria en el TEC, apasionada por la tecnolog\u00EDa y el aprendizaje continuo. Cada d\u00EDa trabajo en construir una base s\u00F3lida de conocimientos que me permita enfrentar los retos del futuro con confianza y creatividad.'
  },
  {
    id: 'futuro',
    icon: '\u{1F680}',
    title: '\u00BFA d\u00F3nde quiero llegar?',
    subtitle: 'Mi Futuro',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    content: 'Corto plazo: en un a\u00F1o quiero dominar las tecnolog\u00EDas que estudio y obtener experiencia laboral real. Largo plazo: en 10-15 a\u00F1os me veo liderando proyectos innovadores, con estabilidad financiera y aportando al desarrollo tecnol\u00F3gico de Costa Rica.'
  },
  {
    id: 'metodos',
    icon: '\u{1F6E4}\uFE0F',
    title: '\u00BFC\u00F3mo llegar\u00E9 ah\u00ED?',
    subtitle: 'Mis M\u00E9todos',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    content: 'Mediante estudio constante, proyectos personales, networking profesional, mentor\u00EDas y participaci\u00F3n activa en la comunidad tecnol\u00F3gica. Cada d\u00EDa es una oportunidad para aprender algo nuevo y acercarme a mis metas.'
  },
  {
    id: 'medidas',
    icon: '\u{1F3C6}',
    title: '\u00BFC\u00F3mo sabr\u00E9 si he llegado?',
    subtitle: 'Mis Medidas',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    content: 'Lo sabr\u00E9 cuando logre mis metas profesionales, cuando pueda vivir de lo que me apasiona, cuando tenga la capacidad de ayudar a otros y cuando mire hacia atr\u00E1s y vea un camino de crecimiento constante.'
  },
  {
    id: 'pasion',
    icon: '\u{1F525}',
    title: '\u00BFQu\u00E9 me apasiona?',
    subtitle: 'Mi Pasi\u00F3n',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    content: 'Me apasiona la tecnolog\u00EDa, resolver problemas complejos, crear soluciones que impacten positivamente a las personas, aprender cosas nuevas y compartir conocimiento con otros.'
  },
  {
    id: 'fortalezas',
    icon: '\u2B50',
    title: '\u00BFEn qu\u00E9 soy la mejor?',
    subtitle: 'Mis Fortalezas',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    content: 'Soy la mejor resolviendo problemas de forma creativa, aprendiendo r\u00E1pidamente nuevas tecnolog\u00EDas, colaborando en equipo y manteniendo la motivaci\u00F3n incluso frente a los desaf\u00EDos m\u00E1s dif\u00EDciles.'
  },
  {
    id: 'impacto',
    icon: '\u{1F30D}',
    title: '\u00BFC\u00F3mo voy a cambiar el mundo?',
    subtitle: 'Mi Impacto',
    gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
    content: 'Quiero cambiar el mundo creando soluciones tecnol\u00F3gicas accesibles que mejoren la vida de las personas, especialmente en comunidades con menos oportunidades. La tecnolog\u00EDa tiene el poder de democratizar el conocimiento y las oportunidades.'
  },
  {
    id: 'filosofia',
    icon: '\u{1F4A1}',
    title: '\u00BFCu\u00E1l es mi filosof\u00EDa para vivir?',
    subtitle: 'Mi Filosof\u00EDa',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    content: 'Vivir con prop\u00F3sito, aprender siempre, ser honesta y ayudar a los dem\u00E1s. Creo que el \u00E9xito verdadero no se mide solo por logros profesionales, sino por el impacto positivo que dejamos en quienes nos rodean.'
  },
  {
    id: 'personas',
    icon: '\u{1F49C}',
    title: '\u00BFA qui\u00E9n quiero cambiarles la vida?',
    subtitle: 'Mi Gente',
    gradient: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
    content: 'Quiero cambiar la vida de mi mam\u00E1 y mis hermanos, retribuyendo todo su esfuerzo y sacrificio. Tambi\u00E9n de los j\u00F3venes que, como yo, vienen de familias humildes y buscan oportunidades para crecer profesionalmente, y de las comunidades de Lim\u00F3n que necesitan acceso a la tecnolog\u00EDa.'
  }
];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState(0);
  const [activeChapter, setActiveChapter] = useState(-1);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!showIntro) return;
    const timers = [
      setTimeout(() => setIntroPhase(1), 400),   // "Hola" aparece
      setTimeout(() => setIntroPhase(2), 1800),   // "Soy Nash" aparece
      setTimeout(() => setIntroPhase(3), 3200),   // "Esta es mi historia..." aparece
      setTimeout(() => setIntroPhase(4), 4800),   // Fade out
      setTimeout(() => setShowIntro(false), 5600), // Remover intro
    ];
    return () => timers.forEach(clearTimeout);
  }, [showIntro]);

  useEffect(() => {
    const isMobile = window.innerWidth < 600;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = chapterRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveChapter(idx);
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: isMobile ? 0.1 : 0.25 }
    );

    chapterRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    chapterRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showIntro) {
    return (
      <div className={`intro-screen ${introPhase >= 4 ? 'intro-fade-out' : ''}`}>
        <div className="intro-content">
          <span className={`intro-line ${introPhase >= 1 ? 'intro-visible' : ''}`}>
            Hola {'\u{1F44B}\u{1F3FE}'}
          </span>
          <span className={`intro-line intro-line-2 ${introPhase >= 2 ? 'intro-visible' : ''}`}>
            Soy Nash
          </span>
          <span className={`intro-line intro-line-3 ${introPhase >= 3 ? 'intro-visible' : ''}`}>
            Esta es mi historia...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="story">
      {/* ---- Progress Nav ---- */}
      <nav className="story-nav">
        {chapters.map((ch, i) => (
          <button
            key={ch.id}
            className={`nav-dot ${i === activeChapter ? 'active' : ''} ${i < activeChapter ? 'passed' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={ch.subtitle}
          >
            <span className="nav-dot-tooltip">{ch.icon} {ch.subtitle}</span>
          </button>
        ))}
      </nav>

      {/* ---- Hero ---- */}
      <section className="story-hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="hero-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-avatar">{'\u{1F469}\u{1F3FE}\u200D\u{1F4BB}'}</div>
          <h1 className="hero-title">Mi Portafolio Personal</h1>
          <p className="hero-subtitle">La historia de mis metas y sue{'\u00F1'}os</p>
          <span className="hero-tag">Nash {'\u00B7'} Estudiante TEC {'\u00B7'} Lim{'\u00F3'}n, CR</span>
          <div className="scroll-cue">
            <span>Desliza para conocer mi historia</span>
            <svg className="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---- Chapters ---- */}
      <div className="story-chapters">
        {chapters.map((ch, i) => (
          <section
            key={ch.id}
            className={`chapter ${i % 2 === 1 ? 'chapter-alt' : ''}`}
            ref={(el) => { chapterRefs.current[i] = el; }}
          >
            <div className="chapter-connector">
              <div className="connector-line"></div>
              <div className="connector-dot" style={{ background: ch.gradient }}>{ch.icon}</div>
            </div>

            <div className="chapter-inner">
              <div className="chapter-text-side">
                <span className="chapter-label">
                  Cap{'\u00ED'}tulo {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="chapter-title">{ch.title}</h2>
                <div className="chapter-badge" style={{ background: ch.gradient }}>
                  {ch.subtitle}
                </div>
                <p className="chapter-body">{ch.content}</p>
              </div>
              <div className="chapter-scene-side">
                <StoryScene sceneId={ch.id} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ---- Ending ---- */}
      <section className="story-ending">
        <span className="ending-sparkle">{'\u2728'}</span>
        <h2>...y esta historia apenas comienza</h2>
        <p>Portafolio Personal {'\u2014'} Esp{'\u00ED'}ritu Emprendedor</p>
        <p className="ending-meta">TEC Costa Rica {'\u2014'} 2026</p>
      </section>
    </div>
  );
}
