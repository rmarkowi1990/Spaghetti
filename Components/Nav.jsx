import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {

    const navigate = useNavigate();

    return (
        <div id="navBar">
            <div id='headerWithLogline'><h1 id='logo' onClick={() => navigate('/')}>spaghetti</h1><h4>eat leftovers. increase your spaghetti score.</h4></div>
            <ul>
                <Link to='/' className="navLink">Home</Link>
                <Link to='/login' className="navLink">Login</Link>

            </ul>
        </div>
    )
}