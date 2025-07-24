import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksAPI = createApi({
  reducerPath: "tasksAPI",
  tagTypes: ["tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: (params) => {
        return {
          url: `tasks`,
          method: "GET",
          params,
        };
      },
      providesTags: ["tasks"],
    }),
    addTasks: builder.mutation({
      query: (obj) => {
        return {
          url: `tasks`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["tasks"],
    }),

    updateTask: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/tasks/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id) => {
        return {
          url: `/tasks/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useAddTasksMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksAPI;
