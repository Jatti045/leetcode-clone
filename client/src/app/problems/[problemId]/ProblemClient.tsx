"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IExecutionResult, IProblem } from "@/types/types";
import ProblemDetails from "@/app/components/problem/ProblemDetails";
import CodeEditorPanel from "@/app/components/problem/CodeEditorPanel";
import { useEffect, useState } from "react";
import ConsoleOutputPanel from "@/app/components/problem/ConsoleOutputPanel";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { set } from "react-hook-form";

export default function ProblemClient({ problem }: { problem: IProblem[] }) {
  const preCode = `(args) => {
    console.log("Hello, world!");
    return "dummy output";
  }`;

  const [testCaseTerminal, setTestCaseTerminal] = useState(true);
  const [testResultTerminal, setTestResultTerminal] = useState(false);
  const [executionResultsLoading, setExecutionResultsLoading] = useState(false);
  const [executionResults, setExecutionResults] = useState<IExecutionResult[]>(
    []
  );
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(preCode);

  const [problemStatus, setProblemStatus] = useState("");

  const authState = useSelector((state: RootState) => state.auth);
  const { user } = authState;

  useEffect(() => {
    const getProblemStatus = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/actions/get-submission`,
        {
          userId: user?.userId,
          problemId: problem[0]._id,
        }
      );
      setProblemStatus(response?.data?.data?.status);
      console.log(response?.data?.data?.status);
    };

    getProblemStatus();
  }, [user?.userId]);

  return (
    <div className="bg-black w-full min-h-[calc(100vh-40px)] relative">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border-neutral-900 w-full min-h-[calc(100vh-50px)]"
      >
        <ProblemDetails problem={problem} problemStatus={problemStatus} />
        <ResizableHandle className="bg-neutral-700 opacity-0 hover:opacity-100 transition duration-200" />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <CodeEditorPanel
              problemStatus={problemStatus}
              setTestCaseTerminal={setTestCaseTerminal}
              setTestResultTerminal={setTestResultTerminal}
              setExecutionResultsLoading={setExecutionResultsLoading}
              setExecutionResults={setExecutionResults}
              problemId={problem[0]._id}
              language={language}
              setLanguage={setLanguage}
              code={code}
              setCode={setCode}
            />
            <ResizableHandle className="bg-neutral-700 opacity-0 hover:opacity-100 transition duration-200" />
            <ConsoleOutputPanel
              testCaseTerminal={testCaseTerminal}
              setTestCaseTerminal={setTestCaseTerminal}
              testResultTerminal={testResultTerminal}
              setTestResultTerminal={setTestResultTerminal}
              executionResultsLoading={executionResultsLoading}
              executionResults={executionResults}
              examples={problem[0].examples}
            />
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
