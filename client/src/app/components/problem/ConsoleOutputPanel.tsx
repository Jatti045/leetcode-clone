"use client";

import React from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { IConsoleOutputPanel } from "@/types/types";
import { Loader2, SquareCheckBig, Terminal } from "lucide-react";

const ConsoleOutputPanel: React.FC<IConsoleOutputPanel> = ({
  examples,
  executionResults,
  executionResultsLoading,
  testResultTerminal,
  setTestResultTerminal,
  testCaseTerminal,
  setTestCaseTerminal,
}) => {
  const [currentTestCase, setCurrentTestCase] = React.useState<number>(0);

  const firstFailedTest = executionResults?.find((result) => !result.passed);
  const allPassed = executionResults?.every((result) => result.passed);

  return (
    <ResizablePanel
      className="rounded-lg mx-2  bg-neutral-800"
      defaultSize={50}
    >
      <div className="h-[35px] bg-[#333333] flex border-b border-neutral-700">
        <Button
          onClick={() => {
            setTestCaseTerminal(true);
            setTestResultTerminal(false);
          }}
          className="rounded-none flex-1 py-2 text-sm font-mono bg-transparent hover:bg-neutral-700 cursor-pointer border-r border-neutral-700"
        >
          <span
            className={testCaseTerminal ? "text-white" : "text-neutral-500"}
          >
            Testcase
          </span>
        </Button>
        <Button
          onClick={() => {
            setTestCaseTerminal(false);
            setTestResultTerminal(true);
          }}
          className="rounded-none flex-1 py-2 text-sm font-mono bg-transparent hover:bg-neutral-700 cursor-pointer"
        >
          <span
            className={testResultTerminal ? "text-white" : "text-neutral-500"}
          >
            Test Result
          </span>
        </Button>
      </div>
      {/* Terminal Output */}
      <div className="flex overflow-y-auto relative h-[calc(100%-40px)] items-start justify-start p-6 gap-2">
        {testCaseTerminal && (
          <div className="w-full">
            {examples.map((example, index) => (
              <div key={index} className="mb-2">
                <span
                  onClick={() => setCurrentTestCase(index)}
                  className={`cursor-pointer block py-2 px-4 text-sm font-mono rounded-lg ${
                    currentTestCase === index
                      ? "bg-neutral-700 text-white"
                      : "text-neutral-500 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  Case {index + 1}
                </span>
                {currentTestCase === index && (
                  <div className="bg-neutral-700 p-4 rounded-lg mt-2 text-sm font-mono text-white">
                    <p>
                      <strong>Input:</strong> {JSON.stringify(example.input)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {testResultTerminal && (
          <div className="w-full h-full flex flex-col items-center gap-4">
            {executionResultsLoading ? (
              <Loader2
                className="animate-spin size-16"
                style={{ animationDuration: "0.5s" }}
              />
            ) : executionResults && executionResults.length > 0 ? (
              <div className="text-left w-full max-w-xl bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                {allPassed ? (
                  <div className="text-xl text-green-500 font-mono flex items-center gap-2">
                    ✅ <span>All test cases passed</span>
                  </div>
                ) : (
                  <div>
                    <div className="text-red-500 text-lg font-mono flex items-center gap-2">
                      ❌{" "}
                      <span>Test case {firstFailedTest?.testCase} failed</span>
                    </div>
                    <div className="text-sm text-white mt-4 font-mono border-t border-neutral-700 pt-3 space-y-2">
                      <div className="bg-neutral-900 p-2 rounded-md">
                        <strong className="text-neutral-400">Input:</strong>
                        <pre className="text-white bg-black p-2 rounded-md overflow-x-auto">
                          {JSON.stringify(firstFailedTest?.input, null, 2)}
                        </pre>
                      </div>
                      <div className="bg-neutral-900 p-2 rounded-md">
                        <strong className="text-neutral-400">Expected:</strong>
                        <pre className="text-white bg-black p-2 rounded-md overflow-x-auto">
                          {JSON.stringify(firstFailedTest?.expected, null, 2)}
                        </pre>
                      </div>
                      <div className="bg-neutral-900 p-2 rounded-md">
                        <strong className="text-neutral-400">Output:</strong>
                        <pre className="text-white bg-black p-2 rounded-md overflow-x-auto">
                          {JSON.stringify(firstFailedTest?.output, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-sm text-neutral-500">
                You must run your code first
              </span>
            )}
          </div>
        )}
      </div>
    </ResizablePanel>
  );
};

export default ConsoleOutputPanel;
