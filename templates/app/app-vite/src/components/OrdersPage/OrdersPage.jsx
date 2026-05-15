import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./OrdersPage.css";

export default function OrdersPage() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders?userId=${user.id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        setOrders(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="orders-page">
        <h2>Please log in to see your orders.</h2>
      </div>
    );
  }

  if (loading) {
    return <p className="orders-page">Loading orders...</p>;
  }

  if (error) {
    return <p className="orders-page error">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h2>No orders yet</h2>

        <Link to="/events">
          <button className="browse-btn">Browse Events</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-box">
        <h1>My Orders</h1>

        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>

            <p>
              <strong>Total:</strong> {order.total} DKK
            </p>

            <p>
              <strong>Items:</strong> {order.items.length}
            </p>

            <Link to={`/orders/${order.id}`}>
              <button className="details-btn">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
