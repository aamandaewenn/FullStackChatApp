import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const ManageChannels = ({getChannelList, setChannelList}) => {

const [getID, setID] = useState('')

// const listChannels = () => {fetch('http://localhost:81/getChannels')
// .then(response => response.json())
// .then(response => setChannelList(Object.values(response)))}


return (
    <>
<h3> Channel Management </h3>

{getChannelList.map((channel) => {
   return <p>Channel ID: {channel.id} Name: {channel.name}</p>
})}

<label>ID of channel to delete:</label><input type='text' onChange={(event) => {
          setID(event.target.value)}}></input><br></br>
          <button onClick={async (e) => { console.log('button clicked')
            await fetch('http://localhost:81/deleteChannel', {
                method: 'DELETE', body: `id=${getID}`,
                headers: { 'Content-type': 'application/x-www-form-urlencoded', 'accessToken':localStorage.getItem('accessToken') }
            })
            fetch('http://localhost:81/getChannels')
         .then(response => response.json())
         .then(response => setChannelList(Object.values(response)))
         console.log(getChannelList.length)
          }}>Delete Channel</button>
</>
)
}