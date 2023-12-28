import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function orderAwaits(props) {


    return (
        <div className='orderAwaitsContainer'>
            <h1>Your order is ready!</h1>
            <div className='orderAwaitsDetails'>
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
            </div>
            <button id='receievedButton'>Order Receieved</button>
        </div>

    )


}