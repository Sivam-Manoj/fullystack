import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Store/slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authAdminReducer from "./slices/authAdminSlice";
const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    admin: authAdminReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export default store;
