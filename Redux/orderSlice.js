import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    quantity: 1,
    order: null,
    errorMessage: '',
    history: null,
    ordersByChef: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {


        increaseQuantity: (state) => {
            state.quantity++
        },
        decreaseQuantity: (state) => {
            state.quantity = state.quantity > 1 ? state.quantity - 1 : state.quantity
        },
        adjustOrder: (state, action) => {
            state.order = action.payload;
        },
        invalidQuantity: (state) => {
            state.errorMessage = "You can't order more portions than available!"
        },
        resetOrder: (state) => {
            state.quantity = 1;
            state.order = null;
            state.error = '';
        },
        getHistory: (state, action) => {
            let returned = action.payload;
            returned = returned.map(order => {
                return { ...order, visible: false }
            })
            state.history = returned;

        },
        getOrdersByChef: (state, action) => {
            let returnedOrdersByChef = action.payload;
            returnedOrdersByChef = returnedOrdersByChef.map(order => {
                return { ...order, visible: false }
            })
            state.ordersByChef = returnedOrdersByChef;
        },
        toggleVisibility: (state, action) => {
            state.history[action.payload].visible = !state.history[action.payload].visible

        },
        updateReviews: (state, action) => {
            const { orderId, rating } = action.payload
            state.history[orderId]
            state.history = state.history.map(order => order.order_id === orderId ? { ...order, review: Number(rating.slice(0, 1)) } : order)
        }


    },
});


// destructuring to export each action based on reducer functions
export const { updateReviews, getOrdersByChef, toggleVisibility, getHistory, increaseQuantity, decreaseQuantity, adjustOrder, invalidQuantity, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;

