import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate();

    return (
        <div id="login">
            <h2>Log in</h2>
            <div id="formField">
                <div className="entryField">
                    <h3>Username</h3>
                    <input></input>
                </div>
                <div className="entryField">
                    <h3>Password</h3>
                    <input></input>
                </div>
            </div>
            <div id="buttonSection">
                <button className="submitButton">Log in</button>
                <button id="altButton" className="submitButton" onClick={() => navigate('/signup')}>Sign Up</button>

            </div>
        </div >
    )
}