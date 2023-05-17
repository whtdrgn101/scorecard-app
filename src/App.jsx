import { Component, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Menu from './Components/Menu';
import BowList from './Pages/Bow/BowList';
import NewBow from './Pages/Bow/NewBow';
import Bow from './Pages/Bow/Bow';
import RoundList from './Pages/Round/RoundList';
import NewRound from './Pages/Round/NewRound';
import Round from './Pages/Round/Round';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/bows" element={<BowList />} />
        <Route path="/bow/:id" element={<Bow />} />
        <Route path="/new-bow/" element={<NewBow />} />
        <Route path="/rounds" element={<RoundList />} />
        <Route path="/round/:id" element={<Round />} />
        <Route path="/new-round" element={<NewRound />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}