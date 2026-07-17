import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServicesStrip from "../components/ServicesStrip";
import RoomTag from "../components/RoomTag";
import { useLanguage } from "../context/LanguageContext";
import { roomCategories, hotel } from "../data/hotelData";
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
import "./Home.css";

const menuGallery = [menu1, menu2, menu3, menu4, menu5, menu6, menu7, menu8, menu9, menu10, menu11, menu12, menu13, menu14];

export default function Home() {
  const miniCarouselRef = useRef(null);
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

  const scrollMenuCarousel = (direction) => {
    const carousel = miniCarouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector(".restaurant-home-menu-card");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 220;
    const gap = 14;

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
    <>
      <Hero />
      <ServicesStrip />

      <section className="section container">
        <p className="eyebrow">{t.roomSectionEyebrow}</p>
        <h2>{t.roomSectionTitle}</h2>
        <p className="section-lead">{t.roomSectionLead}</p>

        <div className="room-tags-row">
          {roomCategories.map((room) => (
            <RoomTag key={room.id} room={room} />
          ))}
        </div>

        <Link to="/hotels" className="btn btn-primary" style={{ marginTop: "2.5rem" }}>
          {t.roomsButton}
        </Link>
      </section>

      <section className="section container restaurant-home">
        <div className="restaurant-home-header">
          <p className="eyebrow">{t.restaurantEyebrow}</p>
          <h2>{t.restaurantSectionTitle}</h2>
          <p className="section-lead">{t.restaurantSectionLead}</p>
        </div>

        <div className="restaurant-home-grid">
          <div className="restaurant-home-card">
            <h3>{t.contactAddress}</h3>
            <p>{hotel.address}</p>
          </div>

          <div className="restaurant-home-card">
            <h3>{t.contactPhone}</h3>
            <a href={hotel.phoneHref}>{hotel.phone}</a>
          </div>

          <div className="restaurant-home-card">
            <h3>{t.contactEmail}</h3>
            <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          </div>
        </div>

        <div className="restaurant-home-showcase">
          <div className="restaurant-home-showcase-header">
            <p className="eyebrow">{t.menuEyebrow}</p>
            <h3>{t.menuTitle}</h3>
          </div>

          <div className="restaurant-home-carousel-shell">
            <button
              type="button"
              className="restaurant-home-carousel-control"
              onClick={() => scrollMenuCarousel(-1)}
              aria-label={t.menuButtonPrev}
            >
              ‹
            </button>

            <div className="restaurant-home-carousel" ref={miniCarouselRef}>
              {menuGallery.map((item, index) => (
                <button
                  type="button"
                  className="restaurant-home-menu-card"
                  key={`${item}-${index}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${t.menuItem} ${index + 1}`}
                >
                  <img src={item} alt={`${t.menuItem} ${index + 1}`} loading="lazy" />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="restaurant-home-carousel-control"
              onClick={() => scrollMenuCarousel(1)}
              aria-label={t.menuButtonNext}
            >
              ›
            </button>
          </div>
        </div>

        <div className="restaurant-home-map-card">
          <div className="restaurant-home-map-head">
            <p className="eyebrow">{t.mapEyebrow}</p>
            <h3>{t.mapTitle}</h3>
          </div>

          <iframe
            title={t.contactMapTitle}
            src="https://www.google.com/maps?q=Amboropotsy+Talatamaty+Antananarivo&output=embed"
            loading="lazy"
          />
        </div>

        <div className="restaurant-home-actions">
          <Link to="/restaurants" className="btn btn-primary">
            {t.restaurantExplore}
          </Link>
        </div>
      </section>

      <section className="section container callout">
        <div>
          <p className="eyebrow">{t.mapEyebrow}</p>
          <h2>{hotel.address}</h2>
        </div>
        <div className="callout-actions">
          <a href={hotel.phoneHref} className="btn btn-ghost">
            {hotel.phone}
          </a>
          <a href={`mailto:${hotel.email}`} className="btn btn-ghost">
            {hotel.email}
          </a>
        </div>
      </section>

      {activeIndex !== null && (
        <div className="gallery-modal" role="dialog" aria-modal="true" onClick={() => setActiveIndex(null)}>
          <div className="gallery-modal-shell" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="gallery-close" onClick={() => setActiveIndex(null)} aria-label={t.galleryClose}>
              ×
            </button>

            <button type="button" className="gallery-nav gallery-nav-prev" onClick={goToPrevious} aria-label={t.galleryPrevious}>
              ‹
            </button>

            <img src={menuGallery[activeIndex]} alt={`${t.menuItem} ${activeIndex + 1}`} />

            <button type="button" className="gallery-nav gallery-nav-next" onClick={goToNext} aria-label={t.galleryNext}>
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}