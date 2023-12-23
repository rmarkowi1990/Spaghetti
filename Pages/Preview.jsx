import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { increaseQuantity, decreaseQuantity } from '../Redux/orderSlice';





export default function Preview(props) {

    const dispatch = useDispatch();
    const location = useLocation();

    const meals = useSelector((state) => state.meals.meals);
    const quantity = useSelector((state) => state.order.quantity);
    console.log('quantity', quantity)




    const passedID = location.state;

    const preview = meals.filter((meal) => meal.meal_id === passedID)[0];
    const { dairy, eggs, fish, crustaceans, treenuts, peanuts, wheat, soybeans, sesame, meat } = preview;


    function ingredientScript() {
        let output = ''
        const list = { dairy, eggs, fish, crustaceans, treenuts, peanuts, wheat, soybeans, sesame, meat }
        let keys = Object.keys(list);
        keys = keys.sort();

        for (let i in keys) {
            if (list[keys[i]]) {
                let ingredient = keys[i];
                let firstLetter = ingredient[0];
                ingredient = ingredient.slice(1);
                output = output + firstLetter.toUpperCase() + ingredient + ', '
            }
        }

        output = output.slice(0, -2)
        return output;
    }





    return (
        <div className='previewContainer'>

            <h1 id='previewTitle'>{preview.mealtitle}</h1>
            <h2 id='previewChef'>a creation by <span id='previewUsername'>{preview.chef}</span></h2>

            <div className='previewGrid'>
                <div id='previewLeft'>

                    <img id='previewImage' src={preview.url}></img>
                </div>
                <div id='previewRight'>

                    <h3>Description:</h3>
                    <p>{preview.description}</p>
                    <h3>Distance:</h3>
                    <p>3 Miles</p>

                    <h3>Portions Available:</h3>
                    <p>{preview.portions}</p>

                    <h3>Contains:</h3>
                    <p>{ingredientScript()}</p>
                    <h3>Expiration:</h3>
                    <p>{preview.expiration}</p>
                    <div id='previewFooter'>
                        <div id='previewPriceBox'>{preview.price}</div>
                        <div className='previewQuantityBox'>
                            <div id='previewArrowDown' onClick={() => dispatch(decreaseQuantity())}>↓</div>
                            <div id='previewQuantity' >{quantity}</div>
                            <div id='previewArrowUp' onClick={() => dispatch(increaseQuantity())}>↑</div>
                        </div>
                        <button>Order</button>
                    </div>
                </div>
            </div>

        </div>
    )

}