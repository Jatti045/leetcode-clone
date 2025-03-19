"use client";
import { useAppDispatch } from "@/store/hooks/hooks";
import { logoutUser } from "@/store/slices/auth-slice";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const logoutAndDirect = async () => {
      await dispatch(logoutUser());
      router.push("/login");
      toast.success("Login to access your membership");
    };

    logoutAndDirect();
  }, []);
  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-40px)]">
      <Loader2
        className="size-16 text-neutral-800 animate-spin"
        style={{ animationDuration: "0.5s" }}
      />
    </div>
  );
};

export default page;
