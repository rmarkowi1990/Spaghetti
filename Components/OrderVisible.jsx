import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHidden from '../Components/OrderHidden.jsx'

export default function OrderVisible() {



    return (

        <div className='orderVisibleContainer'>
            <div className='orderHeader'>
                <span>12/13/2023</span>
                <span id='orderMealTitle'>My Famous Lasagna</span>
                <span>$13.99</span>
                <span>-</span>
            </div>

            <div className='OrderExtras'>
                <div className='OrdersLeft'>
                    <h3>GrandmaBarb</h3>
                </div>

                <div className='OrdersRight'>

                    <p>251 Melbourne Ave</p>
                    <p>Los Angeles, CA</p>
                    <p>10223</p>

                </div>



            </div>

        </div>

    )




}