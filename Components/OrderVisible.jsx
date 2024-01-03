import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHidden from '../Components/OrderHidden.jsx'

import { toggleVisibility, updateReviews } from '../Redux/orderSlice.js';
import { useDispatch, useSelector } from 'react-redux'

export default function OrderVisible(props) {


    const dispatch = useDispatch()







    // const review = useSelector((state) => state.history[props.index].review) ? useSelector((state) => state.history[props.index].review) : ''

    function handleClick() {
        dispatch(toggleVisibility(props.index))
    }

    const price = props.price




    function setReview(event) {
        const reviewAction = {
            rating: event.target.value,
            orderId: props.orderId
        }
        dispatch(updateReviews(reviewAction))
    }

    function submitReview() {
        console.log('review: ', props.review)


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: props.review,
                order_id: props.orderId,
                chef_id: props.chefId
            })
        }

        fetch('http://localhost:3000/updateReview', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    console.log('success updating review')
                } else {
                    // dispatch(displayError('Invalid Username'));
                }
            })

    }



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
                    <select id='ratingDropdown' onChange={setReview}>
                        <option>5. Unbelievable</option>
                        <option>4. Understated</option>
                        <option>3. Underwhelming</option>
                        <option>2. Uneatable</option>
                        <option>1. Poison</option>

                    </select>
                    <button onClick={submitReview}>Submit</button>
                </div>





            </div>


        </div>

    )




}