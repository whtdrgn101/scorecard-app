import { useState } from 'react'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Menu from './Components/Menu';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
