import React from 'react';
import {Post} from './Post'
import {useState} from 'react';


export const GetPosts = ({get}) => {

    //console.log(Array.isArray(get))


return (

    <>
    <div> All Posts</div>
    {get.map((post) => (
    post.replyid == null
      ? (<Post id={post.id} data={post.data} channel_id={post.channelid} />)
      : null
  ))}
        
    
    </>
);

}