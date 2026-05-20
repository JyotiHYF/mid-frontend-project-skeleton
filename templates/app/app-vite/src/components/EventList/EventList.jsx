import { EventCard } from "../EventCard/EventCard.jsx";
import "./EventList.css";

export default function EventList({ events = [] }) {
  return (
    <section className="event-list">
      <h1>Upcoming Events</h1>

      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
