import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { Footer } from "../Footer/Footer.jsx";
import "./Layout.css";
export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div>
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
