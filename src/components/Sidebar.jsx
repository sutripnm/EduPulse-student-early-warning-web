import { NavLink, useNavigate } from "react-router-dom";
import {
  BsChevronLeft,
  BsChevronRight,
  BsBoxArrowRight,
} from "react-icons/bs";

import logo from "../assets/gemini-svg.svg";
import "../styles/sidebar.css";

import useSidebar from "../hooks/useSidebar";
import useCurrentUser from "../hooks/useCurrentUser";

import { getSidebarMenuItems } from "../data/sidebarMenuItems";

/**
 * Menampilkan sidebar navigasi sesuai role pengguna dan menangani logout.
 */
function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const { user: currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const role = currentUser?.role;
  const studentNisn = localStorage.getItem("nisn");
  const visibleMenuItems = getSidebarMenuItems(role, studentNisn);

  /**
   * Menghapus session lokal lalu kembali ke halaman login.
   */
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nisn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`sidebar d-flex flex-column ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Floating Toggle Button */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Buka Sidebar" : "Tutup Sidebar"}
      >
        {collapsed ? <BsChevronRight /> : <BsChevronLeft />}
      </button>

      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand-card">
          <div className="sidebar-logo">
            <img src={logo} alt="EduPulse Logo" />
          </div>

          <div className="sidebar-brand-text">
            <strong className="brand-title">
              <span className="text-edu">Edu</span>
              <span className="text-pulse">Pulse</span>
            </strong>

            <span className="brand-subtitle">
              STUDENT EARLY WARNING SYSTEM
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">
        {visibleMenuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            data-tooltip={item.label}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-link-icon">
              <item.icon />
            </span>

            <span className="sidebar-link-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-logout"
          data-tooltip="Logout"
          onClick={handleLogout}
        >
          <span className="sidebar-link-icon">
            <BsBoxArrowRight />
          </span>

          <span className="sidebar-link-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
