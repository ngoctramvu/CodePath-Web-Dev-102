import { useLocation } from "react-router";
import "../App.css";

const Event = () => {
  const data = useLocation();
  const event = data.state.event;

  return (
    <div className="App-page">
      <div className="App-row">
        <div className="Details">
          <h3>{event.short_title}</h3>
          <h3>Date: {event.datetime_local.split("T")[0]}</h3>
          <h3>Venue: {event.venue.display_location}</h3>
          <h3>Highest Price: ${event.stats.highest_price}</h3>
          <h3>Lowest Price: ${event.stats.lowest_price}</h3>
          <h3>Average Price: ${event.stats.average_price}</h3>
          <h3><a href={event.url}>🔗 External Link</a></h3>
        </div>
      </div>
    </div>
  );
};

export default Event;