import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "All Books",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
  "Poetry",
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Books");

  const { data: books = [] } = useFetchAllBooksQuery();

  // Custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Category filter
  const filteredBooks =
    selectedCategory === "All Books"
      ? books
      : books.filter(
          (book) =>
            book.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">

        {/* Left */}
        <div>
          <p className="text-blue-600 font-semibold tracking-[0.25em] text-sm uppercase mb-3">
            Popular Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            Top Sellers
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Explore the books readers are loving right now.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Category Select */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="
                min-w-[150px]
                px-5
                py-3
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                text-gray-700
                font-medium
                text-base
                cursor-pointer
                outline-none
                transition-all
                duration-300
                hover:bg-blue-50
                hover:border-blue-300
                hover:text-blue-600
                focus:bg-white
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </motion.div>

          {/* View All */}
          <Link to="/all-books">
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{ scale: 0.96 }}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                px-6
                py-3
                rounded-xl
                shadow-md
                hover:shadow-lg
                transition-all
                duration-300
                cursor-pointer
                whitespace-nowrap
              "
            >
              View All
              <span className="ml-2">→</span>
            </motion.button>
          </Link>

        </div>
      </div>

      {/* ================= BOOK SLIDER ================= */}
      {filteredBooks.length > 0 ? (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 35,
              },
              1180: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="topSellersSwiper"
          >
            {filteredBooks.map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ================= CUSTOM SLIDER BUTTONS ================= */}
          <div className="flex justify-center items-center gap-4 mt-6">

            <motion.button
              ref={prevRef}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="
                w-11
                h-11
                rounded-full
                border
                border-gray-200
                bg-white
                text-gray-600
                flex
                items-center
                justify-center
                shadow-sm
                hover:bg-blue-600
                hover:text-white
                hover:border-blue-600
                transition-all
                duration-300
                cursor-pointer
              "
              aria-label="Previous books"
            >
              <FiChevronLeft className="text-xl" />
            </motion.button>

            <motion.button
              ref={nextRef}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="
                w-11
                h-11
                rounded-full
                border
                border-gray-200
                bg-white
                text-gray-600
                flex
                items-center
                justify-center
                shadow-sm
                hover:bg-blue-600
                hover:text-white
                hover:border-blue-600
                transition-all
                duration-300
                cursor-pointer
              "
              aria-label="Next books"
            >
              <FiChevronRight className="text-xl" />
            </motion.button>

          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-700">
            No books found
          </h3>

          <p className="text-gray-500 mt-2">
            Try selecting another category.
          </p>
        </div>
      )}

    </section>
  );
};

export default TopSellers;