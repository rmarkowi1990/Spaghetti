import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavLoggedIn() {

    const navigate = useNavigate();



    return (
        <div id="navBar">
            <h1 id='logo' onClick={() => navigate('/')}>spaghetti</h1>
            <ul>
                <Link to='/feed' className="navLink">Home</Link>
                <Link to='/chefTable' className="navLink">Chef Table</Link>
                <Link to='/profile' className="navLink">Profile</Link>
                <Link to='/login' className="navLink">Log Out</Link>

            </ul>
        </div>
    )
}