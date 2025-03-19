import mongoose, { Document } from "mongoose";

// Define the interface for User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  solvedProblems: mongoose.Types.ObjectId[];
  attemptedProblems: mongoose.Types.ObjectId[];
  premium: boolean;
}

// Define the interface for Problem model
export interface IProblem extends Document {
  problemId: number;
  title: string;
  description: string;
  solution?: string;
  acceptance: string;
  difficulty: "Easy" | "Medium" | "Hard";
  frequency: string;
  status: string;
  examples: IExample[];
  constraints: string[];
}

// Define the interface for Example model
export interface IExample extends Document {
  input: string;
  output: string;
  explanation: string;
}

// Define the interface for Submission model
export interface ISubmission extends Document {
  user: mongoose.Types.ObjectId;
  problem: mongoose.Types.ObjectId;
  code: string;
  status: string;
}

// Define the interface for Code Execution Result
export interface IResult {
  testCase: number;
  passed: boolean;
  input: any;
  expected: any;
  output?: any;
  error?: string;
}
