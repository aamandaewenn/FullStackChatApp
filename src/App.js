import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


import {Landing} from './Landing';
import {CreateChannel} from './CreateChannel'
//import {GetChannels} from './GetChannels'
import {Channel} from './Channel'
import './App.css';
import Registration from './Registration';
import Login from './Login';
import { AuthContext } from './helpers/AuthContext';
import { ManageChannels } from './ManageChannels';
import { ManagePosts } from './ManagePosts';
import {ManageUsers} from './ManageUsers';



function App() {
const navigate = useNavigate;

const [getSearchMethod, setSearchMethod] = useState('')
const [getSearchQuery, setSearchQuery] = useState('')
const [getChannels, setChannels] = useState([]);
const [getAuthState, setAuthState] = useState({
  username: "",
  id: 0,
  status: false,
});



// if(getChannels.length <1) {
//   fetch('http://localhost:81/init', {method: 'POST',headers: {'Content-type': 'application/x-www-form-urlencoded'}})
// .then(response => response.json()).then(response => setChannels(Object.values(response)))}


useEffect(()=>
{
  fetch("http://localhost:81/createAdmin/", {
      method: 'GET'
      })
      fetch('http://localhost:81/init', {method: 'POST',headers: {'Content-type': 'application/x-www-form-urlencoded'}})
      .then(response => response.json()).then(response => setChannels(Object.values(response)))
},[])

  useEffect( (e)=>{
          showChannels()

  }, [getChannels.length])

  useEffect(() => {
    fetch("http://localhost:81/auth/", {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }, method: 'GET'
      })
      .then(response => response.json()).then(
        response =>{
        if (response.error) {
          setAuthState(false);
        } else {
          setAuthState({
            username: response.username,
            id: response.id,
            status: true,
          });
        }
      
      })
}, []);

const logout = () => {
  localStorage.removeItem("accessToken");
  setAuthState({ username: "", id: 0, status: false });
  window.location.href = "/";
};
    
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

//const routeComponents = getChannels.map((channel) => <Route exact path={`channels/${channel.name}`} component={<Channel name={channel.name} id={channel.id}></Channel>} key={channel.id} />);

  return (
    <div className="App">
      <header className="App-header">
      {getAuthState.status && (
        <div className='searchbar'>
        <select name="language" id="language" onChange={(event) => {
          setSearchMethod(event.target.value)}}>
  <option></option>
  <option value="from">from:</option>
  <option value="contains">contains:</option>
</select><input type='text' onChange={(event) => {
          setSearchQuery(event.target.value)}}>
            </input><button onClick={async (e)=> {await 
              fetch(`http://localhost:81/search/${getSearchMethod}/${getSearchQuery}`)
              .then(response => response.json())
              .then(response => alert(response))}
            }>
              Search</button>
        </div>)
}
        <div className='channelList'>
          <AuthContext.Provider value={{getAuthState, setAuthState}}>
          <Router>
            {!getAuthState.status ? (
              <>
          <Link to='/login'>Login</Link><br></br><Link to='/registration'>Register</Link>
          <br></br>
          </>
            )
            :<div className="loggedInContainer">
            <h1>{getAuthState.username} </h1>
            {getAuthState.status && <button onClick={logout}> Logout</button>}
          </div>
            }

            {getAuthState.id == 1 && (
              <div>
              <Link to = '/manageChannels'>Manage Channels</Link>
              <Link to = '/managePosts'>Manage Posts</Link>
              <Link to = '/manageUsers'>Manage Users</Link>
              </div>
            )}

          {getChannels.map((channel) => {return (<Link key={channel.id} to={`/channels/${channel.name}`}>  <button>  {channel.name} </button> </Link>)})}
          <Link to='/createChannel'>  <button>  Create a New Channel </button>   </Link>
          

         <Routes>
         {getChannels.map((channel) => {return (<Route path={`/channels/${channel.name}`} element={<Channel id={channel.id} name={channel.name}></Channel>} >  {channel.name} </Route>)})}


          <Route exact path='/' element={<Landing/>} />
            <Route path='/createChannel' element={<CreateChannel get={getChannels}set={setChannels}/>} />
            <Route exact path='/registration' element={<Registration/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/manageChannels' element={<ManageChannels getChannelList={getChannels} setChannelList={setChannels}></ManageChannels>}></Route>
            <Route exact path='/managePosts' element={<ManagePosts/>}></Route>
            <Route exact path='/manageUsers' element={<ManageUsers/>}></Route>
          </Routes>
        </Router>
        </AuthContext.Provider>

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
