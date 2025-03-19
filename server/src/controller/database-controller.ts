import { RequestHandler } from "express";
import Problem from "../models/Problem";
import Submission from "../models/Submission";

export const getProblems: RequestHandler = async (req, res, next) => {
  try {
    const { search, difficulty, status, userId } = req.query;
    const query: any = {};

    if (search && typeof search === "string" && search.trim() !== "") {
      query.title = { $regex: search.trim(), $options: "i" };
    }

    if (
      difficulty &&
      typeof difficulty === "string" &&
      difficulty.trim() !== "" &&
      difficulty.toLowerCase() !== "none"
    ) {
      query.difficulty = { $regex: `^${difficulty.trim()}$`, $options: "i" };
    }

    const problems = await Problem.find(query);

    let problemsWithStatus = problems.map((problem) => {
      const obj = problem.toObject();

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
