import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearPreview } from '../Redux/mealsSlice.js';
import { adjustOrder } from '../Redux/orderSlice.js';
import { useDispatch, useSelector } from 'react-redux'



export default function MealCard(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const meals = useSelector((state) => state.meals.meals);
    const order = meals.filter((meal) => meal.meal_id === props.id)[0];



    function handleClick() {
        dispatch(clearPreview())
        dispatch(adjustOrder(order))
        navigate('/preview')
    }




    return (
        <div className='mealContainer' onClick={handleClick}>

            <img className='mealImage' src={props.image} />


            {props.discount === 'none' ? <div className='mealBox'><h2 className='mealPrice'>{props.price}</h2></div> : <div className='mealBox' id='mealBoxDiscount'><h2 className='mealPrice'><span id="twoPrices"><span id='oldPrice'>{props.price}</span>{props.discount}</span></h2></div>}
            {/* <div className='mealBox'><h2 className='mealPrice'>{props.price}</h2></div> */}

            <div className='detailsSplit'>
                <div className='mealDetails'>
                    {props.discount === 'none' ? <h1 className='mealTitle'>{props.name}</h1> : <h1 className='mealTitle' id='titleExpired'>{props.name}</h1>}
                    <h2 className='mealChef'>{props.chef}<span className='chefRating'> {props.rating === '0.00' ? "" : `(${Number(props.rating).toFixed(1)})`} </span></h2>
                    <h2 className='mealDescription'>{props.days} Days Left</h2>
                </div>
                <div className='detailsRight'>
                    <h2>{props.distance} mi.</h2>
                </div>
            </div>



        </div >
    )
}