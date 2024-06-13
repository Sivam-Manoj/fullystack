import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//const url = process.env.BASE_URL;
const baseQuery = fetchBaseQuery({
  baseUrl:  "http://localhost:8000",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Admin", "Videos", "Notes"],
  endpoints: () => ({}),
});
