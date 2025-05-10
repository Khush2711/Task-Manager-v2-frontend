import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: null,
  userList: [],
  otp: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Update the token if it exists
      if (action.payload.token) {
        state.token = action.payload.token;
      }

      // You can also handle updating the user data if needed
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    clearUser: (state) => {
      state.user = {};
      state.token = null;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserList, setOtp } = userSlice.actions;

export default userSlice.reducer;
