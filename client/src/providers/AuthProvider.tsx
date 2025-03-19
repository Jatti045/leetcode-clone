// providers/AuthProvider.tsx
"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks/hooks";
import { checkAuth } from "@/store/slices/auth-slice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return children;
};

export default AuthProvider;
