"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginFormData } from "@/types/types";
import { useAppDispatch } from "@/store/hooks/hooks";
import { loginUser } from "@/store/slices/auth-slice";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();
  const [showPassword, setShowPassword] = useState(false);

  const authState = useSelector((state: RootState) => state.auth);
  const { isLoading } = authState;

  const router = useRouter();

  const dispatch = useAppDispatch();

  const onHandleLoginFormData: SubmitHandler<ILoginFormData> = async (
    loginFormData
  ) => {
    const response = await dispatch(loginUser(loginFormData));

    if (response?.payload?.success) {
      router.push("/problems");
      toast.success(response?.payload?.message);
    } else {
      toast.error(response?.payload?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-50px)]">
      {isLoading ? (
        <div className="h-[500px] container mx-auto w-[400px] bg-neutral-800 flex flex-col justify-center items-center">
          <Loader2
            className="size-12 animate-spin text-neutral-900"
            style={{ animationDuration: "0.5s" }}
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onHandleLoginFormData)}
          className="h-[500px] container mx-auto w-[400px] bg-neutral-800 flex flex-col justify-between"
        >
          <div className="w-full py-16">
            <img src="./leetcode-logo.png" className="mx-auto" />
          </div>
          <div className="flex flex-col justify-center items-center space-y-6">
            <Input
              {...register("email")}
              placeholder="E-mail address"
              type="email"
              className="w-[90%] mx-auto rounded-none border-neutral-900 p-5 hover:border-black"
            />

            <div className="relative w-[90%] mx-auto ">
              <Input
                {...register("password")}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="w-full rounded-none border-neutral-900 p-5 hover:border-black"
              />
              {showPassword ? (
                <Eye
                  onClick={() => setShowPassword(false)}
                  className="cursor-pointer size-4 absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                />
              ) : (
                <EyeClosed
                  onClick={() => setShowPassword(true)}
                  className="cursor-pointer size-4 absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
          </div>
          <div className="w-[90%] mx-auto flex flex-col my-8 gap-4">
            <Button
              type="submit"
              className="w-full rounded-none cursor-pointer"
            >
              Sign In
            </Button>
            <div className="flex justify-center py-4 gap-1 items-center text-sm text-neutral-200">
              {/* <Link href="forgot-password">Forgot Password?</Link> */}
              <span className="text-neutral-400">Don't have an account?</span>
              <Link href="/register" className="text-neutral-200">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default page;
