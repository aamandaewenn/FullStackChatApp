import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import {Channel} from './Channel'

export const showChannel = (ch) => {
    console.log('')
    return(
        <>
        <Router>
        <Link to={`/channels/${ch.name}`} >  <button>  {ch.name} </button> </Link>

        <Routes>
            <Route path={`/channels/${ch.name}` } element={<Channel id={ch.id} name={ch.name}/>}/>

        </Routes>
        </Router>
        </>
    )
}