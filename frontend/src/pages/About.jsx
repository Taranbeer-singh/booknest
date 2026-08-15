import React from "react";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiHeart,
  FiSearch,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiUsers,
  FiArrowRight,
  FiCheck,
  FiTarget,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const About = () => {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 35,
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

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const features = [
    {
      icon: <FiSearch />,
      title: "Easy Discovery",
      description:
        "Find books quickly through a clean and simple browsing experience.",
    },
    {
      icon: <FiBookOpen />,
      title: "Curated Collection",
      description:
        "Explore a growing collection of books across different genres and interests.",
    },
    {
      icon: <FiShoppingBag />,
      title: "Simple Shopping",
      description:
        "Add your favorite books to the cart and complete your order with ease.",
    },
    {
      icon: <FiTruck />,
      title: "Reliable Delivery",
      description:
        "We make the ordering process simple so your books can reach you smoothly.",
    },
    {
      icon: <FiShield />,
      title: "Secure Experience",
      description:
        "Your account and shopping experience are designed with security in mind.",
    },
    {
      icon: <FiHeart />,
      title: "Built for Readers",
      description:
        "Every part of Book Nest is designed around the love of discovering books.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <FiSearch />,
      title: "Discover",
      description:
        "Browse our collection and explore books that match your interests.",
    },
    {
      number: "02",
      icon: <FiHeart />,
      title: "Choose",
      description:
        "Find a book you love and add it to your personal shopping cart.",
    },
    {
      number: "03",
      icon: <FiShoppingBag />,
      title: "Order",
      description:
        "Provide your delivery details and place your order in just a few steps.",
    },
    {
      number: "04",
      icon: <FiBookOpen />,
      title: "Enjoy",
      description:
        "Sit back, receive your book and enjoy your next reading experience.",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Books to Explore",
      icon: <FiBookOpen />,
    },
    {
      value: "20+",
      label: "Categories",
      icon: <FiTarget />,
    },
    {
      value: "24/7",
      label: "Easy Access",
      icon: <FiUsers />,
    },
    {
      value: "100%",
      label: "Reader Focused",
      icon: <FiHeart />,
    },
  ];

  return (
    <main className="bg-white overflow-hidden">

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900" />

        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-blue-300 text-sm font-semibold">
                <FiBookOpen />
                Welcome to Book Nest
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-tight mt-7"
            >
              A place where
              <span className="text-blue-400"> every book </span>
              has a story.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-300 text-lg md:text-xl leading-8 mt-7 max-w-2xl"
            >
              Book Nest is an online bookstore created to make discovering,
              choosing and ordering books simple, enjoyable and accessible.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mt-9"
            >
              <Link to="/">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
                >
                  Explore Books
                  <FiArrowRight />
                </motion.button>
              </Link>

              <a href="#our-story">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="px-7 py-3.5 border border-white/20 hover:bg-white/10 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Our Story
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-10 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{
                y: -5,
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  {stat.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* OUR STORY */}
      {/* ========================================================= */}

      <section
        id="our-story"
        className="max-w-7xl mx-auto px-6 md:px-10 py-24"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid lg:grid-cols-2 gap-14 items-center"
        >

          {/* Visual */}
          <div className="relative">
            <div className="bg-blue-50 rounded-3xl p-8 md:p-12">

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl mb-7">
                  <FiBookOpen />
                </div>

                <h3 className="text-3xl font-bold text-slate-800">
                  More than a bookstore.
                </h3>

                <p className="text-gray-500 leading-7 mt-4">
                  We believe books are more than products. They are ideas,
                  experiences, lessons and journeys waiting to be discovered.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Discover something new",
                    "Find books that match your interests",
                    "Create your own reading journey",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <FiCheck className="text-sm" />
                      </div>

                      <p className="text-gray-700 font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-4 md:right-8 bg-slate-900 text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="flex items-center gap-3">
                <FiStar className="text-yellow-400 text-xl" />

                <div>
                  <p className="font-bold">
                    Made for readers
                  </p>

                  <p className="text-xs text-gray-400">
                    One book at a time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-[0.2em] text-sm">
              Our Story
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-4 leading-tight">
              Built around the joy of discovering books.
            </h2>

            <p className="text-gray-500 leading-8 mt-6">
              Book Nest started with a simple idea: finding your next book
              should feel exciting, not complicated.
            </p>

            <p className="text-gray-500 leading-8 mt-4">
              Instead of making readers navigate through a confusing shopping
              experience, Book Nest focuses on clean design, easy discovery
              and a straightforward ordering process.
            </p>

            <p className="text-gray-500 leading-8 mt-4">
              Whether you are looking for fiction, technology, self-development
              or something completely new, Book Nest aims to give every reader
              a comfortable place to explore.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* WHY BOOK NEST */}
      {/* ========================================================= */}

      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-blue-600 font-semibold uppercase tracking-[0.2em] text-sm">
              Why Book Nest
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-4">
              Everything you need for a better book shopping experience.
            </h2>

            <p className="text-gray-500 leading-7 mt-5">
              We keep things simple, useful and focused on what really matters:
              helping you find books you want to read.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-7 mt-3">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* HOW IT WORKS */}
      {/* ========================================================= */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-[0.2em] text-sm">
            How It Works
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-4">
            From discovery to delivery.
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto leading-7 mt-5">
            We keep the entire shopping journey simple so you can spend less
            time figuring things out and more time enjoying books.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative"
            >
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">

                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl">
                    {step.icon}
                  </div>

                  <span className="text-4xl font-bold text-gray-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  {step.title}
                </h3>

                <p className="text-gray-500 leading-7 mt-3">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* MISSION & VISION */}
      {/* ========================================================= */}

      <section className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="grid lg:grid-cols-2 gap-8">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl mb-7">
                <FiTarget />
              </div>

              <p className="text-blue-400 uppercase tracking-[0.2em] text-sm font-semibold">
                Our Mission
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-4">
                Make discovering books easier for everyone.
              </h2>

              <p className="text-gray-400 leading-8 mt-5">
                Our mission is to create a simple and enjoyable platform where
                readers can discover books, make informed choices and order
                their next read without unnecessary complexity.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-3xl bg-blue-600 p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl mb-7">
                <FiBookOpen />
              </div>

              <p className="text-blue-100 uppercase tracking-[0.2em] text-sm font-semibold">
                Our Vision
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-4">
                Build a digital home for every kind of reader.
              </h2>

              <p className="text-blue-100 leading-8 mt-5">
                We imagine Book Nest growing into a welcoming digital
                destination where readers can discover new ideas, explore
                different genres and build a lasting relationship with books.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 md:p-16 text-center"
        >

          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">

            <FiBookOpen className="mx-auto text-4xl mb-6" />

            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to find your next book?
            </h2>

            <p className="text-blue-100 max-w-2xl mx-auto leading-7 mt-5">
              Explore our collection and discover something that deserves a
              place on your bookshelf.
            </p>

            <Link to="/">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="mt-8 px-8 py-4 bg-white text-blue-700 rounded-xl font-bold inline-flex items-center gap-2 shadow-xl cursor-pointer"
              >
                Start Exploring
                <FiArrowRight />
              </motion.button>
            </Link>

          </div>
        </motion.div>
      </section>

    </main>
  );
};

export default About;