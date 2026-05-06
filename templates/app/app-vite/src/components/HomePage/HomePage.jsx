import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Discover Events Near You 🎉</h1>
        <p>
          Find conferences, workshops, hackathons and meetups happening near
          you. Explore, book, and join events in seconds.
        </p>

        <Link to="/events">
          <button className="cta-btn">Discover Events</button>
        </Link>
      </div>
    </div>
  );
}
