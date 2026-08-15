const Review = require("./review.model");
const Book = require("../books/book.model");

// ==========================================
// ADD REVIEW
// ==========================================

const addReview = async (req, res) => {
  try {
    const {
      bookId,
      userId,
      userName,
      userEmail,
      rating,
      comment,
    } = req.body;

    // Rating is compulsory
    if (
      !bookId ||
      !userId ||
      !userName ||
      !userEmail ||
      !rating
    ) {
      return res.status(400).send({
        message: "Rating and required user information are required",
      });
    }

    // Comment is optional
    const cleanComment = comment?.trim() || "";

    // Check book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({
        message: "Book not found",
      });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      bookId,
      userId,
    });

    if (existingReview) {
      return res.status(400).send({
        message: "You have already reviewed this book",
      });
    }

    // Create review
    const newReview = new Review({
      bookId,
      userId,
      userName,
      userEmail,
      rating,
      comment: cleanComment,
    });

    await newReview.save();

    res.status(201).send({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);

    res.status(500).send({
      message: "Failed to add review",
      error: error.message,
    });
  }
};


// ==========================================
// ADMIN - GET ALL REVIEWS
// ==========================================

const getAllReviewsForAdmin = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("bookId", "title coverImage")
      .sort({
        createdAt: -1,
      });

    res.status(200).send(reviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);

    res.status(500).send({
      message: "Failed to fetch all reviews",
      error: error.message,
    });
  }
};


// ==========================================
// GET REVIEWS FOR A BOOK
// USER
// ==========================================

const getBookReviews = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({
      bookId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).send(reviews);
  } catch (error) {
    console.error("Error fetching book reviews:", error);

    res.status(500).send({
      message: "Failed to fetch reviews",
    });
  }
};


// ==========================================
// DELETE REVIEW
// ==========================================

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).send({
        message: "Review not found",
      });
    }

    res.status(200).send({
      message: "Review deleted successfully",
      review: deletedReview,
    });
  } catch (error) {
    console.error("Error deleting review:", error);

    res.status(500).send({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  addReview,
  getBookReviews,
  getAllReviewsForAdmin,
  deleteReview,

};