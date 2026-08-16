const Book = require("./book.model");

// ==========================================
// CREATE BOOK
// ==========================================

const postABook = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    // Check image
    if (!req.file) {
      return res.status(400).send({
        message: "Book cover image is required",
      });
    }

    const newBookData = {
      ...req.body,

      // multer generated filename
      coverImage: req.file.filename,

      // Convert trending string to boolean
      trending:
        req.body.trending === "true" ||
        req.body.trending === true,
    };

    const newBook = new Book(newBookData);

    await newBook.save();

    res.status(201).send({
      message: "Book posted successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);

    res.status(500).send({
      message: "Failed to create book",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL BOOKS
// ==========================================

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({
      createdAt: -1,
    });

    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books:", error);

    res.status(500).send({
      message: "Failed to fetch books",
    });
  }
};

// ==========================================
// GET SINGLE BOOK
// ==========================================

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({
        message: "Book not found",
      });
    }

    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book:", error);

    res.status(500).send({
      message: "Failed to fetch book",
    });
  }
};

// ==========================================
// UPDATE BOOK
// ==========================================

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).send({
        message: "Book is not found",
      });
    }

    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating a book:", error);

    res.status(500).send({
      message: "Failed to update book",
    });
  }
};

// ==========================================
// DELETE BOOK
// ==========================================

const deletedBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send({
        message: "Book is not found!",
      });
    }

    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting a book:", error);

    res.status(500).send({
      message: "Failed to delete book",
    });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deletedBook,
};