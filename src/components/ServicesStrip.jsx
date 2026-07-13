import { services } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import "./ServicesStrip.css";

export default function ServicesStrip() {
  const { t } = useLanguage();

  return (
    <section className="services-strip">
      <div className="container">
        <p className="eyebrow">{t.servicesStripTitle}</p>
        <ul className="services-list">
          {services.map((s) => (
            <li key={s.id}>{t[s.translationKey]}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
