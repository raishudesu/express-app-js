import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      success: false,
      error: "Access denied. No token provided",
    });

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Either key is incorrect or token is expired",
    });
  }

  next();
};

export default auth;
