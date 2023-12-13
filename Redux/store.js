import { configureStore } from '@reduxjs/toolkit';

//persist imports
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import signupSlice from './signupSlice.js';
import loginSlice from './loginSlice.js';
import macroSlice from './macroSlice.js'


//persist syntax;

const persistConfig = {
    key: 'root',
    storage,
}

const persistedMacro = persistReducer(persistConfig, macroSlice)


//store creation

export const store = configureStore({
    reducer: {
        signup: signupSlice,
        login: loginSlice,
        macro: persistedMacro,
        middleware: [thunk]
    }
});

//additional persistor export for redux persist
export const persistor = persistStore(store)
