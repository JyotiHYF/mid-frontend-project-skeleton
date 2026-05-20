import EventList from "../EventList/EventList";
import "./EventPage.css";
import { useState, useEffect } from "react";
function EventPage() {
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
          `${import.meta.env.VITE_API_URL}/api/events?q=${search}&_page=${page}&_limit=3`,
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
    <div className="events-page">
      <h1>Events</h1>

      <input
        placeholder="Search events..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <p className="results-count">Showing {events.length} events</p>
      {loading && <p className="loading">Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found</p>}
      {!loading && !error && (
        <>
          <EventList events={events} />
          <br></br>

          <div className="pagination">
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Prev
            </button>

            <span> Page {page} </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={events.length < 3}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EventPage;
