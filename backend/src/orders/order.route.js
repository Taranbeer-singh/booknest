const express = require("express");

const {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderStatus,
} = require("./order.controller");

const router = express.Router();

// ==========================================
// USER
// ==========================================

// Create order
router.post("/", createAOrder);

// Get orders of particular user
router.get("/email/:email", getOrderByEmail);


// ==========================================
// ADMIN
// ==========================================

// Get all orders
router.get("/all", getAllOrders);

// Update order status
router.patch("/:id/status", updateOrderStatus);

module.exports = router;