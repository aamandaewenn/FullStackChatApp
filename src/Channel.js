import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {AddPost} from './AddPost'
import { useEffect } from 'react';
import { useState } from 'react';
import { GetPosts } from './GetPosts';

export const Channel = ({name, id}) => {

    const [getPosts, setPosts] = useState([]);

    useEffect( ()=>{{
        return(showPosts())

}})
  
function showPosts() {
fetch(`http://localhost:81/getPosts/${id}`,)
       .then(response => response.json())
       .then(response => setPosts(Object.values(response)))
}

    //console.log('called channel')

return(
    <>
    <h3>{name}</h3>
    <GetPosts get={getPosts}></GetPosts>
    <AddPost ch_id={id}></AddPost>
    </>
);}