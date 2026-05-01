import events from "../../data/events.js";
import "./EventDetail.css";

export default function EventDetail() {
  const event = events[0];

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
        {event.price === 0 ? "Free" : `€${event.price}`}
      </p>

      <p className="event-tickets">
        {event.ticketsAvailable === 0
          ? "Sold out"
          : `${event.ticketsAvailable} tickets left`}
      </p>

      <button className="event-button">Buy ticket</button>
    </article>
  );
}
