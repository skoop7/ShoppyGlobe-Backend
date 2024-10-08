import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

const PORT = 5000;

app.listen(PORT || 3000, () => {
  console.log(`Server started running on Port ${PORT}`);
});

mongoose
  .connect("mongodb://localhost:27017/ShoppyGlobe")
  .then(() => {
    console.log("MongoDB Connected Successfully !!!!");
  })
  .catch(() => {
    console.log("Error Connecting MongoDB Server");
  });
