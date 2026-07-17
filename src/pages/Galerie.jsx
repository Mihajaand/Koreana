import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import gal1 from "../assets/galerie/1.jpg";
import gal2 from "../assets/galerie/2.jpg";
import gal3 from "../assets/galerie/3.jpg";
import gal4 from "../assets/galerie/4.jpg";
import gal5 from "../assets/galerie/5.jpg";
import gal6 from "../assets/galerie/6.jpg";
import gal7 from "../assets/galerie/7.jpg";
import gal8 from "../assets/galerie/8.jpg";
import gal9 from "../assets/galerie/9.jpg";
import gal10 from "../assets/galerie/10.jpg";
import gal11 from "../assets/galerie/11.jpg";
// import gal12 from "../assets/galerie/12.jpg";
import gal13 from "../assets/galerie/13.jpg";
// import gal14 from "../assets/galerie/14.jpg";
import gal15 from "../assets/galerie/15.jpg";
import gal16 from "../assets/galerie/16.png";
import gal17 from "../assets/galerie/17.png";
import gal18 from "../assets/galerie/18.png";
import gal19 from "../assets/galerie/19.png";
import gal20 from "../assets/galerie/20.png";
import standard1 from "../assets/hotel/standard/chambre-standard-1.jpeg";
import standard2 from "../assets/hotel/standard/chambre-standard-2.jpeg";
import standard3 from "../assets/hotel/standard/chambre-standard-3.jpeg";
import standard4 from "../assets/hotel/standard/chambre-standard-4.jpeg";
import standard5 from "../assets/hotel/standard/chambre-standard-5.jpeg";
import appartement1 from "../assets/hotel/appartement/chambre-appart-1.jpeg";
import appartement2 from "../assets/hotel/appartement/chambre-appart-2.jpeg";
import appartement3 from "../assets/hotel/appartement/chambre-appart-3.jpeg";
import appartement4 from "../assets/hotel/appartement/chambre-appart-4.jpeg";
import appartement5 from "../assets/hotel/appartement/chambre-appart-5.jpeg";
import appartement6 from "../assets/hotel/appartement/chambre-appart-6.jpeg";
import appartement7 from "../assets/hotel/appartement/chambre-appart-7.jpeg";
import restau1 from "../assets/restaurant/restau-1.jpeg";
import restau2 from "../assets/restaurant/restau-2.jpeg";
import restau3 from "../assets/restaurant/restau-3.jpeg";
import restau4 from "../assets/restaurant/restau-4.jpeg";
import restau5 from "../assets/restaurant/restau-5.jpeg";
import restau6 from "../assets/restaurant/restau-6.jpeg";
import restau7 from "../assets/restaurant/restau-7.jpeg";
import restau8 from "../assets/restaurant/restau-8.jpeg";
import restau9 from "../assets/restaurant/restau-9.jpeg";
import restau10 from "../assets/restaurant/restau-10.jpeg";
import facade1 from "../assets/ext-int/facade-1.jpeg";
import facade2 from "../assets/ext-int/facade-2.jpeg";
import facade3 from "../assets/ext-int/facade-3.jpeg";
import facade4 from "../assets/ext-int/facade-4.jpeg";
import facade5 from "../assets/ext-int/facade-5.jpeg";
import "./Galerie.css";

// Généré par `npm run generate:lqip` — tableau de data-URLs minuscules,
// dans le même ordre que galerieImages ci-dessous.
import lqipPlaceholders from "../assets/galerie-lqip.json";

const legacyGalleryImages = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11, gal13, gal15, gal16, gal17, gal18, gal19, gal20];
const newGalleryImages = [standard1, standard2, standard3, standard4, standard5, appartement1, appartement2, appartement3, appartement4, appartement5, appartement6, appartement7, restau1, restau2, restau3, restau4, restau5, restau6, restau7, restau8, restau9, restau10, facade1, facade2, facade3, facade4, facade5];
const galerieImages = [...legacyGalleryImages, ...newGalleryImages];

// Délai minimum (ms) pendant lequel le skeleton reste visible,
// même si l'image est déjà en cache — pour que l'effet se voie toujours.
const MIN_SKELETON_TIME = 380;

