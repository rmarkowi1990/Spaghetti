import React from 'react';

import { enterMealTitle, enterDescription, enterExpiration, enterPrice, toggleCrustaceans, toggleDairy, toggleEggs, toggleFish, toggleMeat, togglePeanuts, toggleSesame, toggleSoybeans, toggleTreeNuts, toggleWheat } from '../Redux/chefSlice';
import { useSelector, useDispatch } from 'react-redux'

export default function ChefTable() {



    const username = useSelector((state) => state.session.userDetails.username);

    const dispatch = useDispatch();

    const { mealTitle, price, expiration, description } = useSelector(state => state.chef);
    const { dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat } = useSelector(state => state.chef.ingredients)

    return (
        <div id='chefTableContainer'>
            <h1>{username}'s Chef Table</h1>
            <div id='mealSubmission'>

                <img></img>
                <div className='formSection'>
                    <h2>new leftovers:</h2>

                    <div className="chefField">
                        <h3>Meal Title</h3>
                        <input onInput={(event) => dispatch(enterMealTitle(event))} value={mealTitle}></input>
                    </div>

                    {/* <div className="entryField">
                        <h3>Date Cooked</h3>
                        <input type="date" ></input>
                    </div> */}

                    <div className="chefField">
                        <h3>Expiration Date</h3>
                        <input type="date" onChange={(date) => dispatch(enterExpiration(date))} value={expiration}></input>
                    </div>



                    <div className="chefField">
                        <h3>Price Ceiling</h3>
                        <input onInput={(event) => dispatch(enterPrice(event))} value={price} ></input>
                    </div>

                    <div className="ingredients">
                        <h3>Ingredients</h3>
                        <div className="ingredientsWrapper">
                            <div className="ingredientsList">

                                <span> <input type="checkbox" id="dairy" name="dairy" onChange={dispatch(toggleDairy)} value={dairy} />
                                    <label for="dairy">Dairy</label></span>

                                <span><input type="checkbox" id="eggs" name="eggs" onChange={dispatch(toggleEggs)} value={eggs} />
                                    <label for="eggs">Eggs</label></span>

                                <span><input type="checkbox" id="fish" name="fish" onChange={dispatch(toggleFish)} value={fish} />
                                    <label for="fish">Fish</label></span>

                                <span><input type="checkbox" id="crustaceans" name="crustaceans" onChange={dispatch(toggleCrustaceans)} value={crustaceans} />
                                    <label for="crustaceans">Crustaceans</label></span>

                                <span><input type="checkbox" id="treeNuts" name="treeNuts" onChange={dispatch(toggleTreeNuts)} value={treeNuts} />
                                    <label for="treeNuts">Tree Nuts</label></span>
                            </div>
                            <div className="ingredientsList">

                                <span><input type="checkbox" id="peanuts" name="peanuts" onChange={dispatch(togglePeanuts)} value={peanuts} />
                                    <label for="peanuts">Peanuts</label></span>

                                <span><input type="checkbox" id="wheat" name="wheat" onChange={dispatch(toggleWheat)} value={wheat} />
                                    <label for="wheat">Wheat</label></span>

                                <span><input type="checkbox" id="soybeans" name="soybean" onChange={dispatch(toggleSoybeans)} value={soybeans} />
                                    <label for="soybeans">Soybeans</label></span>

                                <span><input type="checkbox" id="sesame" name="sesame" onChange={dispatch(toggleSesame)} value={sesame} />
                                    <label for="sesame">Sesame</label></span>

                                <span><input type="checkbox" id="meat" name="meat" onChange={dispatch(toggleMeat)} value={meat} />
                                    <label for="meat">Meat</label></span>
                            </div>
                        </div>




                    </div>
                    <h3>Description</h3>
                    <textarea id="description" onInput={(event) => dispatch(enterDescription(event))} value={description}></textarea>

                    {/* <div className="chefField">

                        <textarea></textarea>
                    </div> */}


                </div>
            </div>

        </div >
    )

}