import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { hotel } from "../data/hotelData";
import "./Contact.css";

export default function Contact() {
  const form = useRef();

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
        alert("Votre message a été envoyé avec succès !");
        form.current.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  return (
    <section className="section container contact-page">
      <p className="eyebrow">Contact</p>
      <h1>Parlons de votre séjour</h1>

      <div className="contact-grid">
        <div className="contact-block">
          <h3>Adresse</h3>
          <p>{hotel.address}</p>
        </div>

        <div className="contact-block">
          <h3>Téléphone</h3>
          <a href={hotel.phoneHref}>{hotel.phone}</a>
        </div>

        <div className="contact-block">
          <h3>Email</h3>
          <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
        </div>
      </div>

      <div className="contact-form-wrapper">
        <h2>Envoyez-nous un message</h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="contact-form"
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                name="nom"
                type="text"
                placeholder="Votre nom"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                id="prenom"
                name="prenom"
                type="text"
                placeholder="Votre prénom"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Votre adresse email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Écrivez votre message..."
              required
            />
          </div>

          <button type="submit" className="btn">
            Envoyer le message
          </button>
        </form>
      </div>

      <div className="contact-map">
        <iframe
          title="Localisation de l'hôtel"
          src="https://www.google.com/maps?q=Amboropotsy+Talatamaty+Antananarivo&output=embed"
          loading="lazy"
        />
      </div>
    </section>
  );
}