import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { storePreview } from '../Redux/mealsSlice';




export default function Preview(props) {

    const dispatch = useDispatch();
    const location = useLocation();

    const meals = useSelector((state) => state.meals.meals);




    const passedID = location.state;

    const preview = meals.filter((meal) => meal.meal_id === passedID)[0];
    const { dairy, eggs, fish, crustaceans, treenuts, peanuts, wheat, soybeans, sesame, meat } = preview;


    // console.log('preview: ', preview);

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

                <img id='previewImage' src={preview.url}></img>
                <div id='previewRight'>
                    <h3>Contains:</h3>
                    <p>{ingredientScript()}</p>
                </div>
            </div>

        </div>
    )

}