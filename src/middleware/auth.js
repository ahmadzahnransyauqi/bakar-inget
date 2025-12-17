require('dotenv').config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

   
      console.log("--- DEBUG TOKEN ---");
      console.log("1. Header Authorization:", req.headers.authorization);
      console.log("2. Token Bersih:", token);
      console.log("3. JWT_SECRET di Env:", process.env.JWT_SECRET); 
    

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      console.log("4. Hasil Decode:", decoded);

      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password_hash"] },
      });

      if (!req.user) {
        console.log("5. User tidak ditemukan di DB"); // Log tambahan
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message); // Print pesan errornya saja
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

module.exports = { protect };