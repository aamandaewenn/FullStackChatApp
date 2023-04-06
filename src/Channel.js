import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {AddPost} from './AddPost'
import { useEffect } from 'react';
import { useState } from 'react';
import { GetPosts } from './GetPosts';
import {Post} from './Post';

export const Channel = ({name, id}) => {

    const [getPosts, setPosts] = useState([]);
 
useEffect( (e)=>{
    showPosts()

}, [getPosts.length])
  
function showPosts() {
fetch(`http://localhost:81/getPosts/${id}`,)
       .then(response => response.json())
       .then(response => setPosts(Object.values(response)))
}

    //console.log('called channel')

return(
    <>
    <h3>{name}</h3>
    {getPosts.map((post) => (
    post.replyid == null
      ? (<Post id={post.id} data={post.data} channel_id={post.channelid} rating={post.rating} username={post.username} key={post.id}/>)
      : null
  ))}
    <AddPost ch_id={id} set={setPosts} get={getPosts}></AddPost>
    </>
);}