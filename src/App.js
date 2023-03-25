import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from 'react';

import {Landing} from './Landing';
import './App.css';

function App() {



  
  return (
    <div className="App">
      <header className="App-header">
       
        <div>
          <Router>
         <Routes>
          <Route exact path='/' element={<Landing/>} />
          
          </Routes>
        </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
