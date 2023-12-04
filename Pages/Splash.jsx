import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Splash() {

    const navigate = useNavigate()


    return (
        <div id="splash">
            <h2>not just a noodle.</h2>
            <h1>a <i>mindset</i>.</h1>
            <button onClick={() => navigate('/login')}>risk it all.</button>


        </div>
    )
}