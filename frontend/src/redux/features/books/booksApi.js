import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,

  credentials: "include",

  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      Headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }

    return Headers;
  },
});

const booksApi = createApi({
  reducerPath: "booksApi",

  baseQuery,

  tagTypes: ["Books"],

  endpoints: (builder) => ({
    // ==========================================
    // GET ALL BOOKS
    // ==========================================

    fetchAllBooks: builder.query({
      query: () => "/",

      providesTags: ["Books"],
    }),

    // ==========================================
    // GET SINGLE BOOK
    // ==========================================

    fetchBookById: builder.query({
      query: (id) => `/${id}`,

      providesTags: (result, error, id) => [
        {
          type: "Books",
          id,
        },
      ],
    }),

    // ==========================================
    // ADD BOOK
    // ==========================================

    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",

        method: "POST",

        body: newBook,

        // IMPORTANT:
        // Don't manually set Content-Type.
        // Browser will automatically set
        // multipart/form-data boundary.
      }),

      invalidatesTags: ["Books"],
    }),

    // ==========================================
    // UPDATE BOOK
    // ==========================================

    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,

        method: "PUT",

        body: rest,

        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["Books"],
    }),

    // ==========================================
    // DELETE BOOK
    // ==========================================

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export default booksApi;