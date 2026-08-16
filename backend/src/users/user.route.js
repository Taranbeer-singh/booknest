const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// ==========================================
// ADMIN LOGIN
// ==========================================

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username });

    // Temporary debugging information
    // Password itself is NEVER printed.
    console.log("Admin login attempt:", {
      username,
      userFound: !!admin,
      passwordTypeFromRequest: typeof password,
      passwordTypeFromDB: admin ? typeof admin.password : null,
      passwordLengthFromRequest: password
        ? String(password).length
        : 0,
      passwordLengthFromDB: admin
        ? String(admin.password).length
        : 0,
    });

    // Admin/user not found
    if (!admin) {
      console.log("Admin not found");
      return res.status(404).send({
        message: "Admin not found!",
      });
    }

    // Password comparison
    if (String(admin.password) !== String(password)) {
      console.log("Admin password comparison failed");

      return res.status(401).send({
        message: "Invalid password!",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Successful login
    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin:", error);

    return res.status(500).send({
      message: "Failed to login as admin",
    });
  }
});

module.exports = router;