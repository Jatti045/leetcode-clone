import express from "express";
import { stripeWebhook } from "../controller/webhooks-controller";

const router = express.Router();

router.post(
  "/stripeWebhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
