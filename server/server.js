import express from "express";
import connectDB from "./connectDB.js";
import { userRoute } from "./route/userRoute.js";
import cors from "cors";
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
connectDB();
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`server connected to port ${PORT}`);
});
