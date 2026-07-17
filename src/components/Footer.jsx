import { hotel } from "../data/hotelData";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { countries } from "../data/countries";

export default function Footer() {
  const { t } = useLanguage();
  const countryFlag = countries.find((c) => c.code === "MG");

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={logo} alt={`Logo ${hotel.name}`} className="footer-logo" />
          <div>
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
          </div>
        </div>

        <div className="footer-contact">
          <a href={hotel.phoneHref} className="footer-phone">
            <img
              src={countryFlag.flag}
              alt={countryFlag.code}
              width="18"
              className="flag-icon"
            />
            {hotel.phone}
          </a>
          <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          <a href={hotel.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social">
            <FaFacebookF />
          </a>
        </div>

        <p className="footer-note">
          © {new Date().getFullYear()} {hotel.name}. {t.footerRights}
        </p>
      </div>
    </footer>
  );
}