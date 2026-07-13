import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { hotel } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";

export default function Contact() {
  const form = useRef();
  const { t } = useLanguage();

  const sendEmail = (e) => {
    e.preventDefault();

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
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">{t.contactName}</label>
              <input id="nom" name="nom" type="text" placeholder={t.contactNamePlaceholder} required />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">{t.contactFirstName}</label>
              <input id="prenom" name="prenom" type="text" placeholder={t.contactFirstNamePlaceholder} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.contactEmail}</label>
            <input id="email" name="email" type="email" placeholder={t.contactEmailPlaceholder} required />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t.contactMessage}</label>
            <textarea id="message" name="message" rows="6" placeholder={t.contactMessagePlaceholder} required />
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