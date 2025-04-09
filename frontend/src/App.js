import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/catalog">Catalogue</Link>
            </li>
            <li>
              <Link to="/admin">Ajouter une Voiture</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/catalog" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 