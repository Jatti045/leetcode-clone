import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
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
        secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent only over HTTPS in production
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
        secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent only over HTTPS in production
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
      // This error will be caught by the generic error handler
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: "User is not authenticated", // Or "Access token not provided"
      });
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, JWT_SECRET_KEY);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).json({ success: false, message: "Token expired" });
        return;
      } else if (error instanceof JsonWebTokenError) {
        // This handles malformed tokens, signature mismatches, etc.
        res.status(401).json({ success: false, message: "Invalid token" });
        return;
      } else {
        // For other unexpected errors during verification, pass to the main error handler
        next(error);
        return;
      }
    }

    // If token is successfully verified, decodedToken will be populated.
    // The original logic had a check for !decodedToken,
    // but jwt.verify throws an error if it fails, so if we reach here, it's valid.
    // If jwt.verify could return null/undefined without throwing (it doesn't by default),
    // then an explicit check for !decodedToken would be needed here.

    res.status(200).json({
      success: true,
      message: "User is authenticated",
      data: decodedToken,
    });
    return;
  } catch (error) {
    // This catches errors from JWT_SECRET_KEY check or other unexpected errors
    next(error);
  }
};
