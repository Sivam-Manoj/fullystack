import { apiSlice } from "./apiSlice";

const USER_ENDPOINTS = "/notes";

const notesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNotesApi: builder.mutation({
      query: (formData) => ({
        url: `${USER_ENDPOINTS}/upload-pdf`,
        method: "POST",
        body: formData,
      }),
    }),
    updateNotesApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USER_ENDPOINTS}/update-pdf/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteNotesApi: builder.mutation({
      query: (id) => ({
        url: `${USER_ENDPOINTS}/delete-pdf/${id}`,
        method: "DELETE",
      }),
    }),
    getNotesApi: builder.query({
      query: () => ({
        url: `${USER_ENDPOINTS}/get-pdf`,
        method: "GET",
      }),
    }),
    getNotesAdminApi: builder.query({
      query: () => ({
        url: `${USER_ENDPOINTS}/get-pdf-admin`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDeleteNotesApiMutation,
  useGetNotesAdminApiQuery,
  useCreateNotesApiMutation,
  useGetNotesApiQuery,
  useUpdateNotesApiMutation,
} = notesSlice;
