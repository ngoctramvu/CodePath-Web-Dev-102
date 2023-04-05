import React, { useState, useEffect } from 'react';
import { Link, useRoutes } from 'react-router-dom'
import { supabase } from './client'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import './App.css';


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await supabase
      .from('Posts')
      .select()
      .order('created_at', { ascending: true });

      setPosts(data);
    }
    
    fetchPosts();
  }, []);
 
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>👍 Bet 1.0</h1>
        <Link to="/"><button className="headerBtn"> Explore Challenges 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Submit Challenge 🏆 </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