export default function Galerie() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loadedIndices, setLoadedIndices] = useState(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]));
  const [loadedImages, setLoadedImages] = useState(new Set());
  // Index de l'image actuellement affichée dans le modal ET terminée de charger.
  // Comparé directement à activeIndex : pas besoin d'effect pour "reset".
  const [modalLoadedFor, setModalLoadedFor] = useState(null);
  const cardRefs = useRef([]);
  const cardStartTimes = useRef(new Map());
  const modalStartTime = useRef(null);
  const { t } = useLanguage();

  const modalLoaded = modalLoadedFor === activeIndex;

  const handleImageLoad = (index) => {
    const startedAt = cardStartTimes.current.get(index) ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(MIN_SKELETON_TIME - elapsed, 0);

    window.setTimeout(() => {
      setLoadedImages((current) => {
        if (current.has(index)) return current;
        const next = new Set(current);
        next.add(index);
        return next;
      });
    }, remaining);
  };

  const handleModalImageLoad = (index) => {
    const startedAt = modalStartTime.current ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(MIN_SKELETON_TIME - elapsed, 0);

    window.setTimeout(() => {
      setModalLoadedFor(index);
    }, remaining);
  };

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((current) => (current + 1) % galerieImages.length);
      if (event.key === "ArrowLeft") setActiveIndex((current) => (current - 1 + galerieImages.length) % galerieImages.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.index);
          if (!cardStartTimes.current.has(index)) {
            cardStartTimes.current.set(index, Date.now());
          }

          setLoadedIndices((current) => {
            if (current.has(index)) return current;
            const next = new Set(current);
            next.add(index);
            return next;
          });
        });
      },
      {
        rootMargin: "240px",
      }
    );

    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const goToNext = () => setActiveIndex((current) => (current + 1) % galerieImages.length);
  const goToPrevious = () => setActiveIndex((current) => (current - 1 + galerieImages.length) % galerieImages.length);

  const openModal = (index) => {
    modalStartTime.current = Date.now();
    setActiveIndex(index);
  };

  const galleryItems = useMemo(
    () =>
      galerieImages.map((image, index) => ({
        image,
        index,
        shouldPreload: loadedIndices.has(index),
        lqip: lqipPlaceholders[index] || null,
      })),
    [loadedIndices]
  );

  const activeLqip = activeIndex !== null ? lqipPlaceholders[activeIndex] || null : null;

  return (
    <section className="galerie-page">
      <div className="galerie-header">
        <p className="eyebrow">{t.galleryEyebrow}</p>
        <h1>{t.galleryTitle}</h1>
      </div>

      <div className="galerie-bento-grid">
        {galleryItems.map(({ image, index, shouldPreload, lqip }) => {
          const isLoaded = loadedImages.has(index);
          return (
            <button
              type="button"
              key={`${image}-${index}`}
              className="galerie-card"
              onClick={() => openModal(index)}
              aria-label={`${t.galleryAria} ${index + 1}`}
              data-index={index}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
            >
              <div className={`galerie-skeleton ${isLoaded ? "is-hidden" : ""} ${lqip ? "has-lqip" : ""}`}>
                {lqip && <img src={lqip} alt="" aria-hidden="true" className="galerie-lqip" />}
                <div className="galerie-skeleton-shine" />
              </div>
              {shouldPreload && (
                <img
                  src={image}
                  alt={`Galerie Koreana ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(index)}
                  className={isLoaded ? "is-loaded" : "is-loading"}
                />
              )}
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div className="galerie-modal" role="dialog" aria-modal="true" onClick={() => setActiveIndex(null)}>
          <div className="galerie-modal-shell" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="galerie-close" onClick={() => setActiveIndex(null)} aria-label={t.galleryClose}>
              ×
            </button>

            <button type="button" className="galerie-nav galerie-nav-prev" onClick={goToPrevious} aria-label={t.galleryPrevious}>
              ‹
            </button>

            {!modalLoaded && (
              <div className="galerie-modal-skeleton">
                {activeLqip && <img src={activeLqip} alt="" aria-hidden="true" className="galerie-modal-lqip" />}
                <div className="galerie-spinner" />
              </div>
            )}

            <img
              key={activeIndex}
              src={galerieImages[activeIndex]}
              alt={`Galerie Koreana ${activeIndex + 1}`}
              loading="eager"
              decoding="async"
              onLoad={() => handleModalImageLoad(activeIndex)}
              className={modalLoaded ? "is-loaded" : "is-loading"}
            />

            <button type="button" className="galerie-nav galerie-nav-next" onClick={goToNext} aria-label={t.galleryNext}>
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}