import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiTrash2,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";

import { getImgUrl } from "../../utils/getImgUrl";
import {
  clearCart,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.newPrice || 0), 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">

        <div>
          <p className="text-blue-600 font-semibold tracking-[0.25em] text-sm uppercase mb-3">
            Your Collection
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-3">
            Review your books before checking out.
          </p>
        </div>

        {cartItems.length > 0 && (
          <motion.button
            onClick={handleClearCart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              self-start
              sm:self-auto
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-lg
              border
              border-red-100
              bg-red-50
              text-red-600
              font-medium
              hover:bg-red-100
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <FiTrash2 />
            Clear Cart
          </motion.button>
        )}
      </div>

      {/* ================= EMPTY CART ================= */}
      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="
            min-h-[420px]
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
          <div className="
            w-20
            h-20
            rounded-full
            bg-blue-50
            text-blue-600
            flex
            items-center
            justify-center
            mb-5
          ">
            <FiShoppingBag className="text-3xl" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2 max-w-md">
            Looks like you haven't added any books yet. Explore our collection
            and find something you'll love.
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
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
              "
            >
              Explore Books
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      ) : (

        /* ================= CART CONTENT ================= */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= PRODUCTS ================= */}
          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((product, index) => (
              <motion.div
                key={product?._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -2 }}
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  p-4
                  sm:p-5
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                  duration-300
                "
              >
                <div className="flex gap-4 sm:gap-6">

                  {/* Book Image */}
                  <Link
                    to={`/books/${product?._id}`}
                    className="
                      w-24
                      h-32
                      sm:w-28
                      sm:h-36
                      flex-shrink-0
                      rounded-xl
                      bg-gray-50
                      border
                      border-gray-100
                      overflow-hidden
                    "
                  >
                    <motion.img
                      src={getImgUrl(product?.coverImage)}
                      alt={product?.title}
                      className="w-full h-full object-contain p-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">

                    <div>
                      <Link to={`/books/${product?._id}`}>
                        <h2 className="
                          text-lg
                          sm:text-xl
                          font-bold
                          text-gray-800
                          hover:text-blue-600
                          transition-colors
                          duration-300
                          line-clamp-2
                        ">
                          {product?.title}
                        </h2>
                      </Link>

                      <p className="
                        text-sm
                        text-gray-500
                        capitalize
                        mt-2
                      ">
                        {product?.category || "Book"}
                      </p>
                    </div>

                    <div className="
                      flex
                      flex-wrap
                      items-end
                      justify-between
                      gap-3
                      mt-4
                    ">

                      <div>
                        <span className="text-xl font-bold text-blue-600">
                          ${product?.newPrice}
                        </span>

                        {product?.oldPrice && (
                          <span className="
                            ml-2
                            text-sm
                            text-gray-400
                            line-through
                          ">
                            ${product?.oldPrice}
                          </span>
                        )}
                      </div>

                      <motion.button
                        onClick={() =>
                          handleRemoveFromCart(product)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-medium
                          text-red-500
                          hover:text-red-600
                          cursor-pointer
                          transition-colors
                        "
                      >
                        <FiTrash2 />
                        Remove
                      </motion.button>

                    </div>
                  </div>

                </div>
              </motion.div>
            ))}

          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="
              lg:sticky
              lg:top-24
              h-fit
              bg-slate-900
              text-white
              rounded-3xl
              p-6
              sm:p-7
              shadow-xl
            "
          >

            <p className="
              text-blue-300
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
            ">
              Order Summary
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Your Order
            </h2>

            <div className="h-px bg-white/10 my-6" />

            {/* Items */}
            <div className="flex justify-between text-gray-300 mb-4">
              <span>
                Items
              </span>

              <span>
                {cartItems.length}
              </span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between text-gray-300 mb-4">
              <span>Subtotal</span>

              <span className="font-medium text-white">
                ${totalPrice}
              </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>

              <span className="text-green-400 font-medium">
                Calculated at checkout
              </span>
            </div>

            <div className="h-px bg-white/10 my-6" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold text-white">
                ${totalPrice}
              </span>
            </div>

            {/* Checkout */}
            <Link to="/checkout">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.97 }}
                className="
                  w-full
                  mt-7
                  bg-blue-600
                  hover:bg-blue-500
                  text-white
                  py-4
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-semibold
                  shadow-lg
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                Proceed to Checkout
                <FiArrowRight />
              </motion.button>
            </Link>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-2
                text-gray-400
                hover:text-white
                text-sm
                font-medium
                transition-colors
                duration-300
              "
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>

          </motion.div>

        </div>
      )}
    </motion.main>
  );
};

export default CartPage;