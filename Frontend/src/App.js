import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/Login"
import Register from "./components/Register"
import Home from './components/Home';

export default function App() {
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [])

  return (

    <div className="App">
      <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </>
    </div>
  );
}
