import { React, useState, useEffect } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { supabase } from './client';
import Home from './pages/Home';
import Create from './pages/Create';
import Gallery from './pages/Gallery';
import View from './pages/View';
import Edit from './pages/Edit';
import './App.css';

function App() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const {data} = await supabase
        .from("Crewmates")
        .select();

      setCrewmates(data);
    };

    fetchCrewmates().catch(console.error);
  }, []);

  let element = useRoutes([
    {
      path: "/",
      element:<Home />
    },
    {
      path:"/create/",
      element: <Create />
    },
    {
      path:"/gallery",
      element: <Gallery crewmates={crewmates}/>
    },
    {
      path: "/:id",
      element: <View />
    },
    {
      path: "/:id/edit",
      element: <Edit />
    }
  ]);

  return (
    <div>
      <div className="sidenav">
        <Link to="/">Home</Link>
        <Link to="/create">Create a Crewmate!</Link>
        <Link to="/gallery">Crewmate Gallery</Link>
        <img src="/src/assets/peeking.png"/>
      </div>
      <div className="whole-page">
        {element}
      </div>

    </div>
  )
}

export default App
