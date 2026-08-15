import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { FiArrowUpRight, FiMail, FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import footerLogo from "../assets/footer-logo.png";

const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialHover = {
    y: -4,
    scale: 1.1,
    transition: {
      duration: 0.25,
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071a35] text-white mt-20">
      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14"
        >
          {/* ================= BRAND ================= */}
          <div>
            <Link to="/">
              <motion.img
                src={footerLogo}
                alt="Book Nest"
                className="w-32 h-auto object-contain mb-5"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                }}
              />
            </Link>

            <p className="text-gray-300 text-sm leading-7 max-w-xs">
              Discover your next great read with Book Nest. Explore a growing
              collection of books, find your favorites, and enjoy a simple
              online reading experience.
            </p>

            {/* Mini highlight */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                <FiBookOpen className="text-lg" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Read. Discover. Repeat.
                </p>
                <p className="text-xs text-gray-400">
                  Your digital bookshelf
                </p>
              </div>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-lg font-bold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4">
              <Link
                to="/"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                About Us
              </Link>

              <Link
                to="/landingpage"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Features
              </Link>

              <Link
                to="/orders"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                My Orders
              </Link>

              <Link
                to="/cart"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* ================= EXPLORE ================= */}
          <div>
            <h3 className="text-lg font-bold mb-6">
              Explore
            </h3>

            <div className="space-y-4">
              <Link
                to="/"
                className="group flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Browse Books
                <FiArrowUpRight className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/landingpage"
                className="group flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Our Features
                <FiArrowUpRight className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/about"
                className="group flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Our Story
                <FiArrowUpRight className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/"
                className="group flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Popular Books
                <FiArrowUpRight className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* ================= NEWSLETTER ================= */}
          <div>
            <h3 className="text-lg font-bold mb-3">
              Stay in the Loop
            </h3>

            <p className="text-gray-300 text-sm leading-6 mb-5">
              Subscribe to receive updates about new books, collections and
              special offers.
            </p>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="Your email address"
                className="
                  w-full
                  bg-white/10
                  border border-white/10
                  text-white
                  placeholder-gray-400
                  rounded-xl
                  pl-11
                  pr-4
                  py-3
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  transition-all
                  duration-300
                "
              />
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                w-full
                mt-3
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-300
                cursor-pointer
                shadow-lg
                shadow-blue-900/20
              "
            >
              Subscribe
            </motion.button>

            <p className="text-xs text-gray-500 mt-3">
              No spam. Just useful updates.
            </p>
          </div>
        </motion.div>

        {/* ================= DIVIDER ================= */}
        <div className="h-px bg-white/10 my-12" />

        {/* ================= MIDDLE SECTION ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
          "
        >
          {/* Contact */}
          <div>
            <p className="text-sm text-gray-400">
              Have questions?
            </p>

            <p className="text-white font-semibold mt-1">
              We'd love to hear from you.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialHover}
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                text-gray-300
                hover:bg-pink-600
                hover:text-white
                transition-colors
                duration-300
              "
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialHover}
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                text-gray-300
                hover:bg-blue-600
                hover:text-white
                transition-colors
                duration-300
              "
            >
              <FaFacebookF />
            </motion.a>

            <motion.a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialHover}
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                text-gray-300
                hover:bg-red-600
                hover:text-white
                transition-colors
                duration-300
              "
            >
              <FaYoutube />
            </motion.a>

            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialHover}
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                text-gray-300
                hover:bg-sky-500
                hover:text-white
                transition-colors
                duration-300
              "
            >
              <FaTwitter />
            </motion.a>
          </div>
        </motion.div>

        {/* ================= BOTTOM ================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            border-t
            border-white/10
            mt-8
            pt-6
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
            text-sm
          "
        >
          <p className="text-gray-400 text-center md:text-left">
            © {currentYear} Book Nest. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Use
            </Link>

            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;