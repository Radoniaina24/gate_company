import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timeoffAPI = createApi({
  reducerPath: "timeoffAPI",
  tagTypes: ["timeoff"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    // getAllTasks: builder.query({
    //   query: (params) => {
    //     return {
    //       url: `tasks`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["timeoff"],
    // }),
    getAllManager: builder.query({
      query: (params) => {
        return {
          url: `leave-requests/manager`,
          method: "GET",
          params,
        };
      },
      providesTags: ["timeoff"],
    }),
    getAllMyTimeOff: builder.query({
      query: (params) => {
        return {
          url: `leave-requests`,
          method: "GET",
          params,
        };
      },
      providesTags: ["timeoff"],
    }),
    getAllTypeTimeOff: builder.query({
      query: (params) => {
        return {
          url: `types-conges`,
          method: "GET",
          params,
        };
      },
      providesTags: ["timeoff"],
    }),
    getLeaveRequestForManager: builder.query({
      query: (params) => {
        return {
          url: `leave-requests/for-manager`,
          method: "GET",
          params,
        };
      },
      providesTags: ["timeoff"],
    }),
    addTimeoff: builder.mutation({
      query: (obj) => {
        return {
          url: `leave-requests`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["timeoff"],
    }),

    updateTimeOff: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/leave-requests/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["timeoff"],
    }),

    deleteTimeOff: builder.mutation({
      query: (id) => {
        return {
          url: `/leave-requests/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["timeoff"],
    }),
  }),
});

export const {
  useGetAllMyTimeOffQuery,
  useAddTimeoffMutation,
  useGetAllManagerQuery,
  useGetAllTypeTimeOffQuery,
  useUpdateTimeOffMutation,
  useDeleteTimeOffMutation,
  useGetLeaveRequestForManagerQuery,
} = timeoffAPI;
