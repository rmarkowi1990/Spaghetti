import React, { useState } from 'react';

export default function Signup() {



    return (
        <div id="signup">
            <h2>Create Account</h2>
            <div id="formField">
                <div className="entryField">
                    <h3>Username</h3>
                    <input></input>
                </div>
                <div className="entryField">
                    <h3>Password</h3>
                    <input></input>
                </div>
                <div className="entryField">
                    <h3>Address</h3>
                    <input></input>
                </div>
            </div>
            <div id="buttonSection">
                <button className="submitButton">Sign up</button>

            </div>
        </div >
    )
}