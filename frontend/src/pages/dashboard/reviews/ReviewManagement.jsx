import React, { useMemo, useState } from "react";

import {
  FiStar,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiMessageSquare,
  FiUser,
  FiBookOpen,
  FiCalendar,
} from "react-icons/fi";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import {
  useGetAllReviewsForAdminQuery,
  useDeleteReviewByAdminMutation,
} from "../../../redux/features/reviews/reviewsApi";


const ReviewManagement = () => {

  // =========================================================
  // STATE
  // =========================================================

  const [search, setSearch] = useState("");

  const [ratingFilter, setRatingFilter] = useState("all");

  const [deletingReviewId, setDeletingReviewId] = useState(null);


  // =========================================================
  // GET ALL REVIEWS
  // =========================================================

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllReviewsForAdminQuery();


  // =========================================================
  // DELETE REVIEW
  // =========================================================

  const [
    deleteReview,
    {
      isLoading: isDeleting,
    },
  ] = useDeleteReviewByAdminMutation();


  // =========================================================
  // FILTER REVIEWS
  // =========================================================

  const filteredReviews = useMemo(() => {

    if (!Array.isArray(reviews)) {
      return [];
    }

    return reviews.filter((review) => {

      const searchText = search
        .toLowerCase()
        .trim();


      const userName =
        review?.userName
          ?.toLowerCase() || "";


      const userEmail =
        review?.userEmail
          ?.toLowerCase() || "";


      const comment =
        review?.comment
          ?.toLowerCase() || "";


      const bookTitle =
        review?.bookId?.title
          ?.toLowerCase() || "";


      const matchesSearch =
        !searchText ||
        userName.includes(searchText) ||
        userEmail.includes(searchText) ||
        comment.includes(searchText) ||
        bookTitle.includes(searchText);


      const matchesRating =
        ratingFilter === "all" ||
        Number(review?.rating) ===
          Number(ratingFilter);


      return (
        matchesSearch &&
        matchesRating
      );
    });

  }, [reviews, search, ratingFilter]);


  // =========================================================
  // DELETE HANDLER
  // =========================================================

  const handleDeleteReview = async (review) => {

    const result = await Swal.fire({

      title: "Delete Review?",

      text:
        "This review will be permanently deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#64748b",

      confirmButtonText: "Delete",

      cancelButtonText: "Cancel",

      reverseButtons: true,

      focusCancel: true,

    });


    if (!result.isConfirmed) {
      return;
    }


    try {

      setDeletingReviewId(review._id);


      await deleteReview(
        review._id
      ).unwrap();


      await Swal.fire({

        title: "Deleted!",

        text:
          "The review has been deleted successfully.",

        icon: "success",

        confirmButtonColor: "#2563eb",

        timer: 1800,

        showConfirmButton: false,

      });

    } catch (error) {

      console.error(
        "Admin delete review error:",
        error
      );


      Swal.fire({

        title: "Unable to Delete",

        text:
          error?.data?.message ||
          "Something went wrong while deleting the review.",

        icon: "error",

        confirmButtonColor: "#2563eb",

      });

    } finally {

      setDeletingReviewId(null);

    }

  };


  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="text-center">

          <div
            className="
              w-12
              h-12
              border-4
              border-blue-100
              border-t-blue-600
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="text-slate-500 font-medium">
            Loading reviews...
          </p>

        </div>

      </div>

    );

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (isError) {

    return (

      <div
        className="
          min-h-[60vh]
          flex
          items-center
          justify-center
          px-6
        "
      >

        <div className="text-center">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-red-50
              text-red-500
              flex
              items-center
              justify-center
              mx-auto
              mb-5
            "
          >

            <FiMessageSquare className="text-2xl" />

          </div>


          <h2
            className="
              text-2xl
              font-black
              text-slate-800
            "
          >
            Failed to load reviews
          </h2>


          <p className="text-slate-500 mt-2">

            Please check your server and try again.

          </p>


          <button
            onClick={refetch}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              transition-all
              cursor-pointer
            "
          >

            <FiRefreshCw />

            Try Again

          </button>

        </div>

      </div>

    );

  }


  // =========================================================
  // MAIN
  // =========================================================

  return (

    <div className="space-y-7">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>

            <p
              className="
                text-blue-600
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                mb-2
              "
            >
              Customer Feedback
            </p>


            <h2
              className="
                text-3xl
                sm:text-4xl
                font-black
                text-slate-800
              "
            >
              Manage Reviews
            </h2>


            <p
              className="
                text-slate-500
                mt-2
                max-w-2xl
              "
            >
              View and manage reviews submitted by
              customers for your books.
            </p>

          </div>


          {/* TOTAL */}

          <div
            className="
              flex
              items-center
              gap-3
              bg-white
              border
              border-slate-200
              rounded-2xl
              px-5
              py-4
              shadow-sm
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
              "
            >

              <FiMessageSquare className="text-xl" />

            </div>


            <div>

              <p className="text-xs text-slate-400 font-medium">
                Total Reviews
              </p>

              <p className="text-xl font-black text-slate-800">
                {reviews.length}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-4
          sm:p-5
          shadow-sm
        "
      >

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <FiSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />


            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by user, email, book or review..."
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                outline-none
                text-sm
                text-slate-700
                placeholder:text-slate-400
                focus:bg-white
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                transition-all
              "
            />

          </div>


          {/* RATING FILTER */}

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
            className="
              md:w-48
              px-4
              py-3
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-sm
              font-medium
              text-slate-700
              outline-none
              focus:bg-white
              focus:border-blue-500
              cursor-pointer
            "
          >

            <option value="all">
              All Ratings
            </option>

            <option value="5">
              5 Stars
            </option>

            <option value="4">
              4 Stars
            </option>

            <option value="3">
              3 Stars
            </option>

            <option value="2">
              2 Stars
            </option>

            <option value="1">
              1 Star
            </option>

          </select>


          {/* REFRESH */}

          <button
            onClick={refetch}
            className="
              px-4
              py-3
              rounded-xl
              border
              border-slate-200
              bg-white
              hover:bg-slate-50
              text-slate-600
              hover:text-blue-600
              flex
              items-center
              justify-center
              gap-2
              font-semibold
              text-sm
              transition-all
              cursor-pointer
            "
          >

            <FiRefreshCw />

            Refresh

          </button>

        </div>

      </div>


      {/* =====================================================
          RESULT COUNT
      ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div>

          <h3
            className="
              text-xl
              font-black
              text-slate-800
            "
          >
            Customer Reviews
          </h3>

          <p className="text-sm text-slate-500 mt-1">

            Showing {filteredReviews.length}{" "}

            {filteredReviews.length === 1
              ? "review"
              : "reviews"}

          </p>

        </div>

      </div>


      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredReviews.length === 0 ? (

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            p-12
            text-center
            shadow-sm
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-slate-100
              text-slate-400
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >

            <FiMessageSquare className="text-2xl" />

          </div>


          <h4
            className="
              text-lg
              font-bold
              text-slate-700
            "
          >
            No reviews found
          </h4>


          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >
            Try changing your search or filter.
          </p>

        </div>

      ) : (

        /* ===================================================
           REVIEWS
        =================================================== */

        <div className="space-y-4">

          {filteredReviews.map((review, index) => {

            const isThisReviewDeleting =
              isDeleting &&
              deletingReviewId === review._id;


            return (

              <motion.div
                key={review._id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.03,
                }}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  p-5
                  sm:p-6
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                "
              >

                {/* =================================================
                    TOP
                ================================================= */}

                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    gap-4
                  "
                >

                  {/* USER */}

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                        flex
                        items-center
                        justify-center
                        font-black
                        text-lg
                        shrink-0
                      "
                    >

                      {review?.userName
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}

                    </div>


                    <div className="min-w-0">

                      <h4
                        className="
                          font-bold
                          text-slate-800
                          truncate
                        "
                      >
                        {review?.userName ||
                          "Unknown User"}
                      </h4>


                      <p
                        className="
                          text-sm
                          text-slate-400
                          truncate
                        "
                      >
                        {review?.userEmail ||
                          "No email available"}
                      </p>

                    </div>

                  </div>


                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDeleteReview(review)
                    }
                    disabled={isThisReviewDeleting}
                    className="
                      self-start
                      flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      bg-red-50
                      hover:bg-red-500
                      text-red-500
                      hover:text-white
                      border
                      border-red-100
                      hover:border-red-500
                      transition-all
                      font-semibold
                      text-sm
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      cursor-pointer
                    "
                  >

                    {isThisReviewDeleting ? (

                      <>
                        <span
                          className="
                            w-4
                            h-4
                            border-2
                            border-red-300
                            border-t-red-500
                            rounded-full
                            animate-spin
                          "
                        />

                        Deleting...

                      </>

                    ) : (

                      <>
                        <FiTrash2 />

                        Delete

                      </>

                    )}

                  </button>

                </div>


                {/* =================================================
                    BOOK
                ================================================= */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-100
                  "
                >

                  <div
                    className="
                      w-9
                      h-9
                      rounded-lg
                      bg-white
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      shadow-sm
                    "
                  >

                    <FiBookOpen />

                  </div>


                  <div className="min-w-0">

                    <p className="text-xs text-slate-400">
                      Book
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-700
                        truncate
                      "
                    >

                      {review?.bookId?.title ||
                        "Book information unavailable"}

                    </p>

                  </div>

                </div>


                {/* =================================================
                    RATING + DATE
                ================================================= */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-4
                    mt-5
                  "
                >

                  {/* STARS */}

                  <div className="flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <FiStar
                          key={star}
                          className={
                            star <=
                            Number(
                              review?.rating || 0
                            )
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }
                        />

                      )
                    )}

                  </div>


                  <span
                    className="
                      text-sm
                      font-bold
                      text-slate-700
                    "
                  >
                    {review?.rating || 0}/5
                  </span>


                  {/* DATE */}

                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-xs
                      text-slate-400
                    "
                  >

                    <FiCalendar />

                    {review?.createdAt
                      ? new Date(
                          review.createdAt
                        ).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "Unknown date"}

                  </span>

                </div>


                {/* =================================================
                    COMMENT
                ================================================= */}

                <div
                  className="
                    mt-4
                    pl-4
                    border-l-4
                    border-blue-100
                  "
                >

                  <p
                    className="
                      text-slate-600
                      leading-relaxed
                    "
                  >
                    {review?.comment ||
                      "No written comment."}
                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

      )}

    </div>

  );
};


export default ReviewManagement;