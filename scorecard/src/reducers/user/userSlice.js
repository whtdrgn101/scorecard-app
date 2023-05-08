import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged_in: localStorage.getItem("logged_in"),
    user: JSON.parse(localStorage.getItem("user")),
    bowTypes: JSON.parse(localStorage.getItem("bowTypes")),
    roundTypes: JSON.parse(localStorage.getItem("roundTypes"))
  },
  reducers: {
    updateBowTypeList: (state, action) => {
      state.bowTypes = action.payload;
      localStorage.setItem("bowTypes", JSON.stringify(action.payload));
    },
    updateRoundTypeList: (state, action) => {
      state.roundTypes = action.payload;
      localStorage.setItem("roundTypes", JSON.stringify(action.payload));
    },
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
export const selectRoundTypeList = state => state.user.roundTypes;
export const selectBowTypeList = state => state.user.bowTypes;

export const { updateUser, logout, updateBowTypeList, updateRoundTypeList} = userSlice.actions

export default userSlice.reducer