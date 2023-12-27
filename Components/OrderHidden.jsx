import React, { useState } from 'react';
import { toggleVisibility } from '../Redux/orderSlice.js';
import { useDispatch } from 'react-redux'




export default function OrderHidden(props) {

   


    const dispatch = useDispatch()

    function handleClick() {
        dispatch(toggleVisibility(props.index))
    }


  


    return (
        <div className='orderHidden' onClick={handleClick}>
            <span>12/13/2023</span>
            <span id='orderMealTitle'>{props.title}</span>
            <span>{props.price}</span>
            <span>+</span>
        </div>
    )

}