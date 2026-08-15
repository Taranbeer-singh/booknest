import React from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  HiViewGrid,
  HiViewGridAdd,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineLogout,
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineChevronRight,
  HiOutlineStar,
} from "react-icons/hi";

import { MdOutlineManageHistory } from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ==========================================
  // SIDEBAR LINKS
  // ==========================================

  const sidebarLinks = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <HiOutlineChartBar />,
    },
    {
      name: "Add New Book",
      path: "/dashboard/add-new-book",
      icon: <HiViewGridAdd />,
    },
    {
      name: "Manage Books",
      path: "/dashboard/manage-books",
      icon: <MdOutlineManageHistory />,
    },
    {
      name: "Manage Reviews",
      path: "/dashboard/manage-reviews",
      icon: <HiOutlineStar />,
    },
  ];

  // ==========================================
  // ACTIVE SIDEBAR
  // ==========================================

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  // ==========================================
  // PAGE TITLE
  // ==========================================

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") {
      return "Dashboard Overview";
    }

    if (location.pathname.includes("add-new-book")) {
      return "Add New Book";
    }

    if (location.pathname.includes("manage-books")) {
      return "Manage Books";
    }

    if (location.pathname.includes("manage-reviews")) {
      return "Manage Reviews";
    }

    return "Dashboard";
  };

  return (
    <section className="min-h-screen bg-slate-100 flex overflow-hidden">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="hidden sm:flex w-64 bg-slate-950 text-white flex-col fixed left-0 top-0 bottom-0 z-40">

        {/* ================= LOGO ================= */}

        <div className="px-6 py-6">

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            <motion.div
              whileHover={{
                rotate: -6,
                scale: 1.05,
              }}
              className="
                w-11
                h-11
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <img
                src="/fav-icon.png"
                alt="BookNest"
                className="w-7 h-7 object-contain"
              />
            </motion.div>

            <div>

              <h1 className="text-xl font-black tracking-tight">
                BOOK<span className="text-blue-400">NEST</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Admin Panel
              </p>

            </div>

          </Link>

        </div>


        {/* ================= DIVIDER ================= */}

        <div className="px-6">

          <div className="h-px bg-slate-800" />

        </div>


        {/* ================= NAVIGATION ================= */}

        <nav className="px-4 mt-8 flex-1">

          <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Management
          </p>


          <div className="space-y-2">

            {sidebarLinks.map((item) => {

              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative block"
                >

                  {/* Active Background */}

                  {active && (
                    <motion.div
                      layoutId="activeSidebar"
                      className="
                        absolute
                        inset-0
                        bg-blue-600
                        rounded-xl
                      "
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}


                  {/* Link */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3.5
                      rounded-xl
                      transition-all
                      duration-200
                      ${
                        active
                          ? "text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }
                    `}
                  >

                    <span className="text-xl">
                      {item.icon}
                    </span>

                    <span className="text-sm font-semibold">
                      {item.name}
                    </span>


                    {/* Arrow */}

                    {active && (
                      <HiOutlineChevronRight className="ml-auto text-lg" />
                    )}

                  </div>

                </Link>
              );
            })}

          </div>


          {/* ================= STORE SECTION ================= */}

          <p className="px-3 mb-3 mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Store
          </p>


          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3.5
              rounded-xl
              text-slate-400
              hover:text-white
              hover:bg-slate-900
              transition-all
            "
          >

            <HiOutlineHome className="text-xl" />

            <span className="text-sm font-semibold">
              Visit Store
            </span>

          </Link>

        </nav>


        {/* ================================================= */}
        {/* ADMIN PROFILE */}
        {/* ================================================= */}

        <div className="px-4 pb-4">

          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-4
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-500
                  to-indigo-600
                  flex
                  items-center
                  justify-center
                "
              >
                <HiOutlineUser className="text-xl" />
              </div>


              <div className="min-w-0">

                <p className="text-sm font-bold text-white">
                  Administrator
                </p>

                <p className="text-xs text-slate-500 truncate">
                  BookNest Admin
                </p>

              </div>

            </div>


            {/* Logout */}

            <button
              onClick={handleLogout}
              className="
                mt-4
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-2.5
                rounded-xl
                bg-red-500/10
                text-red-400
                hover:bg-red-500
                hover:text-white
                transition-all
                duration-200
                text-sm
                font-semibold
                cursor-pointer
              "
            >

              <HiOutlineLogout className="text-lg" />

              Logout

            </button>

          </div>

        </div>

      </aside>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="flex-1 sm:ml-64 min-w-0">


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header
          className="
            sticky
            top-0
            z-30
            bg-white/90
            backdrop-blur-xl
            border-b
            border-slate-200
          "
        >

          <div className="px-6 sm:px-10 py-5">

            <div className="flex items-center justify-between gap-5">


              {/* ================= TITLE ================= */}

              <div>

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
                    duration: 0.4,
                  }}
                >

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-1">
                    BookNest Admin
                  </p>


                  <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
                    {getPageTitle()}
                  </h1>

                </motion.div>

              </div>


              {/* ================= HEADER ACTIONS ================= */}

              <div className="flex items-center gap-3">


                {/* Notification */}

                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    relative
                    w-11
                    h-11
                    rounded-xl
                    bg-slate-100
                    hover:bg-blue-50
                    text-slate-600
                    hover:text-blue-600
                    flex
                    items-center
                    justify-center
                    transition-all
                    cursor-pointer
                  "
                >

                  <HiOutlineBell className="text-xl" />

                  <span
                    className="
                      absolute
                      top-2
                      right-2
                      w-2
                      h-2
                      rounded-full
                      bg-red-500
                      border-2
                      border-white
                    "
                  />

                </motion.button>


                {/* Admin */}

                <div
                  className="
                    hidden
                    sm:flex
                    items-center
                    gap-3
                    pl-3
                    border-l
                    border-slate-200
                  "
                >

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-gradient-to-br
                      from-blue-500
                      to-indigo-600
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <HiOutlineUser className="text-xl" />
                  </div>


                  <div>

                    <p className="text-sm font-bold text-slate-800">
                      Admin
                    </p>

                    <p className="text-xs text-slate-400">
                      Store Manager
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* QUICK ACTIONS */}
            {/* ================================================= */}

            <div className="flex flex-wrap gap-3 mt-5">


              {/* Overview */}

              <Link to="/dashboard">

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    bg-slate-100
                    hover:bg-blue-50
                    text-slate-600
                    hover:text-blue-600
                    text-sm
                    font-semibold
                    transition-all
                  "
                >

                  <HiViewGrid />

                  Overview

                </motion.div>

              </Link>


              {/* Add Book */}

              <Link to="/dashboard/add-new-book">

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    text-sm
                    font-semibold
                    shadow-md
                    shadow-blue-200
                    transition-all
                  "
                >

                  <HiViewGridAdd />

                  Add Book

                </motion.div>

              </Link>


              {/* Manage Books */}

              <Link to="/dashboard/manage-books">

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    hover:border-blue-300
                    hover:text-blue-600
                    text-slate-600
                    text-sm
                    font-semibold
                    transition-all
                  "
                >

                  <HiOutlineBookOpen />

                  Manage Books

                </motion.div>

              </Link>


              {/* Manage Reviews */}

              <Link to="/dashboard/manage-reviews">

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    hover:border-yellow-300
                    hover:text-yellow-600
                    text-slate-600
                    text-sm
                    font-semibold
                    transition-all
                  "
                >

                  <HiOutlineStar />

                  Manage Reviews

                </motion.div>

              </Link>

            </div>

          </div>

        </header>


        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main className="p-5 sm:p-8 lg:p-10">

          <AnimatePresence mode="wait">

            <motion.div
              key={location.pathname}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >

              <Outlet />

            </motion.div>

          </AnimatePresence>

        </main>

      </div>

    </section>
  );
};

export default DashboardLayout;