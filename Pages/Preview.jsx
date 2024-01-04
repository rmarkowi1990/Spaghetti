import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { invalidQuantity, increaseQuantity, decreaseQuantity } from '../Redux/orderSlice';
import { storeMeals } from '../Redux/mealsSlice.js';
import { newAlert } from '../Redux/sessionSlice';







export default function Preview(props) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const quantity = useSelector((state) => state.order.quantity);
    const preview = useSelector((state) => state.order.order)
    const { errorMessage } = useSelector((state) => state.order)
    const user_id = useSelector(state => state.session.userDetails.id);


    const date = new Date()
    let today = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString()


    const { dairy, eggs, fish, crustaceans, treenuts, peanuts, wheat, soybeans, sesame, meat } = preview;







    //converts ingredient boolean to string to display
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

    //places order
    function placeOrder() {

        if (quantity > preview.portions) {
            dispatch(invalidQuantity())
            return;
        }

        console.log('user id: ', user_id)


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                meal_id: preview.meal_id,
                date: today,
                //adjust price
                price: preview.price === 'none' ? preview.price : preview.discount,
                quantity: quantity,
                time: new Date().toLocaleTimeString()
            })
        }

        fetch('http://localhost:3000/placeOrder', requestOptions)
            .then(res => res.json())
            .then(meals => {
                dispatch(storeMeals(meals));
                dispatch(newAlert('Order In Progress. Check back on "Order Page" to see when Order ready for pickup.'))
                navigate('/feed')

            })





    }

    const starRating = []
    for (let i = 0; i < Math.round(preview.rating); i++) {
        starRating.push(<img id='starRating' src='https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-shiny-gold-star-clipart-illustration-design-png-image_6216956.png' />)
    }





    return (
        <div className='previewContainer'>

            <h1 id='previewTitle'>{preview.mealtitle}</h1>

            <h2 id='previewChef'>a creation by <span id='previewUsername'>{preview.chef}</span>
                {/* <span id='previewRating'>({preview.rating})</span> */}
            </h2>

            <div id='starBox'>
                {starRating}

            </div>
            <div className='previewGrid'>
                <div id='previewLeft'>

                    <img id='previewImage' src={preview.url}></img>
                </div>
                <div id='previewRight'>

                    <h3>Description:</h3>
                    <p>{preview.description}</p>
                    <h3>Distance:</h3>
                    <p>{Math.round(preview.distance)} Miles</p>

                    <h3>Portions Available:</h3>
                    <p>{preview.portions}</p>

                    <h3>Contains:</h3>
                    <p>{ingredientScript()}</p>
                    <h3>Expires in:</h3>
                    <p>{preview.expiration} Days</p>

                </div>
            </div>
            <div id='previewFooter'>
                {preview.discount === 'none' ? <div id='previewPriceBox'>{preview.price}</div> : <div id='previewPriceBox2'><span id='oldPriceWrong'>{preview.price}</span><span>{preview.discount}</span></div>}
                <div className='previewQuantityBox'>
                    <div id='previewArrowDown' onClick={() => dispatch(decreaseQuantity())}>↓</div>
                    <div id='previewQuantity' >{quantity}</div>
                    <div id='previewArrowUp' onClick={() => dispatch(increaseQuantity())}>↑</div>
                </div>
                <button onClick={placeOrder}>Order</button>
            </div>

            <h3 id="previewError">{errorMessage}</h3>

        </div>
    )

}