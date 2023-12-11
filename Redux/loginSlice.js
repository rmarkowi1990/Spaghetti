import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    password: '',
    errorMessage: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {


        enterUserName: (state, action) => {
            state.userName = action.payload.target.value;
        },
        enterPassword: (state, action) => {
            state.password = action.payload.target.value;
        },
        errorTrue: (state) => {
            state.errorMessage = true;
            state.userName = '';
            state.password = '';
        },
        errorFalse: (state) => {
            state.errorMessage = false;
            state.userName = '';
            state.password = '';
        }

    },
});


// destructuring to export each action based on reducer functions
export const { enterUserName, enterPassword, errorTrue, errorFalse } = loginSlice.actions;

export default loginSlice.reducer;

