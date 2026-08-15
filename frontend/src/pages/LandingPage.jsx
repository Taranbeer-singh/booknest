import React from "react";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiSearch,
  FiHeart,
  FiRefreshCw,
  FiStar,
  FiShoppingCart,
  FiCheckCircle,
  FiArrowRight,
  FiCompass,
  FiGift,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const features = [
  {
    id: 1,
    icon: FiBookOpen,
    title: "Curated Book Collection",
    desc: "Discover carefully selected books across fiction, technology, self-help, romance and more.",
  },
  {
    id: 2,
    icon: FiSearch,
    title: "Easy Book Discovery",
    desc: "Find your next favourite book quickly with simple search, categories and trending collections.",
  },
  {
    id: 3,
    icon: FiTruck,
    title: "Reliable Delivery",
    desc: "Order your favourite books and get them delivered right to your doorstep.",
  },
  {
    id: 4,
    icon: FiShield,
    title: "Secure Shopping",
    desc: "Your account and order information are handled with care throughout your shopping journey.",
  },
  {
    id: 5,
    icon: FiHeart,
    title: "Books You'll Love",
    desc: "Explore popular and trending titles that make discovering your next read easier.",
  },
  {
    id: 6,
    icon: FiHeadphones,
    title: "Reader Support",
    desc: "Need help with an order or finding a book? We're here to make your experience easier.",
  },
];

const stats = [
  {
    value: "500+",
    label: "Books Available",
    icon: FiBookOpen,
  },
  {
    value: "20+",
    label: "Book Categories",
    icon: FiCompass,
  },
  {
    value: "1K+",
    label: "Happy Readers",
    icon: FiHeart,
  },
  {
    value: "24/7",
    label: "Online Access",
    icon: FiStar,
  },
];

const steps = [
  {
    id: 1,
    number: "01",
    icon: FiSearch,
    title: "Discover",
    desc: "Browse our collection, explore categories or search for the book you're looking for.",
  },
  {
    id: 2,
    number: "02",
    icon: FiShoppingCart,
    title: "Add to Cart",
    desc: "Found something you like? Add it to your cart and review your selected books.",
  },
  {
    id: 3,
    number: "03",
    icon: FiGift,
    title: "Place Your Order",
    desc: "Enter your delivery details, place your order and wait for your books to arrive.",
  },
];

