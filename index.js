import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import rootRouter from "./src/routers/rootRouter.js";
import memoRouter from "./src/routers/memoRouter.js";
import todoRouter from "./src/routers/todoRouter.js";
import cors from "cors";
dotenv.config();
const { PORT, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", rootRouter);
app.use("/memo", memoRouter);
app.use("/todo", todoRouter);

const handleListening = () => {
  console.log(`Server listening on http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
