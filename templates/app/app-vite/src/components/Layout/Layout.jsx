import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { useCart } from "../../context/CartContext";
import "./Layout.css";
export default function Layout() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="layout">
      <header>
        <nav className="navbar">
          <div className="nav-left">
            <a
              href="https://www.hackyourfuture.dk/"
              target="_blank"
              className="link"
            >
              <img src={hyfLogo} alt="HackYourFuture logo" className="logo" />
            </a>
            <Link to="/">Home</Link>
            <Link to="/events" className="link">
              Events
            </Link>
          </div>
          <div className="nav-right">
            {user && (
              <>
                <span>{user.email}</span>
                <button onClick={logout}>Sign out</button>
              </>
            )}
            <Link to="/cart" className="cart-link">
              🛒
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
