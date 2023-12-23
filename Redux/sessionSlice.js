import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    alert: false,
    alertBody: null,
    userDetails: {
        id: '',
        username: '',
        firstname: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        chefrating: '',
        patronrating: '',
    }
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {



        startSession: (state, action) => {
            state.loggedIn = true;
            state.userDetails = action.payload

        },
        endSession: (state) => {
            state.loggedIn = false;
            state.userDetails = {
                id: '',
                username: '',
                firstname: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                chefrating: '',
                patronrating: '',
            }
            state.alert = false;
            state.alertBody = null

        }


    },
});


// destructuring to export each action based on reducer functions
export const { setLogin, startSession, endSession } = sessionSlice.actions;

export default sessionSlice.reducer;

