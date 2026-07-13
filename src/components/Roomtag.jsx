import { formatAr } from "../data/hotelData";
import "./RoomTag.css";

export default function RoomTag({ room }) {
  return (
    <article className="room-tag">
      <div className="room-tag-hole" aria-hidden="true" />
      <header className="room-tag-head">
        <h3>{room.name}</h3>
        <span className="room-tag-count">{room.rooms} chambres</span>
      </header>

      <p className="room-tag-tagline">{room.tagline}</p>
      <p className="room-tag-desc">{room.description}</p>

      <dl className="room-tag-rates">
        <div>
          <dt>Day use / Nuitée</dt>
          <dd>{formatAr(room.pricing.dayUse)}</dd>
        </div>
        <div>
          <dt>Nuitée + petit-déjeuner · 1 pers.</dt>
          <dd>{formatAr(room.pricing.nightWithBreakfast1p)}</dd>
        </div>
        <div>
          <dt>Nuitée + petit-déjeuner · 2 pers.</dt>
          <dd>{formatAr(room.pricing.nightWithBreakfast2p)}</dd>
        </div>
      </dl>
    </article>
  );
}
