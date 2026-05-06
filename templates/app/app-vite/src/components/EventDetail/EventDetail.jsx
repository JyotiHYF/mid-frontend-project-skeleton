import "./EventDetail.css";
import { useState } from "react";
export default function EventDetail({ event }) {
  const [quantity, setQuantity] = useState(1);
  if (!event) {
    return <p>Select an event to see details</p>;
  }

  return (
    <article className="event-detail">
      <h1 className="event-title">{event.name}</h1>

      <p className="event-meta">
        {event.date} at {event.time}
      </p>

      <p className="event-meta">
        {event.venue}, {event.city}
      </p>

      <span className="event-category">{event.category}</span>

      <p className="event-description">{event.description}</p>

      <p className="event-price">
        {event.price === 0 ? "Free" : `${event.price} DKK`}
      </p>

      <p className="event-tickets">
        {event.ticketsAvailable === 0
          ? "Sold out ❌"
          : `${event.ticketsAvailable} tickets left  🎟️`}
      </p>
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
            setQuantity(Math.max(1, Math.min(event.ticketsAvailable, value)));
          }}
        />
      </div>
      <p className="total-price">
        Total: {event.price === 0 ? "Free" : `${quantity * event.price} DKK`}
      </p>
      <button className="event-button" disabled={event.ticketsAvailable === 0}>
        {event.ticketsAvailable === 0 ? "Sold out" : "Buy ticket"}
      </button>
    </article>
  );
}
