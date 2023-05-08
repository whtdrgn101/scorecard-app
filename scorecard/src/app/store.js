import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import apiReducer from '../features/api/apiSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    api: apiReducer,
  }
});