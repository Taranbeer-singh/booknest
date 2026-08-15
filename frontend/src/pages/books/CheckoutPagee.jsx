import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";

import {
  clearCart,
} from "../../redux/features/cart/cartSlice";

import { getImgUrl } from "../../utils/getImgUrl";


const CheckoutPagee = () => {

  // ==========================================
  // CART
  // ==========================================

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();


  // ==========================================
  // AUTH
  // ==========================================

  const { currentUser } = useAuth();


  // ==========================================
  // FORM
  // ==========================================

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // ==========================================
  // ORDER API
  // ==========================================

  const [createOrder, { isLoading }] =
    useCreateOrderMutation();


  // ==========================================
  // TERMS CHECKBOX
  // ==========================================

  const [isChecked, setIsChecked] = useState(false);


  // ==========================================
  // TOTAL PRICE
  // ==========================================

  const totalPrice = cartItems
    .reduce(
      (acc, item) =>
        acc + Number(item?.newPrice || 0),
      0
    )
    .toFixed(2);


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (!cartItems || cartItems.length === 0) {

    return (
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-20"
      >

        <div
          className="
            bg-white
            border
            border-gray-100
            rounded-3xl
            shadow-sm
            p-12
            text-center
          "
        >

          {/* Icon */}

          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <FiShoppingBag className="text-3xl" />

          </div>


          {/* Heading */}

          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-gray-800
            "
          >
            Your Cart is Empty
          </h1>


          {/* Description */}

          <p
            className="
              text-gray-500
              mt-3
              max-w-md
              mx-auto
            "
          >
            You need to add at least one book
            before proceeding to checkout.
          </p>


          {/* Button */}

          <Link to="/">

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
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-7
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
            </motion.button>

          </Link>

        </div>

      </motion.main>
    );
  }


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const onSubmit = async (data) => {

    // Safety check

    if (!cartItems || cartItems.length === 0) {

      Swal.fire({
        title: "Your cart is empty",
        text: "Please add some books before placing an order.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });

      navigate("/cart");

      return;
    }


    // ========================================
    // ORDER OBJECT
    // ========================================

    const newOrder = {

      name: data.name,

      email: currentUser?.email,


      address: {

        street: data.address,

        city: data.city,

        country: data.country,

        state: data.state,

        zipcode: data.zipcode,

      },


      phone: data.phone,


      productIds: cartItems.map(
        (item) => item?._id
      ),


      totalPrice: Number(totalPrice),

    };


    try {

      // ======================================
      // CREATE ORDER
      // ======================================

      await createOrder(newOrder).unwrap();


      // ======================================
      // VERY IMPORTANT
      //
      // ORDER SUCCESSFULLY CREATED
      // NOW EMPTY THE CART
      // ======================================

      dispatch(clearCart());


      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      Swal.fire({

        title: "Order Confirmed!",

        text: "Your order has been placed successfully.",

        icon: "success",

        confirmButtonColor: "#2563eb",

        confirmButtonText: "View My Orders",

      }).then(() => {

        navigate("/orders");

      });

    } catch (error) {

      // ======================================
      // ORDER FAILED
      // ======================================

      console.error(
        "Error placing order:",
        error
      );


      Swal.fire({

        title: "Something went wrong",

        text: "We couldn't place your order. Please try again.",

        icon: "error",

        confirmButtonColor: "#2563eb",

      });

    }

  };


  // ==========================================
  // MAIN CHECKOUT UI
  // ==========================================

  return (

    <motion.main
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        max-w-7xl
        mx-auto
        px-6
        py-10
      "
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-10">

        <Link
          to="/cart"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-500
            hover:text-blue-600
            font-medium
            transition-colors
            duration-300
            mb-6
          "
        >

          <FiArrowLeft />

          Back to cart

        </Link>


        <p
          className="
            text-blue-600
            font-semibold
            tracking-[0.25em]
            text-sm
            uppercase
            mb-3
          "
        >
          Secure Checkout
        </p>


        <h1
          className="
            text-4xl
            md:text-5xl
            font-bold
            text-slate-800
          "
        >
          Complete Your Order
        </h1>


        <p className="text-gray-500 mt-3">
          Enter your details and confirm your book order.
        </p>

      </div>


      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
        "
      >


        {/* ===================================
            FORM
        =================================== */}

        <div className="lg:col-span-2">

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              bg-white
              border
              border-gray-100
              rounded-3xl
              shadow-sm
              p-6
              md:p-8
            "
          >


            {/* Personal Details */}

            <div
              className="
                flex
                items-center
                gap-3
                mb-7
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  flex
                  items-center
                  justify-center
                "
              >

                <FiUser className="text-xl" />

              </div>


              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-800
                  "
                >
                  Personal Details
                </h2>


                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Tell us where we should deliver your order.
                </p>

              </div>

            </div>


            {/* =================================
                FORM
            ================================= */}

            <form onSubmit={handleSubmit(onSubmit)}>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >


                {/* Full Name */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="name"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Full Name
                  </label>


                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className={`
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      bg-gray-50
                      outline-none
                      transition-all
                      duration-300
                      focus:bg-white
                      focus:ring-2

                      ${
                        errors.name
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }
                    `}
                  />


                  {errors.name && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>

                  )}

                </div>


                {/* Email */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="email"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Email Address
                  </label>


                  <input
                    type="email"
                    id="email"
                    value={currentUser?.email || ""}
                    disabled
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-100
                      text-gray-500
                      outline-none
                    "
                  />

                </div>


                {/* Phone */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="phone"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Phone Number
                  </label>


                  <div className="relative">

                    <FiPhone
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />


                    <input
                      {...register("phone", {
                        required:
                          "Phone number is required",
                      })}
                      type="tel"
                      id="phone"
                      placeholder="+91 98765 43210"
                      className={`
                        w-full
                        pl-11
                        pr-4
                        py-3
                        rounded-xl
                        border
                        bg-gray-50
                        outline-none
                        transition-all
                        duration-300
                        focus:bg-white
                        focus:ring-2

                        ${
                          errors.phone
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                        }
                      `}
                    />

                  </div>


                  {errors.phone && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>

                  )}

                </div>


                {/* Address */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="address"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Address / Street
                  </label>


                  <div className="relative">

                    <FiMapPin
                      className="
                        absolute
                        left-4
                        top-4
                        text-gray-400
                      "
                    />


                    <input
                      {...register("address", {
                        required:
                          "Address is required",
                      })}
                      type="text"
                      id="address"
                      placeholder="House number, street, area"
                      className={`
                        w-full
                        pl-11
                        pr-4
                        py-3
                        rounded-xl
                        border
                        bg-gray-50
                        outline-none
                        transition-all
                        duration-300
                        focus:bg-white
                        focus:ring-2

                        ${
                          errors.address
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                        }
                      `}
                    />

                  </div>


                  {errors.address && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.address.message}
                    </p>

                  )}

                </div>


                {/* City */}

                <div>

                  <label
                    htmlFor="city"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    City
                  </label>


                  <input
                    {...register("city", {
                      required: "City is required",
                    })}
                    type="text"
                    id="city"
                    placeholder="Your city"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                      transition-all
                    "
                  />


                  {errors.city && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </p>

                  )}

                </div>


                {/* State */}

                <div>

                  <label
                    htmlFor="state"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    State / Province
                  </label>


                  <input
                    {...register("state", {
                      required: "State is required",
                    })}
                    type="text"
                    id="state"
                    placeholder="Your state"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                      transition-all
                    "
                  />


                  {errors.state && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.state.message}
                    </p>

                  )}

                </div>


                {/* Country */}

                <div>

                  <label
                    htmlFor="country"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Country / Region
                  </label>


                  <input
                    {...register("country", {
                      required:
                        "Country is required",
                    })}
                    type="text"
                    id="country"
                    placeholder="India"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                      transition-all
                    "
                  />


                  {errors.country && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.country.message}
                    </p>

                  )}

                </div>


                {/* Zipcode */}

                <div>

                  <label
                    htmlFor="zipcode"
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Zipcode
                  </label>


                  <input
                    {...register("zipcode", {
                      required:
                        "Zipcode is required",
                    })}
                    type="text"
                    id="zipcode"
                    placeholder="135001"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                      transition-all
                    "
                  />


                  {errors.zipcode && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.zipcode.message}
                    </p>

                  )}

                </div>

              </div>


              {/* =================================
                  TERMS
              ================================= */}

              <div
                className="
                  mt-7
                  p-4
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-100
                "
              >

                <label
                  className="
                    flex
                    items-start
                    gap-3
                    cursor-pointer
                  "
                >

                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      setIsChecked(
                        e.target.checked
                      )
                    }
                    className="
                      mt-1
                      w-4
                      h-4
                      accent-blue-600
                      cursor-pointer
                    "
                  />


                  <span
                    className="
                      text-sm
                      text-gray-600
                      leading-relaxed
                    "
                  >

                    I agree to the{" "}

                    <Link
                      to="/"
                      className="
                        text-blue-600
                        font-medium
                        hover:underline
                      "
                    >
                      Terms & Conditions
                    </Link>

                    {" "}and{" "}

                    <Link
                      to="/"
                      className="
                        text-blue-600
                        font-medium
                        hover:underline
                      "
                    >
                      Shopping Policy
                    </Link>

                    .

                  </span>

                </label>

              </div>


              {/* =================================
                  PLACE ORDER BUTTON
              ================================= */}

              <motion.button
                type="submit"
                disabled={
                  !isChecked ||
                  isLoading
                }

                whileHover={
                  isChecked && !isLoading
                    ? {
                        scale: 1.01,
                        y: -2,
                      }
                    : {}
                }

                whileTap={
                  isChecked && !isLoading
                    ? {
                        scale: 0.98,
                      }
                    : {}
                }

                className={`
                  w-full
                  mt-6
                  py-4
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-semibold
                  text-lg
                  transition-all
                  duration-300

                  ${
                    isChecked &&
                    !isLoading
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >

                {isLoading ? (

                  "Placing Order..."

                ) : (

                  <>
                    <FiCheck />

                    Place Order
                  </>

                )}

              </motion.button>

            </form>

          </motion.div>

        </div>


        {/* =====================================
            ORDER SUMMARY
        ===================================== */}

        <motion.aside
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
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

          <p
            className="
              text-blue-300
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
            "
          >
            Your Order
          </p>


          <h2
            className="
              text-2xl
              font-bold
              mt-2
            "
          >
            Order Summary
          </h2>


          <div className="h-px bg-white/10 my-6" />


          {/* Products */}

          <div
            className="
              space-y-4
              max-h-64
              overflow-y-auto
              pr-1
            "
          >

            {cartItems.map((item) => (

              <div
                key={item?._id}
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                {/* Image */}

                <div
                  className="
                    w-14
                    h-16
                    rounded-lg
                    bg-white
                    overflow-hidden
                    flex-shrink-0
                  "
                >

                  <img
                    src={getImgUrl(
                      item?.coverImage
                    )}
                    alt={item?.title}
                    className="
                      w-full
                      h-full
                      object-contain
                      p-1
                    "
                  />

                </div>


                {/* Details */}

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >

                  <p
                    className="
                      text-sm
                      font-medium
                      text-gray-200
                      line-clamp-2
                    "
                  >
                    {item?.title}
                  </p>


                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-1
                    "
                  >
                    ${item?.newPrice}
                  </p>

                </div>

              </div>

            ))}

          </div>


          <div className="h-px bg-white/10 my-6" />


          {/* Items */}

          <div
            className="
              flex
              justify-between
              text-gray-300
            "
          >

            <span>
              Items
            </span>

            <span>
              {cartItems.length}
            </span>

          </div>


          {/* Subtotal */}

          <div
            className="
              flex
              justify-between
              text-gray-300
              mt-4
            "
          >

            <span>
              Subtotal
            </span>

            <span>
              ${totalPrice}
            </span>

          </div>


          <div className="h-px bg-white/10 my-6" />


          {/* Total */}

          <div
            className="
              flex
              justify-between
              items-center
            "
          >

            <span
              className="
                text-lg
                font-semibold
              "
            >
              Total
            </span>


            <span
              className="
                text-2xl
                font-bold
              "
            >
              ${totalPrice}
            </span>

          </div>


          {/* COD */}

          <div
            className="
              mt-6
              rounded-xl
              bg-white/5
              border
              border-white/10
              p-4
            "
          >

            <p
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              💵 Cash on Delivery
            </p>


            <p
              className="
                text-xs
                text-gray-400
                mt-1
              "
            >
              Pay when your order arrives.
            </p>

          </div>

        </motion.aside>

      </div>

    </motion.main>

  );
};


export default CheckoutPagee;