import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    // ==========================================
    // CREATE ORDER
    // ==========================================
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),

      invalidatesTags: ["Orders"],
    }),

    // ==========================================
    // USER ORDERS
    // ==========================================
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),

      providesTags: ["Orders"],
    }),

    // ==========================================
    // ADMIN - ALL ORDERS
    // ==========================================
    getAllOrders: builder.query({
      query: () => ({
        url: "/all",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

      providesTags: ["Orders"],
    }),

    // ==========================================
    // ADMIN - UPDATE STATUS
    // ==========================================
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PATCH",
        body: {
          status,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;

export default ordersApi;