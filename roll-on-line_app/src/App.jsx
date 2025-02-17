import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';

export const baseURL = import.meta.env.VITE_APP_API_URL;

export default function App() {
  return (
    <main className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
  );
}

