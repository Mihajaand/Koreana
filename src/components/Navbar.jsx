import { useState } from "react";
import { NavLink } from "react-router-dom";
import { hotel } from "../data/hotelData";
import logo from "../assets/logo.png";
import "./Navbar.css";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/hotels", label: "Hotels" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/contact", label: "Contact" },
  { to: "/galerie", label: "Galerie" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner container">
        <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <img src={logo} alt={`Logo ${hotel.name}`} />
          <span>{hotel.name}</span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={() => setOpen(false)}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
          <a href={hotel.phoneHref} className="nav-call">
            {hotel.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
