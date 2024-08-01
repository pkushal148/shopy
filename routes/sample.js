import express from "express";
import { sampleRegister } from "../controllers/sample.js";
const router = express.Router();

router.post("/register", sampleRegister);

export default router;
