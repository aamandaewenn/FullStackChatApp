import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const Channel = ({name, id}) => {

    console.log('called channel')

return(
    <>
    <h3>{name}</h3>
    </>
);}