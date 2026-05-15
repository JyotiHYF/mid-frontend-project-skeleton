import { Link } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  return (
    <div className="success-page">
      <div className="success-box">
        <h1>🎉 Order Placed Successfully!</h1>

        <p>Thank you for your purchase.</p>
        <p>Your tickets are now available in “My Orders”.</p>

        <div className="success-actions">
          <Link to="/orders">
            <button>View Orders</button>
          </Link>

          <Link to="/events">
            <button className="secondary">Back to Events</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
