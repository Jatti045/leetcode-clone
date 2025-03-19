import { IProblem } from "@/types/types";
import axios from "axios";
import ProblemClient from "./ProblemClient";

export default async function Page({ params }: any) {
  const { problemId } = params as { problemId: string };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/database/get-problems`
  );

  const problem = response.data.data.filter(
    (singleProblem: IProblem) => singleProblem.id === parseInt(problemId)
  );

  return <ProblemClient problem={problem} />;
}
