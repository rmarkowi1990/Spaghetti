import React from 'react';

import { addImage, enterMealTitle, enterDescription, enterExpiration, enterPrice, toggleCrustaceans, toggleDairy, toggleEggs, toggleFish, toggleMeat, togglePeanuts, toggleSesame, toggleSoybeans, toggleTreeNuts, toggleWheat } from '../Redux/chefSlice';
import { useSelector, useDispatch } from 'react-redux'

export default function Chef() {



    const username = useSelector((state) => state.session.userDetails.username);

    const dispatch = useDispatch();

    const { image, mealTitle, price, expiration, description } = useSelector(state => state.chef);
    const { dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat } = useSelector(state => state.chef.ingredients)


    // function imageUpload(event) {
    //     dispatch(addImage(event.target.files[0]))
    // }

    console.log('image, ', image);

    function submit() {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/formData'
            },
            body: image
        }

        console.log("about to submit", image)
        fetch('http://localhost:3000/photo', requestOptions)
            .then(res => res.json())
            .then(data => console.log(data))

    }






    return (
        <div id='chefTableContainer'>
            <h1>{username}'s Chef Table</h1>
            <div id='mealSubmission'>


                <div id='imageSection'>
                    <img></img>
                    <input type='file' onChange={(event) => dispatch(addImage(event.target.files[0]))} />
                </div>
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
                    <h3>Description</h3>
                    <textarea id="description" onInput={(event) => dispatch(enterDescription(event))} value={description}></textarea>

                    <button onClick={submit}>Share</button>


                </div>
            </div>

        </div >
    )

}