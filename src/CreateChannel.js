import React from 'react';
import { useState } from 'react';

export const CreateChannel = ({get, set}) => {
    const [getName, setName] = useState('');
            return(
                <>
                <h3> Create a New Channel!</h3>
                <div tag='ChannelName'
                className='NameEntry'>
                <input
                    type="text"
                    placeholder="Channel Name"
                    value={getName}
                    onChange={e => setName(e.target.value)} />
                </div>
                <button onClick={async (e) => {
                    console.log(get.length)
                await fetch('http://localhost:81/createChannel', {
                    method: 'POST', body: `name=${getName}`,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded', 'accessToken':localStorage.getItem('accessToken') }
                })
                fetch('http://localhost:81/getChannels')
         .then(response => response.json())
         .then(response => set(Object.values(response))).then(console.log(get))
            
            }
            }> Submit</button>
                </>

            )
            }
    