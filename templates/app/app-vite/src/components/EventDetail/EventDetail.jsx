import "./EventDetail.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, cartItems, updateQuantity } = useCart();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        );
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;
  const inCart = cartItems.find((item) => item.id === event.id);

  function handleAddToCart() {
    addToCart(event, quantity);
  }

  return (
    <article className="event-detail">
      <div className="event-left">
        <h1 className="event-title">{event.name}</h1>

        <p className="event-meta">
          {event.date} at {event.time}
        </p>

        <p className="event-meta">
          {event.venue}, {event.city}
        </p>

        <span className="event-category">{event.category}</span>

        <p className="event-description">{event.description}</p>
      </div>

      <div className="event-right">
        <p className="price">
          {event.price === 0 ? "Free" : `${event.price} DKK`}
        </p>
        <p>
          {event.ticketsAvailable === 0
            ? "Sold out ❌"
            : `${event.ticketsAvailable} tickets left  🎟️`}
        </p>
        {!inCart ? (
          <>
            <div className="quantity-control">
              <label>Quantity:</label>
              <input
                type="number"
                step="1"
                min="1"
                max={event.ticketsAvailable}
                value={quantity}
                disabled={event.ticketsAvailable === 0}
                onChange={(e) => {
                  const value = Number(e.target.value) || 1;
                  setQuantity(
                    Math.max(1, Math.min(event.ticketsAvailable, value)),
                  );
                }}
              />
            </div>

            <p className="total-price">
              Total:{" "}
              {event.price === 0 ? "Free" : `${quantity * event.price} DKK`}
            </p>

            <button
              className="event-button"
              disabled={event.ticketsAvailable === 0}
              onClick={handleAddToCart}
            >
              {event.ticketsAvailable === 0 ? "Sold out" : "Add to cart"}
            </button>
          </>
        ) : (
          <>
            <div className="qty-controls">
              <button
                onClick={() => updateQuantity(event.id, inCart.quantity - 1)}
                disabled={inCart.quantity <= 1}
              >
                -
              </button>

              <span>{inCart.quantity}</span>

              <button
                onClick={() => updateQuantity(event.id, inCart.quantity + 1)}
              >
                +
              </button>

              <span className="added-text">Added ✓</span>
            </div>
            <Link to="/cart">
              <button className="go-cart-btn">Go to Cart 🛒</button>
            </Link>

            <button
              className="remove-btn"
              onClick={() => updateQuantity(event.id, 0)}
            >
              Remove from cart
            </button>
          </>
        )}
      </div>
    </article>
  );
}
