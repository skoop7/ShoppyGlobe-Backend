import jwt from "jsonwebtoken";

const SECRET_KEY =
  "4e984f3ad23407b4f5f2b9393cb9d072fe8b7ca1a713cf72b7c9f6a36f071a3a";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access Denied. Invalid token format." });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Failed to authenticate token" });
  }
};

export default authMiddleware;
