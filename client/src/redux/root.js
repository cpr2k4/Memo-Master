import { combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice.js";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist'

const persistConfig = {
    key : "root",
    version: 1,
    storage
}

const rootReducer = combineReducers({
    notes : noteReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

export default persistedReducer;