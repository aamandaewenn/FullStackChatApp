import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import {Channel} from './Channel';
import { showChannel } from './showChannel';

export const GetChannel = () => {
const [getChannels, setChannels] = useState([]);

     fetch('http://localhost:81/getChannels')
     .then(response => response.json())
     .then(response => setChannels(Object.values(response)))

     const [getChannel, setChannel] = useState('');
return (
getChannels.map(channel => 
    setChannel(channel),
        
    <showChannel ch={setChannel}> </showChannel>
)
)

}

