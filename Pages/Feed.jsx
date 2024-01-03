import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { storeMeals } from '../Redux/mealsSlice.js';

import MealCard from '../Components/MealCard.jsx'
import { getHistory } from '../Redux/orderSlice.js';


export default function Feed() {


    const dispatch = useDispatch();
    const mealData = useSelector(store => store.meals.meals)
    const userId = useSelector(store => store.session.userDetails.id)
    const { retrieved } = useSelector(store => store.meals)
    const history = useSelector(store => store.order.history)


    //render meals to feed
    useEffect(() => {

        fetch('http://localhost:3000/meals')
            .then(res => res.json())
            .then(meals => {
                dispatch(storeMeals(meals))
            })

    }, [])


    //get order history for scoreboard
    useEffect(() => {
        fetch(`http://localhost:3000/orderHistory/${userId}`)
            .then(res => res.json())
            .then(orders => {
                console.log('order history: ', orders)

                dispatch(getHistory(orders))



            })


    }, [])



    let rendered;


    //only show meals with portions available
    if (retrieved) {
        const filtered = mealData.filter((meal) => meal.portions > 0)
        rendered = filtered.map(meal => <MealCard id={meal.meal_id} name={meal.mealtitle} chef={meal.chef} rating={meal.rating ? meal.rating : 'No Rating'} days="1.5" price={meal.price} image={meal.url} />)
    }

    const pounds = history ? history.filter(order => order.received === true).length : 0


    return (
        <div className='background'>
            <div id="mainFeed"><div id='scoreboard'>
                <h1 className='pounds'>pounds of spaghetti:</h1>

                <h1 className='pounds' id='spaghetti'>{pounds}</h1>

            </div>
                <div className='feedGrid'>
                    {rendered}
                </div>

            </div>
        </div>
    )

}