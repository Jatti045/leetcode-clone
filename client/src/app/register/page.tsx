"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterFormData } from "@/types/types";
import { toast } from "sonner";
import { registerUser } from "@/store/slices/auth-slice";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const page = () => {
  const { register, handleSubmit, reset } = useForm<IRegisterFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const authState = useSelector((state: RootState) => state.auth);
  const { isLoading } = authState;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onHandleRegisterSubmit: SubmitHandler<IRegisterFormData> = async (
    registerFormData
  ) => {
    const response = await dispatch(registerUser(registerFormData));

    if (response?.payload?.success) {
      reset();
      router.push("/login");
      toast.success(response?.payload?.message);
    } else {
      toast.error(response?.payload?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-50px)]">
      {isLoading ? (
        <div className="h-[600px] container mx-auto w-[400px] bg-neutral-800 flex flex-col justify-center items-center">
          <Loader2
            className="size-12 animate-spin text-neutral-900"
            style={{ animationDuration: "0.5s" }}
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onHandleRegisterSubmit)}
          className="h-[600px] container mx-auto w-[400px] bg-neutral-800 flex flex-col justify-between"
        >
          <div className="w-full py-16">
            <img src="./leetcode-logo.png" className="mx-auto" />
          </div>
          <div className="flex flex-col justify-center items-center space-y-6">
            <Input
              {...register("username")}
              placeholder="Username"
              type="text"
              className="w-[90%] mx-auto rounded-none focus:ring border-neutral-900 p-5 hover:border-black"
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
            <div className="relative w-[90%] mx-auto ">
              <Input
                {...register("confirmPassword")}
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full rounded-none border-neutral-900 p-5 hover:border-black"
              />
              {showConfirmPassword ? (
                <Eye
                  onClick={() => setShowConfirmPassword(false)}
                  className="cursor-pointer size-4 absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                />
              ) : (
                <EyeClosed
                  onClick={() => setShowConfirmPassword(true)}
                  className="cursor-pointer size-4 absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
            <Input
              {...register("email")}
              placeholder="E-mail address"
              type="email"
              className="w-[90%] mx-auto rounded-none border-neutral-900 p-5 hover:border-black"
            />
          </div>
          <div className="w-[90%] mx-auto">
            <Button
              type="submit"
              className="w-full rounded-none cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
          <div className="my-8 text-sm text-neutral-400 flex flex-col mx-auto justify-center items-center gap-6">
            <span>
              Have an account?{" "}
              <Link href="/login" className="text-neutral-200">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default page;
