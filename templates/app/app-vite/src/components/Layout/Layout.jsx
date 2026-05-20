import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="layout">
      {/* NAVBAR */}
      <nav className="navbar">
        {/* LEFT */}
        <div className="nav-left">
          <img src={hyfLogo} alt="logo" className="logo" />
          <Link to="/"> Home</Link>
          <Link to="/events">Events</Link>
        </div>

        <div className="nav-right">
          <Link to="/cart" className="cart-link">
            <FiShoppingCart />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>

          <div className="auth-desktop">
            {user ? (
              <div className="profile-wrapper">
                <button
                  className="profile-btn"
                  onClick={() => setProfileOpen((p) => !p)}
                >
                  <span className="profile-avatar">👤</span>
                  <span className="profile-name">{user.name}</span>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <Link to="/orders" onClick={() => setProfileOpen(false)}>
                      📦 My Orders
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>
            Events
          </Link>

          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>
                📦 My Orders
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
