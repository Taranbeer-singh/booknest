import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import getBaseUrl from "../../utils/baseURL";
import { MdIncompleteCircle } from "react-icons/md";
import {
  HiOutlineBookOpen,
  HiOutlineShoppingBag,
  HiOutlineTrendingUp,
  HiOutlineCurrencyDollar,
  HiOutlineRefresh,
} from "react-icons/hi";
import { motion } from "framer-motion";

import RevenueChart from "./RevenueChart";

import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/orders/ordersApi";

import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // ===============================
  // BOOKS
  // ===============================
  const {
    data: books = [],
    isLoading: booksLoading,
  } = useFetchAllBooksQuery();

  // ===============================
  // ORDERS
  // ===============================
  const {
    data: orders = [],
    isLoading: ordersLoading,
    refetch: refetchOrders,
  } = useGetAllOrdersQuery();

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  // ===============================
  // DASHBOARD API
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ===============================
  // CATEGORY DATA
  // ===============================
  const categoryData = useMemo(() => {
    const counts = {};

    books.forEach((book) => {
      const category = book?.category || "Other";

      counts[category] = (counts[category] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [books]);

  const maxCategoryCount =
    categoryData.length > 0
      ? Math.max(...categoryData.map((item) => item[1]))
      : 1;

  // ===============================
  // STATUS COLORS
  // ===============================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";

      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  // ===============================
  // UPDATE STATUS
  // ===============================
  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({
        id: orderId,
        status,
      }).unwrap();

      refetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  // ===============================
  // ANIMATION
  // ===============================
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="space-y-8">

      {/* ========================================= */}
      {/* WELCOME HEADER */}
      {/* ========================================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <p className="text-purple-600 font-semibold uppercase tracking-[0.2em] text-xs mb-2">
            Overview
          </p>

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, Admin 👋
          </h2>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your BookNest store today.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md transition"
        >
          <HiOutlineRefresh className="text-lg" />
          Refresh Dashboard
        </motion.button>
      </motion.div>

      {/* ========================================= */}
      {/* TOP STAT CARDS */}
      {/* ========================================= */}

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Books */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Books
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {data?.totalBooks ?? books.length}
              </h3>

              <p className="text-xs text-green-600 font-medium mt-2">
                Available in store
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <HiOutlineBookOpen className="text-2xl" />
            </div>

          </div>
        </motion.div>

        {/* Total Sales */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Sales
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                ${Number(data?.totalSales || 0).toFixed(2)}
              </h3>

              <p className="text-xs text-green-600 font-medium mt-2">
                Store revenue
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <HiOutlineCurrencyDollar className="text-2xl" />
            </div>

          </div>
        </motion.div>

        {/* Trending */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Trending Books
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {data?.trendingBooks ?? 0}
              </h3>

              <p className="text-xs text-blue-600 font-medium mt-2">
                This month
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <HiOutlineTrendingUp className="text-2xl" />
            </div>

          </div>
        </motion.div>

        {/* Orders */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Orders
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {data?.totalOrders ?? orders.length}
              </h3>

              <p className="text-xs text-purple-600 font-medium mt-2">
                Customer orders
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <HiOutlineShoppingBag className="text-2xl" />
            </div>

          </div>
        </motion.div>

      </section>

      {/* ========================================= */}
      {/* CHART + CATEGORY */}
      {/* ========================================= */}

      <section className="grid xl:grid-cols-3 gap-6">

        {/* Revenue */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Orders Overview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Monthly order activity
              </p>
            </div>

          </div>

          <RevenueChart />
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Books by Category
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your library distribution
            </p>
          </div>

          {booksLoading ? (
            <div className="py-10 text-center text-gray-400">
              Loading categories...
            </div>
          ) : categoryData.length === 0 ? (
            <div className="py-10 text-center text-gray-400">
              No books available
            </div>
          ) : (
            <div className="space-y-5">

              {categoryData.map(([category, count]) => {

                const percentage =
                  (count / maxCategoryCount) * 100;

                return (
                  <div key={category}>

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {category}
                      </span>

                      <span className="text-sm font-bold text-gray-800">
                        {count}
                      </span>

                    </div>

                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${percentage}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                        }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </motion.div>

      </section>

      {/* ========================================= */}
      {/* RECENT ORDERS */}
      {/* ========================================= */}

      <motion.section
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <p className="text-purple-600 text-xs uppercase tracking-[0.2em] font-semibold">
              Store Activity
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage customer orders and delivery status.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            Live Orders
          </div>

        </div>

        {/* Orders */}
        {ordersLoading ? (

          <div className="py-16 text-center text-gray-500">
            Loading orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="py-16 text-center">

            <HiOutlineShoppingBag className="mx-auto text-5xl text-gray-300" />

            <h3 className="text-lg font-semibold text-gray-700 mt-4">
              No orders yet
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead>
                <tr className="bg-gray-50 text-left">

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Books
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {orders.map((order, index) => (

                  <motion.tr
                    key={order._id}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Customer */}
                    <td className="px-6 py-5">

                      <div>

                        <p className="font-semibold text-gray-800">
                          {order.name}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {order.email}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {order.phone}
                        </p>

                      </div>

                    </td>

                    {/* Books */}
                    <td className="px-6 py-5">

                      <div className="space-y-1 max-w-xs">

                        {order.productIds?.length > 0 ? (

                          order.productIds.map((product) => (

                            <div
                              key={product._id}
                              className="text-sm text-gray-700"
                            >
                              📖 {product?.title || "Unknown Book"}
                            </div>

                          ))

                        ) : (

                          <span className="text-gray-400 text-sm">
                            No products
                          </span>

                        )}

                      </div>

                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5">

                      <span className="font-bold text-gray-800">
                        ${Number(order.totalPrice || 0).toFixed(2)}
                      </span>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">

                      <p className="text-sm text-gray-600">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(
                          order.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <div className="flex flex-col gap-2">

                        <span
                          className={`inline-flex w-fit px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status || "Processing"}
                        </span>

                        <select
                          value={
                            order.status || "Processing"
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              e.target.value
                            )
                          }
                          className="w-fit text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none cursor-pointer focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                        >

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </div>

                    </td>

                  </motion.tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </motion.section>

    </div>
  );
};

export default Dashboard;