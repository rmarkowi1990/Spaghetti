import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getHistory } from '../Redux/orderSlice.js';
import { useSelector, useDispatch } from 'react-redux'

export default function Review(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()







    return (
        <div className='chefRatingContainer'>
            <h1>Rate your chef!</h1> 
            <div id='ratingSection'>
                <h2>Poison</h2>
                <input type='range' id='chefRatingInput' min='0' max='5' step='.5'></input>          <h2>Bobby Flay</h2></div>
            {/* <div className='orderAwaitsDetails'>
                    <div className='OrderAwaitsLeft'>
                        <h3>Order:</h3>
                        <span> <i>{props.title}</i></span>
                        <span>Quantity: {props.quantity}</span>
                        <span>Total Price: {props.price}</span>
                    </div>
                    <div className="OrderAwaitsRight">
                        <h3>Pickup Location:</h3>
                        <span> {props.chefName}</span>
                        <span> {props.address}</span>

                        <span> {props.city}, {props.state} {props.zip}</span>

                    </div>
                </div> */}
            <button id='receievedButton'>Submit</button>
        </div >

    )


}