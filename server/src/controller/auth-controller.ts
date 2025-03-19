import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, email } = req.body;

    if (!username || !password || !confirmPassword || !email) {
      res.json({
        success: false,
        message: "Please fill in all fields",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.json({
        success: false,
        message: "Passwords do not match",
      });
      return;
    }

    if (password.length < 6) {
      res.json({
        success: false,
        message: "Password should be at least 6 characters",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    if (!user) {
      res.json({
        success: false,
        message: "User could not be created",
        data: user,
      });
      return;
    }

    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email == "" || password == "") {
      res.json({
        success: false,
        message: "Please fill in all fields",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.json({
        success: false,
        message: "User does not exist",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const user = {
      username: existingUser.username,
      email: existingUser.email,
      userId: existingUser._id,
      premium: existingUser.premium,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const accessToken = jwt.sign(user, JWT_SECRET_KEY);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        data: user,
      });
    return;
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged out successfully",
      });
    return;
  } catch (error) {
    next(error);
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
      return;
    }

    const decodedToken = jwt.verify(accessToken, JWT_SECRET_KEY);

    if (!decodedToken) {
      res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User is authenticated",
      data: decodedToken,
    });
    return;
  } catch (error) {
    next(error);
  }
};
