import { apiSlice } from "./apiSlice";

const USER_ENDPOINTS = "/video";

const videoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVideoApi: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINTS}/add-video`,
        method: "POST",
        body: data,
      }),
    }),
    updateVideoApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USER_ENDPOINTS}/update-video/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteVideoAPi: builder.mutation({
      query: (id) => ({
        url: `${USER_ENDPOINTS}/delete-video/${id}`,
        method: "DELETE",
      }),
    }),
    getVideosApi: builder.query({
      query: () => ({
        url: `${USER_ENDPOINTS}/get-videos`,
        method: "GET",
      }),
    }),
    getAdminVideosApi: builder.query({
      query: () => ({
        url: `${USER_ENDPOINTS}/get-videos-admin`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateVideoApiMutation,
  useUpdateVideoApiMutation,
  useDeleteVideoAPiMutation,
  useGetAdminVideosApiQuery,
  useGetVideosApiQuery,
} = videoSlice;
