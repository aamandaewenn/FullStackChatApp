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



  useEffect( ()=>{{
          return(showChannels())

  }})
    
function showChannels() {
fetch('http://localhost:81/getChannels')
         .then(response => response.json())
         .then(response => setChannels(Object.values(response)))
//console.log(getChannels)
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

// var channels = []
// getChannels.map(channel =>
//   channels.concat(channel))
// console.log(channels)
// channels.map(c => console.log(c))

const routeComponents = getChannels.map((channel) => <Route exact path={`channels/${channel.name}`} component={<Channel name={channel.name} id={channel.id}></Channel>} key={channel.id} />);

  
  return (
    <div className="App">
      <header className="App-header">

        <div>
          {getChannels.map((channel) => {
            //console.log(channel)
            return (
          <div className="container">

          <Router>
          
          <Link key={channel.id} to={`/channels/${channel.name}`} >  {channel.name} </Link>
          
          <Routes>
          <Route path={`/channels/${channel.name}` } key={channel.id} element={<Channel id={channel.id} name={channel.name}/>} />
            
          </Routes>
          </Router>
          </div>)})}
          </div>
       
        <div>
          <Router>
          <Link to='/createChannel'>  <button>  Create a New Channel </button>   </Link>
          <Link key={20} to={`/channels/${"a"}`} >  {"a"} </Link>

          

         <Routes>
          <Route exact path='/' element={<Landing/>} />
            <Route path='/createChannel' element={<CreateChannel set={setChannels}/>} />
            <Route path={`/channels/${"a"}`} key={20} element={<Channel id={20} name={"a"}/>} />

            
          </Routes>
        </Router>

        </div>

     
      </header>
    </div>
  );
}


export default App;
