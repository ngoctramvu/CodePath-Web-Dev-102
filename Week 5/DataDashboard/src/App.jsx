import { useState, useEffect } from 'react';
import Table from './components/Table';
import NavBar from './components/NavBar';
import './App.css';
import Card from './components/Card';

const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const BASE_URL = "https://api.seatgeek.com/2"

function App() {
  const [events, setEvents] = useState(null);
  const [summary, setSummary] = useState({totalEvents: 0});
  const [query, setQuery] = useState({q: "", highestPrice: 10000});

  const fetchEvents = async () => {
    const response = await fetch (
      `${BASE_URL}/events?client_id=${CLIENT_ID}&per_page=25&listing_count.gt=0&highest_price.lte=${query.highestPrice}&q=${query.q}`
    )
    const json = await response.json();
    setEvents(json.events);
    setSummary((prev) => ({...prev, totalEvents: json.meta.total}));
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
          <Card />
          <Card />
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
                <input type="range" defaultValue="10000" min="0" max="10000" step="5"
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
