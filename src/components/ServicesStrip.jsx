import { services } from "../data/hotelData";
import "./ServicesStrip.css";

export default function ServicesStrip() {
  return (
    <section className="services-strip">
      <div className="container">
        <p className="eyebrow">Services inclus</p>
        <ul className="services-list">
          {services.map((s) => (
            <li key={s.id}>{s.label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
