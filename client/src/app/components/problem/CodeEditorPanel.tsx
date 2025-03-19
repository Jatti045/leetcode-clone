"use client";

import React, { useEffect } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { CodeXml, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor, { OnMount } from "@monaco-editor/react";
import { ICodeEditorPanel } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CodeEditorPanel = ({
  problemStatus,
  problemId,
  language,
  setLanguage,
  code,
  setCode,
  setExecutionResults,
  setExecutionResultsLoading,
  setTestResultTerminal,
  setTestCaseTerminal,
}: ICodeEditorPanel) => {
  const authState = useSelector((state: RootState) => state.auth);
  const { user, isAuthenticated } = authState;

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const runCode = async () => {
    try {
      setTestCaseTerminal(false);
      setTestResultTerminal(true);
      setExecutionResultsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/actions/execute-code`,
        {
          userId: user?.userId,
          problemId,
          code,
          language,
          problemStatus,
        }
      );
      setExecutionResults(response?.data?.data);
      setExecutionResultsLoading(false);
    } catch (error) {
      console.error(error);
      setTestCaseTerminal(true);
      setTestResultTerminal(false);
      setExecutionResultsLoading(false);
      toast.error("Failed to run code");
    }
  };

  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme("my-custom-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#262626",
        "editor.foreground": "#FFFFFF",
      },
    });
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.editor.setTheme("my-custom-theme");
  };

  useEffect(() => {
    const fetchUserSavedCode = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/actions/get-submission`,
          { userId: user?.userId, problemId }
        );
        console.log("Response: ", response);

        if (response?.data?.success) {
          setCode(response?.data?.data?.code);
        }
      } catch (error) {
        console.error("Error fetching saved code:", error);
      }
    };

    fetchUserSavedCode();
  }, [user]);

  return (
    <ResizablePanel className="rounded-lg mx-2 mb-2" defaultSize={50}>
      <div className="h-[35px] bg-[#333333] flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="w-full">
              <Button
                onClick={
                  isAuthenticated
                    ? () => runCode()
                    : () => toast.error("Login to run code")
                }
                className={`rounded-none w-full bg-transparent hover:bg-neutral-700 ${
                  isAuthenticated ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span className="flex justify-center items-center gap-2">
                  <CodeXml className="size-5 text-green-500" />
                  Run
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Execute your code to test your solution and save your submission
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="h-[35px] bg-neutral-800 border-b border-neutral-800">
        <Select
          value={language}
          onValueChange={(value: string) => setLanguage(value)}
        >
          <SelectTrigger className="border-none cursor-pointer">
            <SelectValue placeholder="Javscript" defaultValue="javascript" />
          </SelectTrigger>
          <SelectContent className="cursor-pointer bg-neutral-800 border-none">
            <SelectItem
              value="javascript"
              className="cursor-pointer bg-neutral-800 text-neutral-200 hover:bg-neutral-800"
            >
              Javascript
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-full">
        <Editor
          loading={
            <div className="w-full h-full bg-neutral-800 text-neutral-700 flex justify-center  ">
              <Loader2
                className="animate-spin size-12"
                style={{ animationDuration: "0.5s" }}
              />
            </div>
          }
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            wordWrap: "on",
            wrappingStrategy: "advanced",
            minimap: { enabled: false },
            wrappingIndent: "same",
            padding: { top: 10 },
            scrollbar: { horizontal: "hidden" },
          }}
        />
      </div>
    </ResizablePanel>
  );
};

export default CodeEditorPanel;
