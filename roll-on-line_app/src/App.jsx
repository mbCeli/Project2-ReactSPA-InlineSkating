import { Routes, Route } from 'react-router-dom';


import './App.css'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';

export const baseURL = import.meta.env.VITE_APP_API_URL;

export default function App() {
  return (
    <main className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </main>
  );
}

