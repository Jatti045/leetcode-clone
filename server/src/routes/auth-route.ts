import express from "express";

import {
  register,
  login,
  checkAuth,
  logout,
} from "../controller/auth-controller";

const router = express.Router();

// Routes for register and login and logout
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Route for checking if user is authenticated
router.get("/check-auth", checkAuth);

export default router;
