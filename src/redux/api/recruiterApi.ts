import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recruiterAPI = createApi({
  reducerPath: "recruiterAPI",
  tagTypes: ["recruiter"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getRecruiter: builder.query({
      query: (params) => {
        return {
          url: `recruiter`,
          method: "GET",
          params,
        };
      },
      providesTags: ["recruiter"],
    }),

    getAllRecruiter: builder.query({
      query: (params) => {
        return {
          url: `recruiter`,
          method: "GET",
          params,
        };
      },
      providesTags: ["recruiter"],
    }),
    getProfil: builder.query({
      query: () => {
        return {
          url: `recruiter/my-profile`,
          method: "GET",
        };
      },
      providesTags: ["recruiter"],
    }),
    addRecruiter: builder.mutation({
      query: (values) => {
        return {
          url: `recruiter`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["recruiter"],
    }),
    updateRecruiter: builder.mutation({
      query: ({ status, id }) => {
        return {
          url: `/recruiter/${id}`,
          method: "PUT",
          body: status,
        };
      },
      invalidatesTags: ["recruiter"],
    }),

    deleteRecruiter: builder.mutation({
      query: (id) => {
        return {
          url: `/recruiter/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["recruiter"],
    }),
  }),
});

export const {
  useGetRecruiterQuery,
  useAddRecruiterMutation,
  useDeleteRecruiterMutation,
  useUpdateRecruiterMutation,
  useGetAllRecruiterQuery,
  useGetProfilQuery,
} = recruiterAPI;
