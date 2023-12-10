import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterUserName, enterPassword, enterFirstName, enterLastName, enterAddress, enterCity, enterState, enterZip } from '../Redux/signupSlice.js';

export default function Signup() {

    const dispatch = useDispatch();

    const userName = useSelector((state) => state.signup.userName);
    const password = useSelector((state) => state.signup.password);
    const firstName = useSelector((state) => state.signup.firstName);
    const lastName = useSelector((state) => state.signup.lastName);
    const address = useSelector((state) => state.signup.address);
    const city = useSelector((state) => state.signup.city);
    const state = useSelector((state) => state.signup.state);
    const zip = useSelector((state) => state.signup.zip);

    function handleClick() {

        console.log('clicked')

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                state: state,
                zip: zip
            })
        }

        fetch('http://localhost:3000/signup', requestOptions)
            .then(response => response.json())
            .then(data => console.log("Fetch Complete"))

    }

    return (
        <div className="fullScreen">
            <h2 className="header">Create Account</h2>
            <div className="twoSides">
                <div className="leftSide">
                    <div className="formField">
                        <div className="entryField">
                            <h3>Username</h3>
                            <input onInput={(event) => dispatch(enterUserName(event))} value={userName}></input>
                        </div>
                        <div className="entryField">
                            <h3>Password</h3>
                            <input onInput={(event) => dispatch(enterPassword(event))} value={password} type='password'></input>
                        </div>
                        <div className="entryField">
                            <h3>First Name</h3>
                            <input onInput={(event) => dispatch(enterFirstName(event))} value={firstName}></input>
                        </div>
                        <div className="entryField">
                            <h3>Last Name</h3>
                            <input onInput={(event) => dispatch(enterLastName(event))} value={lastName}></input>
                        </div>
                    </div>


                </div>
                <div id="signup">

                    <div className="formField">
                        {/* <div className="entryField">
                        <h3>Username</h3>
                        <input onInput={(event) => dispatch(enterUserName(event))} value={userName}></input>
                    </div>
                    <div className="entryField">
                        <h3>Password</h3>
                        <input onInput={(event) => dispatch(enterPassword(event))} value={password} type='password'></input>
                    </div> */}
                        {/* <br></br> */}
                        {/* <div className="entryField">
                        <h3>First Name</h3>
                        <input onInput={(event) => dispatch(enterFirstName(event))} value={firstName}></input>
                    </div>
                    <div className="entryField">
                        <h3>Last Name</h3>
                        <input onInput={(event) => dispatch(enterLastName(event))} value={lastName}></input>
                    </div> */}
                        {/* <br></br> */}
                        <div className="entryField">
                            <h3>Address</h3>
                            <input onInput={(event) => dispatch(enterAddress(event))} value={address}></input>
                        </div>
                        <div className="entryField">
                            <h3>City</h3>
                            <input onInput={(event) => dispatch(enterCity(event))} value={city}></input>
                        </div>
                        <div className="entryField">
                            <h3>State</h3>
                            <input onInput={(event) => dispatch(enterState(event))} value={state}></input>
                        </div>
                        <div className="entryField">
                            <h3>Zip Code</h3>
                            <input onInput={(event) => dispatch(enterZip(event))} value={zip}></input>
                        </div>
                    </div>
                    {/* <div id="buttonSection">
                    <button className="submitButton">Sign up</button>

                </div> */}
                </div >
            </div >
            <div id="buttonSection">
                <button className="submitButton" onClick={handleClick} >Sign up</button>

            </div>
        </div>
    )
}