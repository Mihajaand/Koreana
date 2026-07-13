import { Link } from "react-router-dom";
import { hotel } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import hommies from "../assets/hommies.png";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-actions">
            <Link to="/hotels" className="btn btn-primary">
              {t.heroPrimary}
            </Link>
            <a href={hotel.phoneHref} className="btn btn-ghost">
              {t.phone}
            </a>
          </div>
        </div>

        <div className="hero-media">
          <img src={hommies} alt="Ambiance et gastronomie Koreana" />
        </div>
      </div>
    </section>
  );
}
