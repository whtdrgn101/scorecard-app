import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserConext from './Components/User/User';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import RoundList from './Pages/RoundList';
import Menu from './Components/Menu';
import Round from './Pages/Round';
import './App.css'

const user = {
  id:1000,
  email:'joanneshepherd@example.net',
  name: 'Michael Gray',
}

function App() {
  const [count, setCount] = useState(0)

  return (
      <UserConext.Provider value={user}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rounds" element={<RoundList />} />
            <Route path="/round/:id" element={<Round />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
    </UserConext.Provider>
  )
}

export default App
