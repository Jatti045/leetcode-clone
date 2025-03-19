import { getProblems } from "../controller/database-controller";
import express from "express";

const router = express.Router();

router.get("/get-problems", getProblems);

export default router;
