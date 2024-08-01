import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.error(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "unauthorized access" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send({ success: false, message: "error in middleware" });
  }
};

export { requireSignIn, isAdmin };
