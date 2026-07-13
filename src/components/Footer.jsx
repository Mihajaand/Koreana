import { hotel } from "../data/hotelData";
import {  } from "react-icons/fa";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>{hotel.name}</h3>
          <p>{hotel.address}</p>
        </div>
        <div className="footer-contact">
          <a href={hotel.phoneHref}>{hotel.phone}</a>
          <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          <a
    href={hotel.facebook}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="footer-social"
  >
    <FaFacebookF />
  </a>
        </div>
        <p className="footer-note">
          © {new Date().getFullYear()} {hotel.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
