import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiArrowRight,
} from "react-icons/fi";

import { getImgUrl } from "../../utils/getImgUrl";

import { addToCart } from "../../redux/features/cart/cartSlice";

import {
  removeFromWishlist,
  clearWishlist,
} from "../../redux/features/wishlist/wishlistSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );

  // ================= ADD TO CART =================

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  // ================= REMOVE =================

  const handleRemove = (book) => {
    dispatch(removeFromWishlist(book));
  };

  // ================= CLEAR =================

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
        <div>
          <p className="text-red-500 font-semibold tracking-[0.25em] text-sm uppercase mb-3">
            Your Favorites
          </p>

          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              Wishlist
            </h1>

            {wishlistItems.length > 0 && (
              <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-sm font-bold">
                {wishlistItems.length}
              </span>
            )}
          </div>

          <p className="text-gray-500 mt-3">
            Save the books you want to read later.
          </p>
        </div>

        {/* Clear Wishlist */}

        {wishlistItems.length > 0 && (
          <motion.button
            type="button"
            onClick={handleClearWishlist}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              self-start
              sm:self-auto
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              border
              border-red-100
              bg-red-50
              text-red-500
              font-medium
              hover:bg-red-100
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <FiTrash2 />
            Clear Wishlist
          </motion.button>
        )}
      </div>

      {/* ================= EMPTY WISHLIST ================= */}

      {wishlistItems.length === 0 ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            min-h-[450px]
            flex
            flex-col
            items-center
            justify-center
            bg-white
            border
            border-gray-100
            rounded-3xl
            shadow-sm
            text-center
            px-6
          "
        >
          {/* Heart */}

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              w-24
              h-24
              rounded-full
              bg-red-50
              text-red-500
              flex
              items-center
              justify-center
              mb-6
            "
          >
            <FiHeart
              className="text-4xl"
              fill="currentColor"
            />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-2 max-w-md">
            You haven't saved any books yet. Explore our
            collection and add your favorite books here.
          </p>

          <Link to="/all-books">
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                mt-7
                flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-md
                transition-all
                duration-300
                cursor-pointer
              "
            >
              Explore Books
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        /* ================= WISHLIST CONTENT ================= */

        <motion.div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-7
          "
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {wishlistItems.map((book) => (
            <motion.div
              key={book?._id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.4,
              }}
              whileHover={{
                y: -5,
              }}
              className="
                group
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                overflow-hidden
                transition-all
                duration-300
              "
            >
              {/* ================= IMAGE ================= */}

              <div className="relative h-72 bg-gray-50 flex items-center justify-center overflow-hidden">
                <Link
                  to={`/books/${book?._id}`}
                  className="w-full h-full flex items-center justify-center"
                >
                  <motion.img
                    src={getImgUrl(book?.coverImage)}
                    alt={book?.title || "Book"}
                    className="
                      w-full
                      h-full
                      object-contain
                      p-5
                    "
                    whileHover={{
                      scale: 1.06,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />
                </Link>

                {/* Wishlist Heart */}

                <motion.button
                  type="button"
                  onClick={() => handleRemove(book)}
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="
                    absolute
                    top-4
                    right-4
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    text-red-500
                    shadow-md
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:bg-red-50
                    transition-colors
                  "
                  title="Remove from wishlist"
                >
                  <FiHeart
                    className="text-lg"
                    fill="currentColor"
                  />
                </motion.button>
              </div>

              {/* ================= DETAILS ================= */}

              <div className="p-5">
                {/* Category */}

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-2">
                  {book?.category || "Book"}
                </p>

                {/* Title */}

                <Link to={`/books/${book?._id}`}>
                  <h2
                    className="
                      text-lg
                      font-bold
                      text-gray-800
                      line-clamp-2
                      hover:text-blue-600
                      transition-colors
                    "
                  >
                    {book?.title}
                  </h2>
                </Link>

                {/* Author */}

                <p className="text-sm text-gray-500 mt-2">
                  By{" "}
                  <span className="font-medium text-gray-700">
                    {book?.author || "Unknown Author"}
                  </span>
                </p>

                {/* Price */}

                <div className="flex items-center gap-3 mt-4">
                  <span className="text-xl font-bold text-blue-600">
                    ${book?.newPrice}
                  </span>

                  {book?.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${book?.oldPrice}
                    </span>
                  )}
                </div>

                {/* ================= ACTIONS ================= */}

                <div className="flex gap-2 mt-5">
                  {/* Add Cart */}

                  <motion.button
                    type="button"
                    onClick={() => handleAddToCart(book)}
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      flex-1
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      text-sm
                      shadow-sm
                      cursor-pointer
                      transition-colors
                    "
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </motion.button>

                  {/* Remove */}

                  <motion.button
                    type="button"
                    onClick={() => handleRemove(book)}
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      w-12
                      rounded-xl
                      border
                      border-red-100
                      bg-red-50
                      text-red-500
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      hover:bg-red-100
                      transition-colors
                    "
                    title="Remove"
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.main>
  );
};

export default WishlistPage;