const highlights = [
  "Simple and clean shopping experience",
  "Books across multiple categories",
  "Easy order tracking",
  "Curated and trending collections",
  "Responsive experience on every device",
  "Designed for people who love reading",
];

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const LandingPage = () => {
  return (
    <main className="bg-slate-50 overflow-hidden">

      {/* =========================================================
          HERO
      ========================================================= */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative px-6 md:px-16 py-20 md:py-28"
      >
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6"
          >
            <FiBookOpen />
            <span>More than just a bookstore</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight"
          >
            Discover stories.
            <br />

            <span className="text-blue-600">
              Find your next favourite.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-slate-500 leading-relaxed"
          >
            Book Nest brings together a collection of books made for curious
            minds, passionate readers and anyone looking for their next great
            story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9"
          >
            <Link to="/all-books">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all duration-300"
              >
                Explore Books
                <FiArrowRight />
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-white border border-slate-200 hover:border-blue-200 hover:text-blue-600 text-slate-700 rounded-xl font-semibold shadow-sm transition-all duration-300"
              >
                Discover Book Nest
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </motion.section>


      {/* =========================================================
          STATS
      ========================================================= */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-6 md:px-16 pb-20"
      >
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 mx-auto mb-4 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {stat.value}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}

          </div>

        </div>
      </motion.section>


      {/* =========================================================
          FEATURES
      ========================================================= */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="px-6 md:px-16 py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14">

            <p className="text-blue-600 font-bold uppercase tracking-[0.25em] text-sm mb-3">
              Why Book Nest
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Everything you need to
              <span className="text-blue-600"> enjoy books.</span>
            </h2>

            <p className="text-slate-500 mt-5 leading-relaxed">
              From discovering a new title to tracking your order, Book Nest
              is designed to keep your entire book shopping experience simple.
            </p>

          </div>


          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="group relative p-7 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                >

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="text-2xl" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Bottom line */}
                  <div className="mt-6 w-8 h-1 rounded-full bg-blue-600 group-hover:w-16 transition-all duration-300" />

                </motion.div>
              );
            })}

          </div>

        </div>
      </motion.section>


      {/* =========================================================
          DISCOVERY SECTION
      ========================================================= */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="px-6 md:px-16 py-20"
      >
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left visual */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative"
            >

              <div className="absolute -top-5 -left-5 w-24 h-24 bg-blue-100 rounded-3xl -z-10" />

              <div className="bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl">

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <FiBookOpen />
                  </div>

                  <div>
                    <p className="text-white font-bold">
                      Book Nest
                    </p>

                    <p className="text-slate-400 text-sm">
                      Your personal book corner
                    </p>
                  </div>
                </div>


                <div className="space-y-4">

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FiCompass className="text-blue-400" />
                      <div>
                        <p className="text-white font-semibold">
                          Explore
                        </p>
                        <p className="text-slate-400 text-sm">
                          Find books that match your interests.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FiStar className="text-yellow-400" />
                      <div>
                        <p className="text-white font-semibold">
                          Discover
                        </p>
                        <p className="text-slate-400 text-sm">
                          See what's trending with other readers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FiHeart className="text-red-400" />
                      <div>
                        <p className="text-white font-semibold">
                          Enjoy
                        </p>
                        <p className="text-slate-400 text-sm">
                          Build a collection of books you love.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-blue-600 rounded-2xl -z-10" />

            </motion.div>


            {/* Right content */}
            <div>

              <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mb-3">
                Built for readers
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                A simpler way to
                <span className="text-blue-600"> discover books.</span>
              </h2>

              <p className="text-slate-500 mt-5 leading-relaxed">
                We believe finding a good book shouldn't feel complicated.
                Book Nest brings discovery, shopping and order tracking
                together in one simple experience.
              </p>


              <div className="mt-7 space-y-3">

                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="text-sm" />
                    </div>

                    <span className="text-slate-600">
                      {item}
                    </span>
                  </motion.div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </motion.section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="px-6 md:px-16 py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-14">

            <p className="text-blue-600 font-bold uppercase tracking-[0.25em] text-sm mb-3">
              Simple process
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              From discovery to
              <span className="text-blue-600"> doorstep.</span>
            </h2>

            <p className="text-slate-500 mt-4">
              Getting your next favourite book is just a few simple steps away.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  className="relative text-center"
                >

                  <div className="relative inline-flex items-center justify-center">

                    <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
                      <Icon className="text-3xl" />
                    </div>

                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-6">
                    {step.title}
                  </h3>

                  <p className="text-slate-500 mt-3 leading-relaxed max-w-sm mx-auto">
                    {step.desc}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(100%_-_10px)] w-[calc(100%_-_60px)] border-t-2 border-dashed border-slate-200" />
                  )}

                </motion.div>
              );
            })}

          </div>

        </div>
      </motion.section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 md:px-16 py-20"
      >
        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-7 py-14 md:px-14 md:py-16 text-center shadow-xl">

            {/* Decorative circles */}
            <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-white/10" />

            <div className="relative">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 text-white flex items-center justify-center mb-6">
                <FiBookOpen className="text-2xl" />
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Your next great read
                <br />
                is waiting.
              </h2>

              <p className="max-w-xl mx-auto mt-5 text-blue-100 leading-relaxed">
                Explore our collection and discover a book that belongs on
                your shelf.
              </p>

              <Link to="/all-books">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Exploring
                  <FiArrowRight />
                </motion.button>
              </Link>

            </div>

          </div>

        </div>
      </motion.section>

    </main>
  );
};

export default LandingPage;