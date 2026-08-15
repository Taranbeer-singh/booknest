import React from "react";
import { motion } from "framer-motion";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { getImgUrl } from "../../utils/getImgUrl";

const statusColor = {
  Delivered:
    "bg-green-100 text-green-700 border-green-200",

  Processing:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  Cancelled:
    "bg-red-100 text-red-700 border-red-200",
};

const OrderPage = () => {
  const { currentUser } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email, {
    skip: !currentUser?.email,
  });

  // ===============================
  // LOADING
  // ===============================

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================

  if (isError) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">⚠️</div>

        <h2 className="text-2xl font-bold text-red-600">
          Error getting orders
        </h2>

        <p className="text-gray-500 mt-2">
          Please try again later.
        </p>
      </div>
    );
  }

  // ===============================
  // GET ORDER NUMBER
  // ===============================

  const getOrderNumber = (order, index) => {
    if (order.orderNumber) {
      return order.orderNumber;
    }

    // Fallback for old orders
    if (order._id) {
      return `OLD-${order._id.slice(-6).toUpperCase()}`;
    }

    return `BN-${new Date().getFullYear()}-${String(
      index + 1
    ).padStart(4, "0")}`;
  };

  // ===============================
  // STATUS PROGRESS
  // ===============================

  const getProgressWidth = (status) => {
    if (status === "Delivered") {
      return "100%";
    }

    if (status === "Cancelled") {
      return "100%";
    }

    return "50%";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* =====================================
          HEADER
      ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mb-10"
      >
        <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
          Your Shopping Activity
        </p>

        <h1 className="text-4xl font-bold text-gray-800 mt-2">
          Your Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Track your orders and check their current status.
        </p>
      </motion.div>


      {/* =====================================
          NO ORDERS
      ===================================== */}

      {orders.length === 0 ? (

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
        >
          <div className="text-6xl mb-5">
            🛒
          </div>

          <h2 className="text-2xl font-bold text-gray-700">
            No orders yet
          </h2>

          <p className="text-gray-500 mt-2">
            Your purchased books will appear here.
          </p>
        </motion.div>

      ) : (

        /* =====================================
           ORDERS
        ===================================== */

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="space-y-8"
        >

          {orders.map((order, index) => {

            const status =
              order.status || "Processing";

            const orderNumber =
              getOrderNumber(order, index);

            return (

              <motion.div
                key={order._id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 25,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                whileHover={{
                  y: -3,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden"
              >

                {/* =====================================
                    ORDER HEADER
                ===================================== */}

                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/70">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <p className="text-xs text-gray-400 uppercase tracking-widest">
                        Order Number
                      </p>

                      <h2 className="text-xl font-bold text-gray-800 mt-1">
                        #{orderNumber}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Ordered on{" "}
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>

                    </div>


                    {/* STATUS */}

                    <span
                      className={`inline-flex w-fit items-center px-4 py-2 rounded-full text-sm font-semibold border ${
                        statusColor[status] ||
                        "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>

                      {status}
                    </span>

                  </div>

                </div>


                {/* =====================================
                    CUSTOMER + ADDRESS
                ===================================== */}

                <div className="grid md:grid-cols-2 gap-6 px-6 py-6 border-b border-gray-100">

                  {/* CUSTOMER */}

                  <div>

                    <h3 className="font-bold text-gray-800 mb-3">
                      Customer Details
                    </h3>

                    <div className="space-y-2 text-sm">

                      <p className="text-gray-600">
                        <span className="font-semibold text-gray-800">
                          Name:
                        </span>{" "}
                        {order.name}
                      </p>

                      <p className="text-gray-600 break-all">
                        <span className="font-semibold text-gray-800">
                          Email:
                        </span>{" "}
                        {order.email}
                      </p>

                      <p className="text-gray-600">
                        <span className="font-semibold text-gray-800">
                          Phone:
                        </span>{" "}
                        {order.phone}
                      </p>

                    </div>

                  </div>


                  {/* ADDRESS */}

                  <div>

                    <h3 className="font-bold text-gray-800 mb-3">
                      Delivery Address
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed">

                      {order.address?.city || "N/A"},{" "}

                      {order.address?.state || "N/A"},{" "}

                      {order.address?.country || "N/A"}

                      <br />

                      {order.address?.zipcode || ""}

                    </p>

                  </div>

                </div>


                {/* =====================================
                    PRODUCTS
                ===================================== */}

                <div className="px-6 py-6">

                  <h3 className="font-bold text-gray-800 mb-5">
                    Ordered Books
                  </h3>


                  <div className="space-y-4">

                    {order.productIds?.length > 0 ? (

                      order.productIds.map(
                        (product, productIndex) => {

                          /*
                           * IMPORTANT:
                           * Because backend uses:
                           *
                           * .populate("productIds")
                           *
                           * product is now the complete
                           * book object.
                           */

                          const book =
                            typeof product === "object"
                              ? product
                              : null;

                          return (

                            <motion.div
                              key={
                                book?._id ||
                                product ||
                                productIndex
                              }
                              whileHover={{
                                scale: 1.01,
                              }}
                              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                            >

                              {/* BOOK IMAGE */}

                              <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">

                                {book?.coverImage ? (

                                  <img
                                    src={getImgUrl(
                                      book.coverImage
                                    )}
                                    alt={
                                      book.title ||
                                      "Book"
                                    }
                                    className="w-full h-full object-contain p-1"
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";
                                    }}
                                  />

                                ) : (

                                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                                    📚
                                  </div>

                                )}

                              </div>


                              {/* BOOK DETAILS */}

                              <div className="flex-1 min-w-0">

                                <h4 className="text-lg font-bold text-gray-800">
                                  {book?.title ||
                                    "Book unavailable"}
                                </h4>

                                {book?.author && (

                                  <p className="text-sm text-gray-500 mt-1">
                                    by{" "}
                                    {book.author}
                                  </p>

                                )}

                                {book?.category && (

                                  <span className="inline-block mt-2 px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                                    {book.category}
                                  </span>

                                )}

                                {book?.description && (

                                  <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                                    {book.description}
                                  </p>

                                )}

                              </div>


                              {/* PRICE */}

                              <div className="sm:text-right flex sm:block items-center justify-between">

                                <p className="text-xs text-gray-400">
                                  Price
                                </p>

                                <p className="text-xl font-bold text-blue-600">
                                  $
                                  {book?.newPrice ??
                                    "N/A"}
                                </p>

                              </div>

                            </motion.div>

                          );
                        }
                      )

                    ) : (

                      <p className="text-gray-400 text-sm">
                        No products found.
                      </p>

                    )}

                  </div>

                </div>


                {/* =====================================
                    TOTAL + STATUS
                ===================================== */}

                <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/50">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* TOTAL */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="text-3xl font-bold text-blue-600 mt-1">
                        ${order.totalPrice}
                      </p>

                    </div>


                    {/* STATUS */}

                    <div className="w-full md:w-1/2">

                      <div className="flex justify-between text-xs text-gray-500 mb-2">

                        <span>
                          Delivery Status
                        </span>

                        <span className="font-semibold text-gray-700">
                          {status}
                        </span>

                      </div>


                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width:
                              getProgressWidth(
                                status
                              ),
                          }}
                          transition={{
                            duration: 0.8,
                          }}
                          className={`h-full rounded-full ${
                            status ===
                            "Delivered"
                              ? "bg-green-500"
                              : status ===
                                "Cancelled"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        />

                      </div>


                      {/* STATUS STEPS */}

                      <div className="flex justify-between mt-3 text-xs">

                        <span
                          className={
                            status !==
                            "Cancelled"
                              ? "text-blue-600 font-semibold"
                              : "text-gray-400"
                          }
                        >
                          Order Placed
                        </span>

                        <span
                          className={
                            status ===
                              "Processing" ||
                            status ===
                              "Delivered"
                              ? "text-blue-600 font-semibold"
                              : "text-gray-400"
                          }
                        >
                          Processing
                        </span>

                        <span
                          className={
                            status ===
                            "Delivered"
                              ? "text-green-600 font-semibold"
                              : "text-gray-400"
                          }
                        >
                          Delivered
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>

            );
          })}

        </motion.div>

      )}

    </div>
  );
};

export default OrderPage;