import express from "express";
import {
  loginController,
  registerController,
  testController,
  forgotPassWordController,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleWares.js";

const router = express.Router();

// register user/
router.post("/register", registerController);

//login
router.post("/login", loginController);

//forgot pasword
router.post("/forgotPassword", forgotPassWordController);

router.get("/test", requireSignIn, isAdmin, testController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  console.log("admin");
  res.status(200).send({
    ok: true,
  });
});

export default router;
