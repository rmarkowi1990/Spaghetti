import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { storePreview } from '../Redux/mealsSlice';




export default function Preview(props) {

    const dispatch = useDispatch()
    const location = useLocation()

    // const { mealtitle, chef, rating, url, price, expiration, description, dairy, eggs, fish, crustaceans, treenuts, peanuts, wheat, soybeans, sesame, meat, portions } = useSelector(state => state.meals.preview)
    const preview = useSelector((state) => state.meals.preview)
    const passedID = location.state



    useEffect(() => {
        fetch(`http://localhost:3000/meals/meal/${passedID}`)
            .then(res => res.json())
            .then(data => {
                dispatch(storePreview(data[0]));

            })


    }, [])



    return (
        <div className='previewContainer'>

            <h1 id='previewTitle'>{preview && preview.mealtitle}</h1>
            <h2 id='previewChef'>a creation by <span id='previewUsername'>{preview && preview.chef}</span></h2>

            <div className='previewGrid'>

                <img id='previewImage' src={preview && preview.url}></img>
                <div id='previewRight'>

                    <p>{preview && preview.description}</p>
                </div>
            </div>

        </div>
    )

}