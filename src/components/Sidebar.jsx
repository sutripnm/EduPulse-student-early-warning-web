import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BsChevronLeft,
  BsChevronRight,
  BsBoxArrowRight,
} from "react-icons/bs";
import logo from "../assets/gemini-svg.svg";
import "../styles/sidebar.css";
import useSidebar from "../hooks/useSidebar";
import sidebarMenuItems from "../data/sidebarMenuItems";

function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const result = await getCurrentUser();

      console.log("HASIL AUTH ME:", result);
      console.log(
        "ROLE USER:",
        result?.data?.role || result?.role
      );

      setCurrentUser(
        result.data || result
      );
    } catch (error) {
      console.error(
        "Gagal mengambil data user:",
        error.response?.data ||
          error.message
      );
    }
  };

  fetchUser();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    navigate("/login", {
      replace: true,
    });
  };


  const role = currentUser?.role;
  const visibleMenuItems =
    sidebarMenuItems.filter((item) => {
      if (
        item.adminOnly &&
        role !== "ADMIN"
      ) {
        return false;
      }

      return true;
    });


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
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
        title={
          collapsed
            ? "Buka Sidebar"
            : "Tutup Sidebar"
        }
      >
        {collapsed ? (
          <BsChevronRight />
        ) : (
          <BsChevronLeft />
        )}
      </button>

      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand-card">
          <div className="sidebar-logo">
            <img
              src={logo}
              alt="EduPulse Logo"
            />
          </div>

          <div className="sidebar-brand-text">
            <strong className="brand-title">
              <span className="text-edu">
                Edu
              </span>
              <span className="text-pulse">
                Pulse
              </span>
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
              `sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-link-icon">
              <item.icon />
            </span>

            <span className="sidebar-link-text">
              {item.label}
            </span>
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

          <span className="sidebar-link-text">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;