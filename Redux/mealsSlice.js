import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    retrieved: false,
    meals: null

}

export const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {


        storeMeals: (state, action) => {
            state.retrieved = true;
            state.meals = action.payload;

        }



    },
});


// destructuring to export each action based on reducer functions
export const { storeMeals } = mealsSlice.actions;

export default mealsSlice.reducer;

