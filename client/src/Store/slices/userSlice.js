import { apiSlice } from "../slices/apiSlice";

const USER_ENDPOINTS = "/user";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINTS}/login`,
        method: "POST",
        body: data,
      }),
    }),
    registerApi: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINTS}/register`,
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      url: `${USER_ENDPOINTS}/profile`,
      method: "GET",
    }),
  }),
});

export const {
  useLoginApiMutation,
  useRegisterApiMutation,
  useGetProfileQuery,
} = userSlice;
