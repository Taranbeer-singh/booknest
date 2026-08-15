import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiShield } from "react-icons/fi";

import getBaseUrl from "../utils/baseURL";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const auth = response.data;

      if (auth.token) {
        localStorage.setItem("token", auth.token);

        // Token expiry after 1 hour
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Admin session expired. Please login again.");
          navigate("/admin");
        }, 3600 * 1000);

        navigate("/dashboard");
      } else {
        setMessage("Invalid admin credentials.");
      }
    } catch (error) {
      setMessage("Invalid admin username or password.");
      console.error("Admin login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-6 py-12">

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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

        {/* Header */}

        <div className="bg-slate-900 px-7 py-8 text-center">

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
              bg-blue-500/10
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <FiShield className="text-blue-300 text-2xl" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white">
            Admin Login
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Secure access to your BookNest dashboard.
          </p>

        </div>


        {/* Form */}

        <div className="p-7 md:p-8">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Username */}

            <div>

              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Admin Username
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
                  {...register("username", {
                    required: "Username is required",
                  })}
                  type="text"
                  id="username"
                  placeholder="Enter admin username"
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
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

              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}

            </div>


            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                  placeholder="Enter admin password"
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
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


            {/* Error */}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
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


            {/* Login */}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.97 }}
              className="
                w-full
                h-12
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-60
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
              {isLoading ? "Signing in..." : "Login to Dashboard"}
            </motion.button>

          </form>


          {/* Back */}

          <div className="text-center mt-6">

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                text-sm
                text-gray-500
                hover:text-blue-600
                transition-colors
                cursor-pointer
              "
            >
              ← Back to User Login
            </button>

          </div>


          <p className="text-center text-xs text-gray-400 mt-7">
            © 2026 BookNest. Admin Portal.
          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default AdminLogin;