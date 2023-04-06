import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const ManagePosts = () => {

const [getID, setID] = useState('')
const [getPosts, setPosts] = useState([])

useEffect((e) => {fetch('http://localhost:81/getAllPosts')
.then(response => response.json())
.then(response => setPosts(Object.values(response)))}, [])


return (
    <>
<h3> Post Management </h3>

{getPosts.map((post) => {
   return <p>Post ID: {post.id} Data: {post.data}</p>
})}

<label>ID of post to delete:</label><input type='text' onChange={(event) => {
          setID(event.target.value)}}></input><br></br>
          <button onClick={async (e) => { console.log('button clicked')
            await fetch('http://localhost:81/deletePost', {
                method: 'DELETE', body: `id=${getID}`,
                headers: { 'Content-type': 'application/x-www-form-urlencoded', 'accessToken':localStorage.getItem('accessToken') }
            })
            fetch('http://localhost:81/getAllPosts')
            .then(response => response.json())
            .then(response => setPosts(Object.values(response)))}}
            >Delete Post </button>
</>
)
}