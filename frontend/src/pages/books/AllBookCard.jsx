import React from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import { motion } from "framer-motion";

const AllBookCard = ({ book }) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );

  const isWishlisted = wishlistItems.some(
    (item) => item._id === book?._id
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishlist(book));
    }
  };

  return (
    <motion.div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        relative
      "
      whileHover={{ y: -5 }}
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-72 bg-gray-50 overflow-hidden">
        <Link to={`/books/${book?._id}`}>
          <motion.img
            src={getImgUrl(book?.coverImage)}
            alt={book?.title || "Book"}
            className="w-full h-full object-contain p-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* ================= WISHLIST BUTTON ================= */}
        <motion.button
          type="button"
          onClick={handleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            absolute
            top-4
            right-4
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            shadow-md
            border
            transition-all
            duration-300
            cursor-pointer
            ${
              isWishlisted
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-500 border-gray-200 hover:text-red-500 hover:border-red-200"
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
                    scale: [1, 1.3, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.25,
            }}
          >
            <FiHeart
              className="text-lg"
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </motion.div>
        </motion.button>

        {/* ================= CATEGORY ================= */}
        {book?.category && (
          <span
            className="
              absolute
              left-4
              bottom-4
              bg-white/95
              backdrop-blur-sm
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
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">
        {/* Title */}
        <Link to={`/books/${book?._id}`}>
          <h3
            className="
              text-lg
              font-bold
              text-gray-800
              mb-2
              line-clamp-2
              hover:text-blue-600
              transition-colors
            "
          >
            {book?.title}
          </h3>
        </Link>

        {/* Author */}
        {book?.author && (
          <p className="text-sm text-gray-400 mb-2">
            by {book.author}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-gray-500 leading-5 min-h-[40px] mb-4">
          {book?.description?.length > 55
            ? `${book.description.slice(0, 55)}.....`
            : book?.description || "No description available"}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-lg font-bold text-gray-900">
            ${book?.newPrice}
          </span>

          {book?.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${book?.oldPrice}
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <motion.button
          type="button"
          onClick={() => handleAddToCart(book)}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-medium
            shadow-md
            cursor-pointer
            transition-colors
          "
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          <FiShoppingCart className="text-lg" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AllBookCard;