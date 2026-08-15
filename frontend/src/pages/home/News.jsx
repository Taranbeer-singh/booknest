import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "swiper/css";

import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";
import news5 from "../../assets/news/news-5.png";

const news = [
  {
    id: 1,
    title: "Global Climate Summit Calls for Urgent Action",
    description:
      "World leaders gather at the Global Climate Summit to discuss urgent strategies...",
    image: news1,
  },
  {
    id: 2,
    title: "Breakthrough in AI Technology Announced",
    description:
      "A major breakthrough in artificial intelligence has been announced...",
    image: news2,
  },
  {
    id: 3,
    title: "New Space Mission Aims to Explore Distant Galaxies",
    description:
      "NASA has unveiled plans for a new space mission that will aim to explore...",
    image: news3,
  },
  {
    id: 4,
    title: "Stock Markets Reach Record Highs Amid Economic Recovery",
    description:
      "Global stock markets have reached record highs as signs of economic recovery...",
    image: news4,
  },
  {
    id: 5,
    title: "Innovative New Smartphone Released by Leading Tech Company",
    description:
      "A leading tech company has released its latest smartphone model...",
    image: news5,
  },
];

const News = () => {
  const swiperRef = useRef(null);

  return (
    <section className="py-10">

      {/* Heading */}
      <div className="mb-7">

        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Latest updates
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mt-2">
          News & Stories
        </h2>

        <p className="text-gray-500 mt-2 max-w-xl text-sm md:text-base">
          Stay updated with the latest stories, ideas and developments
          from around the world.
        </p>

      </div>

      {/* Slider */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        className="newsSwiper"
      >

        {news.map((item) => (
          <SwiperSlide key={item.id}>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="h-[210px] bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >

              <div className="flex h-full">

                {/* Text */}
                <div className="flex-1 p-5 flex flex-col justify-between min-w-0">

                  <div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                        Latest
                      </span>

                      <FiArrowUpRight className="text-gray-400" />
                    </div>

                    <Link to="/">
                      <h3 className="text-base md:text-lg font-bold text-gray-800 leading-snug hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-xs md:text-sm text-gray-500 leading-5 mt-2 line-clamp-2">
                      {item.description}
                    </p>

                  </div>

                  <Link
                    to="/"
                    className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    Read more →
                  </Link>

                </div>

                {/* Small Image */}
                <div className="w-[125px] sm:w-[145px] flex-shrink-0 p-3">

                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-xl bg-gray-50"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />

                </div>

              </div>

            </motion.div>

          </SwiperSlide>
        ))}

      </Swiper>

      {/* Bottom Controls */}
      <div className="flex justify-center items-center gap-3 mt-7">

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="group w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 cursor-pointer"
        >
          <FiArrowLeft className="text-base group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="group w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 cursor-pointer"
        >
          <FiArrowRight className="text-base group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>

    </section>
  );
};

export default News;