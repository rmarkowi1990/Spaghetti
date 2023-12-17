import React from 'react';

import axios from 'axios'

import { addImage, enterMealTitle, enterDescription, enterExpiration, enterPrice, toggleCrustaceans, toggleDairy, toggleEggs, toggleFish, toggleMeat, togglePeanuts, toggleSesame, toggleSoybeans, toggleTreeNuts, toggleWheat } from '../Redux/chefSlice';
import { useSelector, useDispatch } from 'react-redux'


export default function Chef() {



    const username = useSelector((state) => state.session.userDetails.username);

    const dispatch = useDispatch();

    const { image, mealTitle, price, expiration, description } = useSelector(state => state.chef);
    const { dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat } = useSelector(state => state.chef.ingredients)

    const { id } = useSelector((state) => state.session.userDetails)


    const submit = (event) => {
        event.preventDefault();



        const formData = new FormData();
        formData.append('image', image);
        formData.append('mealTitle', mealTitle);
        formData.append('chefId', id)
        formData.append('price', price);
        formData.append('expiration', expiration);
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




            })


    }






    return (
        <div id='chefTableContainer'>
            <div id='container2'></div>
            <h1>{username}'s Chef Table</h1>


            <div id='outerMeal'>
                <h1>New Chef Creation</h1>
                <div id='mealSubmission'>


                    <div id='imageSection'>
                        <img></img>


                        <form onSubmit={submit}>
                            <input type='file' accept='image/*' onChange={(event) => dispatch(addImage(event.target.files[0]))} />
                            <button type='submit'>Submit</button>

                        </form>




                        {/* <input type='file' name='image' onChange={(event) => dispatch(addImage(event.target.files[0]))} /> */}


                    </div>
                    <div className='formSection'>

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


                    </div>

                </div>

                <button onClick={submit}>Share</button>


            </div>

        </div >
    )

}