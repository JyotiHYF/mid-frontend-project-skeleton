import EventDetail from "../EventDetail/EventDetail";
import EventList from "../EventList/EventList";
import { useState, useEffect } from "react";
function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `http://localhost:3001/events?q=${search}&_page=${page}&_limit=5`,
        );

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [search, page]);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Events</h1>

      {/* SEARCH */}
      <input
        placeholder="Search events..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* STATES */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found</p>}
      {!loading && !error && (
        <>
          <EventList
            events={events}
            onSelectEvent={setSelectedEvent}
            selectedEvent={selectedEvent}
          />
          {/* PAGINATION */}
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Prev
            </button>

            <span> Page {page} </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={events.length < 5}
            >
              Next
            </button>
          </div>
        </>
      )}
      {selectedEvent && <EventDetail event={selectedEvent} />}
    </div>
  );
}

export default EventPage;
