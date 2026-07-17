import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { hotel } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import { getFlagEmoji } from "../data/countries";
import logo from "../assets/logo.png";
import "./Navbar.css";

const links = [
  { to: "/", key: "home" },
  { to: "/hotels", key: "hotels" },
  { to: "/restaurants", key: "restaurants" },
  { to: "/contact", key: "contact" },
  { to: "/galerie", key: "galerie" },
];

const languageOptions = [
  { code: "fr", label: "FR", flag: getFlagEmoji("FR") },
  { code: "en", label: "EN", flag: getFlagEmoji("GB") },
  { code: "ko", label: "KR", flag: getFlagEmoji("KR") },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const langRef = useRef(null);

  const currentLang =
    languageOptions.find((opt) => opt.code === language) || languageOptions[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    setLangOpen(false);
  };

  return (
    <header className="nav">
      <div className="nav-inner container">
        <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <img src={logo} alt={`Logo ${hotel.name}`} />
          <span>{hotel.name}</span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-label={t.navMenuToggle}
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
              {t[l.key]}
            </NavLink>
          ))}

          <div className="nav-language-switcher" ref={langRef}>
            <button
              type="button"
              className="nav-language-trigger"
              aria-haspopup="true"
              aria-expanded={langOpen}
              aria-label={t.navLanguageSwitcher}
              onClick={() => setLangOpen((v) => !v)}
            >
              {currentLang.label} {currentLang.flag}
              <span className={`nav-language-arrow ${langOpen ? "is-open" : ""}`} />
            </button>

            <ul className={`nav-language-menu ${langOpen ? "is-open" : ""}`}>
              {languageOptions.map((option) => (
                <li key={option.code}>
                  <button
                    type="button"
                    className={language === option.code ? "is-active" : ""}
                    onClick={() => handleSelectLanguage(option.code)}
                  >
                    {option.label} {option.flag}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <a href={hotel.phoneHref} className="nav-call">
            {hotel.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}