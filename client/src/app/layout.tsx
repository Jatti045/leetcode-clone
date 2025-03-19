import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import ReducToolkitProvider from "../providers/ReduxToolkitProvider";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leetcode",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden text-gray-100 bg-neutral-900`}
      >
        <ReducToolkitProvider>
          <Navbar />
          <AuthProvider>{children}</AuthProvider>
        </ReducToolkitProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#2F2F2F",
              border: "none",
              color: "green",
            },
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
