import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    retrieved: false,
    meals: null,
    preview: null

}

export const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {


        storeMeals: (state, action) => {
            state.retrieved = true;
            state.meals = action.payload;

        },
        storePreview: (state, action) => {
            state.preview = action.payload;
        },
        clearPreview: (state) => {
            state.preview = null
        }



    },
});


// destructuring to export each action based on reducer functions
export const { storeMeals, storePreview, clearPreview } = mealsSlice.actions;

export default mealsSlice.reducer;

