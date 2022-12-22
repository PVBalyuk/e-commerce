import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/user-slice';
import notificationSlice from './slices/notification-slice';

const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationSlice
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch