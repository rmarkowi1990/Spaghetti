import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    password: '',
    address: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
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
        enterFirstName: (state, action) => {
            state.firstName = action.payload.target.value;
        },
        enterLastName: (state, action) => {
            state.lastName = action.payload.target.value;
        },
        enterAddress: (state, action) => {
            state.address = action.payload.target.value;
        },
        enterCity: (state, action) => {
            state.city = action.payload.target.value;
        },
        enterState: (state, action) => {
            state.state = action.payload.target.value;
        },
        enterZip: (state, action) => {
            state.zip = action.payload.target.value;
        },
    },
});


// destructuring to export each action based on reducer functions
export const { enterUserName, enterPassword, enterFirstName, enterLastName, enterAddress, enterCity, enterState, enterZip } = signupSlice.actions;

export default signupSlice.reducer;

