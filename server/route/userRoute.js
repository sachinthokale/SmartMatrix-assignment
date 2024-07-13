import express from "express";
import { loginUser, signupUser } from "../controller/user.js";

export const userRoute = express.Router();
userRoute.route("/signup").post(signupUser);
userRoute.route("/login").post(loginUser);
