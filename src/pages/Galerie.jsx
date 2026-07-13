
import { useEffect, useState } from "react";
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
import gal12 from "../assets/galerie/12.jpg";
import gal13 from "../assets/galerie/13.jpg";
import gal14 from "../assets/galerie/14.jpg";
import gal15 from "../assets/galerie/15.jpg";
import gal16 from "../assets/galerie/16.png";
import gal17 from "../assets/galerie/17.png";
import gal18 from "../assets/galerie/18.png";
import gal19 from "../assets/galerie/19.png";
import gal20 from "../assets/galerie/20.png";
import "./Galerie.css";

const galerieImages = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11, gal12, gal13, gal14, gal15, gal16, gal17, gal18, gal19, gal20];

const bentoClassNames = ["span-2", "span-3", "span-2", "span-2", "span-3", "span-2", "span-2", "span-3", "span-2", "span-2", "span-3", "span-2", "span-2", "span-2", "span-3", "span-2", "span-2", "span-3", "span-2", "span-3"];

export default function Galerie() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useLanguage();

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

  const goToNext = () => setActiveIndex((current) => (current + 1) % galerieImages.length);
  const goToPrevious = () => setActiveIndex((current) => (current - 1 + galerieImages.length) % galerieImages.length);

  return (
    <section className="galerie-page">
      <div className="galerie-header">
        <p className="eyebrow">{t.galleryEyebrow}</p>
        <h1>{t.galleryTitle}</h1>
      </div>

      <div className="galerie-bento-grid">
        {galerieImages.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            className={`galerie-card ${bentoClassNames[index]}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${t.galleryAria} ${index + 1}`}
          >
            <img src={image} alt={`Galerie Koreana ${index + 1}`} loading="lazy" />
          </button>
        ))}
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

            <img src={galerieImages[activeIndex]} alt={`Galerie Koreana ${activeIndex + 1}`} />

            <button type="button" className="galerie-nav galerie-nav-next" onClick={goToNext} aria-label={t.galleryNext}>
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
