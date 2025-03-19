"use client";

import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks/hooks";
import { logoutUser } from "@/store/slices/auth-slice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const { user, isAuthenticated } = authState;

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogoutUser = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully");
    window.location.reload();
  };

  const handlePremiumSignUp = () => {
    if (!user) {
      toast.error("Please login to continue");
    } else {
      router.push("/subscribe");
    }
  };

  return (
    <div
      className={`w-full flex justify-center items-center h-[40px] ${
        pathname.startsWith("/problems/")
          ? "bg-[#0f0f0f]"
          : "bg-neutral-800 border-b border-neutral-700"
      }`}
    >
      <div
        className={`w-full  px-4 h-full flex justify-between items-center ${
          pathname.startsWith("/problems/") ? "w-screen" : "max-w-[1100px]"
        } mx-auto`}
      >
        <div>
          <Link href="/problems">
            <img
              src="/leetcode-logo.png"
              alt="LeetCode Logo"
              className="w-[100px] max-w-full"
            />
          </Link>
        </div>
        <div className="flex text-sm text-neutral-400 justify-center items-center gap-2">
          {isAuthenticated ? (
            <div>
              <Button
                className="hover:bg-neutral-700 cursor-pointer bg-transparent"
                onClick={() => handleLogoutUser()}
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link className="hover:text-neutral-200" href="/register">
                Register
              </Link>
              <span>or</span>
              <Link className="hover:text-neutral-200" href="/login">
                Sign in
              </Link>
            </div>
          )}
          <button
            onClick={() => handlePremiumSignUp()}
            disabled={user?.premium}
            className="py-1.5 px-4 border rounded-lg bg-amber-500/10 hover:bg-amber-500/15 text-amber-500 border-none cursor-pointer"
          >
            {user?.premium ? "🎉" : ""} Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
