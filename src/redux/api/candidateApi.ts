import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateAPI = createApi({
  reducerPath: "candidateAPI",
  tagTypes: ["candidate"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getCandidate: builder.query({
      query: (params) => {
        return {
          url: `candidate`,
          method: "GET",
          params,
        };
      },
      providesTags: ["candidate"],
    }),
    getPermission: builder.query({
      query: (params) => {
        return {
          url: `candidate/permission`,
          method: "GET",
          params,
        };
      },
      providesTags: ["candidate"],
    }),
    getAllCandidate: builder.query({
      query: (params) => {
        return {
          url: `candidate`,
          method: "GET",
          params,
        };
      },
      providesTags: ["candidate"],
    }),
    getInfoCandidate: builder.query({
      query: ({ id }) => {
        return {
          url: `candidate/information/${id}`,
          method: "GET",
        };
      },
      providesTags: ["candidate"],
    }),
    getCandidateById: builder.query({
      query: (id) => {
        return {
          url: `candidate/${id}`,
          method: "GET",
        };
      },
      providesTags: ["candidate"],
    }),
    getProfil: builder.query({
      query: () => {
        return {
          url: `candidate/my-profile`,
          method: "GET",
        };
      },
      providesTags: ["candidate"],
    }),
    addCandidate: builder.mutation({
      query: (values) => {
        return {
          url: `candidate`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    updateCandidate: builder.mutation({
      query: ({ status, id }) => {
        return {
          url: `/candidate/${id}`,
          method: "PUT",
          body: status,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    updateCandidatePermissions: builder.mutation({
      query: ({ permissions }) => {
        return {
          url: `/candidate/update_profil`,
          method: "PUT",
          body: permissions,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    deleteCandidate: builder.mutation({
      query: (id) => {
        return {
          url: `/candidate/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    changePassword: builder.mutation({
      query: (obj) => {
        return {
          url: `/candidate/change_password`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["candidate"],
    }),
  }),
});

export const {
  useGetCandidateQuery,
  useGetCandidateByIdQuery,
  useAddCandidateMutation,
  useDeleteCandidateMutation,
  useUpdateCandidateMutation,
  useGetAllCandidateQuery,
  useChangePasswordMutation,
  useGetProfilQuery,
  useUpdateCandidatePermissionsMutation,
  useGetPermissionQuery,
  useGetInfoCandidateQuery,
} = candidateAPI;
