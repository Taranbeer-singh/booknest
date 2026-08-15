import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineSearch,
} from "react-icons/hi";
import avtarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";
import { getImgUrl } from "../utils/getImgUrl";

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
  { name: "Wishlist", href: "/wishlist" },
];

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const location = useLocation();

  // ==========================================
  // GET ALL BOOKS
  // ==========================================

  const {
    data: books = [],
    isLoading: booksLoading,
    isError: booksError,
  } = useFetchAllBooksQuery();

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogOut = () => {
    logout();
    setIsDropdown(false);
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const searchResults =
    searchTerm.trim().length > 0
      ? books.filter((book) => {
          const search = searchTerm.toLowerCase().trim();

          return (
            book?.title?.toLowerCase().includes(search) ||
            book?.author?.toLowerCase().includes(search) ||
            book?.category?.toLowerCase().includes(search)
          );
        })
      : [];

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const handleSearchBlur = () => {
    // Small delay so clicking a search result works properly
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim()) {
      setShowSearchResults(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowSearchResults(false);
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const centerLinks = [
    { name: "Home", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/landingpage" },
    
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-4">
        {/* ================= LEFT : LOGO ================= */}

        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group"
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="
              w-11
              h-11
              rounded-2xl
              bg-gradient-to-br
              from-blue-600
              to-indigo-600
              flex
              items-center
              justify-center
              shadow-lg
              shadow-blue-200
            "
          >
            <img
              src="/fav-icon.png"
              alt="Book Nest"
              className="w-7 h-7 object-contain"
            />
          </motion.div>

          <div className="hidden sm:block leading-tight">
            <h1 className="font-black text-xl tracking-tight text-gray-900">
              BOOK<span className="text-blue-600">NEST</span>
            </h1>

            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
              Discover • Read • Repeat
            </p>
          </div>
        </Link>

        {/* ================= SEARCH ================= */}

        <div className="hidden md:block flex-1 max-w-sm relative">
          <div className="relative group">
            <HiOutlineSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                w-5
                h-5
                group-focus-within:text-blue-600
                transition-colors
                z-10
              "
            />

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder="Search books, authors..."
              className="
                w-full
                h-11
                pl-11
                pr-10
                rounded-2xl
                bg-gray-100/80
                border
                border-transparent
                outline-none
                text-sm
                text-gray-700
                placeholder:text-gray-400
                focus:bg-white
                focus:border-blue-200
                focus:ring-4
                focus:ring-blue-50
                transition-all
              "
            />

            {/* Clear Search */}

            {searchTerm && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={clearSearch}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  w-6
                  h-6
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-gray-700
                  hover:bg-gray-200
                  transition-all
                "
              >
                ×
              </button>
            )}
          </div>

          {/* ================= SEARCH RESULTS ================= */}

          <AnimatePresence>
            {showSearchResults && searchTerm.trim() && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                transition={{ duration: 0.18 }}
                className="
                  absolute
                  top-14
                  left-0
                  right-0
                  bg-white
                  rounded-2xl
                  shadow-2xl
                  shadow-gray-200/70
                  border
                  border-gray-100
                  overflow-hidden
                  z-[100]
                "
              >
                {/* Loading */}

                {booksLoading && (
                  <div className="p-5 text-center">
                    <div
                      className="
                        w-6
                        h-6
                        mx-auto
                        border-2
                        border-blue-200
                        border-t-blue-600
                        rounded-full
                        animate-spin
                      "
                    />

                    <p className="text-xs text-gray-400 mt-2">
                      Searching books...
                    </p>
                  </div>
                )}

                {/* API Error */}

                {!booksLoading && booksError && (
                  <div className="p-5 text-center">
                    <div className="text-2xl mb-2">
                      ⚠️
                    </div>

                    <p className="text-sm font-semibold text-gray-700">
                      Unable to search books
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Please try again.
                    </p>
                  </div>
                )}

                {/* Search Results */}

                {!booksLoading &&
                  !booksError &&
                  searchResults.length > 0 && (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.slice(0, 6).map((book) => (
                        <Link
                          key={book?._id}
                          to={`/books/${book?._id}`}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={clearSearch}
                          className="
                            flex
                            items-center
                            gap-3
                            p-3
                            hover:bg-blue-50
                            transition-colors
                            border-b
                            border-gray-50
                            last:border-b-0
                          "
                        >
                          {/* Book Image */}

                          <div
                            className="
                              w-11
                              h-14
                              rounded-lg
                              bg-gray-50
                              border
                              border-gray-100
                              overflow-hidden
                              flex-shrink-0
                            "
                          >
                            <img
                              src={getImgUrl(book?.coverImage)}
                              alt={book?.title || "Book"}
                              className="
                                w-full
                                h-full
                                object-contain
                                p-1
                              "
                            />
                          </div>

                          {/* Book Information */}

                          <div className="min-w-0 flex-1">
                            <p
                              className="
                                text-sm
                                font-semibold
                                text-gray-800
                                truncate
                              "
                            >
                              {book?.title}
                            </p>

                            <p
                              className="
                                text-xs
                                text-gray-400
                                truncate
                                mt-0.5
                              "
                            >
                              {book?.author || "Unknown Author"}
                            </p>

                            {book?.category && (
                              <p
                                className="
                                  text-[11px]
                                  text-blue-500
                                  capitalize
                                  mt-0.5
                                "
                              >
                                {book.category}
                              </p>
                            )}
                          </div>

                          {/* Arrow */}

                          <span className="text-gray-300 text-lg">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                {/* No Results */}

                {!booksLoading &&
                  !booksError &&
                  searchResults.length === 0 && (
                    <div className="p-6 text-center">
                      <div className="text-2xl mb-2">
                        🔍
                      </div>

                      <p className="text-sm font-semibold text-gray-700">
                        No books found
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Try another title, author or category.
                      </p>
                    </div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= CENTER NAV ================= */}

        <div className="hidden lg:flex items-center gap-1 bg-gray-100/70 p-1.5 rounded-2xl">
          {centerLinks.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-4 py-2 rounded-xl text-sm font-semibold"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavbar"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Cart */}

          <Link to="/cart">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative
                w-11
                h-11
                rounded-2xl
                bg-gray-100
                hover:bg-blue-50
                flex
                items-center
                justify-center
                transition-colors
              "
            >
              <HiOutlineShoppingCart className="w-5 h-5 text-gray-700 hover:text-blue-600" />

              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="
                    absolute
                    -top-1.5
                    -right-1.5
                    min-w-[19px]
                    h-[19px]
                    px-1
                    bg-blue-600
                    text-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    font-bold
                    border-2
                    border-white
                  "
                >
                  {cartItems.length}
                </motion.span>
              )}
            </motion.div>
          </Link>

          {/* User */}

          {currentUser ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsDropdown(!isDropdown)}
                className="
                  flex
                  items-center
                  gap-2
                  p-1
                  rounded-2xl
                  hover:bg-gray-100
                  transition-colors
                "
              >
                <img
                  src={avtarImg}
                  alt="avatar"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    object-cover
                    ring-2
                    ring-white
                    shadow-sm
                  "
                />

                <span className="hidden xl:block text-sm font-semibold text-gray-700 pr-2">
                  Account
                </span>
              </motion.button>

              {/* Dropdown */}

              <AnimatePresence>
                {isDropdown && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.96,
                    }}
                    transition={{ duration: 0.18 }}
                    className="
                      absolute
                      right-0
                      mt-3
                      w-56
                      bg-white
                      rounded-2xl
                      shadow-2xl
                      shadow-gray-200/70
                      border
                      border-gray-100
                      p-2
                      overflow-hidden
                      z-50
                    "
                  >
                    <div className="px-3 py-3 mb-1 border-b border-gray-100">
                      <p className="text-xs text-gray-400">
                        Welcome back
                      </p>

                      <p className="font-bold text-gray-800 truncate">
                        {currentUser.email || "My Account"}
                      </p>
                    </div>

                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsDropdown(false)}
                        className="
                          flex
                          items-center
                          px-3
                          py-2.5
                          rounded-xl
                          text-sm
                          font-medium
                          text-gray-600
                          hover:bg-blue-50
                          hover:text-blue-600
                          transition-colors
                        "
                      >
                        {item.name}
                      </Link>
                    ))}

                    <button
                      onClick={handleLogOut}
                      className="
                        w-full
                        text-left
                        px-3
                        py-2.5
                        mt-1
                        rounded-xl
                        text-sm
                        font-medium
                        text-red-500
                        hover:bg-red-50
                        transition-colors
                      "
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-gray-100
                  hover:bg-blue-50
                  flex
                  items-center
                  justify-center
                  transition-colors
                "
              >
                <HiOutlineUser className="w-5 h-5 text-gray-700 hover:text-blue-600" />
              </motion.div>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;