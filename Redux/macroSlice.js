import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false
}

export const macroSlice = createSlice({
    name: 'macro',
    initialState,
    reducers: {


        setLogin: (state, action) => {
            state.loggedIn = action.payload
        }


    },
});


// destructuring to export each action based on reducer functions
export const { setLogin } = macroSlice.actions;

export default macroSlice.reducer;

