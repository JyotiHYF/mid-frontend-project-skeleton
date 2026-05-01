import EventDetail from "../EventDetail/EventDetail";
import EventList from "../EventList/EventList";

function HomePage() {
  return (
    <div className="home-content">
      <EventList />
      <EventDetail />
    </div>
  );
}

export default HomePage;
