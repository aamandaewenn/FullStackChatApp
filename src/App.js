import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from 'react';


import {Landing} from './Landing';
import {CreateChannel} from './CreateChannel'
//import {GetChannels} from './GetChannels'
import {Channel} from './Channel'
import './App.css';
import Registration from './Registration';
import Login from './Login';

function App() {
const [getChannels, setChannels] = useState([]);
const [getUserReg, setUserReg] = useState('');
const [getPassReg, setPassReg] = useState('');



if(getChannels.length <1) {
  fetch('http://localhost:81/init', {method: 'POST',headers: {'Content-type': 'application/x-www-form-urlencoded'}})
.then(response => response.json()).then(response => setChannels(Object.values(response)))}


  useEffect( (e)=>{
          showChannels()

  }, [getChannels.length])
    
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

       {/*show this div when logged in*/}
        <div id='channelList'>
          <Router>
          {getChannels.map((channel) => {return (<Link key={channel.id} to={`/channels/${channel.name}`}>  <button>  {channel.name} </button> </Link>)})}
          <Link to='/createChannel'>  <button>  Create a New Channel </button>   </Link>
          <Link to='/login'>Login</Link>
          <Link to='/registration'>Register</Link>

          

         <Routes>
         {getChannels.map((channel) => {return (<Route path={`/channels/${channel.name}`} element={<Channel id={channel.id} name={channel.name}></Channel>} >  {channel.name} </Route>)})}


          <Route exact path='/' element={<Landing/>} />
            <Route path='/createChannel' element={<CreateChannel set={setChannels}/>} />
            <Route exact path='/registration' element={<Registration/>} />
            <Route exact path='/login' element={<Login/>} />
            
          </Routes>
        </Router>

        </div>

{/*show this div when not logged in */}
        {/* <div>
        <div className='registration'>
        <h3>Register Here!</h3>
        <label>Create Username</label><input type='text' onChange={e => setUserReg(e.target.value)}></input><br></br>
        <label>Create Password</label><input type='text' onChange={e => setPassReg(e.target.value)}></input><br></br>
        <button onClick={()=>(fetch('http://localhost:81/register', {method: 'POST', headers: {'Content-type': 'application/x-www-form-urlencoded'}, body: `username=${getUserReg}&password=${getPassReg}`})
  .then(response => response.json())
  )}>Create User</button>
        </div>

        <div className='login'>
        <h3>Login</h3>
        <label>username</label><input type='text'></input><br></br>
        <label>password</label><input type='text'></input><br></br>
        <button>Login</button>
        </div>
        </div> */}


     
      </header>
    </div>
  );
}


export default App;
