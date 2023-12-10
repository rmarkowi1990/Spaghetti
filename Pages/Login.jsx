import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { enterUserName, enterPassword } from '../Redux/loginSlice.js';

export default function Login() {

    const dispatch = useDispatch();

    const userName = useSelector((state) => state.login.userName);
    const password = useSelector((state) => state.login.password);

    const navigate = useNavigate();

    return (
        <div id="login">
            <h2 className="header">Log in</h2>
            <div className="formLogin">
                <div className="entryField">
                    <h3>Username</h3>
                    <input onInput={(event) => dispatch(enterUserName(event))} value={userName}></input>
                </div>
                <div className="entryField">
                    <h3>Password</h3>
                    <input onInput={(event) => dispatch(enterPassword(event))} value={password} type='password'></input>
                </div>
            </div>
            <div id="buttonSection">
                <button className="submitButton">Log in</button>
                <button id="altButton" className="submitButton" onClick={() => navigate('/signup')}>Sign Up</button>

            </div>
        </div >
    )
}