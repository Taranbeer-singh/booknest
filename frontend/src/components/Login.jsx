import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FiMail, FiLock, FiBookOpen } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* ================= EMAIL LOGIN ================= */

  const onSubmit = async (data) => {
    setMessage("");
    setSuccessMessage("");

    try {
      await loginUser(data.email, data.password);

      setSuccessMessage("Login successful! Welcome back.");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setMessage("Please provide a valid email and password.");
      console.error(error);
    }
  };

  /* ================= GOOGLE LOGIN ================= */

  const handleGoogleSignIn = async () => {
    setMessage("");
    setSuccessMessage("");
    setGoogleLoading(true);

    try {
      await signInWithGoogle();

      setSuccessMessage("Login successful! Welcome back.");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setMessage("Google sign in failed. Please try again.");
      console.error(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-[calc(100vh-80px)]
        bg-gray-50
        flex
        items-center
        justify-center
        px-6
        py-12
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-gray-100
          overflow-hidden
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            bg-slate-900
            px-7
            py-8
            text-center
          "
        >

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="
              w-14
              h-14
              mx-auto
              rounded-2xl
              bg-white/10
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <FiBookOpen
              className="
                text-blue-300
                text-2xl
              "
            />
          </motion.div>

          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Welcome Back
          </h1>

          <p
            className="
              text-gray-400
              mt-2
              text-sm
            "
          >
            Sign in to continue your BookNest journey.
          </p>

        </div>


        {/* ================= FORM ================= */}

        <div className="p-7 md:p-8">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Email Address
              </label>

              <div className="relative">

                <FiMail
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-gray-800
                    outline-none
                    transition-all
                    duration-300
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>


            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Password
              </label>

              <div className="relative">

                <FiLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-gray-800
                    outline-none
                    transition-all
                    duration-300
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>


            {/* ERROR / SUCCESS */}

            <AnimatePresence mode="wait">

              {message && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  className="
                    bg-red-50
                    border
                    border-red-100
                    text-red-600
                    text-sm
                    rounded-xl
                    px-4
                    py-3
                  "
                >
                  {message}
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  className="
                    bg-green-50
                    border
                    border-green-100
                    text-green-600
                    text-sm
                    rounded-xl
                    px-4
                    py-3
                  "
                >
                  {successMessage} ✓
                </motion.div>
              )}

            </AnimatePresence>


            {/* LOGIN BUTTON */}

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                w-full
                h-12
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                rounded-xl
                shadow-md
                hover:shadow-lg
                transition-all
                duration-300
                cursor-pointer
              "
            >
              Login
            </motion.button>

          </form>


          {/* ================= DIVIDER ================= */}

          <div
            className="
              flex
              items-center
              gap-4
              my-6
            "
          >

            <div className="h-px bg-gray-200 flex-1"></div>

            <span
              className="
                text-xs
                text-gray-400
                uppercase
                tracking-wider
              "
            >
              Or
            </span>

            <div className="h-px bg-gray-200 flex-1"></div>

          </div>


          {/* ================= GOOGLE ================= */}

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            whileHover={{
              scale: googleLoading ? 1 : 1.02,
            }}
            whileTap={{
              scale: googleLoading ? 1 : 0.97,
            }}
            className="
              w-full
              h-12
              flex
              items-center
              justify-center
              gap-3
              bg-slate-900
              hover:bg-blue-950
              disabled:opacity-60
              text-white
              font-semibold
              rounded-xl
              transition-all
              duration-300
              cursor-pointer
            "
          >

            <FaGoogle />

            {googleLoading
              ? "Signing in..."
              : "Continue with Google"}

          </motion.button>


          {/* ================= REGISTER ================= */}

          <p
            className="
              text-center
              text-sm
              text-gray-500
              mt-6
            "
          >
            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                font-semibold
                text-blue-600
                hover:text-blue-800
                transition-colors
              "
            >
              Create an account
            </Link>

          </p>


          {/* ================= FOOTER ================= */}

          <p
            className="
              text-center
              text-xs
              text-gray-400
              mt-7
            "
          >
            © 2026 BookNest. All rights reserved.
          </p>

        </div>

      </motion.div>
    </div>
  );
};

export default Login;