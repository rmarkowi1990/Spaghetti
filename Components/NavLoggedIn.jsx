import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { endSession, hideAlert } from '../Redux/sessionSlice.js';


export default function NavLoggedIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate();


    function logout() {
        dispatch(endSession())


    }



    return (
        <div id="navBar">
            <div id='headerWithLogline'><h1 id='logo' onClick={() => navigate('/')}>spaghetti</h1><h4>eat leftovers. increase your spaghetti score.</h4></div>
            <ul>
                <Link to='/feed' className="navLink">Home</Link>
                <Link to='/cheftable' className="navLink">Chef Table</Link>
                <Link to='/orders' className="navLink">Your Orders</Link>
                <Link to='/login' className="navLink" onClick={logout}>Log Out</Link>

            </ul>
        </div>
    )
}