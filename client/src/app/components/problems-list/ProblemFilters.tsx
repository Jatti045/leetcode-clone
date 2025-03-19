"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ProblemFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || "all"
  );
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (difficulty !== "all") params.set("difficulty", difficulty);
    if (status !== "all") params.set("status", status);

    router.push(`/problems?${params.toString()}`);
  }, [search, difficulty, status, router]);

  return (
    <div className="mx-4">
      <div className="flex justify-start items-center gap-2 container mx-auto max-w-[1100px]">
        {/* Difficulty Select */}
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[180px] text-neutral-500 bg-neutral-800 border-none cursor-pointer hover:bg-neutral-700">
            <SelectValue>
              {difficulty === "all" ? "Difficulty" : difficulty}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="border-none bg-neutral-800 text-neutral-500">
            <SelectItem
              value="all"
              className="hover:bg-neutral-700 cursor-pointer"
            >
              All
            </SelectItem>
            <SelectItem
              value="Easy"
              className="hover:bg-neutral-700 cursor-pointer"
            >
              Easy
            </SelectItem>
            <SelectItem
              value="Medium"
              className="hover:bg-neutral-700 cursor-pointer"
            >
              Medium
            </SelectItem>
            <SelectItem
              value="Hard"
              className="hover:bg-neutral-700 cursor-pointer"
            >
              Hard
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Status Select */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px] bg-neutral-800 text-neutral-500 border-none cursor-pointer hover:bg-neutral-700">
            <SelectValue>{status === "all" ? "Status" : status}</SelectValue>
          </SelectTrigger>
          <SelectContent className="border-none bg-neutral-800 text-neutral-500">
            <SelectItem
              value="all"
              className="hover:bg-neutral-700 cursor-pointer"
            >
              All
            </SelectItem>
            <SelectItem
              value="Solved"
              className="hover:bg-neutral-700 cursor-pointer"
            >
              Solved
            </SelectItem>
            <SelectItem
              value="Unsolved"
              className="hover:bg-neutral-700 cursor-pointer"
            >
              Unsolved
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Search Input */}
        <div className="w-full relative">
          <Input
            placeholder="Search questions"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="px-10 w-full bg-neutral-800 border-none focus:bg-neutral-700 focus-visible:ring-0 focus-visible:outline-none"
          />
          <Search
            size={20}
            className="absolute top-2 left-2 text-neutral-500"
          />
        </div>
      </div>
    </div>
  );
}
