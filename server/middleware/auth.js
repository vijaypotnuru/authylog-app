import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Retrieve the user details from the logged-in user
    const decodedToken = await jwt.verify(token, "secret369852147");

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.sendStatus(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;

export const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
