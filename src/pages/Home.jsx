import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServicesStrip from "../components/ServicesStrip";
import RoomTag from "../components/RoomTag";
import { roomCategories, hotel } from "../data/hotelData";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesStrip />

      <section className="section container">
        <p className="eyebrow">Nos catégories</p>
        <h2>Des chambres pour chaque étape du voyage</h2>
        <p className="section-lead">
          {roomCategories.length} catégories, {roomCategories.reduce((a, r) => a + r.rooms, 0)} chambres
          au total — du Day Use à la nuitée avec petit-déjeuner.
        </p>

        <div className="room-tags-row">
          {roomCategories.map((room) => (
            <RoomTag key={room.id} room={room} />
          ))}
        </div>

        <Link to="/chambres" className="btn btn-primary" style={{ marginTop: "2.5rem" }}>
          Toutes les chambres
        </Link>
      </section>

      <section className="section container callout">
        <div>
          <p className="eyebrow">Nous trouver</p>
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
    </>
  );
}
