import React from 'react';
import './ShowPosts.css';
import {useState} from 'react';

export const ShowPosts = ({get}) => {

    //console.log(Array.isArray(get))


return (

    <>
    <div> All Posts</div>
    {get.map(post => (

        <div className="container">

            <h3> {post.topic} </h3>
            <h3> {post.data} </h3>
        </div>

    ))}
    </>
);

}