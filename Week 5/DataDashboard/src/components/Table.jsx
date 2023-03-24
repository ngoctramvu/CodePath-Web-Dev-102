const Table = ({events}) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Venue</th>
            <th>Highest Price</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {events && events.map((event) => (
            <tr key={event.id}>
              <td>{event.datetime_local.split("T")[0]}</td>
              <td>{event.short_title}</td>
              <td>{event.venue.display_location}</td>
              <td>${event.stats.highest_price}</td>
              <td><a href={event.url}>🔗</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Table;