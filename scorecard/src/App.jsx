import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Menu from './Components/Menu';
import Round from './Pages/Round';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/round/:id" element={<Round />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
