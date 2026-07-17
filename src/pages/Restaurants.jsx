import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import restoHero from "../assets/restaurant/restau-1.jpeg";
import menu1 from "../assets/Restaurants/1.jpg";
import menu2 from "../assets/Restaurants/2.jpg";
import menu3 from "../assets/Restaurants/3.jpg";
import menu4 from "../assets/Restaurants/4.jpg";
import menu5 from "../assets/Restaurants/5.jpg";
import menu6 from "../assets/Restaurants/6.jpg";
import menu7 from "../assets/Restaurants/7.jpg";
import menu8 from "../assets/Restaurants/8.jpg";
import menu9 from "../assets/Restaurants/9.jpg";
import menu10 from "../assets/Restaurants/10.jpg";
import menu11 from "../assets/Restaurants/11.jpg";
import menu12 from "../assets/Restaurants/12.jpg";
import menu13 from "../assets/Restaurants/13.jpg";
import menu14 from "../assets/Restaurants/14.jpg";
import "./Restaurants.css";

const menuGallery = [menu1, menu2, menu3, menu4, menu5, menu6, menu7, menu8, menu9, menu10, menu11, menu12, menu13, menu14];

export default function Restaurants() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % menuGallery.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + menuGallery.length) % menuGallery.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector(".gallery-card");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 320;
    const gap = 18;

    carousel.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % menuGallery.length);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + menuGallery.length) % menuGallery.length);
  };

  return (
    <section className="restaurants-page">
      <div className="restaurant-hero">
        <img className="restaurant-hero-image" src={restoHero} alt={t.restaurantFallbackAlt} />

        <div className="restaurant-hero-overlay container">
          <p className="eyebrow">{t.restaurantHeroEyebrow}</p>
          <h1>{t.restaurantHeroTitle}</h1>
          <p className="section-lead">{t.restaurantHeroLead}</p>

          <div className="restaurant-hero-pills">
            <span>Signature</span>
            <span>Ambiance</span>
            <span>Gastronomie</span>
          </div>
        </div>
      </div>

      <div className="restaurant-showcase">
        <div className="container restaurant-showcase-header">
          <p className="eyebrow">{t.restaurantGalleryEyebrow}</p>
          <h2>{t.restaurantGalleryTitle}</h2>
        </div>

        <div className="restaurant-gallery-stage">
          <div className="container restaurant-gallery-controls">
            <button
              type="button"
              className="carousel-control"
              onClick={() => scrollCarousel(-1)}
              aria-label={t.restaurantCarouselPrev}
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-control"
              onClick={() => scrollCarousel(1)}
              aria-label={t.restaurantCarouselNext}
            >
              ›
            </button>
          </div>

          <div className="restaurant-gallery-carousel" ref={carouselRef} aria-label="Galerie restaurant en carrousel">
            {menuGallery.map((item, index) => (
              <button
                type="button"
                className="gallery-card"
                key={`${item}-${index}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`${t.galleryAria} ${index + 1}`}
              >
                <img src={item} alt={`${t.restaurantGalleryAlt} ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="restaurant-citations container">
          <blockquote>{t.restaurantQuote1}</blockquote>
          <blockquote>{t.restaurantQuote2}</blockquote>
        </div>
      </div>

      {activeIndex !== null && (
        <div className="gallery-modal" role="dialog" aria-modal="true" onClick={() => setActiveIndex(null)}>
          <div className="gallery-modal-shell" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="gallery-close" onClick={() => setActiveIndex(null)} aria-label={t.galleryClose}>
              ×
            </button>

            <button type="button" className="gallery-nav gallery-nav-prev" onClick={goToPrevious} aria-label={t.galleryPrevious}>
              ‹
            </button>

            <img src={menuGallery[activeIndex]} alt={`${t.restaurantGalleryAlt} ${activeIndex + 1}`} />

            <button type="button" className="gallery-nav gallery-nav-next" onClick={goToNext} aria-label={t.galleryNext}>
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
