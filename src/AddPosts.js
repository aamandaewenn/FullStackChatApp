import React from 'react';
import { useState } from 'react';
import './AddPosts.css';

export const AddPosts = ({ set }) => {
    const [getTopic, setTopic] = useState('');
    const [getData, setData] = useState('');
    return (
        <>
            <h3> AddPosts </h3>
            <div tag='PostTopic'
                className='TopicEntry'>
                <input
                    type="text"
                    placeholder="Topic"
                    value={getTopic}
                    onChange={e => setTopic(e.target.value)} />
            </div>

            <div
                className='PostID'>
                <input
                    id='DataEntry'
                    name='DataEntry'
                    type="text"
                    placeholder="Data"
                    value={getData}
                    onChange={e => setData(e.target.value)} />
            </div>

            <button onClick={(e) => {
                fetch('http://localhost:80/addPost', {
                    method: 'POST', body: `topic=${getTopic}&data=${getData}`,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
                })

                    .then(alert(`Topic ${getTopic}, Data: ${getData} `))
            }
            }> Submit</button>
        </>
    )
}