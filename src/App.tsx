import { useEffect, useRef, useState } from 'react';
import WelcomeAnimation from './components/WelcomeAnimation';
import './styles/App.css';
import hengerlynChildhood from './assets/story/hengerlyn-childhood.jpg';
import limonOrigin from './assets/story/limon-origin.jpg';
import studentsCommunity from './assets/story/students-community-laptop-optimized.jpg';
import greenSeedling from './assets/story/green-seedling.jpg';
import limonCoast from './assets/collage/limon-coast.jpg';
import puertoViejoBeach from './assets/collage/puerto-viejo-beach.jpg';
import puertoViejoSeven from './assets/collage/puerto-viejo-7-optimized.jpg';

type Quadrant = {
  id: string;
  number: string;
  question: string;
  headline: string;
  badge: string;
  text: string;
  script: string;
  curiosity?: string;
  image: string;
  imageAlt: string;
  palette: string;
};

const quadrants: Quadrant[] = [
  {
    id: 'quien-soy',
    number: '01',
    question: '¿Quién soy?',
    headline: 'Soy resiliencia que aprende mientras avanza.',
    badge: 'Resiliencia + tecnología',
    text: 'Crecí viendo resiliencia en mi mamá. Hoy esa fuerza se convierte en curiosidad, disciplina y ganas de crecer en tecnología.',
    curiosity: 'Curiosidad: aprendo mejor creando, compartiendo y convirtiendo cada reto en impulso.',
    script:
      'Si me preguntan quién soy, la respuesta es simple: soy una mujer resiliente. No porque lo haya decidido un día, sino porque es lo que me tocó ser desde niña. Crecí viendo resiliencia todos los días, en la persona que más admiro en este mundo.',
    image: hengerlynChildhood,
    imageAlt: 'Hengerlyn de niña sosteniendo un peluche',
    palette: 'palette-identity',
  },
  {
    id: 'de-donde-vengo',
    number: '02',
    question: '¿De dónde vengo?',
    headline: 'Vengo de Limón y de una mujer fuerte.',
    badge: 'Raíces + familia',
    text: 'Mi mamá fue madre y padre al mismo tiempo. Ser la primera de mi familia en estar a punto de graduarme es una forma de honrar su esfuerzo.',
    script:
      'Vengo de Limón. De una casa donde mi mamá fue madre y padre al mismo tiempo. No tuvo un camino fácil: trabajó duro, sacrificó mucho, y nunca se rindió, aunque las circunstancias no siempre estuvieron a su favor. Hoy soy la primera de mi familia en estar a punto de graduarme de la universidad. No es solo un título para mí, es la prueba de que su esfuerzo no fue en vano, y de que puedo abrirle camino a los que vienen después.',
    image: limonOrigin,
    imageAlt: 'Parque Vargas en Limón, Costa Rica',
    palette: 'palette-origin',
  },
  {
    id: 'hacia-donde-voy',
    number: '03',
    question: '¿Hacia dónde quiero ir?',
    headline: 'Quiero ayudar a estudiantes y comunidades a crecer.',
    badge: 'Propósito + impacto',
    text: 'No busco solo un trabajo; busco propósito. Quiero usar la tecnología para abrir oportunidades, compartir conocimiento y apoyar a personas que también quieren salir adelante.',
    script:
      'Hacia dónde quiero ir es algo que he pensado mucho, y para mí es simple: quiero que todo lo que aprendí sirva para algo más grande que yo misma. No busco solo un trabajo, busco un propósito. Quiero llevar mi conocimiento a proyectos que generen un impacto real y positivo en la sociedad, empezando por las comunidades que me formaron, como Limón.',
    image: studentsCommunity,
    imageAlt: 'Estudiantes reunidos usando una laptop',
    palette: 'palette-future',
  },
  {
    id: 'que-me-representa',
    number: '04',
    question: '¿Qué me representa?',
    headline: 'Me representa el verde: crecer con esperanza.',
    badge: 'Verde + esperanza',
    text: 'Verde de raíces, esperanza y nuevos comienzos. Así soy yo: de Limón, hija de una mujer fuerte y lista para seguir creciendo.',
    script:
      'Y si tuviera que representarme con algo, sería el verde. Verde de lo que crece incluso cuando el terreno no es fácil. Verde de esperanza. Verde de lo que siempre encuentra la forma de empezar de nuevo. Así soy yo: de Limón, hija de una guerrera, y lista para seguir creciendo donde me den la oportunidad.',
    image: greenSeedling,
    imageAlt: 'Brote verde creciendo desde la tierra',
    palette: 'palette-symbol',
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedQuadrant, setExpandedQuadrant] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const closingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === closingRef.current) {
            setActiveSection(quadrants.length);
            return;
          }

          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActiveSection(index);
        });
      },
      { threshold: 0.45 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    if (closingRef.current) observer.observe(closingRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', updateFullscreenState);
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState);
  }, []);

  useEffect(() => {
    if (!expandedQuadrant) return;

    const activeQuadrant = quadrants[activeSection];
    if (!activeQuadrant || activeQuadrant.id !== expandedQuadrant) {
      setExpandedQuadrant(null);
    }
  }, [activeSection, expandedQuadrant]);

  const scrollToSection = (index: number) => {
    if (index === quadrants.length) {
      closingRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  };

  const toggleQuadrantScript = (quadrantId: string) => {
    setExpandedQuadrant((current) => (current === quadrantId ? null : quadrantId));
  };

  return (
    <>
      <WelcomeAnimation />
      <main className="prework-page">
        <button
          className="fullscreen-button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Abrir en pantalla completa'}
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? '×' : '⛶'}
        </button>

        <nav className="quadrant-nav" aria-label="Navegación de secciones">
          {quadrants.map((quadrant, index) => (
            <button
              key={quadrant.id}
              className={index === activeSection ? 'active' : ''}
              onClick={() => scrollToSection(index)}
              aria-label={quadrant.question}
            >
              {quadrant.number}
            </button>
          ))}
          <button
            className={activeSection === quadrants.length ? 'active nav-star' : 'nav-star'}
            onClick={() => scrollToSection(quadrants.length)}
            aria-label="Ir al cierre"
            title="Ir al cierre"
          >
            ★
          </button>
        </nav>

        <section className="opening">
          <div className="opening-copy">
            <span className="eyebrow">GenO Oracle Costa Rica</span>
            <h1>Raíces fuertes, propósito claro</h1>
            <p>
              Una historia en cuatro cuadrantes sobre origen, resiliencia, tecnología
              y esperanza.
            </p>
            <div className="opening-meta">Hengerlyn Nash · TEC · Limón, Costa Rica</div>
          </div>
        </section>

        {quadrants.map((quadrant, index) => {
          const isExpanded = expandedQuadrant === quadrant.id;

          return (
            <section
              key={quadrant.id}
              className={`story-panel ${quadrant.palette} panel-${quadrant.id}`}
              ref={(element) => {
                sectionRefs.current[index] = element;
              }}
            >
              <div className="panel-image">
                <img src={quadrant.image} alt={quadrant.imageAlt} />
              </div>
              <div className="panel-copy">
                <span className="panel-number">{quadrant.number}</span>
                <span className="panel-badge">{quadrant.badge}</span>
                <h2>{quadrant.question}</h2>
                <h3>{quadrant.headline}</h3>
                <p>{quadrant.text}</p>
                {quadrant.curiosity && (
                  <div className="quadrant-curiosity">{quadrant.curiosity}</div>
                )}
                <button
                  className={isExpanded ? 'story-trigger story-trigger-open' : 'story-trigger'}
                  onClick={() => toggleQuadrantScript(quadrant.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`script-${quadrant.id}`}
                >
                  {isExpanded ? 'Ocultar guion' : 'Leer más'}
                </button>
                <div
                  id={`script-${quadrant.id}`}
                  className={isExpanded ? 'quadrant-script is-open' : 'quadrant-script'}
                >
                  <div className="script-header">
                    <strong>Cuadrante {quadrant.number}</strong>
                  </div>
                  <p>{quadrant.script}</p>
                </div>
              </div>
            </section>
          );
        })}

        <section className="closing" ref={closingRef}>
          <div className="closing-background" aria-hidden="true">
            <img className="closing-photo closing-photo-main" src={puertoViejoBeach} alt="" />
            <img className="closing-photo closing-photo-top" src={limonCoast} alt="" />
            <img className="closing-photo closing-photo-side" src={puertoViejoSeven} alt="" />
            <img className="closing-photo closing-photo-bottom" src={limonOrigin} alt="" />
          </div>
          <div className="closing-copy">
            <span>Esta historia apenas comienza.</span>
            <h2>De mis raíces al impacto.</h2>
            <p>Lista para aprender, aportar y seguir creciendo con propósito.</p>
          </div>
        </section>
      </main>
    </>
  );
}
