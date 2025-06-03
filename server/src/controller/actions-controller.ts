import { RequestHandler } from "express";
import { NodeVM } from "vm2";
import Problem from "../models/Problem";
import { IProblem, IResult } from "../types/types";
import Submission from "../models/Submission";
import { parseInput, parseValue } from "../utils/parsing";

export const executeCode: RequestHandler = async (req, res, next) => {
  try {
    const { userId, problemId, code, language, problemStatus } = req.body;

    let submission = await Submission.findOne({
      user: userId,
      problem: problemId,
    });

    if (submission) {
      submission.code = code;
    } else {
      submission = new Submission({
        user: userId,
        problem: problemId,
        code,
        problemStatus,
      });
    }

    await submission.save();

    if (language !== "javascript") {
      res
        .status(400)
        .json({ success: false, message: "Language not supported" });
      return;
    }

    const wrappedCode = `module.exports = { solve: ${code} }`;

    const vm = new NodeVM({
      console: "redirect",
      sandbox: {},
      timeout: 5000,
    });

    const userModule = vm.run(wrappedCode, "vm.js");

    const problem = await Problem.findById(problemId);
    if (!problem) {
      res.status(404).json({ success: false, message: "Problem not found" });
      return;
    }

    const problemDoc = problem as IProblem;
    const { examples } = problemDoc;

    const results: IResult[] = [];

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];

      try {
        const inputObj = parseInput(example.input);
        const expectedOutput = parseValue(example.output);
        const userOutput = userModule.solve(inputObj);
        const passed =
          JSON.stringify(userOutput) === JSON.stringify(expectedOutput);
        results.push({
          testCase: i + 1,
          passed,
          input: inputObj,
          expected: expectedOutput,
          output: userOutput,
        });
      } catch (error: any) {
        results.push({
          testCase: i + 1,
          passed: false,
          input: example.input,
          expected: example.output,
          error: error.toString(),
        });
      }
    }

    const overallSuccess = results.every((r) => r.passed);
    submission.status = overallSuccess ? "Solved" : "Unsolved";
    await submission.save();

    res.status(200).json({ success: overallSuccess, data: results });
    return;
  } catch (error) {
    next(error);
  }
};

export const getSubmission: RequestHandler = async (req, res, next) => {
  try {
    const { userId, problemId } = req.body;

    const submission = await Submission.findOne({
      user: userId,
      problem: problemId,
    });

    if (!submission) {
      res.status(200).json({ success: false, data: submission });
      return;
    }

    res.status(200).json({ success: true, data: submission });
    return;
  } catch (error) {
    next(error);
  }
};
