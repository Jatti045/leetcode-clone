import { RequestHandler } from "express";
import Problem from "../models/Problem";
import Submission from "../models/Submission";
import redisClient from "../database/redis";

export const getProblems: RequestHandler = async (req, res, next) => {
  try {
    const { search, difficulty, status, userId } = req.query;

    let problems: any[] = [];

    const cached = await redisClient.get("problems");
    if (cached) {
      problems = JSON.parse(cached);
    } else {
      problems = await Problem.find({});
      await redisClient.set("problems", JSON.stringify(problems));
    }

    let filteredProblems = problems as any[];

    if (search && typeof search === "string" && search.trim() !== "") {
      filteredProblems = filteredProblems.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    if (
      difficulty &&
      typeof difficulty === "string" &&
      difficulty.trim() !== "" &&
      difficulty.toLowerCase() !== "none"
    ) {
      filteredProblems = filteredProblems.filter(
        (p) => p.difficulty.toLowerCase() === difficulty.toLowerCase().trim()
      );
    }

    let problemsWithStatus = filteredProblems.map((problem: any) => {
      const obj = typeof problem.toObject === "function" ? problem.toObject() : problem;

      if (!obj.id) {
        obj.id = String(obj._id);
      }
      return { ...obj, status: "Unsolved" };
    });

    if (userId && typeof userId === "string") {
      const submissions = await Submission.find({ user: userId });
      const submissionMap = submissions.reduce((acc, submission) => {
        acc[String(submission.problem)] = submission.status;
        return acc;
      }, {} as Record<string, string>);

      problemsWithStatus = problemsWithStatus.map((problem) => ({
        ...problem,
        status: submissionMap[String((problem as any)._id)] || "Unsolved",
      }));
    }

    if (
      status &&
      typeof status === "string" &&
      status.trim() !== "" &&
      status.toLowerCase() !== "none"
    ) {
      problemsWithStatus = problemsWithStatus.filter(
        (problem) =>
          problem.status.toLowerCase() === status.trim().toLowerCase()
      );
    }

    res.status(200).json({
      success: true,
      data: problemsWithStatus,
    });
    return;
  } catch (error) {
    next(error);
  }
};
