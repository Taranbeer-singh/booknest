import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import AllBookCard from "./AllBookCard";

const categories = [
  "All",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
  "Poetry",
];

const AllBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: books = [],
    isLoading,
    isError,
  } = useFetchAllBooksQuery();

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      book.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      book.author
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Loading
  if (isLoading) {
    return (
      <motion.div
        className="text-center py-20 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Loading books...
      </motion.div>
    );
  }

  // Error
  if (isError) {
    return (
      <motion.div
        className="text-center py-20 text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Error loading books.
      </motion.div>
    );
  }

  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 py-10"
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
    >
      {/* ================= HEADING ================= */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Explore All Books
        </h1>

        <p className="text-gray-500 mt-2">
          Discover your next favourite book.
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">

        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full
              px-5
              py-3
              rounded-lg
              border
              border-gray-300
              bg-white
              outline-none
              transition-all
              duration-300
              focus:ring-2
              focus:ring-blue-400
              focus:border-blue-400
              hover:border-blue-300
            "
          />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="
            px-5
            py-3
            rounded-lg
            border
            border-gray-300
            bg-white
            cursor-pointer
            outline-none
            transition-all
            duration-300
            hover:bg-blue-50
            hover:border-blue-300
            hover:text-blue-600
            focus:ring-2
            focus:ring-blue-400
          "
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* ================= RESULTS ================= */}
      {filteredBooks.length > 0 ? (
        <motion.div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {filteredBooks.map((book) => (
            <motion.div
              key={book._id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <AllBookCard book={book} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">
            No books found
          </h2>

          <p className="text-gray-500 mt-2">
            Try another search or category.
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default AllBooks;