import {configureStore} from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

export default store;