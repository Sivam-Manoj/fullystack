import { createSlice } from "@reduxjs/toolkit";

const getAdmin = () => {
  const adminData = sessionStorage.getItem("adminData");
  return adminData ? JSON.parse(adminData) : null;
};

const initialState = {
  adminData: getAdmin(),
  isAdminLoggedIn: !!getAdmin(),
};

const authAdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminlogin: (state, action) => {
      state.adminData = action.payload;
      sessionStorage.setItem("adminData", JSON.stringify(action.payload));
      state.isAdminLoggedIn = true;
    },
    adminlogout: (state) => {
      sessionStorage.removeItem("adminData");
      state.adminData = null;
      state.isAdminLoggedIn = false;
    },
  },
});

export const { adminlogin, adminlogout } = authAdminSlice.actions;
export default authAdminSlice.reducer;
