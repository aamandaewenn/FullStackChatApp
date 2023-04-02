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

function goToChannel()
{}
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

       
        <div id='channelList'>
          <Router>
          {getChannels.map((channel) => {return (<Link key={channel.id} to={`/channels/${channel.name}`} >  {channel.name} </Link>)})}
          <Link to='/createChannel'>  <button>  Create a New Channel </button>   </Link>

          

         <Routes>
         {getChannels.map((channel) => {return (<Route path={`/channels/${channel.name}`} element={<Channel id={channel.id} name={channel.name}></Channel>} >  {channel.name} </Route>)})}


          <Route exact path='/' element={<Landing/>} />
            <Route path='/createChannel' element={<CreateChannel set={setChannels}/>} />
            
          </Routes>
        </Router>

        </div>

     
      </header>
    </div>
  );
}


export default App;
