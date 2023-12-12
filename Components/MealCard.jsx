import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MealCard(props) {

    const navigate = useNavigate()



    return (
        <div className='mealContainer' onClick={() => navigate('/login')}>
            <div className='mealImage'>

            </div>

            <div className='mealDetails'>
                <h1 className='mealTitle'>{props.name}</h1>
                <h2 className='mealChef'>{props.chef}<span className='chefRating'> ({props.rating}) </span></h2>
                <h2 className='mealDescription'>{props.days} Days Old</h2>
                <div className='mealBox'><h2 className='mealPrice'>{props.price}</h2></div>
            </div>


        </div >
    )
}