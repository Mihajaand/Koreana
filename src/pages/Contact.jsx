import { useRef, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { hotel } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import { countries } from "../data/countries";
import "./Contact.css";

export default function Contact() {
  const form = useRef();
  const { t } = useLanguage();
  const location = useLocation();
  const prefillRoomTitle = location?.state?.roomTitle || "";
  const prefillMessage = prefillRoomTitle
    ? t.bookContactMessageTemplate.replace("{room}", prefillRoomTitle)
    : "";

  const [dateArrivee, setDateArrivee] = useState("");
  const [dateDepart, setDateDepart] = useState("");
  const [numero, setNumero] = useState("");

  const defaultCountry = countries.find((c) => c.code === "MG");

  // --- Dropdown personnalisé : indicatif téléphonique ---
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const phoneWrapperRef = useRef(null);

  // --- Dropdown personnalisé : nationalité (avec drapeau image) ---
  const [selectedNationality, setSelectedNationality] = useState(defaultCountry);
  const [nationalityOpen, setNationalityOpen] = useState(false);
  const nationalityWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (phoneWrapperRef.current && !phoneWrapperRef.current.contains(e.target)) {
        setPhoneOpen(false);
      }
      if (
        nationalityWrapperRef.current &&
        !nationalityWrapperRef.current.contains(e.target)
      ) {
        setNationalityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nuitees = useMemo(() => {
    if (!dateArrivee || !dateDepart) return 0;
    const start = new Date(dateArrivee);
    const end = new Date(dateDepart);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [dateArrivee, dateDepart]);

  const formatDateFr = (isoDate) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y.slice(2)}`;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (dateArrivee && dateDepart && nuitees <= 0) {
      alert(t.contactDateError);
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert(t.contactSuccess);
        form.current.reset();
        setDateArrivee("");
        setDateDepart("");
        setNumero("");
        setSelectedCountry(defaultCountry);
        setSelectedNationality(defaultCountry);
      })
      .catch((error) => {
        console.error(error);
        alert(t.contactError);
      });
  };

  return (
    <section className="section container contact-page">
      <p className="eyebrow">{t.contactEyebrow}</p>
      <h1>{t.contactTitle}</h1>

      <div className="contact-grid">
        <div className="contact-block">
          <h3>{t.contactAddress}</h3>
          <p>{hotel.address}</p>
        </div>

        <div className="contact-block">
          <h3>{t.contactPhone}</h3>
          <a href={hotel.phoneHref}>{hotel.phone}</a>
        </div>

        <div className="contact-block">
          <h3>{t.contactEmail}</h3>
          <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
        </div>
      </div>

      <div className="contact-form-wrapper">
        <h2>{t.contactFormTitle}</h2>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          {/* Titre / Nom / Prénom */}
          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="titre">{t.contactTitleField}</label>
              <select id="titre" name="titre" defaultValue="M" required>
                <option value="M">{t.titleOptionMr}</option>
                <option value="MME">{t.titleOptionMrs}</option>
                <option value="MME_M">{t.titleOptionMrAndMrs}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nom">{t.contactName}</label>
              <input id="nom" name="nom" type="text" placeholder={t.contactNamePlaceholder} required />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">{t.contactFirstName}</label>
              <input id="prenom" name="prenom" type="text" placeholder={t.contactFirstNamePlaceholder} required />
            </div>
          </div>

          {/* Nationalité — dropdown personnalisé avec drapeau image, largeur réduite */}
          <div className="form-group">
            <label htmlFor="nationalite-trigger">{t.contactNationality}</label>
            <div
              className="custom-select-wrapper nationality-select-wrapper"
              ref={nationalityWrapperRef}
            >
              <button
                id="nationalite-trigger"
                type="button"
                className="custom-select-trigger nationality-trigger"
                onClick={() => setNationalityOpen((o) => !o)}
              >
                <span className="custom-select-current">
                  <img
                    src={selectedNationality.flag}
                    alt={selectedNationality.code}
                    width="18"
                    className="flag-icon"
                  />
                  {selectedNationality.name}
                </span>
                <span className="custom-select-arrow">▾</span>
              </button>

              {nationalityOpen && (
                <ul className="custom-select-list">
                  {countries.map((c) => (
                    <li
                      key={c.code}
                      className={c.code === selectedNationality.code ? "active" : ""}
                      onClick={() => {
                        setSelectedNationality(c);
                        setNationalityOpen(false);
                      }}
                    >
                      <img src={c.flag} alt={c.code} width="18" className="flag-icon" />
                      <span>{c.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input type="hidden" name="nationalite" value={selectedNationality.name} required />
          </div>

          {/* Dates + nuitées */}
          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="arrivee">{t.contactArrivalDate}</label>
              <input
                id="arrivee"
                type="date"
                value={dateArrivee}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDateArrivee(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="depart">{t.contactDepartureDate}</label>
              <input
                id="depart"
                type="date"
                value={dateDepart}
                min={dateArrivee || new Date().toISOString().split("T")[0]}
                onChange={(e) => setDateDepart(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{t.contactNights}</label>
              <div className="nights-box">{nuitees > 0 ? nuitees : "—"}</div>
            </div>
          </div>

          {/* Champs cachés envoyés à EmailJS (dates formatées) */}
          <input type="hidden" name="arrivee" value={formatDateFr(dateArrivee)} />
          <input type="hidden" name="depart" value={formatDateFr(dateDepart)} />
          <input type="hidden" name="nuitees" value={nuitees} />

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">{t.contactEmail}</label>
            <input id="email" name="email" type="email" placeholder={t.contactEmailPlaceholder} required />
          </div>

          {/* Téléphone : indicatif (+261) puis code pays (MG) à droite, pas de drapeau */}
          <div className="form-group">
            <label htmlFor="numero">{t.contactPhone}</label>
            <div className="phone-row">
              <div className="custom-select-wrapper phone-select-wrapper" ref={phoneWrapperRef}>
                <button
                  type="button"
                  className="custom-select-trigger"
                  onClick={() => setPhoneOpen((o) => !o)}
                >
                  <span className="custom-select-current">
                    {selectedCountry.dial}{" "}
                    <span className="phone-country-code">{selectedCountry.code}</span>
                  </span>
                  <span className="custom-select-arrow">▾</span>
                </button>

                {phoneOpen && (
                  <ul className="custom-select-list">
                    {countries.map((c) => (
                      <li
                        key={c.code}
                        className={c.code === selectedCountry.code ? "active" : ""}
                        onClick={() => {
                          setSelectedCountry(c);
                          setPhoneOpen(false);
                        }}
                      >
                        <span>{c.name}</span>
                        <span className="phone-select-dial">
                          {c.dial} <span className="phone-country-code">{c.code}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                id="numero"
                type="tel"
                placeholder="xx xx xxx xx"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
                className="phone-input"
              />
            </div>
            <input
              type="hidden"
              name="telephone"
              value={`${selectedCountry.dial} ${selectedCountry.code} ${numero}`}
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message">{t.contactMessage}</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder={t.contactMessagePlaceholder}
              defaultValue={prefillMessage}
              required
            />
          </div>

          <button type="submit" className="btn">
            {t.contactFormButton}
          </button>
        </form>
      </div>

      <div className="contact-map">
        <iframe title={t.contactMapTitle} src="https://www.google.com/maps?q=Amboropotsy+Talatamaty+Antananarivo&output=embed" loading="lazy" />
      </div>
    </section>
  );
}