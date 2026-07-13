import { formatAr } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import "./RoomTag.css";

export default function RoomTag({ room }) {
  const { t } = useLanguage();

  const roomTitle = room.id === "standard" ? t.roomCategoryStandard : t.roomCategoryApartment;
  const roomTagline = room.id === "standard" ? t.roomTaglineStandard : t.roomTaglineApartment;
  const roomDescription = room.id === "standard" ? t.roomDescriptionStandard : t.roomDescriptionApartment;

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
      </div>
    </article>
  );
}