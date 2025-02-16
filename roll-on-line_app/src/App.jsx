import { Routes, Route } from 'react-router-dom';
/* import { useState } from 'react'; */

import './App.css'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';

export default function App() {

  return (
    <main className="App">
      <Navbar />
      <HomePage />
    </main>
  );
}

