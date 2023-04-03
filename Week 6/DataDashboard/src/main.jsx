import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './routes/NavBar';
import Event from './routes/Event';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index={true} element={<App />}/>
          <Route path="/event/:id" element={<Event />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
