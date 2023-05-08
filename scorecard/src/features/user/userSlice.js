import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged_in: localStorage.getItem("logged_in"),
    user: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    updateUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload))
      state.logged_in = true;
      localStorage.setItem("logged_in", true);
    },
    logout: (state) => {
        state.user = {};
        localStorage.removeItem("user")
        state.logged_in = false;
        localStorage.removeItem("logged_in");
    }
  }
})

export const selectLoggedIn = state => state.user.logged_in;
export const selectUser = state => state.user.user;

export const { updateUser, logout} = userSlice.actions

export default userSlice.reducer