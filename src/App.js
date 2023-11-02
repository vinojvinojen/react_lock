import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';



const App = () => {

  
  return (

    <BrowserRouter>
      <Routes>
      <Route index element={<Login />} /> Add a new login route

        <Route path='/dashboard' element={<Dashboard />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
