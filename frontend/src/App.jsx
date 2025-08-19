import React from "react"
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"; 
import Home from "./Pages/Home.jsx"
import Auth from "./Pages/Auth.jsx"
import Expenses from "./Pages/Expenses.jsx";


function App() {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Auth />}/>
      <Route path='/signup' element={<Auth />}/>
      <Route path='/expenses' element={<Expenses/>} />
    </Routes>
  )
}

export default App
