import "./EventCard.css";

export function EventCard({ event }) {
  const isSoldOut = event.ticketsAvailable === 0;

  return (
    <div className="event-card">
      <h2>{event.name}</h2>

      <h3>
        📅 {event.date} at {event.time}
      </h3>

      <p>
        📍 {event.venue}, {event.city}
      </p>

      <h4>{event.price === 0 ? "Free" : `${event.price} DKK`}</h4>
      {isSoldOut ? (
        <p>Sold out</p>
      ) : (
        <p>{event.ticketsAvailable} tickets left</p>
      )}

      <button
        className="buy-ticket-btn"
        disabled={isSoldOut}
        onClick={(e) => e.stopPropagation()}
      >
        {isSoldOut ? "Sold out" : "Buy a ticket"}
      </button>
    </div>
  );
}
