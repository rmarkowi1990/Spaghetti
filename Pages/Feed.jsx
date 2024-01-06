import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { storeMeals } from '../Redux/mealsSlice.js';

import MealCard from '../Components/MealCard.jsx'
import { getHistory, getOrdersByChef } from '../Redux/orderSlice.js';
import { newAlert } from '../Redux/sessionSlice';
import zipcodes from 'zipcodes';
import * as turf from '@turf/turf'



export default function Feed() {





    const dispatch = useDispatch();
    const mealData = useSelector(store => store.meals.meals)
    const userId = useSelector(store => store.session.userDetails.id)
    const { retrieved } = useSelector(store => store.meals)
    const history = useSelector(store => store.order.history)
    const userZip = useSelector(store => store.session.userDetails.zip);

    const userCoordinates = userZip ? zipcodes.lookup(userZip) : {}

    console.log('user coordinates: ', userCoordinates)



    //render meals to feed
    useEffect(() => {

        fetch('http://localhost:3000/meals')
            .then(res => res.json())
            .then(meals => {


                const mealsWithDistance = meals.map(meal => {

                    const mealCoordinates = zipcodes.lookup(meal.zip);

                    let from = turf.point([userCoordinates.latitude, userCoordinates.longitude])
                    let to = turf.point([mealCoordinates.latitude, mealCoordinates.longitude])
                    let options = { units: 'miles' };
                    let distance = turf.distance(from, to, options);

                    return { ...meal, distance: distance };





                })
                dispatch(storeMeals(mealsWithDistance))
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

    //check for orders for alert
    // useEffect(() => {
    //     fetch(`http://localhost:3000/ordersByChef/${userId}`)
    //         .then(res => res.json())
    //         .then(orders => {
    //             dispatch(getOrdersByChef(orders))
    //         })


    // },)

    // const ordersByChef = useSelector(state => state.order.ordersByChef)
    // const unfulfilled = ordersByChef ? ordersByChef.filter(order => order.fulfilled === false) : []
    // if (unfulfilled.length > 0) {
    //     console.log('unfulfilled: ', unfulfilled)
    //     dispatch(newAlert('You have a new order!'))
    // }



    let rendered;


    //only show meals with portions available
    if (retrieved) {
        const filtered = mealData.filter((meal) => meal.portions > 0 && meal.chef_id !== userId)
        rendered = filtered.map(meal => <MealCard discount={meal.discount} distance={Math.round(meal.distance)} id={meal.meal_id} name={meal.mealtitle} chef={meal.chef} rating={meal.rating ? meal.rating : 'No Rating'} days={meal.expiration} price={meal.price} image={meal.url} />)
    }

    const pounds = history ? history.filter(order => order.received === true).length : 0


    return (
        <div className='background'>
            <div id="mainFeed"><div id='scoreboard'>
                <h1 className='pounds'>pounds of spaghetti:</h1>

                <h1 className='pounds' id='spaghetti'>{pounds}</h1>

            </div>
                {/* <h2 id='instructions'>Eat Leftovers. Increase Your Spaghetti Score.</h2> */}

                <div className='feedGrid'>
                    {rendered}
                </div>

            </div>
        </div>
    )

}