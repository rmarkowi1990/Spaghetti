import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHidden from '../Components/OrderHidden.jsx';
import OrderVisible from '../Components/OrderVisible.jsx';

import { getHistory } from '../Redux/orderSlice.js';
import { useSelector, useDispatch } from 'react-redux'

export default function Orders() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user_id = useSelector((state) => state.session.userDetails.id)


    // renders orders to the page
    useEffect(() => {

        fetch(`http://localhost:3000/orderHistory/${user_id}`)
            .then(res => res.json())
            .then(orders => {
                console.log('orders: ', orders);
                dispatch(getHistory(orders))
            })

    }, [])

    let rendered = useSelector((state) => state.order.history)
    let history = []

    if (rendered) history = rendered.map((order, index) => {
        if (order.visible) {
            return <OrderVisible index={index} title={order.mealtitle} orderId={order.order_id} price={order.price} quantity={order.quantity} address={order.chef_address} city={order.chef_city} state={order.chef_state} zip={order.chef_zip} />
        } else {
            return <OrderHidden index={index} title={order.mealtitle} orderId={order.order_id} price={order.price} quantity={order.quantity} address={order.address} city={order.city} state={order.state} zip={order.zip} />
        }


    })


    return (
        <div id='ordersBackground'>

            <div id="ordersContainer">
                <h1 id="ordersH1">Orders</h1>

                {rendered && history}



            </div>
        </div >
    )
}