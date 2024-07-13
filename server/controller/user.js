import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    if (!userName || !password || !email || !confirmPassword) {
      return res.status(400).json({
        message: "All feilds are required",
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        message: "password and confirm password not same",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "tokenSecretkey",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "User signup successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error please try again later",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("req comming...");
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All feilds are required",
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        message: "password and confirm password not same",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      "tokenSecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};
