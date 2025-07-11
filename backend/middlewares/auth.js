import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // If token starts with "Bearer ", extract only the token part
    if (token?.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded; // optionally attach user data to the request
    console.log("Decoded user in auth middleware:", decoded);
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
