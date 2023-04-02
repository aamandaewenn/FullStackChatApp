import React, { useEffect, useState } from 'react';
import {AddReply} from "./AddReply"
import './Post.css';

export const Post = ({id, data, channel_id}) => {
    console.log(id)
    const [getReply, setReply] = useState([])


useEffect( ()=>{{
        return(showReplies(setReply))}})
    
function showReplies(set)
    {
        fetch(`http://localhost:81/getReplies/${channel_id}/${id}`,)
       .then(response => response.json())
       .then(response => set(Object.values(response)))

}

return (
<div className="post">
<p>{data}</p>
<AddReply ch_id={channel_id} post_id={id}></AddReply>

<div className = "reply">
{getReply.map((post) => (
      (<Post id={post.id} data={post.data} channel_id={post.channelid} />)
  ))}
  </div>
</div>
)
}

export default Post;