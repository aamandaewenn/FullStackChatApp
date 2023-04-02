import React from 'react';
import {AddReply} from "./AddReply"

export const Post = ({id, data, channel_id}) => {
    console.log(id)
return (
<div className="post">
<p>{data}</p><AddReply ch_id={channel_id} post_id={id}></AddReply>
</div>
)
}

export default Post;