import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { enterUserName, enterPassword } from '../Redux/loginSlice.js';

export default function Login() {

    const dispatch = useDispatch();

    const userName = useSelector((state) => state.login.userName);
    const password = useSelector((state) => state.login.password);

    const navigate = useNavigate();

    function login() {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
            })
        }

        fetch('http://localhost:3000/login', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    console.log("SUCCESS")
                    // dispatch(resetState());
                    return navigate('/');
                } else {
                    return navigate('/signup')
                }
            })

    }

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
                <button className="submitButton" onClick={login}>Log in</button>
                <button id="altButton" className="submitButton" onClick={() => navigate('/signup')}>Sign Up</button>

            </div>
        </div >
    )
}