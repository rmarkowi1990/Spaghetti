import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { endSession } from '../Redux/sessionSlice.js';

export default function NavLoggedIn() {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    function logout() {
        dispatch(endSession())

    }



    return (
        <div id="navBar">
            <h1 id='logo' onClick={() => navigate('/feed')}>spaghetti</h1>
            <ul>
                <Link to='/feed' className="navLink">Home</Link>
                <Link to='/chefTable' className="navLink">Chef Table</Link>
                <Link to='/profile' className="navLink">Profile</Link>
                <Link to='/login' className="navLink" onClick={logout}>Log Out</Link>

            </ul>
        </div>
    )
}