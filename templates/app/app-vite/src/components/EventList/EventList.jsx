import { EventCard } from "../EventCard/EventCard.jsx";
import "./EventList.css";

export default function EventList({
  events = [],
  onSelectEvent,
  selectedEvent,
}) {
  if (!Array.isArray(events) || events.length === 0) {
    return <p>No events available 😢</p>;
  }

  return (
    <section className="event-list">
      <h1>Upcoming Events</h1>

      <div className="event-grid">
        {events.map((event) => {
          const isSelected = selectedEvent?.id === event.id;
          return (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className={isSelected ? "selected-card" : ""}
              style={{ cursor: "pointer" }}
            >
              <EventCard event={event} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
