"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const StripeCheckoutButton = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const { user } = authState;

  const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!STRIPE_PUBLIC_KEY) {
    return null;
  }

  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/stripe`,
        { userId: user?.userId }
      );

      const result = await stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="cursor-pointer w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-md font-semibold hover:from-yellow-400 hover:to-yellow-300 transition-colors shadow-md"
    >
      Buy Now
    </button>
  );
};

export default StripeCheckoutButton;
