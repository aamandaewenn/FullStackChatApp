import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from 'react';


import {Landing} from './Landing';
import {CreateChannel} from './CreateChannel'
//import {GetChannels} from './GetChannels'
import {Channel} from './Channel'
import './App.css';

function App() {
const [getChannels, setChannels] = useState([]);

if(getChannels.length <1) {
  fetch('http://localhost:81/init', {method: 'POST',headers: {'Content-type': 'application/x-www-form-urlencoded'}})
.then(response => response.json()).then(response => setChannels(Object.values(response)))}



//  useEffect( ()=>{{
//          return(showChannels())

//  }})
    
function showChannels() {
fetch('http://localhost:81/getChannels')
         .then(response => response.json())
         .then(response => setChannels(Object.values(response)))
console.log(getChannels)
}


//   const channels = getChannels.map(post => (
   
  
//   <div className="container">

// <Router>

// <Link to={`/channels/${post.name}`} >  <button>  {post.name} </button> </Link>

// <Routes>
//   <Route path={`/channels/${post.name}` } element={<Channel id={post.id} name={post.name}/>} />
  
// </Routes>
// </Router>
//   </div>)

// )
// return channels
//}

  
  return (
    <div className="App">
      <header className="App-header">

        <div>
          {getChannels.map(channel => 
          <div className="container">

          <Router>
          
          <Link to={`/channels/${channel.name}`} >  <button>  {channel.name} </button> </Link>
          
          <Routes>
          <Route path={`/channels/${channel.name}` } element={<Channel id={channel.id} name={channel.name}/>} />
            
          </Routes>
          </Router>
          </div>)}
          </div>
       
        <div>
          <Router>
          <Link to='/createChannel'>  <button>  Create a New Channel </button>   </Link>
          

         <Routes>
          <Route exact path='/' element={<Landing/>} />
            <Route path='/createChannel' element={<CreateChannel set={setChannels}/>} />
            
          </Routes>
        </Router>

        </div>

      <ol className='channelList'>{showChannels()}</ol>
      </header>
    </div>
  );
}


export default App;
