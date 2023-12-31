import { configureStore } from '@reduxjs/toolkit';

//persist imports
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import signupSlice from './signupSlice.js';
import loginSlice from './loginSlice.js';
import sessionSlice from './sessionSlice.js';
import chefSlice from './chefSlice.js';
import mealsSlice from './mealsSlice.js';
import orderSlice from './orderSlice.js'


//persist syntax;

const persistConfig = {
    key: 'root',
    storage,
}

const persistedMacro = persistReducer(persistConfig, sessionSlice)


//store creation

export const store = configureStore({
    reducer: {
        signup: signupSlice,
        login: loginSlice,
        chef: chefSlice,
        session: persistedMacro,
        meals: mealsSlice,
        order: orderSlice,
        middleware: [thunk]
    }
});

//additional persistor export for redux persist
export const persistor = persistStore(store)
