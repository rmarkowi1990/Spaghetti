import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHidden from '../Components/OrderHidden.jsx'

import { toggleVisibility } from '../Redux/orderSlice.js';
import { useDispatch } from 'react-redux'

export default function OrderVisible(props) {


    const dispatch = useDispatch()

    function handleClick() {
        dispatch(toggleVisibility(props.index))
    }

    const price = props.price



    return (

        <div className='orderVisibleContainer' onClick={handleClick}>
            <div className='orderHeader'>
                <span>12/13/2023</span>
                <span id='orderMealTitle'>{props.title}</span>
                <span>{props.price}</span>

                <span>-</span>
            </div>

            <div className='OrderExtras'>
                <div className='OrdersLeft'>
                    <h3>GrandmaBarb</h3>
                </div>

                <div className='OrdersRight'>

                    <p>{props.address}</p>
                    <p>{props.city}, {props.state}</p>
                    <p>{props.zip}</p>

                </div>



            </div>

        </div>

    )




}