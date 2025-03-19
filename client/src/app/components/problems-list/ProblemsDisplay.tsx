"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CircleCheckBig, FileVideo, Loader2, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IProblem } from "@/types/types";

export default function ProblemsDisplay() {
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/database/get-problems`,
          {
            params: {
              search,
              difficulty,
              status,
              userId: user?.userId,
            },
          }
        );
        setProblems(response.data.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [search, difficulty, status, user?.userId]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2
          className="animate-spin size-12 text-neutral-700"
          style={{ animationDuration: "0.5s" }}
        />
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <div className="max-w-[1100px] mx-auto mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-neutral-700 font-extralight">
              <th className="text-sm pb-3 px-2 font-extralight text-neutral-400">
                Status
              </th>
              <th className="text-sm pb-3 font-extralight text-neutral-400">
                Title
              </th>
              <th className="text-sm pb-3 font-extralight text-neutral-400">
                Solution
              </th>
              <th className="text-sm pb-3 font-extralight text-neutral-400">
                Acceptance
              </th>
              <th className="text-sm pb-3 font-extralight text-neutral-400">
                Difficulty
              </th>
              <th className="text-sm pb-3 font-extralight text-neutral-400">
                Frequency
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr
                key={problem.id}
                className={`text-left text-sm ${
                  index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-900"
                }`}
              >
                <td className="py-4 px-2">
                  {problem.status.toLowerCase() === "solved" && (
                    <CircleCheckBig className="size-4 text-green-400" />
                  )}
                </td>
                <td className="py-4">
                  <Link
                    className="hover:text-blue-500"
                    href={`/problems/${index + 1}`}
                  >
                    {index + 1}. {problem.title}
                  </Link>
                </td>
                <td className="py-4">
                  <Link
                    href={problem.solution ?? "#"}
                    className="text-blue-500"
                  >
                    <FileVideo className="size-4 text-[#d946ef]" />
                  </Link>
                </td>
                <td className="py-4">{problem.acceptance}</td>
                <td
                  className={`py-4 ${
                    problem.difficulty.toLowerCase() === "easy"
                      ? "text-[#2dd4bf]"
                      : problem.difficulty.toLowerCase() === "medium"
                      ? "text-[#fbbf24]"
                      : "text-[#f43f5e]"
                  }`}
                >
                  {problem.difficulty}
                </td>
                <td className="py-4 px-2">
                  {user?.premium ? (
                    <span
                      className={`py-4 ${
                        problem.frequency.toLowerCase() === "easy"
                          ? "text-[#2dd4bf]"
                          : problem.frequency.toLowerCase() === "medium"
                          ? "text-[#fbbf24]"
                          : "text-[#f43f5e]"
                      }`}
                    >
                      {problem.frequency}
                    </span>
                  ) : (
                    <div className="relative rounded-lg bg-neutral-600/40 w-full h-[8px]">
                      <div
                        className={`${
                          index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-900"
                        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12px] size-4 p-[10px]`}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <LockKeyhole className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Subscribe to unlock</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
