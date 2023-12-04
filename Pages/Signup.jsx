import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterUserName, enterPassword, enterAddress } from '../Redux/signupSlice.js';

export default function Signup() {

    const dispatch = useDispatch();

    const userName = useSelector((state) => state.signup.userName);
    const password = useSelector((state) => state.signup.password);
    const address = useSelector((state) => state.signup.address);



    return (
        <div id="signup">
            <h2 className="header">Create Account</h2>
            <div id="formField">
                <div className="entryField">
                    <h3>Username</h3>
                    <input onInput={(event) => dispatch(enterUserName(event))} value={userName}></input>
                </div>
                <div className="entryField">
                    <h3>Password</h3>
                    <input onInput={(event) => dispatch(enterPassword(event))} value={password} type='password'></input>
                </div>
                <div className="entryField">
                    <h3>Address</h3>
                    <input onInput={(event) => dispatch(enterAddress(event))} value={address}></input>
                </div>
            </div>
            <div id="buttonSection">
                <button className="submitButton">Sign up</button>

            </div>
        </div >
    )
}