import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearPreview } from '../Redux/mealsSlice.js';
import { useDispatch } from 'react-redux'



export default function MealCard(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(clearPreview())
        navigate('/preview', { state: props.id })
    }




    return (
        <div className='mealContainer' onClick={handleClick}>

            <img className='mealImage' src={props.image} />
            <div className='mealBox'><h2 className='mealPrice'>{props.price}</h2></div>

            <div className='detailsSplit'>
                <div className='mealDetails'>
                    <h1 className='mealTitle'>{props.name}</h1>
                    <h2 className='mealChef'>{props.chef}<span className='chefRating'> ({props.rating}) </span></h2>
                    <h2 className='mealDescription'>{props.days} Days Old</h2>
                </div>
                <div className='detailsRight'>
                    <h2>3 mi.</h2>
                </div>
            </div>



        </div >
    )
}