const express = require("express");

const {
  addReview,
  getBookReviews,
  deleteReview,
  getAllReviewsForAdmin,
} = require("./review.controller");

const verifyAdminToken = require("../middleware/verifyAdminToken");

const router = express.Router();

// ==========================================
// ADD REVIEW
// ==========================================

router.post("/", addReview);

// ==========================================
// ADMIN - GET ALL REVIEWS
// ==========================================
// IMPORTANT: ye /:bookId se PEHLE hona chahiye

router.get(
  "/admin/all",
  verifyAdminToken,
  getAllReviewsForAdmin
);

// ==========================================
// GET REVIEWS FOR ONE BOOK
// ==========================================

router.get("/:bookId", getBookReviews);

// ==========================================
// DELETE REVIEW
// ==========================================

router.delete("/:id", deleteReview);

module.exports = router;