const History = ({history}) => {

  return (
    <div className="history-sidebar">
      <h2>Who have we seen so far?</h2>
      <div className="history-container">
        {history && history.map((item) => (
          <li key={item.url}>
            <img src={item.url} alt="random image from Dog API" width="50" height="50"/>
            <p>{item.name}</p>
          </li>
        ))}
      </div>
    </div>
  )
}

export default History;