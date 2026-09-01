import { Link } from "react-router-dom";
import logo from "../assets/logo black.png";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar d-flex flex-column">

      {/* Logo */}
      <div className="sidebar-logo mb-4">
        <img
          src={logo}
          alt="EduPulse"
          className="img-fluid"
        />
      </div>

      {/* Menu */}
      <nav className="d-flex flex-column gap-2">

        <Link
          to="/dashboard"
          className="sidebar-link"
        >
          Dashboard
        </Link>

        <Link
          to="/student-list"
          className="sidebar-link"
        >
          Daftar Siswa
        </Link>

        <Link
          to="/detail-siswa"
          className="sidebar-link"
        >
          Detail Siswa
        </Link>

        <Link
          to="/pengaturan"
          className="sidebar-link"
        >
          Pengaturan
        </Link>

      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button className="sidebar-logout">
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;