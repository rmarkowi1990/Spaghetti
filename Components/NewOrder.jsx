import React, { useState } from 'react';

export default function NewOrder(props) {

    return (

        <div id="newOrderContainer">
            <span id="newOrderTime">{props.time}</span>
            <h1>New Order!</h1>
            {/* <span>{props.date}</span> */}

            <div id="newOrderDetails">

                <h3> <i>{props.title}</i></h3>
                <span>Quantity: {props.quantity} </span>
                <span>Total Price: {props.price}</span>
                {/* <span>{props.time}</span> */}



                <h4> {props.username}</h4>


            </div >
            <button id='receievedButton'>Mark Ready For Pickup</button>
        </div >
    )



}