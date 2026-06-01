import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/", icon: "🏠", label: "Trang chủ" },
  { to: "/movies", icon: "🎬", label: "Phim đang chiếu" },
  { to: "/feedback", icon: "💬", label: "Góp ý" },
  { to: "/subscribe", icon: "🔔", label: "Nhận tin phim mới" },
];

const ADMIN_NAV_ITEMS = [
  { to: "/admin/movies", icon: "🎞️", label: "Quản lý phim" },
  { to: "/admin/showtimes", icon: "📅", label: "Quản lý suất chiếu" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeSidebar = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "visible" : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        {/* Logo */}
        <Link to="/" className="sidebar-logo" onClick={closeSidebar}>
          <div className="sidebar-logo-icon">🎬</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">Mini Cinema</span>
            <span className="sidebar-logo-sub">Book your seat</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Menu chính</div>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${isActive(item.to) ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-text">{item.label}</span>
            </Link>
          ))}

          {user?.role === "admin" && (
            <>
              <div className="sidebar-section-label" style={{ marginTop: 8 }}>
                Quản trị
              </div>
              {ADMIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-item ${isActive(item.to) ? "active" : ""}`}
                  onClick={closeSidebar}
                >
                  <span className="nav-item-icon">{item.icon}</span>
                  <span className="nav-item-text">{item.label}</span>
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* User Section */}
        <div className="sidebar-user">
          {user ? (
            <>
              <div className="sidebar-user-card">
                <div className="sidebar-user-avatar">
                  {user.fullName ? user.fullName[0].toUpperCase() : "U"}
                </div>
                <div className="sidebar-user-info">
                  <div className="sidebar-user-name">{user.fullName}</div>
                  <div className="sidebar-user-role">
                    {user.role === "admin" ? "⭐ Admin" : "🎟 Thành viên"}
                  </div>
                </div>
              </div>
              <button className="sidebar-logout-btn" onClick={handleLogout}>
                <span>🚪</span>
                <span>Đăng xuất</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="sidebar-login-btn" onClick={closeSidebar}>
              <span>🔑</span>
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;