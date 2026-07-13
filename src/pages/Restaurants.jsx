import RoomTag from "../components/RoomTag";
import { roomCategories, services } from "../data/hotelData";
import "./Restaurants.css";

export default function Restaurants() {
  return (
    <section className="section container chambres-page">
      <p className="eyebrow">Hôtel</p>
      <h1>Chambres &amp; tarifs</h1>
      <p className="section-lead">
        Deux catégories de chambres, chacune avec son propre agencement.
        Chaque tarif nuitée avec petit-déjeuner varie selon le nombre de
        personnes ; le Day Use est disponible pour un usage à la journée.
      </p>

      <div className="room-tags-column">
        {roomCategories.map((room) => (
          <RoomTag key={room.id} room={room} />
        ))}
      </div>

      <div className="chambres-services">
        <p className="eyebrow">Inclus dans toutes les chambres</p>
        <ul>
          {services.map((s) => (
            <li key={s.id}>{s.label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
