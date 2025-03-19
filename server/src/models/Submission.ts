import mongoose, { Model, Schema } from "mongoose";
import { ISubmission } from "../types/types";

const SubmissionSchema: Schema<ISubmission> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Unsolved",
    },
  },
  { timestamps: true }
);

const Submission: Model<ISubmission> = mongoose.model<ISubmission>(
  "Submission",
  SubmissionSchema
);
export default Submission;
