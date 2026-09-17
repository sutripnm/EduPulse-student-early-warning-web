  import { NavLink } from "react-router-dom";
  import { BsChevronLeft, BsChevronRight, BsBoxArrowRight } from "react-icons/bs";
  import logo from "../assets/gemini-svg.svg";
  import "../styles/sidebar.css";
  import useSidebar from "../hooks/useSidebar";
  import sidebarMenuItems from "../data/sidebarMenuItems";

  function Sidebar() {
    // Status buka/tutup sidebar (mode ringkas) + fungsi togglenya.
    const { collapsed, toggleCollapsed } = useSidebar();

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

        {/* Header dengan Bingkai Latar Halaman */}
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
              <span className="brand-subtitle">STUDENT EARLY WARNING SYSTEM</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          {sidebarMenuItems.map((item) => (
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

        {/* Logout Action */}
        <div className="mt-auto pt-3">
          <button
            type="button"
            className="sidebar-logout"
            data-tooltip="Logout"
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
