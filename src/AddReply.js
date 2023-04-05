import React from 'react';
import { useState } from 'react';
//import './AddPosts.css';

export const AddReply = ({ ch_id, post_id }) => {
    const [getData, setData] = useState('');
    return (
        <>

            <div
                className='Data'>
                <input
                    id='DataEntry'
                    name='DataEntry'
                    type="text"
                    placeholder="Add Reply"
                    value={getData}
                    onChange={e => setData(e.target.value)} />
            </div>

            <button onClick={(e) => {
                fetch('http://localhost:81/addReply', {
                    method: 'POST', body: `data=${getData}&channelID=${ch_id}&postID=${post_id}`,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
                })

                    
            }
            }> Submit</button>
        </>
    )
}