import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHidden from '../Components/OrderHidden.jsx'
import OrderVisible from '../Components/OrderVisible.jsx'

export default function Orders() {

    const navigate = useNavigate()


    return (
        <div id='ordersBackground'>

            <div id="ordersContainer">
                <h1 id="ordersH1">Orders</h1>

                <OrderHidden />
                <OrderVisible />

                <OrderHidden />
                <OrderHidden />

            </div>
        </div >
    )
}