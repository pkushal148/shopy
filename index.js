import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sampleRoutes from "./routes/sample.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";

//env setup
const app = express();
dotenv.config();

//mongo connect
connectDb();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//apis
app.get("/", (req, res) => {
  res.send(`<h1>Hello hema</h1>`);
});

//routes
app.use("/api/v1/auth", authRoutes);

app.use("/sample", sampleRoutes);

app.use("/api/v1/category", categoryRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `Server app running on ${process.env.DEV_MODE} mode listening on port ${port}`
  );
});
