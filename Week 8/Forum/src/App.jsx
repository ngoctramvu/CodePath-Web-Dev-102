import { useState } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import ViewPost from './routes/ViewPost';
import NavBar from './routes/NavBar';
import CreatePost from './routes/CreatePost';
import UpdatePost from './routes/UpdatePost';

function App() {

  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/view/:id",
      element: <ViewPost />
    },
    {
      path: "/create",
      element: <CreatePost />
    },
    {
      path: "/update/:id",
      element: <UpdatePost />
    }
  ]);

  return (
    <div className="App">
      <div className="App-header">
        <NavBar />
      </div>
      <div className="App-body">
        {element}
      </div>
    </div>
  )
}

export default App
