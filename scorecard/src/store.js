import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice';
import apiReducer from './reducers/apiSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    api: apiReducer,
  }
});