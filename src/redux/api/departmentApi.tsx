import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentAPI = createApi({
  reducerPath: "departmentsAPI",
  tagTypes: ["departments"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllDepartment: builder.query({
      query: (params) => {
        return {
          url: `departments`,
          method: "GET",
          params,
        };
      },
      providesTags: ["departments"],
    }),
    getDepartmentById: builder.query({
      query: (id) => {
        return {
          url: `/departments/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      providesTags: ["departments"],
    }),
    addDepartment: builder.mutation({
      query: (obj) => {
        return {
          url: `departments`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["departments"],
    }),

    updateDepartment: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/departments/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["departments"],
    }),

    deleteDepartment: builder.mutation({
      query: (id) => {
        return {
          url: `/departments/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["departments"],
    }),
  }),
});

export const {
  useGetAllDepartmentQuery,
  useGetDepartmentByIdQuery,
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentAPI;
