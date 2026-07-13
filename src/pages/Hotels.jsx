import RoomTag from "../components/RoomTag";
import { useLanguage } from "../context/LanguageContext";
import { roomCategories, services } from "../data/hotelData";
import "./Hotels.css";

export default function Hotels() {
  const { t } = useLanguage();

  return (
    <section className="section container chambres-page">
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
    </section>
  );
}
