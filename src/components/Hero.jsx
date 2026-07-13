import { Link } from "react-router-dom";
import { hotel } from "../data/hotelData";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <p className="eyebrow">Tongasoa · Bienvenue</p>
        <h1>
         Savourez l’authenticité <br /> de la cuisine coréenne à Madagascar.
        </h1>
        <p className="hero-text">
          {hotel.name} vous accueille à {hotel.address}, dans des chambres
          pensées pour le repos autant que pour le travail : climatisation,
          wifi, coffre et restaurant sur place.
        </p>
        <div className="hero-actions">
          <Link to="/chambres" className="btn btn-primary">
            Voir les chambres
          </Link>
          <a href={hotel.phoneHref} className="btn btn-ghost">
            Appeler l'hôtel
          </a>
        </div>
      </div>
    </section>
  );
}
