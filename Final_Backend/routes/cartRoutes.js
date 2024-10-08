import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addToCart,
  deleteFromCart,
  updateCart,
} from "../controller/cartController.js";

const router = express.Router();

//Protected Routes
router.use(authMiddleware);
router.post("/cart", addToCart);
router.put("/cart/:id", updateCart);
router.delete("/cart/:id", deleteFromCart);

export default router;
