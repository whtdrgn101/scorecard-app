import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user/userSlice';
import apiReducer from './reducers/api/apiSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    api: apiReducer,
  }
});