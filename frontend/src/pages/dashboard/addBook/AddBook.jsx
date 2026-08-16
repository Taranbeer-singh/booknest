import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiBookOpen,
  FiUploadCloud,
  FiCheckCircle,
  FiImage,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import InputField from "./InputField";
import SelectField from "./SelectField";

import { useAddBookMutation } from "../../../redux/features/books/booksApi";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      category: "",
      trending: false,
      oldPrice: "",
      newPrice: "",
    },
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [addBook, { isLoading }] = useAddBookMutation();

  // =========================
  // SUBMIT BOOK
  // =========================
  const onSubmit = async (data) => {
    // Image check
    if (!imageFile) {
      Swal.fire({
        title: "Cover Image Required",
        text: "Please select a cover image.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    const oldPrice = Number(data.oldPrice);
    const newPrice = Number(data.newPrice);

    // Price validation
    if (oldPrice < newPrice) {
      Swal.fire({
        title: "Invalid Price",
        text: "Old price should be greater than or equal to the new price.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    try {
      // ==========================================
      // CREATE FORMDATA
      // ==========================================

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("trending", data.trending ? "true" : "false");
      formData.append("oldPrice", oldPrice);
      formData.append("newPrice", newPrice);

      // IMPORTANT:
      // Send the actual image file
      formData.append("coverImage", imageFile);

      // console.log("BOOK DATA:", data);
      // console.log("IMAGE FILE:", imageFile);

      // ==========================================
      // SEND BOOK + IMAGE TO BACKEND
      // ==========================================

      const response = await addBook(formData).unwrap();

      // console.log("BOOK ADDED:", response);

      await Swal.fire({
        title: "Book Added Successfully!",
        text: `${data.title} has been added to the bookstore.`,
        icon: "success",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Great!",
      });

      // ==========================================
      // RESET FORM
      // ==========================================

      reset();

      setImageFile(null);
      setImageFileName("");
      setImagePreview("");

    } catch (error) {
      console.error("ADD BOOK ERROR:", error);

      Swal.fire({
        title: "Failed to Add Book",
        text:
          error?.data?.message ||
          error?.error ||
          "Something went wrong while adding the book.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // =========================
  // IMAGE SELECT
  // =========================
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check image
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        title: "Invalid File",
        text: "Please select an image file.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        title: "Image Too Large",
        text: "Please select an image smaller than 5MB.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    setImageFile(file);
    setImageFileName(file.name);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================
  // REMOVE IMAGE
  // =========================
  const handleRemoveImage = () => {
    setImageFile(null);
    setImageFileName("");
    setImagePreview("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FiBookOpen className="text-2xl" />
          </div>

          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Book Management
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Add New Book
            </h1>
          </div>
        </div>

        <p className="text-gray-500 max-w-2xl">
          Add a new book to your bookstore by entering its details,
          pricing, category and cover image.
        </p>
      </div>

      {/* ================= FORM ================= */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================= LEFT SIDE ================= */}

          <div className="lg:col-span-2 space-y-6">

            {/* BOOK INFORMATION */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiBookOpen />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Book Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Enter the basic information of your book.
                  </p>
                </div>
              </div>

              {/* TITLE */}

              <InputField
                label="Book Title"
                name="title"
                placeholder="Enter book title"
                register={register}
                errors={errors}
                rules={{
                  required: "Book title is required",
                  minLength: {
                    value: 2,
                    message: "Title must contain at least 2 characters",
                  },
                }}
              />

              {/* AUTHOR */}

              <InputField
                label="Author"
                name="author"
                placeholder="Enter author name"
                register={register}
                errors={errors}
                rules={{
                  required: "Author name is required",
                  minLength: {
                    value: 2,
                    message:
                      "Author name must contain at least 2 characters",
                  },
                }}
              />

              {/* DESCRIPTION */}

              <InputField
                label="Description"
                name="description"
                placeholder="Write a short description about the book..."
                type="textarea"
                register={register}
                errors={errors}
                rules={{
                  required: "Book description is required",
                  minLength: {
                    value: 10,
                    message:
                      "Description must contain at least 10 characters",
                  },
                }}
              />

              {/* CATEGORY */}

              <SelectField
                label="Category"
                name="category"
                register={register}
                errors={errors}
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

              {/* TRENDING */}

              <div className="mt-5">
                <label
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    p-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    cursor-pointer
                    hover:bg-blue-50
                    hover:border-blue-200
                    transition-all
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <FiTag />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        Trending Book
                      </p>

                      <p className="text-xs text-gray-500">
                        Mark this book as trending.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    {...register("trending")}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                </label>
              </div>
            </motion.div>

            {/* ================= PRICING ================= */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <FiDollarSign />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Pricing
                  </h2>

                  <p className="text-sm text-gray-500">
                    Set the original and selling price.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <InputField
                  label="Old Price"
                  name="oldPrice"
                  type="number"
                  placeholder="e.g. 49.99"
                  register={register}
                  errors={errors}
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
                  placeholder="e.g. 29.99"
                  register={register}
                  errors={errors}
                  rules={{
                    required: "New price is required",
                    min: {
                      value: 0,
                      message: "Price cannot be negative",
                    },
                  }}
                />

              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-6">

            {/* IMAGE */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FiImage />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Cover Image
                  </h2>

                  <p className="text-sm text-gray-500">
                    Upload book cover.
                  </p>
                </div>

              </div>

              {/* IMAGE PREVIEW */}

              <div
                className="
                  relative
                  w-full
                  h-72
                  rounded-2xl
                  border-2
                  border-dashed
                  border-gray-200
                  bg-gray-50
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >

                {imagePreview ? (

                  <img
                    src={imagePreview}
                    alt="Book preview"
                    className="w-full h-full object-contain p-4"
                  />

                ) : (

                  <div className="text-center px-5">

                    <FiUploadCloud className="text-5xl text-gray-300 mx-auto mb-3" />

                    <p className="font-semibold text-gray-600">
                      Upload Cover Image
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG or JPEG
                    </p>

                  </div>

                )}

              </div>

              {/* FILE INPUT */}

              <label
                className="
                  mt-4
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-semibold
                  cursor-pointer
                  transition-colors
                "
              >

                <FiUploadCloud />

                {imageFileName ? "Change Image" : "Choose Image"}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

              {/* FILE NAME */}

              {imageFileName && (

                <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-100">

                  <div className="flex items-center gap-2">

                    <FiCheckCircle className="text-green-600 flex-shrink-0" />

                    <p className="text-sm font-medium text-green-700 break-all">
                      {imageFileName}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="
                      mt-2
                      text-xs
                      text-red-500
                      hover:text-red-600
                      font-medium
                      cursor-pointer
                    "
                  >
                    Remove image
                  </button>

                </div>

              )}

            </motion.div>

            {/* ================= PUBLISH ================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-900 rounded-2xl p-6 shadow-lg"
            >

              <h3 className="text-white text-lg font-bold">
                Ready to publish?
              </h3>

              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Review all the information and add this book to your
                bookstore.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full
                  mt-5
                  py-3.5
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-500
                  disabled:bg-gray-600
                  text-white
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-300
                  cursor-pointer
                  disabled:cursor-not-allowed
                "
              >

                {isLoading ? (

                  <>
                    <span
                      className="
                        w-5
                        h-5
                        border-2
                        border-white/30
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />

                    Adding Book...
                  </>

                ) : (

                  <>
                    <FiCheckCircle />

                    Add Book
                  </>

                )}

              </button>

            </motion.div>

          </div>

        </div>
      </form>
    </motion.div>
  );
};

export default AddBook;