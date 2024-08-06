import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleWares.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoyController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/get-categories", categoryController);

router.get("/get-category/:slug", singleCategoyController);

export default router;
