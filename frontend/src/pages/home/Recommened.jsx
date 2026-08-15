import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";

import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const Recommened = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  const swiperRef = useRef(null);

  return (
    <section className="pt-2 pb-6">

      {/* Light Premium Container */}
      <div className="bg-[#F8FAFF] border border-blue-50 rounded-3xl px-6 md:px-10 py-6">

        {/* Section Header */}
        <div className="mb-10">

          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
            Handpicked for you
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
                Recommended for You
              </h2>

              <p className="text-gray-500 mt-3">
                Books you might love based on what readers enjoy.
              </p>
            </div>

          </div>
        </div>

        {/* Books Slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },

            1180: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="recommendedSwiper"
        >

          {books.length > 0 &&
            books.slice(8, 18).map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}

        </Swiper>

        {/* Slider Controls */}
        <div className="flex justify-center items-center gap-3 mt-10">

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="group w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <FiArrowLeft className="text-lg group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="group w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <FiArrowRight className="text-lg group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>

    </section>
  );
};

export default Recommened;