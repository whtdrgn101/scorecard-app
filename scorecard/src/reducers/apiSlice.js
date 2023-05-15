import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    base_url: "http://192.168.49.2:30009"
  },
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.base_url = action.payload
    },
  }
})

export const selectBaseUrl = state => state.api.base_url;

export const { update, } = apiSlice.actions

export default apiSlice.reducer