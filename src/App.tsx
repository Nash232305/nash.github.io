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
  image: string;
  imageAlt: string;
  palette: string;
  accent: string;
};

const quadrants: Quadrant[] = [
  {
    id: 'quien-soy',
    number: '01',
    question: '¿Quién soy?',
    headline: 'Soy resiliencia que aprende mientras avanza.',
    badge: 'Resiliencia + tecnología',
    text: 'Crecí viendo resiliencia en mi mamá. Hoy esa fuerza se convierte en curiosidad, disciplina y ganas de crecer en tecnología.',
    image: hengerlynChildhood,
    imageAlt: 'Hengerlyn de niña sosteniendo un peluche',
    palette: 'palette-identity',
    accent: '#7c5cff',
  },
  {
    id: 'de-donde-vengo',
    number: '02',
    question: '¿De dónde vengo?',
    headline: 'Vengo de Limón y de una mujer fuerte.',
    badge: 'Raíces + familia',
    text: 'Mi mamá fue madre y padre al mismo tiempo. Ser la primera de mi familia en estar a punto de graduarme es una forma de honrar su esfuerzo.',
    image: limonOrigin,
    imageAlt: 'Parque Vargas en Limón, Costa Rica',
    palette: 'palette-origin',
    accent: '#ffb35c',
  },
  {
    id: 'hacia-donde-voy',
    number: '03',
    question: '¿Hacia dónde quiero ir?',
    headline: 'Quiero ayudar a estudiantes y comunidades a crecer.',
    badge: 'Propósito + impacto',
    text: 'No busco solo un trabajo; busco propósito. Quiero usar la tecnología para abrir oportunidades, compartir conocimiento y apoyar a personas que también quieren salir adelante.',
    image: studentsCommunity,
    imageAlt: 'Estudiantes reunidos usando una laptop',
    palette: 'palette-future',
    accent: '#36d1dc',
  },
  {
    id: 'que-me-representa',
    number: '04',
    question: '¿Qué me representa?',
    headline: 'Me representa el verde: crecer con esperanza.',
    badge: 'Verde + esperanza',
    text: 'Verde de raíces, esperanza y nuevos comienzos. Así soy yo: de Limón, hija de una mujer fuerte y lista para seguir creciendo.',
    image: greenSeedling,
    imageAlt: 'Brote verde creciendo desde la tierra',
    palette: 'palette-symbol',
    accent: '#62d26f',
  },
];

export default function App() {
  const [activeQuadrant, setActiveQuadrant] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveQuadrant(index);
          }
        });
      },
      { threshold: 0.45 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', updateFullscreenState);
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState);
  }, []);

  const scrollToQuadrant = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
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

        <nav className="quadrant-nav" aria-label="Navegación de cuadrantes">
          {quadrants.map((quadrant, index) => (
            <button
              key={quadrant.id}
              className={index === activeQuadrant ? 'active' : ''}
              onClick={() => scrollToQuadrant(index)}
              aria-label={quadrant.question}
            >
              {quadrant.number}
            </button>
          ))}
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

        {quadrants.map((quadrant, index) => (
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
            </div>
          </section>
        ))}

        <section className="closing">
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
