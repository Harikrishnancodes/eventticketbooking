import React from 'react'
import {    Route, Routes } from 'react-router-dom';
import EventList from './components/AdminPanel'
import UserPage from './components/Userpage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
   
        <Route path='/' element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/event_list" element={<EventList />} />
        <Route path='/signup' element= {<Signup />} />     
     
  </Routes>
  )
}

export default App
