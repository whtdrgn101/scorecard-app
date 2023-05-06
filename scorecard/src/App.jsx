import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserConext from './Components/User/User';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Menu from './Components/Menu';
import BowList from './Pages/Bow/BowList';
import NewBow from './Pages/Bow/NewBow';
import Bow from './Pages/Bow/Bow';
import RoundList from './Pages/Round/RoundList';
import NewRound from './Pages/Round/NewRound';
import Round from './Pages/Round/Round';
import './App.css'

const session = {
  user: {
    id:5000,
    email:'joanneshepherd@example.net',
    name: 'Michael Gray',
  },
  //base_url: 'http://192.168.49.2:32687',
  base_url: 'http://localhost:8000',
}

function App() {
  const [count, setCount] = useState(0)

  return (
      <UserConext.Provider value={session}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bows" element={<BowList />} />
            <Route path="/bow/:id" element={<Bow />} />
            <Route path="/new-bow/" element={<NewBow />} />
            <Route path="/rounds" element={<RoundList />} />
            <Route path="/round/:id" element={<Round />} />
            <Route path="/new-round" element={<NewRound />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
    </UserConext.Provider>
  )
}

export default App
