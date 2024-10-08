import { Cart } from "../models/Cart.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }
    const cartItem = new Cart({ productId, quantity });
    await cartItem.save();
    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { id } = req.params;
    if (!productId || quantity <= 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }
    const cartItem = await Cart.findByIdAndUpdate(
      id,
      { productId, quantity },
      { new: true }
    );
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addToCart, updateCart, deleteFromCart };
