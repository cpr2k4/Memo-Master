import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './root'

const store = configureStore({
    reducer : rootReducer,
})

export default store;