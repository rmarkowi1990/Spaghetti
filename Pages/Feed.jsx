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

    // function pounds() {

    //     const pounds = history.filter(order => order.received === true)


    //     return received



    // }
    const pounds = history ? history.filter(order => order.received === true).length : 0


    return (
        <div className='background'>
            <div id="mainFeed"><div id='scoreboard'>
                <h1 className='pounds'>pounds of spaghetti:</h1>

                <h1 className='pounds' id='spaghetti'>{pounds}</h1>

            </div>
                <div className='feedGrid'>
                    {/* <MealCard name="my famous lasagna" chef="HaleyLo32" rating="4.9" days="1.5" price="$5.43" image="https://www.closetcooking.com/wp-content/uploads/2009/02/Lasagna-Messy-500.jpg" />
                    <MealCard name="fun nuggets" chef="BenCooks83" rating="3.5" days="2" price="$3.31" image="https://www.melaniecooks.com/wp-content/uploads/2013/01/chicken-nuggets-not-soggy.jpg" />
                    <MealCard name="tuna calzone sandwich" chef="DeborahLovesTuna" rating="4.3" days="1" price="$4.31" image="https://i.redd.it/ip590b04e0151.jpg" />
                    <MealCard name="panda express leftovers" chef="DinnerDale" rating="2.8" days="1" price="$2.59" image="https://paladinipotpie.files.wordpress.com/2012/07/leftover-chinese-food.jpg" />
                    <MealCard name="slime dogs" chef="MrSlime" rating="1.3" days="4" price="$1.31" image="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_04/1312948/pb-hotdog-20180124-inline.jpg" /> */}
                    {rendered}
                </div>

            </div>
        </div>
    )

}