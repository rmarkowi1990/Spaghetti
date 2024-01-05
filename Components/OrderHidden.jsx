import React, { useState } from 'react';
import { toggleVisibility } from '../Redux/orderSlice.js';
import { useDispatch } from 'react-redux'




export default function OrderHidden(props) {




    const dispatch = useDispatch()

    // function handleClick() {
    //     dispatch(toggleVisibility(props.index))
    // }





    return (
        <div className='orderHidden' onClick={() => props.toggle(props.orderId)}>
            <span>{props.date}</span>
            <span id='orderMealTitle'>{props.title}</span>
            <span>{props.price}</span>
            <span>+</span>
        </div>
    )

}