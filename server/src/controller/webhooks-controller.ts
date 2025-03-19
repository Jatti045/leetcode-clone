import Stripe from "stripe";
import User from "../models/User";
import { RequestHandler } from "express";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key not found");
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const stripeWebhook: RequestHandler = async (req, res, next) => {
  const sig = req.headers["stripe-signature"] as string;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe webhook secret not found");
  }
  const webhookSecret = STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    console.error("Error verifying webhook:", error);
    res.status(400).json({
      success: false,
      message: "Webhook error",
    });
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (userId) {
      try {
        await User.findByIdAndUpdate(userId, { premium: true });
      } catch (error) {
        console.error("Error upgrading user to premium:", error);
      }
    } else {
      console.error("User ID not found in session metadata");
    }
  }

  res.status(200).json({
    success: true,
    message: "Webhook received",
  });
};
