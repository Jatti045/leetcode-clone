import express from "express";
import { processPayment } from "../controller/payment-controller";

const router = express.Router();

router.post("/stripe", processPayment);

export default router;
