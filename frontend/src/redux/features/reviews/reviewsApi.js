import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/reviews`,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const reviewsApi = createApi({
  reducerPath: "reviewsApi",

  baseQuery,

  tagTypes: ["Reviews"],

  endpoints: (builder) => ({

    // ==================================================
    // USER - GET REVIEWS FOR ONE BOOK
    // ==================================================

    getBookReviews: builder.query({
      query: (bookId) => `/${bookId}`,

      providesTags: (result, error, bookId) => [
        {
          type: "Reviews",
          id: bookId,
        },
      ],
    }),

    // ==================================================
    // USER - ADD REVIEW
    // ==================================================

    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "/",
        method: "POST",
        body: reviewData,
      }),

      invalidatesTags: (result, error, reviewData) => [
        {
          type: "Reviews",
          id: reviewData?.bookId,
        },
        "Reviews",
      ],
    }),

    // ==================================================
    // USER - DELETE OWN REVIEW
    // ==================================================

    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/${reviewId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Reviews"],
    }),

    // ==================================================
    // ADMIN - GET ALL REVIEWS
    // ==================================================

    getAllReviewsForAdmin: builder.query({
      query: () => "/admin/all",

      providesTags: ["Reviews"],
    }),

    // ==================================================
    // ADMIN - DELETE ANY REVIEW
    // ==================================================

    deleteReviewByAdmin: builder.mutation({
      query: (reviewId) => ({
        url: `/admin/${reviewId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Reviews"],
    }),

  }),
});

export const {
  // USER HOOKS
  useGetBookReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,

  // ADMIN HOOKS
  useGetAllReviewsForAdminQuery,
  useDeleteReviewByAdminMutation,

} = reviewsApi;

export default reviewsApi;