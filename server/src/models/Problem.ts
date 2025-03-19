import mongoose, { Model, Schema } from "mongoose";
import { IExample, IProblem } from "../types/types";

const ExampleSchema: Schema<IExample> = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const ProblemSchema: Schema<IProblem> = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: [true, "Problem ID is required"],
    },
    title: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Problem description is required"],
    },
    solution: {
      type: String,
    },
    acceptance: {
      type: String,
      required: [true, "Acceptance rate is required"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: [true, "Problem difficulty is required"],
    },
    frequency: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: [true, "Problem frequency is required"],
    },
    status: {
      type: String,
      enum: ["Solved", "Unsolved", "Attempted"],
      required: [true, "Problem status is required"],
    },
    examples: {
      type: [ExampleSchema],
      default: [],
    },
    constraints: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Problem: Model<IProblem> = mongoose.model<IProblem>(
  "Problem",
  ProblemSchema
);
export default Problem;
