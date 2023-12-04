import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    password: '',
    address: ''
}

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {


        enterUserName: (state, action) => {
            state.userName = action.payload.target.value;
        },
        enterPassword: (state, action) => {
            state.password = action.payload.target.value;
        },
        enterAddress: (state, action) => {
            state.address = action.payload.target.value;
        }
    },
});


// destructuring to export each action based on reducer functions
export const { enterUserName, enterPassword, enterAddress } = signupSlice.actions;

export default signupSlice.reducer;
