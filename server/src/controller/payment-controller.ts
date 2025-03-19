import { RequestHandler } from "express";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not provided");
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const processPayment: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Subscription",
            },
            unit_amount: 3500,
          },

          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/subscribe/success`,
      cancel_url: `${req.headers.origin}/problems`,
      metadata: {
        userId,
      },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    next(error);
  }
};
