import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetailPage.css";

export default function OrderDetailPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();

        setOrder(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p className="order-detail-page">Loading order...</p>;
  }

  if (error) {
    return <p className="order-detail-page error">{error}</p>;
  }

  if (!order) {
    return <p className="order-detail-page">Order not found</p>;
  }

  return (
    <div className="order-detail-page">
      <div className="order-detail-box">
        <div className="order-title">Order #{order.id}</div>
        <div className="order-sub">Thanks for your purchase</div>

        <div className="section">
          <h3>Tickets</h3>

          {(order.items ?? []).map((item) => (
            <div key={item.id} className="ticket-item">
              <div className="ticket-left">
                <div className="ticket-name">{item.name}</div>
                <div className="ticket-meta">Quantity: {item.quantity}</div>
              </div>

              <div className="ticket-price">
                {item.price * item.quantity} DKK
              </div>
            </div>
          ))}
        </div>

        <div className="total">
          <span>Total</span>
          <span>{order.total} DKK</span>
        </div>
      </div>
    </div>
  );
}
