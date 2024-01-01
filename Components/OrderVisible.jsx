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

        <div className='orderVisibleContainer' >
            <div className='orderHeader' onClick={handleClick}>
                <span>{props.date}</span>
                <span id='orderMealTitle'>{props.title}</span>
                <span>{props.price}</span>

                <span>-</span>
            </div>

            <div className='OrderExtras'>
                <div className='OrdersLeft'>
                    <h3>{props.chefName}</h3>
                    {/* <button>Rate Chef</button> */}
                </div>

                <div className='OrdersRight'>


                    <p>{props.address}</p>
                    <p>{props.city}, {props.state}</p>
                    <p>{props.zip}</p>

                </div>
                <div className='reviewSection'>
                    <h3 id='chefReviewText'>Chef Review</h3>
                    <select id='ratingDropdown'>
                        <option>5. Unbelievable</option>
                        <option>4. Understated</option>
                        <option>3. Underwhelming</option>
                        <option>2. Uneatable</option>
                        <option>1. Poison</option>
                        {/* <option>1. Poison</option>
                        <option>2. </option>
                        <option>3. </option>
                        <option>4. </option>

                        <option>5. Bobby Flay</option> */}
                    </select>
                    <button>Submit</button>
                </div>



            </div>


        </div>

    )




}