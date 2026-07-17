import { useEffect, useState } from "react";
import { formatAr } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import "./RoomTag.css";

export default function RoomTag({ room }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);

  const roomTitle = room.id === "standard" ? t.roomCategoryStandard : t.roomCategoryApartment;
  const roomTagline = room.id === "standard" ? t.roomTaglineStandard : t.roomTaglineApartment;
  const roomDescription = room.id === "standard" ? t.roomDescriptionStandard : t.roomDescriptionApartment;
  const roomGallery = room.gallery?.length ? room.gallery : [room.img];

  useEffect(() => {
    if (activeGalleryIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveGalleryIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveGalleryIndex((current) => (current + 1) % roomGallery.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveGalleryIndex((current) => (current - 1 + roomGallery.length) % roomGallery.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryIndex, roomGallery.length]);

  const goToNext = () => {
    setActiveGalleryIndex((current) => (current + 1) % roomGallery.length);
  };

  const goToPrevious = () => {
    setActiveGalleryIndex((current) => (current - 1 + roomGallery.length) % roomGallery.length);
  };

  return (
    <article className="room-tag">
      <div className="room-tag-hole" aria-hidden="true" />

      <div className="room-tag-media">
        <img src={room.img} alt={`${t.roomImageAlt} ${roomTitle}`} loading="lazy" />
      </div>

      <div className="room-tag-body">
        <header className="room-tag-head">
          <h3>{roomTitle}</h3>
          <span className="room-tag-count">
            {room.rooms} {t.roomCount}
          </span>
        </header>

        <p className="room-tag-tagline">{roomTagline}</p>
        <p className="room-tag-desc">{roomDescription}</p>

        <dl className="room-tag-rates">
          <div>
            <dt>{t.dayUseRate}</dt>
            <dd>{formatAr(room.pricing.dayUse)}</dd>
          </div>
          <div>
            <dt>{t.breakfastRate1}</dt>
            <dd>{formatAr(room.pricing.nightWithBreakfast1p)}</dd>
          </div>
          <div>
            <dt>{t.breakfastRate2}</dt>
            <dd>{formatAr(room.pricing.nightWithBreakfast2p)}</dd>
          </div>
        </dl>

        <div className="room-tag-actions">
          <button
            type="button"
            className="room-tag-gallery-btn"
            onClick={() => setActiveGalleryIndex(0)}
            aria-label={`${t.galleryOpen} ${roomTitle}`}
          >
            {t.galleryOpen}
          </button>

          <button
            type="button"
            className="room-tag-cta"
            aria-label={t.bookButton}
            data-room={room.id}
            onClick={() =>
              navigate("/contact", {
                state: { roomId: room.id, roomTitle: roomTitle },
              })
            }
          >
            {t.bookButton}
          </button>
        </div>
      </div>

      {activeGalleryIndex !== null && (
        <div className="room-gallery-modal" role="dialog" aria-modal="true" onClick={() => setActiveGalleryIndex(null)}>
          <div className="room-gallery-shell" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="room-gallery-close"
              onClick={() => setActiveGalleryIndex(null)}
              aria-label={t.galleryClose}
            >
              ×
            </button>

            <button
              type="button"
              className="room-gallery-nav room-gallery-nav-prev"
              onClick={goToPrevious}
              aria-label={t.galleryPrevious}
            >
              ‹
            </button>

            <img src={roomGallery[activeGalleryIndex]} alt={`${t.roomImageAlt} ${roomTitle}`} />

            <button
              type="button"
              className="room-gallery-nav room-gallery-nav-next"
              onClick={goToNext}
              aria-label={t.galleryNext}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </article>
  );
}