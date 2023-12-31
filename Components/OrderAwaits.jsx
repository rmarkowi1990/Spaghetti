import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getHistory } from '../Redux/orderSlice.js';
import { useSelector, useDispatch } from 'react-redux'

export default function orderAwaits(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    function handleClick() {

        console.log('order id:', typeof props.orderId)

        // fetch(`http://localhost:3000/markReceived/${JSON.stringify(props.orderId)}`)
        //     .then(res => res.json())
        //     .then(orders => {

        //         props.render(orders)
        //     })




    }


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
            <button id='receievedButton' onClick={() => props.receive(props.orderId)}>Order Receieved</button>
        </div>

    )


}