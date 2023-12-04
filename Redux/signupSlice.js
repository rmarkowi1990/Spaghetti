import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    password: ''
}

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {

        //you can directly manipulate state here, state is not immutable :)
        reducer1: (state) => {
            //if no payload (example increment by 1 every time)
        },
        reducer2: (state, action) => {
            //if incorperating specific data each time utilizing action.payload (example, increment by payload)
        },
    },
});


// destructuring to export each action based on reducer functions
export const { reducer1, reducer2 } = signupSlice.actions;

export default signupSlice.reducer;

