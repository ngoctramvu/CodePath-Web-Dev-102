import { useState, useEffect } from 'react';
import Table from './components/Table';
import NavBar from './components/NavBar';
import './App.css';
import Card from './components/Card';

const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const BASE_URL = "https://api.seatgeek.com/2"

function App() {
  const [events, setEvents] = useState(null);
  const [stats, setStats] = useState({totalEvents: 0, averagePrice: 0, highestPrice: 0});
  const [query, setQuery] = useState({q: "", highestPrice: 5000});

  const fetchEvents = async () => {
    const response = await fetch (
      `${BASE_URL}/events?client_id=${CLIENT_ID}&listing_count.gt=0&highest_price.lte=${query.highestPrice}&q=${query.q}`
    )
    const json = await response.json();
    setEvents(json.events);
    fetchStatistics(json);
  }

  const fetchStatistics = (events) => {
    const total = events.meta.total;
    const avg = events.events.reduce((prev, cur) => prev + cur.stats.average_price, 0) / events.events.length;
    const highest = events.events.reduce((prev, cur) => Math.max(prev, cur.stats.highest_price), 0);
    setStats({totalEvents: total, averagePrice: avg, highestPrice: highest})
  }

  useEffect(() => {
    fetchEvents().catch(console.error);
  }, []);

  const handleSearchTextbox = (searchQuery) => {
    setQuery((prev) => ({...prev, q: searchQuery}));
  }

  const handlePriceSlider = (price) => {
    setQuery((prev) => ({...prev, highestPrice: price}));
  }

  const searchEvents = () => {
    fetchEvents().catch(console.error);
  }
  
  return (
    <div className="App">
      <NavBar />
      <div className="App-page">
        <div className="App-row">
          <Card stats={stats.totalEvents} label="Total Events"/>
          <Card stats={stats.averagePrice} label="Average Price"/>
          <Card stats={stats.highestPrice} label="Highest Price"/>
        </div>
        <div className="App-row">
          <div className="List">
            <div className="filters">
              <div className="queryFilters">
                <input type="text"
                  placeholder="Search Event"
                  onChange={(event) => handleSearchTextbox(event.target.value)}/>
              </div>
              <div className="priceFilters">
                <label>Highest Price: ${query.highestPrice}</label>
                <input type="range" defaultValue="5000" min="0" max="5000" step="5"
                  onChange={(event) => handlePriceSlider(event.target.value)}/>
              </div>
              <button className="btn" onClick={searchEvents}>Search</button>
            </div>
            <Table events={events} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
