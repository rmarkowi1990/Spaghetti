import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MiniMealCard(props) {

    const navigate = useNavigate()



    return (
        <div className='mealContainer' onClick={() => navigate('/meal')}>

            <img className='mealImage' src={props.image} />
            <div className='miniMealBox'><h2 className='miniMealTitle'>{props.name}</h2></div>

            {/* <div className='detailsSplit'>
                <div className='mealDetails'>
                    <h1 className='mealTitle'>{props.name}</h1>
                    <h2 className='mealChef'>{props.chef}<span className='chefRating'> ({props.rating}) </span></h2>
                    <h2 className='mealDescription'>{props.days} Days Old</h2>
                </div>
                <div className='detailsRight'>
                    <h2>3 mi.</h2>
                </div>
            </div> */}



        </div >
    )
}