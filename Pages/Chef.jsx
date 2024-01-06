import React, { useEffect } from 'react';

import axios from 'axios'

import { enterPortions, refreshMeals, reset, addImage, enterMealTitle, enterDescription, enterExpiration, enterPrice, toggleCrustaceans, toggleDairy, toggleEggs, toggleFish, toggleMeat, togglePeanuts, toggleSesame, toggleSoybeans, toggleTreeNuts, toggleWheat } from '../Redux/chefSlice';
import { getOrdersByChef } from '../Redux/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import NewOrder from '../Components/NewOrder.jsx'

import MiniMealCard from '../Components/MiniMealCard.jsx'


export default function Chef() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { id } = useSelector((state) => state.session.userDetails)
    const ordersByChef = useSelector((state) => state.order.ordersByChef)


    //checks for meals made by chef to display
    useEffect(() => {
        fetch(`http://localhost:3000/meals/chef/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log('returned from chef: ', data)
                dispatch(refreshMeals(data));

            })


    }, [])

    //get all history of ordered creations
    useEffect(() => {
        fetch(`http://localhost:3000/ordersByChef/${id}`)
            .then(res => res.json())
            .then(orders => {
                dispatch(getOrdersByChef(orders))
            })


    }, [])


    function markFulfilled(orderId) {
        console.log('order to fulfil: ', orderId)

        fetch(`http://localhost:3000/markFulfilled/${orderId}`)
            .then(

                fetch(`http://localhost:3000/ordersByChef/${id}`)
                    .then(res => res.json())
                    .then(orders => {
                        dispatch(getOrdersByChef(orders))
                    })
            )
    }

    const newOrders = ordersByChef ? ordersByChef.filter(order => order.fulfilled === false).map(orders => {
        return <NewOrder markFulfilled={markFulfilled} date={orders.date} time={orders.time} title={orders.mealtitle} quantity={orders.quantity} price={orders.price} orderid={orders.order_id} username={orders.eater_username} />
    }) : []

    console.log("orders by cheffff", newOrders)



    const username = useSelector((state) => state.session.userDetails.username);



    const { portions, meals, image, mealTitle, price, expiration, description } = useSelector(state => state.chef);
    const { dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat } = useSelector(state => state.chef.ingredients)



    let mealsRendered;
    if (meals) mealsRendered = meals.map(meal => <MiniMealCard name={meal.mealtitle} chef={meal.chef} rating={meal.rating ? meal.rating : 'No Rating'} days="1.5" price={meal.price} image={meal.url} />)




    const submit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('mealTitle', mealTitle);
        formData.append('chefId', id);
        formData.append('portions', portions)
        formData.append('price', price);
        formData.append('expiration', new Date(expiration));
        formData.append('description', description);
        formData.append('dairy', dairy);
        formData.append('eggs', eggs);
        formData.append('fish', fish);
        formData.append('crustaceans', crustaceans);
        formData.append('treeNuts', treeNuts);
        formData.append('peanuts', peanuts);
        formData.append('wheat', wheat);
        formData.append('soybeans', soybeans);
        formData.append('sesame', sesame);
        formData.append('meat', meat);


        axios.post('http://localhost:3000/meals', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function (res) {
                const imageTitle = res.data;
                console.log('image title', imageTitle)
                dispatch(reset())
                navigate('/feed')
            })
    }

    return (
        <div id='chefTableContainer'>
            <div id='container2'></div>
            <h1>{username}'s Chef Table</h1>
            <div id='splitScreenChef'>

                <div id='outerMeal'>

                    <div id='mealSubmission'>
                        <h1 id='newChefCreation'>New Chef Creation</h1>

                        <div className='formSection'>
                            <form onSubmit={submit}>

                                <div className="chefField">
                                    <h3 className='subtitle'>Meal Title</h3>
                                    <input onInput={(event) => dispatch(enterMealTitle(event))} value={mealTitle}></input>
                                </div>
                                <h3 className='subtitle'>Image</h3>

                                <input id='imageSubmit' type='file' accept='image/*' onChange={(event) => dispatch(addImage(event.target.files[0]))} />

                                <div className="chefField">
                                    <h3 className='subtitle'>Expiration Date</h3>
                                    <input type="date" onChange={(date) => dispatch(enterExpiration(date))} value={expiration}></input>
                                </div>

                                <div className="chefField">
                                    <h3 className='subtitle'>Portions</h3>
                                    <input onInput={(event) => dispatch(enterPortions(event))} value={portions} ></input>
                                </div>

                                <div className="chefField">
                                    <h3 className='subtitle'>Price Ceiling</h3>
                                    <input onInput={(event) => dispatch(enterPrice(event))} value={price} ></input>
                                </div>

                                <div className="ingredients" >

                                    <h3 className='subtitle'>Ingredients</h3>

                                    <div className="ingredientsWrapper" >
                                        <div className="ingredientsList">

                                            <span> <input type="checkbox" id="dairy" name="dairy" onClick={() => dispatch(toggleDairy())} checked={dairy} />
                                                <label for="dairy">Dairy</label></span>

                                            <span><input type="checkbox" id="eggs" name="eggs" onClick={() => dispatch(toggleEggs())} checked={eggs} />
                                                <label for="eggs">Eggs</label></span>

                                            <span><input type="checkbox" id="fish" name="fish" onClick={() => dispatch(toggleFish())} checked={fish} />
                                                <label for="fish">Fish</label></span>

                                            <span><input type="checkbox" id="crustaceans" name="crustaceans" onClick={() => dispatch(toggleCrustaceans())} checked={crustaceans} />
                                                <label for="crustaceans">Crustaceans</label></span>

                                            <span><input type="checkbox" id="treeNuts" name="treeNuts" onClick={() => dispatch(toggleTreeNuts())} checked={treeNuts} />
                                                <label for="treeNuts">Tree Nuts</label></span>
                                        </div>
                                        <div className="ingredientsList">

                                            <span><input type="checkbox" id="peanuts" name="peanuts" onClick={() => dispatch(togglePeanuts())} checked={peanuts} />
                                                <label for="peanuts">Peanuts</label></span>

                                            <span><input type="checkbox" id="wheat" name="wheat" onClick={() => dispatch(toggleWheat())} checked={wheat} />
                                                <label for="wheat">Wheat</label></span>

                                            <span><input type="checkbox" id="soybeans" name="soybean" onClick={() => dispatch(toggleSoybeans())} checked={soybeans} />
                                                <label for="soybeans">Soybeans</label></span>

                                            <span><input type="checkbox" id="sesame" name="sesame" onClick={() => dispatch(toggleSesame())} checked={sesame} />
                                                <label for="sesame">Sesame</label></span>

                                            <span><input type="checkbox" id="meat" name="meat" onClick={() => dispatch(toggleMeat())} checked={meat} />
                                                <label for="meat">Meat</label></span>
                                        </div>
                                    </div>
                                </div>
                                <div id='spacer'>
                                    <h3 className='subtitle'>Description</h3>
                                    <textarea id="description" onInput={(event) => dispatch(enterDescription(event))} value={description}></textarea>
                                </div>
                                <button id='formSubmit' type='submit'>Serve</button>

                            </form>
                        </div>
                    </div>
                </div>
                <div id='imageSection'>
                    {ordersByChef && newOrders.length > 0 ? newOrders : <div id='imageSection'> <img className='greyscale' src="https://img.freepik.com/premium-photo/refrigerator-with-holiday-leftovers-turkey-ham-stuffing-generative-ai_864588-12391.jpg"></img><img className="greyscale" src="https://whatsfordinner.com/wp-content/uploads/2017/04/Keep_Them_Busy_10_Things_Kids_Can_Do_in_The_Kitchen_-_Feature.jpg"></img>
                    </div>}
                </div>
            </div>
            <h2 id='menuSubtitle'>Your Creations</h2>
            <div className='chefFeed'>
                {mealsRendered}
            </div>
        </div >
    )

}