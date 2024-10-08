import { Product } from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getProducts, getProductById };
