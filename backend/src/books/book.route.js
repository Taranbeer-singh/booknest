const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deletedBook,
} = require("./book.controller");

const verifyAdminToken = require("../middleware/verifyAdminToken");

const router = express.Router();

// ==========================================
// IMAGE UPLOAD SETUP
// ==========================================

const uploadDirectory = path.join(
  __dirname,
  "../../../frontend/public/books"
);

// Create books folder automatically if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },

  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);

    const uniqueName =
      `book-${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      extension;

    cb(null, uniqueName);
  },
});

// Only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ==========================================
// CREATE BOOK
// ==========================================

router.post(
  "/create-book",
  verifyAdminToken,
  upload.single("coverImage"),
  postABook
);

// ==========================================
// GET ALL BOOKS
// ==========================================

router.get("/", getAllBooks);

// ==========================================
// GET SINGLE BOOK
// ==========================================

router.get("/:id", getSingleBook);

// ==========================================
// UPDATE BOOK
// ==========================================

router.put(
  "/edit/:id",
  verifyAdminToken,
  updateBook
);

// ==========================================
// DELETE BOOK
// ==========================================

router.delete(
  "/:id",
  verifyAdminToken,
  deletedBook
);

module.exports = router;