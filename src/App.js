// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Component/Header';
import Registration from './Component/Registration';
import Start from './Component/Start';
import Home from './Component/Home';
import { useGlobalStats } from './GlobelStats/GlobelStats';
import { useAuth } from './Auth/context/authContext/Index';
import Footer from './Component/Footer';

function App() {
  const {currentUser} = useAuth()
 
  return (
    <Router>
      <div>
        {currentUser ? <Header /> : ''}
        <Routes>
          <Route path="/login" element={<Start />} />
          <Route path="/registration" element={currentUser ? <Registration /> : ''} />
          <Route path="/home" element={currentUser ? <Home /> : ''} />
        </Routes>
{      currentUser ?   <Footer/> : ''
}      </div>
    </Router>
  );
}

export default App;
