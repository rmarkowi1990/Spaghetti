import React from 'react';
import { useNavigate } from 'react-router-dom';


// import bcrypt from 'bcrypt';

import { useSelector, useDispatch } from 'react-redux';
import { resetState, displayError, enterUserName, enterPassword, enterFirstName, enterLastName, enterAddress, enterCity, enterState, enterZip } from '../Redux/signupSlice.js';

export default function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //retrieve fields from state via redux
    const { errorMessage, userName, password, firstName, lastName, address, city, state, zip } = useSelector((state) => state.signup);


    //submit fields and make post request to database
    function submit() {

        //hash password before storing
        // const hashedPassword = await bcrypt.hash(password, 12);
        // console.log('hashed password: ,', hashedPassword);



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
            .then(response => {
                if (response.status === 200) {
                    dispatch(resetState());
                    return navigate('/login');
                } else {
                    dispatch(displayError('Invalid Username'));
                }
            })
        // .then(data =>
        //     dispatch(displayError(data.msg)))
        // .then(data => {
        //     console.log(data);
        //     return navigate('/login');
        // })


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

                </div >
            </div >
            <div className="bottom">
                <div className="errorDisplay">
                    {errorMessage}
                </div>
                <div className="buttonSection">

                    <button className="submitButton" onClick={submit} >Sign up</button>
                </div>
            </div>
        </div>
    )
}