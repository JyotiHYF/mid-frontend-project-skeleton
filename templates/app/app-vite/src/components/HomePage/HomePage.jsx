import EventDetail from "../EventDetail/EventDetail";
import EventList from "../EventList/EventList";
import { useState } from "react";
import events from "../../data/events";
function HomePage() {
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;

    if (sortBy === "availability") {
      return b.ticketsAvailable - a.ticketsAvailable;
    }

    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <h1
          style={{
            fontSize: "14px",
            fontWeight: "500",
            margin: 0,
          }}
        >
          Sort by
        </h1>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="price">Price</option>
          <option value="availability">Availability</option>
        </select>
      </div>
      <EventList
        events={sortedEvents}
        onSelectEvent={setSelectedEvent}
        selectedEvent={selectedEvent}
      />
      <EventDetail event={selectedEvent} />
    </div>
  );
}

export default HomePage;
