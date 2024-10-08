import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered Successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }
    const token = jwt.sign(
      { userId: user._id },
      "4e984f3ad23407b4f5f2b9393cb9d072fe8b7ca1a713cf72b7c9f6a36f071a3a",
      { expiresIn: "2h" }
    );
    res.cookie("accessToken", token).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login };
