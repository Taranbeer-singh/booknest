import React from "react";
import {
  FiShoppingCart,
  FiArrowUpRight,
  FiHeart,
} from "react-icons/fi";

import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toggleWishlist } from "../../redux/features/wishlist/wishlistSlice";
import { motion } from "framer-motion";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  // ==========================================
  // CART
  // ==========================================

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  const isWishlisted = wishlistItems.some(
    (item) => item._id === book?._id
  );

  const handleWishlist = () => {
    dispatch(toggleWishlist(book));
  };

  return (
    <motion.div
      className="
        group
        bg-white
        rounded-xl
        border border-gray-100
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        p-3
      "
      whileHover={{ y: -4 }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
    >
      {/* ================= IMAGE SECTION ================= */}

      <div className="relative">

        {/* Category */}

        {book?.category && (
          <span
            className="
              absolute
              top-3
              left-3
              z-10
              bg-white/90
              text-blue-600
              text-xs
              font-semibold
              px-3
              py-1
              rounded-full
              shadow-sm
              capitalize
            "
          >
            {book.category}
          </span>
        )}

        {/* ================= WISHLIST BUTTON ================= */}

        <motion.button
          type="button"
          onClick={handleWishlist}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className={`
            absolute
            top-3
            right-14
            z-20
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            shadow-sm
            transition-all
            duration-300
            ${
              isWishlisted
                ? "bg-red-50 text-red-500"
                : "bg-white text-gray-500 hover:bg-red-50 hover:text-red-500"
            }
          `}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <motion.div
            animate={
              isWishlisted
                ? {
                    scale: [1, 1.25, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.3,
            }}
          >
            <FiHeart
              className="text-lg"
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </motion.div>
        </motion.button>

        {/* ================= VIEW BOOK ================= */}

        <Link
          to={`/books/${book?._id}`}
          className="
            absolute
            top-3
            right-3
            z-10
            w-9
            h-9
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            text-gray-600
            shadow-sm
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
            hover:bg-blue-600
            hover:text-white
          "
        >
          <FiArrowUpRight className="text-base" />
        </Link>

        {/* ================= BOOK IMAGE ================= */}

        <motion.div
          className="
            sm:w-44
            sm:h-72
            w-full
            h-64
            mx-auto
            flex
            items-center
            justify-center
            border
            border-gray-200
            rounded-lg
            overflow-hidden
            bg-gray-50
          "
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <Link
            to={`/books/${book?._id}`}
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
            "
          >
            <img
              src={getImgUrl(book?.coverImage)}
              alt={book?.title || "Book"}
              className="
                w-full
                h-full
                object-contain
                p-2
                cursor-pointer
              "
            />
          </Link>
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="pt-4 px-1">

        {/* Title */}

        <Link to={`/books/${book?._id}`}>
          <motion.h3
            className="
              text-lg
              font-bold
              text-gray-800
              leading-snug
              line-clamp-2
              min-h-[3rem]
              hover:text-blue-600
              transition-colors
              duration-300
              cursor-pointer
            "
            whileHover={{
              x: 2,
            }}
          >
            {book?.title}
          </motion.h3>
        </Link>

        {/* Description */}

        <p className="text-gray-500 text-sm mt-2 mb-4 min-h-[2.5rem]">
          {book?.description?.length > 45
            ? `${book.description.slice(0, 45)}...`
            : book?.description ||
              "No description available"}
        </p>

        {/* Price */}

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${book?.newPrice}
          </span>

          {book?.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${book?.oldPrice}
            </span>
          )}
        </div>

        {/* ================= ADD TO CART ================= */}

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
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            font-semibold
            shadow-md
            hover:shadow-lg
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <FiShoppingCart className="text-lg" />

          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookCard;