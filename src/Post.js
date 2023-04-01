import {AddReply} from "./AddReply"

export const Post = ({post_id, data, channel_id}) => {
return (
<div className="post">
<p>{data}</p><AddReply ch_id={channel_id} post_id={post_id}></AddReply>
</div>
)
}

export default Post;