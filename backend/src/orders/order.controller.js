const Order = require("./order.model");

// =====================================
// CREATE ORDER
// =====================================
const createAOrder = async (req, res) => {
  try {
    // Generate unique order number
    const year = new Date().getFullYear();

    const lastOrder = await Order.findOne()
      .sort({ createdAt: -1 })
      .select("orderNumber");

    let orderCount = 1;

    if (lastOrder?.orderNumber) {
      const match = lastOrder.orderNumber.match(/(\d+)$/);

      if (match) {
        orderCount = parseInt(match[1]) + 1;
      }
    }

    const orderNumber = `BN-${year}-${String(orderCount).padStart(4, "0")}`;

    const newOrder = new Order({
      ...req.body,
      orderNumber,
    });

    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);

  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};


// =====================================
// GET ORDERS BY USER EMAIL
// =====================================
const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ email })
      .populate("productIds")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};


// =====================================
// GET ALL ORDERS - ADMIN
// =====================================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productIds")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching all orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};


// =====================================
// UPDATE ORDER STATUS - ADMIN
// =====================================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Processing",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).populate("productIds");

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(updatedOrder);

  } catch (error) {
    console.error("Error updating order status:", error);

    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};


module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderStatus,
};