import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    quantity: 1
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
        }


    },
});


// destructuring to export each action based on reducer functions
export const { increaseQuantity, decreaseQuantity } = orderSlice.actions;

export default orderSlice.reducer;

