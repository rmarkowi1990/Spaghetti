import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice.js';

export const store = configureStore({
    reducer: {
        signup: signupSlice,
    }
});
