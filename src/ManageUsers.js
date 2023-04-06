import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const ManageUsers = () => {

const [getID, setID] = useState('')
const [getUsers, setUsers] = useState([])

useEffect((e) => {fetch('http://localhost:81/getAllUsers')
.then(response => response.json())
.then(response => setUsers(Object.values(response)))}, [])


return (
    <>
<h3> User Management </h3>

{getUsers.map((user) => {
    if (user.id > 1 && user.name !== 'user-deleted')
   return <p>User ID: {user.id} Username: {user.username}</p>
})}

<label>ID of user to delete:</label><input type='text' onChange={(event) => {
          setID(event.target.value)}}></input><br></br>
          <button onClick={async (e) => { console.log('button clicked')
            await fetch('http://localhost:81/deleteUser', {
                method: 'DELETE', body: `id=${getID}`,
                headers: { 'Content-type': 'application/x-www-form-urlencoded', 'accessToken':localStorage.getItem('accessToken') }
            })
            fetch('http://localhost:81/getAllUsers')
            .then(response => response.json())
            .then(response => setUsers(Object.values(response)))
            }}
            >Delete User </button>
</>
)
}