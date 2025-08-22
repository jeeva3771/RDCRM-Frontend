import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppBreadcrumb } from "./index";

const AppHeader = () => {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState("light");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const initializeTheme = () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      const savedTheme = localStorage.getItem("preferred_theme");
      const userTheme = userData?.preferred_theme;

      const theme = savedTheme || userTheme || "light";

      setCurrentTheme(theme);
      applyTheme(theme);
    };

    initializeTheme();

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    // if (profileDropdownOpen) {
    //   document.addEventListener("mousedown", handleClickOutside);
    // }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const applyTheme = (theme) => {
    try {
      document.body.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("data-bs-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);

      if (theme === "dark") {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        document.documentElement.classList.add("dark-theme");
        document.documentElement.classList.remove("light-theme");
      } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark-theme");
      }

      localStorage.setItem("preferred_theme", theme);
    } catch (error) {
      console.error("Failed to apply theme:", error);
    }
  };

  const handleThemeToggle = () => {
    try {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setCurrentTheme(newTheme);
      applyTheme(newTheme);
    } catch (error) {
      console.error("Theme toggle failed:", error);
    }
  };

  const logout = (e) => {
    e.stopPropagation(); // stop toggle

    localStorage.removeItem("user");
    localStorage.removeItem("preferred_theme");
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <header className="app-header">
        <AppBreadcrumb />
        <div className="header-actions">
          {/* Modern Theme Toggle Switch */}
          <div className="theme-toggle-container">
            <div className="theme-toggle-wrapper">
              <div
                className={`theme-toggle-switch ${
                  currentTheme === "dark"
                    ? "theme-toggle-dark"
                    : "theme-toggle-light"
                }`}
                onClick={handleThemeToggle}
              >
                <div className="theme-toggle-track">
                  <div className="theme-toggle-icons">
                    <div className="theme-icon theme-icon-sun">
                      <i className="fas fa-sun"></i>
                    </div>
                    <div className="theme-icon theme-icon-moon">
                      <i className="fas fa-moon"></i>
                    </div>
                  </div>
                  <div className="theme-toggle-thumb">
                    <div className="theme-toggle-thumb-icon">
                      {currentTheme === "light" ? (
                        <i className="fas fa-sun">L</i>
                      ) : (
                        <i className="fas fa-moon">D</i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div
            ref={wrapperRef}
            className="profile-section"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              className="profile-avatar"
              alt="User Avatar"
            />
            <div className="profile-info">
              <div className="profile-name">John Smith</div>
            </div>
            <i className="fa-solid fa-chevron-down profile-chevron"></i>
          </div>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-content">
                <span
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation(); // stop toggle
                    navigate("/profile");
                  }}
                >
                  <i className="fa-solid fa-user dropdown-icon"></i>
                  My Profile
                </span>

                <hr className="dropdown-divider" />

                <span
                  className="dropdown-item"
                  onClick={(e) => {
                    logout(e);
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket dropdown-icon"></i>
                  Logout
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      <style jsx>{`
        /* ===== APP HEADER STYLES ===== */
        .app-header {
          background-color: var(--theme-bg-primary);
          box-shadow: 0 1px 3px 0 var(--theme-shadow);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 16rem; /* 64 * 0.25rem = 16rem */
          right: 0;
          z-index: 50;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }

        /* ===== MODERN THEME TOGGLE SWITCH ===== */
        .theme-toggle-container {
          display: flex;
          align-items: center;
        }

        .theme-toggle-wrapper {
          position: relative;
        }

        .theme-toggle-switch {
          cursor: pointer;
          user-select: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .theme-toggle-track {
          position: relative;
          width: 3.5rem; /* 56px */
          height: 1.75rem; /* 28px */
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .theme-toggle-light .theme-toggle-track {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle-dark .theme-toggle-track {
          background: linear-gradient(135deg, #374151, #1f2937);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .theme-toggle-icons {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.25rem;
          z-index: 1;
        }

        .theme-icon {
          width: 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          transition: all 0.3s ease;
        }

        .theme-icon-sun {
          color: #ffffff;
          opacity: 1;
        }

        .theme-icon-moon {
          color: #d1d5db;
          opacity: 0.7;
        }

        .theme-toggle-dark .theme-icon-sun {
          opacity: 0.4;
          color: #9ca3af;
        }

        .theme-toggle-dark .theme-icon-moon {
          opacity: 1;
          color: #e5e7eb;
        }

        .theme-toggle-thumb {
          position: absolute;
          top: 0.125rem;
          width: 1.5rem;
          height: 1.5rem;
          background: #ffffff;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle-light .theme-toggle-thumb {
          left: 0.125rem;
          transform: translateX(0);
        }

        .theme-toggle-dark .theme-toggle-thumb {
          left: 0.125rem;
          transform: translateX(1.75rem);
          background: #f3f4f6;
        }

        .theme-toggle-thumb-icon {
          font-size: 0.6875rem;
          transition: all 0.3s ease;
        }

        .theme-toggle-light .theme-toggle-thumb-icon {
          color: #f59e0b;
        }

        .theme-toggle-dark .theme-toggle-thumb-icon {
          color: #6b7280;
        }

        /* Hover effects */
        .theme-toggle-switch:hover .theme-toggle-thumb {
          transform: translateX(0.125rem);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .theme-toggle-dark:hover .theme-toggle-thumb {
          transform: translateX(1.625rem);
        }

        /* ===== PROFILE SECTION ===== */
        .profile-section {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s ease;
        }

        .profile-section:hover {
          background-color: var(--theme-bg-gray-50);
        }

        .profile-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          margin-right: 0.75rem;
          object-fit: cover;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--theme-text-primary);
        }

        .profile-chevron {
          color: var(--theme-text-muted);
          margin-left: 0.5rem;
          font-size: 0.75rem;
          transition: transform 0.2s ease;
        }

        .profile-section:hover .profile-chevron {
          transform: rotate(180deg);
        }

        /* ===== PROFILE DROPDOWN ===== */
        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          width: 12rem;
          background-color: var(--theme-bg-primary);
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px var(--theme-shadow),
            0 4px 6px -2px var(--theme-shadow);
          border: 1px solid var(--theme-border-primary);
          z-index: 50;
          transition: all 0.2s ease;
        }

        .dropdown-content {
          padding: 0.5rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: var(--theme-text-primary);
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .dropdown-item:hover {
          background-color: var(--theme-bg-gray-100);
        }

        .dropdown-icon {
          color: var(--theme-text-muted);
          margin-right: 0.75rem;
          width: 1rem;
        }

        .dropdown-divider {
          margin: 0.25rem 0;
          border: none;
          border-top: 1px solid var(--theme-border-primary);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 768px) {
          .app-header {
            left: 0;
            padding: 0.75rem;
          }

          .theme-toggle-track {
            width: 3rem;
            height: 1.5rem;
          }

          .theme-toggle-thumb {
            width: 1.25rem;
            height: 1.25rem;
          }

          .theme-toggle-dark .theme-toggle-thumb {
            transform: translateX(1.5rem);
          }
        }
      `}</style>
    </>
  );
};

export default AppHeader;
