import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    quantity: 1,
    order: null,
    errorMessage: ''
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
            state.order = action.payload
        },
        invalidQuantity: (state) => {
            state.errorMessage = "You can't order more portions than available!"
        },
        resetOrder: (state) => {
            state.quantity = 1;
            state.order = null;
            state.error = '';
        }


    },
});


// destructuring to export each action based on reducer functions
export const { increaseQuantity, decreaseQuantity, adjustOrder, invalidQuantity, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;

