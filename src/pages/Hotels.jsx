import RoomTag from "../components/RoomTag";
import { useLanguage } from "../context/LanguageContext";
import { roomCategories, services } from "../data/hotelData";
import chambreStandard1 from "../assets/hotel/standard/chambre-standard-1.jpg";
import "./Hotels.css";

export default function Hotels() {
  const { t } = useLanguage();

  return (
    <section className="chambres-page">
      <div className="hotel-hero">
        <img className="hotel-hero-image" src={chambreStandard1} alt={t.hotelFallbackAlt} />

        <div className="hotel-hero-overlay container">
          <p className="eyebrow">{t.hotelHeroEyebrow}</p>
          <h1>{t.hotelHeroTitle}</h1>
          <p className="section-lead">{t.hotelHeroLead}</p>

          <div className="hotel-hero-pills">
            <span>{t.hotelHeroPillComfort}</span>
            <span>{t.hotelHeroPillWifi}</span>
            <span>{t.hotelHeroPillRestaurant}</span>
          </div>
        </div>
      </div>

      <div className="section container">
        <p className="eyebrow">{t.hotelSectionEyebrow}</p>
        <h1>{t.hotelSectionTitle}</h1>
        <p className="section-lead">{t.hotelSectionLead}</p>

        <div className="room-tags-column">
          {roomCategories.map((room) => (
            <RoomTag key={room.id} room={room} />
          ))}
        </div>

        <div className="chambres-services">
          <p className="eyebrow">{t.hotelServicesEyebrow}</p>
          <ul>
            {services.map((s) => (
              <li key={s.id}>{t[s.translationKey]}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
