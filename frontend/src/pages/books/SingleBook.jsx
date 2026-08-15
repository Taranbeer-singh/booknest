import React, { useState } from "react";
import {
  FiShoppingCart,
  FiArrowLeft,
  FiStar,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";

import {
  useGetBookReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
} from "../../redux/features/reviews/reviewsApi";

import { useAuth } from "../../context/AuthContext";

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  // BOOK
  const {
    data: book,
    isLoading,
    isError,
  } = useFetchBookByIdQuery(id, { skip: !id });

  // REVIEWS
  const { data: reviews = [], isLoading: reviewsLoading } =
    useGetBookReviewsQuery(id, { skip: !id });

  const [addReview, { isLoading: isSubmitting }] =
    useAddReviewMutation();

  const [deleteReview] = useDeleteReviewMutation();

  // REVIEW FORM
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // ADD TO CART
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  // SUBMIT REVIEW
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to write a review.",
        confirmButtonColor: "#2563eb",
        width: "360px",
      });
    }

    if (!rating) {
      return Swal.fire({
        icon: "warning",
        title: "Select a Rating",
        text: "Please select between 1 and 5 stars.",
        confirmButtonColor: "#2563eb",
        width: "360px",
      });
    }

    try {
      await addReview({
        bookId: id,
        userId:
          currentUser.uid ||
          currentUser._id ||
          currentUser.email,
        userName:
          currentUser.displayName ||
          currentUser.name ||
          currentUser.email?.split("@")[0] ||
          "User",
        userEmail: currentUser.email,
        rating,
        comment: comment.trim(),
      }).unwrap();

      setRating(0);
      setComment("");

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Review added",
        showConfirmButton: false,
        timer: 1600,
      });
    } catch (error) {
      console.error("Review error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to add review",
        text:
          error?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonColor: "#2563eb",
        width: "360px",
      });
    }
  };

  // DELETE REVIEW
  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete review?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      width: "340px",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteReview(reviewId).unwrap();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Review deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Delete review error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete review.",
        confirmButtonColor: "#2563eb",
        width: "340px",
      });
    }
  };

  // LOADING
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading book...
      </div>
    );
  }

  // ERROR
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Error loading book
          </h2>
          <p className="text-gray-500 mt-2">
            Something went wrong while loading this book.
          </p>
        </div>
      </div>
    );
  }

  // NOT FOUND
  if (!book) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Book not found
          </h2>

          <Link
            to="/all-books"
            className="inline-block mt-4 text-blue-600 font-medium"
          >
            Browse all books →
          </Link>
        </div>
      </div>
    );
  }

  // AVERAGE RATING
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + Number(review.rating || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      {/* BACK */}
      <Link
        to="/all-books"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-7"
      >
        <FiArrowLeft />
        Back to books
      </Link>

      {/* BOOK */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 p-6 md:p-10">

          {/* IMAGE */}
          <div className="flex items-center justify-center bg-gray-50 rounded-2xl min-h-[420px] overflow-hidden">
            <motion.img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="max-w-[80%] max-h-[440px] object-contain drop-shadow-xl"
              whileHover={{ scale: 1.04 }}
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            <span className="self-start bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold capitalize mb-4">
              {book.category || "Book"}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
              {book.title}
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              By{" "}
              <span className="font-semibold text-gray-700">
                {book.author || "Admin"}
              </span>
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl font-bold text-blue-600">
                ${book.newPrice}
              </span>

              {book.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${book.oldPrice}
                </span>
              )}
            </div>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={
                      star <= Math.round(Number(averageRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="font-semibold text-gray-700">
                {averageRating}
              </span>

              <span className="text-gray-400 text-sm">
                ({reviews.length} reviews)
              </span>
            </div>

            <div className="h-px bg-gray-100 my-7" />

            {/* INFO */}
            <div className="grid grid-cols-2 gap-4 mb-7">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs uppercase text-gray-400">
                  Category
                </p>

                <p className="font-semibold text-gray-700 capitalize mt-1">
                  {book.category || "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs uppercase text-gray-400">
                  Published
                </p>

                <p className="font-semibold text-gray-700 mt-1">
                  {book.createdAt
                    ? new Date(book.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                About this book
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {book.description || "No description available."}
              </p>
            </div>

            {/* CART */}
            <motion.button
              onClick={() => handleAddToCart(book)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-lg shadow-md transition-all cursor-pointer"
            >
              <FiShoppingCart />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="mt-12">

        <div className="mb-7">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
            Community Reviews
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            What Readers Think
          </h2>

          <p className="text-gray-500 mt-2">
            See what other readers have to say about this book.
          </p>
        </div>

        {/* WRITE REVIEW */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 mb-8">

          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Write a Review
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Rate this book and share your thoughts.
              </p>
            </div>

            <span className="hidden sm:block text-yellow-500 font-semibold">
              {rating}/5
            </span>
          </div>

          {/* STARS */}
          <div className="flex gap-2 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="cursor-pointer"
              >
                <FiStar
                  className={`text-3xl transition ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* COMMENT OPTIONAL */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a review (optional)..."
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none resize-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">
              Optional
            </span>

            <span className="text-xs text-gray-400">
              {comment.length}/500
            </span>
          </div>

          {/* SUBMIT */}
          <motion.button
            onClick={handleSubmitReview}
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="mt-5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 font-semibold shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <FiSend />
                Submit Review
              </>
            )}
          </motion.button>
        </div>

        {/* REVIEW LIST */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold text-gray-800">
              Customer Reviews
            </h3>

            <span className="text-sm text-gray-500">
              {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>

          {reviewsLoading ? (
            <div className="py-10 text-center text-gray-500">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
              <FiStar className="mx-auto text-4xl text-gray-300 mb-3" />

              <h4 className="text-lg font-semibold text-gray-700">
                No reviews yet
              </h4>

              <p className="text-gray-500 mt-1">
                Be the first person to review this book.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex justify-between">

                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {review.userName
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {review.userName}
                        </h4>

                        <p className="text-xs text-gray-400">
                          {review.createdAt
                            ? new Date(
                                review.createdAt
                              ).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                    </div>

                    {/* DELETE */}
                    {currentUser &&
                      (currentUser.uid === review.userId ||
                        currentUser.email === review.userEmail) && (
                        <button
                          onClick={() =>
                            handleDeleteReview(review._id)
                          }
                          className="text-gray-400 hover:text-red-500 cursor-pointer"
                          title="Delete review"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                  </div>

                  {/* RATING */}
                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* COMMENT */}
                  {review.comment && (
                    <p className="text-gray-600 leading-relaxed mt-3">
                      {review.comment}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.main>
  );
};

export default SingleBook;