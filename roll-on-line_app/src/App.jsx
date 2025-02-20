import { Routes, Route } from 'react-router-dom';


import './App.css'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export const baseURL = import.meta.env.VITE_APP_API_URL;

export default function App() {
  return (
    <main className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/skate_info" element={<HistoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

