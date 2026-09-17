import { Link } from "react-router-dom";
import logo from "../assets/gemini-svg.svg";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar px-4 py-3">
      <div className="container-fluid position-relative">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
        >
          <img
            src={logo}
            alt="EduPulse"
            className="img-fluid"
          />

          <span className="fw-bold fs-4">
            Edu<span className="text-purple">Pulse</span>
          </span>
        </Link>

        {/* Menu Tengah */}
        <div className="navbar-menu position-absolute top-50 start-50 translate-middle d-flex align-items-center gap-4">
          <a
            href="#fitur"
            className="navbar-link text-decoration-none"
          >
            Fitur
          </a>

          <a
            href="#cara-kerja"
            className="navbar-link text-decoration-none"
          >
            Cara Kerja
          </a>

          <a
            href="#tentang"
            className="navbar-link text-decoration-none"
          >
            Tentang
          </a>
        </div>

        {/* Login */}
        <Link
          to="/login"
          className="btn btn-dark rounded-pill px-4 ms-auto navbar-login"
        >
          Masuk
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;