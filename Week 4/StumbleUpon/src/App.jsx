import { useState } from 'react'
import './App.css'
import Discover from './components/Discover';
import BanSidebar from './components/BanSidebar';
import History from './components/History';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const URL = 'https://api.thedogapi.com/v1/images/search'

function App() {
  const [response, setResponse] = useState({url: '', attributes:[]});
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const handleDiscover = () => {
    const query = `${URL}?limit=1&has_breeds=1&api_key=${ACCESS_KEY}`
    callAPI(query).catch(console.error);
  }

  const handleAddedBan = (attribute) => {
    if (banList.includes(attribute)) {
      return;
    }
    setBanList((prevList) => [...prevList, attribute]);
  }

  const handleRemoveBan = (attribute) => {
    setBanList((prevList) => (prevList.filter(value => value !== attribute)));
  }

  const isValidResponse = (attributes) => {
    for (const attribute of attributes) {
      if (banList.includes(attribute))
        return false;
    }
    return true;
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    if (json[0].url == null) {
      alert("Opps! Something went wrong with that query, let's try again!");
    }
    else{
      const resp = {
        url: json[0].url,
        attributes: [
          json[0].breeds[0].name,
          `${json[0].breeds[0].weight.imperial} lbs`,
          json[0].breeds[0].breed_group,
          `${json[0].breeds[0].life_span}`]
      };

      if (isValidResponse(resp.attributes)) {
        setResponse(resp);
        setHistory((prevList) => [...prevList, {url: json[0].url, name: json[0].breeds[0].name}]);
      }
      else{
        handleDiscover();
      }
    }
  }

  return (
    <div>
      <div className="whole-page">
        <h1>Stumble Upon!</h1>
        <h3>Discover dogs from your wildest dreams!</h3>
        <br/>

        <Discover response={response} handleAddedBan={handleAddedBan} handleDiscover={handleDiscover} />

      </div>

      <BanSidebar banList={banList} handleRemoveBan={handleRemoveBan}/>
      <History history={history} />

    </div>
  )
}

export default App
