import { createSlice } from "@reduxjs/toolkit";

const getUser = () => {
  const userData = sessionStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

const initialState = {
  userData: getUser(),
  isLoggedIn: !!getUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    logout: (state) => {
      sessionStorage.removeItem("userData");
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
