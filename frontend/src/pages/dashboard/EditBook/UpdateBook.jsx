import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiEdit3,
  FiBookOpen,
  FiDollarSign,
  FiTag,
  FiImage,
  FiArrowLeft,
  FiSave,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import Swal from "sweetalert2";

import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";

import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";

import getBaseUrl from "../../../utils/baseURL";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: bookData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookByIdQuery(id);

  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const [imagePreview, setImagePreview] = useState("");

  const watchedOldPrice = watch("oldPrice");
  const watchedNewPrice = watch("newPrice");

  // ==========================================
  // LOAD EXISTING BOOK DATA
  // ==========================================

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title || "");
      setValue("author", bookData.author || "");
      setValue("description", bookData.description || "");
      setValue("category", bookData.category || "");
      setValue("trending", Boolean(bookData.trending));
      setValue("oldPrice", bookData.oldPrice || "");
      setValue("newPrice", bookData.newPrice || "");
      setValue("coverImage", bookData.coverImage || "");

      if (bookData.coverImage) {
        setImagePreview(bookData.coverImage);
      }
    }
  }, [bookData, setValue]);

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${getBaseUrl()}${image}`;
    }

    return `/books/${image}`;
  };

  // ==========================================
  // UPDATE BOOK
  // ==========================================

  const onSubmit = async (data) => {
    const oldPrice = Number(data.oldPrice);
    const newPrice = Number(data.newPrice);

    if (oldPrice < newPrice) {
      Swal.fire({
        title: "Invalid Price",
        text: "Old price should be greater than or equal to the new price.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    const updateBookData = {
      title: data.title,
      author: data.author,
      description: data.description,
      category: data.category,
      trending: Boolean(data.trending),
      oldPrice,
      newPrice,
      coverImage: data.coverImage || bookData.coverImage,
    };

    try {
      await updateBook({
        id,
        ...updateBookData,
      }).unwrap();

      await Swal.fire({
        title: "Book Updated!",
        text: `${data.title} has been updated successfully.`,
        icon: "success",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Great!",
      });

      await refetch();

      navigate("/dashboard/manage-books");
    } catch (error) {
      console.error("UPDATE BOOK ERROR:", error);

      Swal.fire({
        title: "Update Failed",
        text:
          error?.data?.message ||
          error?.error ||
          "Something went wrong while updating the book.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500 font-medium">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError || !bookData) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border">
          <FiBookOpen className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-800">
            Unable to load book
          </h2>

          <p className="text-gray-500 mt-2">
            The requested book could not be found.
          </p>

          <button
            onClick={() => navigate("/dashboard/manage-books")}
            className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Back to Manage Books
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // DISCOUNT
  // ==========================================

  const oldPrice = Number(watchedOldPrice || bookData.oldPrice || 0);
  const newPrice = Number(watchedNewPrice || bookData.newPrice || 0);

  const discount =
    oldPrice > 0 && newPrice < oldPrice
      ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto pb-10">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <FiEdit3 className="text-2xl" />
          </div>

          <div>
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest">
              Book Management
            </p>

            <h1 className="text-3xl font-bold text-gray-800">
              Edit Book
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Update the information of your existing book.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/manage-books")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition cursor-pointer"
        >
          <FiArrowLeft />
          Back to Books
        </button>

      </div>

      {/* ==========================================
          MAIN LAYOUT
      ========================================== */}

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ==========================================
              LEFT CONTENT
          ========================================== */}

          <div className="lg:col-span-8 space-y-6">

            {/* BOOK DETAILS */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FiBookOpen />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Book Details
                  </h2>

                  <p className="text-sm text-gray-500">
                    Modify the basic information of this book.
                  </p>
                </div>

              </div>

              <div className="p-6">

                <InputField
                  label="Book Title"
                  name="title"
                  placeholder="Enter book title"
                  register={register}
                  rules={{
                    required: "Book title is required",
                  }}
                />

                <InputField
                  label="Author"
                  name="author"
                  placeholder="Enter author name"
                  register={register}
                  rules={{
                    required: "Author name is required",
                  }}
                />

                <InputField
                  label="Description"
                  name="description"
                  placeholder="Write a short description..."
                  type="textarea"
                  register={register}
                  rules={{
                    required: "Description is required",
                  }}
                />

                <SelectField
                  label="Category"
                  name="category"
                  register={register}
                  rules={{
                    required: "Please select a category",
                  }}
                  options={[
                    {
                      value: "",
                      label: "Choose a category",
                    },
                    {
                      value: "business",
                      label: "Business",
                    },
                    {
                      value: "technology",
                      label: "Technology",
                    },
                    {
                      value: "fiction",
                      label: "Fiction",
                    },
                    {
                      value: "horror",
                      label: "Horror",
                    },
                    {
                      value: "adventure",
                      label: "Adventure",
                    },
                    {
                      value: "romance",
                      label: "Romance",
                    },
                    {
                      value: "self-help",
                      label: "Self Help",
                    },
                    {
                      value: "history",
                      label: "History",
                    },
                    {
                      value: "science",
                      label: "Science",
                    },
                    {
                      value: "biography",
                      label: "Biography",
                    },
                    {
                      value: "education",
                      label: "Education",
                    },
                  ]}
                />

              </div>

            </div>

            {/* PRICING */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FiDollarSign />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Pricing
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update the book pricing information.
                  </p>
                </div>

              </div>

              <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old price"
                    register={register}
                    rules={{
                      required: "Old price is required",
                      min: {
                        value: 0,
                        message: "Price cannot be negative",
                      },
                    }}
                  />

                  <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New price"
                    register={register}
                    rules={{
                      required: "New price is required",
                      min: {
                        value: 0,
                        message: "Price cannot be negative",
                      },
                    }}
                  />

                </div>

                {/* DISCOUNT */}

                {discount > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-sm">

                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                      {discount}% OFF
                    </span>

                    <span className="text-gray-500">
                      Current discount based on the updated price.
                    </span>

                  </div>
                )}

              </div>

            </div>

            {/* COVER IMAGE URL */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FiImage />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Book Cover
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update the cover image reference.
                  </p>
                </div>

              </div>

              <div className="p-6">

                <InputField
                  label="Cover Image"
                  name="coverImage"
                  type="text"
                  placeholder="Enter image filename or URL"
                  register={register}
                  rules={{
                    required: "Cover image is required",
                  }}
                />

                <p className="text-xs text-gray-400 mt-1">
                  Example: book-cover.jpg
                </p>

              </div>

            </div>

          </div>

          {/* ==========================================
              RIGHT SIDEBAR
          ========================================== */}

          <div className="lg:col-span-4 space-y-6">

            {/* CURRENT BOOK */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="px-5 py-4 border-b border-gray-100">

                <div className="flex items-center gap-2">

                  <FiBookOpen className="text-indigo-600" />

                  <h3 className="font-bold text-gray-800">
                    Current Book
                  </h3>

                </div>

              </div>

              {/* COVER */}

              <div className="p-5">

                <div className="relative h-72 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">

                  {imagePreview ? (
                    <img
                      src={getImageUrl(imagePreview)}
                      alt={bookData.title}
                      className="w-full h-full object-contain p-5"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="text-center">
                      <FiImage className="text-5xl text-gray-300 mx-auto" />

                      <p className="text-gray-400 text-sm mt-2">
                        No cover image
                      </p>
                    </div>
                  )}

                </div>

                {/* TITLE */}

                <h3 className="font-bold text-xl text-gray-800 mt-5">
                  {bookData.title}
                </h3>

                {bookData.author && (
                  <p className="text-sm text-gray-500 mt-1">
                    by {bookData.author}
                  </p>
                )}

                {/* CATEGORY */}

                <div className="flex items-center gap-2 mt-4">

                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold capitalize">
                    {bookData.category}
                  </span>

                  {bookData.trending && (
                    <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-semibold flex items-center gap-1">
                      <FiTrendingUp />
                      Trending
                    </span>
                  )}

                </div>

              </div>

            </div>

            {/* PRICE PREVIEW */}

            <div className="bg-slate-900 rounded-2xl p-6 text-white">

              <div className="flex items-center gap-2 mb-5">

                <FiDollarSign className="text-emerald-400" />

                <h3 className="font-bold">
                  Price Preview
                </h3>

              </div>

              <div className="flex items-end gap-3">

                <span className="text-3xl font-extrabold">
                  ${newPrice || 0}
                </span>

                {oldPrice > newPrice && (
                  <span className="text-gray-400 line-through mb-1">
                    ${oldPrice}
                  </span>
                )}

              </div>

              {discount > 0 && (
                <p className="text-emerald-400 text-sm font-semibold mt-2">
                  Customer saves {discount}%
                </p>
              )}

            </div>

            {/* TRENDING */}

            <label className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <FiTag />
                  </div>

                  <div>
                    <p className="font-bold text-gray-800">
                      Trending Book
                    </p>

                    <p className="text-xs text-gray-500">
                      Show this book as trending.
                    </p>
                  </div>

                </div>

                <input
                  type="checkbox"
                  {...register("trending")}
                  className="w-5 h-5 accent-orange-500 cursor-pointer"
                />

              </div>

            </label>

            {/* UPDATE BUTTON */}

            <div className="bg-blue-600 rounded-2xl p-5 shadow-lg">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-lg bg-white/15 text-white flex items-center justify-center">
                  <FiSave />
                </div>

                <div>
                  <h3 className="text-white font-bold">
                    Save Changes
                  </h3>

                  <p className="text-blue-100 text-xs">
                    Update this book in your store.
                  </p>
                </div>

              </div>

              <button
                type="submit"
                disabled={updating}
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-white
                  text-blue-600
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-blue-50
                  transition
                  cursor-pointer
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >

                {updating ? (
                  <>
                    <span className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Update Book
                  </>
                )}

              </button>

            </div>

            {/* LAST UPDATED */}

            <div className="flex items-center gap-3 px-2 text-gray-400 text-xs">

              <FiCalendar />

              <span>
                Editing existing book #{id?.slice(-6)}
              </span>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
};

export default UpdateBook;