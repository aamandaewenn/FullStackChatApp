import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from 'react';

import {Landing} from './Landing';
import {ShowPosts} from './ShowPosts';
import {AddPosts} from './AddPosts';
import './App.css';

function App() {
  const [getList, setList] = useState([]);

  if(getList.length <1) {fetch('http://localhost:80/init', {method: 'POST',headers: {'Content-type': 'application/x-www-form-urlencoded'}})
  .then(response => response.json()).then(response => setList(Object.values(response)))};
  console.log(Array.isArray(getList))
  console.log(getList.constructor)

  function getPosts() {
    fetch('http://localhost:80/getPosts')
        .then(response => response.json())
        .then(response => setList(response))
        console.log('get posts callsed')
  }
  
  return (
    <div className="App">
      <header className="App-header">
       
        <div>
          <Router>
        {/* <Link to="/showPosts">  <button onClick={(e) => {
        fetch('http://localhost:80/getPosts')
        .then(response => response.json())
        .then(response => setList(response))
    }
        }> Show Posts </button> </Link> */}
        <Link to="/showPosts"> <button onClick={(e) => {fetch('http://localhost:80/getPosts', {method: 'GET',headers: {'Content-type': 'application/x-www-form-urlencoded'}}).then(response => response.json())
        .then(response => setList(response))
        console.log('get posts called')
  }} > Show Posts</button></Link>
        <Link to="/addPosts">  <button>  Add Posts </button>   </Link>
         <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route exact path='/addPosts' element={<AddPosts set = {setList} />} />
          //<Route path="/showPosts" element={<ShowPosts get = {getList}/>} />
          
          </Routes>
        </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
