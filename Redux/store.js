import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice.js';
import loginSlice from './loginSlice.js';
import macroSlice from './macroSlice.js'

export const store = configureStore({
    reducer: {
        signup: signupSlice,
        login: loginSlice,
        macro: macroSlice
    }
});
