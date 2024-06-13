import { apiSlice } from "../slices/apiSlice";

const USER_ENDPONTS = "/admin";

const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAdminUser: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPONTS}/login-admin`,
        method: "POST",
        body: data,
      }),
    }),
    registerAdminUser: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPONTS}/register-admin`,
        method: "POST",
        body: data,
      }),
    }),
    adminProfile: builder.query({
      url: `${USER_ENDPONTS}/profile`,
      method: "GET",
    }),
  }),
});

export const {
  useLoginAdminUserMutation,
  useRegisterAdminUserMutation,
  useAdminProfileQuery,
} = adminSlice;
