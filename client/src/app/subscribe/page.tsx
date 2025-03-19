import React from "react";
import { CheckCircle, Star, ShieldCheck } from "lucide-react";
import StripeCheckoutButton from "../components/stripe/StripeCheckoutButton";

const page = () => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)]  flex flex-col justify-center items-center gap-16 bg-gradient-to-r from-neutral-800 to-neutral-900 text-center p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl font-semibold text-yellow-300">Premium</h1>
        <p className="text-neutral-400 text-lg max-w-xl">
          Get started with a LeetCode Subscription that works for you and enjoy
          exclusive benefits.
        </p>
      </div>

      <div className="w-full max-w-xl bg-neutral-900 rounded-lg shadow-xl border border-yellow-500 p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <Star className="text-yellow-300" size={24} />
            <h2 className="text-2xl font-bold text-yellow-300">
              VIP One-Time Payment
            </h2>
          </div>
          <p className="text-sm text-gray-400">No recurring fees</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-yellow-400 font-medium">Down from $39</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Gain access to exclusive premium features. The ultimate plan for
            those who want the best without recurring charges.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold text-yellow-300">$35</p>
          <p className="text-xs text-gray-500">Prices are marked in USD</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-neutral-700 pt-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400" size={20} />
            <p className="text-sm text-gray-300">
              Access to all premium problems
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-400" size={20} />
            <p className="text-sm text-gray-300">
              Enhanced security and support
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star className="text-green-400" size={20} />
            <p className="text-sm text-gray-300">
              Exclusive insights and analytics
            </p>
          </div>
        </div>

        <StripeCheckoutButton />
      </div>

      <div className="w-full max-w-xl text-gray-300 text-sm">
        <p>
          Upgrade now and enjoy lifetime access to premium content, priority
          support, and more. Join thousands of satisfied users who are elevating
          their coding experience.
        </p>
      </div>
    </div>
  );
};

export default page;
