import React, { useMemo, useState } from "react";
import {
  FiBookOpen,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiFilter,
  FiTrendingUp,
  FiDollarSign,
  FiRefreshCw,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
} from "../../../redux/features/books/booksApi";

const ManageBooks = () => {
  const navigate = useNavigate();

  const {
    data: books = [],
    isLoading,
    isError,
    refetch,
  } = useFetchAllBooksQuery();

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ==========================================
  // CATEGORIES
  // ==========================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        books
          .map((book) => book.category)
          .filter((category) => category)
      ),
    ];

    return uniqueCategories;
  }, [books]);

  // ==========================================
  // FILTER BOOKS
  // ==========================================

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search) ||
        book.category?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "all" ||
        book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  // ==========================================
  // DELETE BOOK
  // ==========================================

  const handleDeleteBook = async (id, title) => {
    const result = await Swal.fire({
      title: "Delete this book?",
      text: `"${title}" will be permanently removed from your bookstore.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBook(id).unwrap();

      await Swal.fire({
        title: "Deleted!",
        text: "The book has been removed successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error);

      Swal.fire({
        title: "Delete Failed",
        text:
          error?.data?.message ||
          "Something went wrong while deleting the book.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // ==========================================
  // STATS
  // ==========================================

  const totalBooks = books.length;

  const trendingBooks = books.filter(
    (book) => book.trending === true
  ).length;

  const totalCategories = categories.length;

  const averagePrice =
    books.length > 0
      ? (
          books.reduce(
            (total, book) => total + Number(book.newPrice || 0),
            0
          ) / books.length
        ).toFixed(2)
      : "0.00";

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (coverImage) => {
    if (!coverImage) return null;

    // If backend/database already contains a complete URL
    if (
      coverImage.startsWith("http://") ||
      coverImage.startsWith("https://")
    ) {
      return coverImage;
    }

    // Existing project uses /books/ for public book images
    return `/books/${coverImage}`;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500 font-medium">
            Loading books...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <FiBookOpen className="text-2xl" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-4">
            Unable to load books
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Something went wrong while fetching your books.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            <FiRefreshCw />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FiBookOpen className="text-2xl" />
            </div>

            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                Book Management
              </p>

              <h1 className="text-3xl font-bold text-gray-800">
                Manage Books
              </h1>
            </div>

          </div>

          <p className="text-gray-500 mt-3">
            Manage, edit and organize all books available in your bookstore.
          </p>
        </div>

        <Link
          to="/dashboard/add-book"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          <FiPlus />
          Add New Book
        </Link>

      </div>

      {/* ==========================================
          STATS
      ========================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Books
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {totalBooks}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiBookOpen className="text-xl" />
            </div>

          </div>

        </div>

        {/* Trending */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Trending Books
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {trendingBooks}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <FiTrendingUp className="text-xl" />
            </div>

          </div>

        </div>

        {/* Categories */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Categories
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {totalCategories}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FiFilter className="text-xl" />
            </div>

          </div>

        </div>

        {/* Average Price */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Average Price
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                ${averagePrice}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FiDollarSign className="text-xl" />
            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          SEARCH + FILTER
      ========================================== */}

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search by title, author or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
            />

          </div>

          {/* Category */}

          <div className="relative lg:w-56">

            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 cursor-pointer"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="flex items-center justify-between mt-4 text-sm">

          <p className="text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredBooks.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {totalBooks}
            </span>{" "}
            books
          </p>

          {(searchTerm || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
            >
              Clear Filters
            </button>
          )}

        </div>

      </div>

      {/* ==========================================
          BOOK TABLE
      ========================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              All Books
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              View and manage your bookstore collection.
            </p>
          </div>

          <button
            onClick={() => refetch()}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition cursor-pointer"
            title="Refresh books"
          >
            <FiRefreshCw />
          </button>

        </div>

        {/* Empty State */}

        {filteredBooks.length === 0 ? (
          <div className="py-20 text-center px-6">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center">
              <FiBookOpen className="text-3xl" />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-5">
              No books found
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Try changing your search or category filter.
            </p>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-gray-50 border-b border-gray-100">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Book
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredBooks.map((book, index) => {

                  const imageUrl = getImageUrl(book.coverImage);

                  return (
                    <tr
                      key={book._id}
                      className="hover:bg-gray-50 transition"
                    >

                      {/* Number */}

                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                        {index + 1}
                      </td>

                      {/* Book */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-4 min-w-[240px]">

                          <div className="w-14 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">

                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={book.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <FiBookOpen />
                              </div>
                            )}

                          </div>

                          <div className="min-w-0">

                            <h3 className="font-semibold text-gray-800 truncate max-w-[220px]">
                              {book.title}
                            </h3>

                            {book.author && (
                              <p className="text-sm text-gray-500 mt-1 truncate max-w-[220px]">
                                by {book.author}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* Category */}

                      <td className="px-6 py-4">

                        <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold capitalize">
                          {book.category || "Uncategorized"}
                        </span>

                      </td>

                      {/* Price */}

                      <td className="px-6 py-4">

                        <div className="flex flex-col">

                          <span className="font-bold text-gray-800">
                            ${Number(book.newPrice || 0).toFixed(2)}
                          </span>

                          {book.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${Number(book.oldPrice).toFixed(2)}
                            </span>
                          )}

                        </div>

                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">

                        {book.trending ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">
                            <FiTrendingUp />
                            Trending
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                            Regular
                          </span>
                        )}

                      </td>

                      {/* Actions */}

                      <td className="px-6 py-4">

                        <div className="flex items-center justify-end gap-2">

                          <button
                            onClick={() =>
                              navigate(
                                `/dashboard/edit-book/${book._id}`
                              )
                            }
                            className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center cursor-pointer"
                            title="Edit book"
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            disabled={isDeleting}
                            onClick={() =>
                              handleDeleteBook(
                                book._id,
                                book.title
                              )
                            }
                            className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete book"
                          >
                            <FiTrash2 />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default ManageBooks;