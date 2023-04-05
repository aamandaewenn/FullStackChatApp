import React from 'react';
import { useState } from 'react';
//import './AddPosts.css';

export const AddPost = ({ ch_id }) => {
    const [getData, setData] = useState('');
    return (
        <>
            <h3> AddPosts </h3>

            <div
                className='Data'>
                <input
                    id='DataEntry'
                    name='DataEntry'
                    type="text"
                    placeholder="Data"
                    value={getData}
                    onChange={e => setData(e.target.value)} />
            </div>

            <button onClick={(e) => {
                fetch('http://localhost:81/addPost', {
                    method: 'POST', body: `data=${getData}&channelID=${ch_id}`,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded', 'accessToken':sessionStorage.getItem('accessToken') }
                })

                    
            }
            }> Submit</button>
        </>
    )
}