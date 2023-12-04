import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {

    const navigate = useNavigate();

    return (
        <div id="navBar">
            <h1 id='logo' onClick={() => navigate('/')}>spaghetti</h1>
            <ul>
                <Link to='/' className="navLink">Home</Link>
                <Link to='/login' className="navLink">Login</Link>

            </ul>
        </div>
    )
}