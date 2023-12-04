import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice.js';
import loginSlice from './loginSlice.js';

export const store = configureStore({
    reducer: {
        signup: signupSlice,
        login: loginSlice
    }
});
