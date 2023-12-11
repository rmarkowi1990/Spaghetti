import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    password: '',
    // errorMessage: ''
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
        }

    },
});


// destructuring to export each action based on reducer functions
export const { enterUserName, enterPassword } = loginSlice.actions;

export default loginSlice.reducer;

