import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHidden from '../Components/OrderHidden.jsx';
import OrderVisible from '../Components/OrderVisible.jsx';
import OrderAwaits from '../Components/OrderAwaits.jsx';
import Review from '../Components/Review.jsx'

import { getHistory } from '../Redux/orderSlice.js';
import { hideAlert } from '../Redux/sessionSlice.js';
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


    function refreshHistory() {
        fetch(`http://localhost:3000/orderHistory/${user_id}`)
            .then(res => res.json())
            .then(orders => {
                console.log('orders: ', orders);
                dispatch(getHistory(orders))

            })


    }


    //function passed into component when order is ready
    function receive(id) {

        fetch(`http://localhost:3000/markReceived/${JSON.stringify(id)}`)
            .then(

                fetch(`http://localhost:3000/orderHistory/${user_id}`)
                    .then(res => res.json())
                    .then(orders => {
                        console.log('orders: ', orders);
                        dispatch(getHistory(orders))
                        dispatch(hideAlert());

                    })

            )
        // .then(res => res.json())
        // .then(orders => {
        //     console.log('order now marked received, now updating state. order: ', orders)

        //     dispatch(getHistory(orders))
        //     // navigate('/feed')


        // })

    }

    //rendered gets all order history for user
    const rendered = useSelector((state) => state.order.history)

    //get all fulfilled orders awaiting pickup
    const awaitingPickup = rendered ? rendered.filter(order => order.fulfilled === true && order.received === false).map(order => <OrderAwaits receive={receive} chefName={order.chef_username} title={order.mealtitle} orderId={order.order_id} price={order.price} quantity={order.quantity} address={order.chef_address} city={order.chef_city} state={order.chef_state} zip={order.chef_zip} />) : []

    //receieved is all orders that have been finished and marked received
    const received = rendered ? rendered.filter(order => order.received === true) : []



    let history = []



    if (rendered) history = received.map((order, index) => {

        if (order.visible) {
            return <OrderVisible refreshHistory={refreshHistory} reviewed={order.reviewed} date={order.date} review={order.review} index={index} chefName={order.chef_username} title={order.mealtitle} orderId={order.order_id} price={order.price} quantity={order.quantity} address={order.chef_address} city={order.chef_city} state={order.chef_state} zip={order.chef_zip} chefId={order.chef_id} />
        } else {
            return <OrderHidden date={order.date} index={index} title={order.mealtitle} orderId={order.order_id} price={order.price} quantity={order.quantity} address={order.address} city={order.city} state={order.state} zip={order.zip} />
        }


    })




    return (
        <div id='ordersBackground'>

            <div id="ordersContainer">
                {awaitingPickup}
                {/* <Review /> */}
                <h1 id="ordersH1">Completed</h1>

                {rendered && history}



            </div>
        </div >
    )
}