import { IProblem } from "@/types/types";
import { CircleCheck } from "lucide-react";
import { ResizablePanel } from "@/components/ui/resizable";
import { FileText } from "lucide-react";

const ProblemDetails = ({
  problem,
  problemStatus,
}: {
  problem: IProblem[];
  problemStatus: string;
}) => {
  return (
    <ResizablePanel
      className="rounded-lg  ml-2 bg-neutral-800"
      defaultSize={50}
    >
      <div className="h-[35px] bg-[#333333] flex justify-between items-center">
        <span className="text-sm rounded-lg flex justify-start  items-center gap-2 py-2 px-2 hover:bg-neutral-700 cursor-pointer">
          <FileText size="16" className="text-blue-500" /> Description
        </span>
      </div>
      {problem.map((item: IProblem) => (
        <div
          key={item.id}
          className="mx-4 max-h-[calc(100vh-150px)]  overflow-y-auto my-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              {item.id}. {item.title}
            </h1>
            {problemStatus === "Solved" ? (
              <span className="text-sm flex gap-1 justify-center items-center">
                {problemStatus}{" "}
                <CircleCheck className="text-green-500 size-4" />{" "}
              </span>
            ) : null}
          </div>
          <div className="my-4">
            <span
              className={`bg-neutral-700  ${
                item.difficulty === "Easy"
                  ? "text-[#2dd4bf]"
                  : item.difficulty === "Medium"
                  ? "text-[#fbbf24]"
                  : "text-[#f43f5e]"
              } p-2 rounded-full text-xs`}
            >
              {item.difficulty}
            </span>
          </div>
          <div>
            <span className="text-sm text-neutral-100 leading-12">
              {item.description}
            </span>
          </div>
          <div className="my-16">
            {item.examples.map((example, index) => (
              <div key={index}>
                <h2 className="text-sm font-semibold my-2">
                  Example {index + 1}:
                </h2>
                <div className="my-4">
                  <div className="border-l-2 border-neutral-600 pl-4 flex flex-col justify-center items-start">
                    <h3 className="text-md font-semibold">
                      Input:{" "}
                      <span className="text-neutral-500">{example.input}</span>
                    </h3>
                    <h3 className="text-md font-semibold ">
                      Output:{" "}
                      <span className="text-neutral-500">{example.output}</span>
                    </h3>
                    <h3 className="text-md font-semibold">
                      Explanation:{" "}
                      <span className="text-neutral-500">
                        {example.explanation}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold">Constraints:</h2>
            <ul className="list-disc list-inside flex flex-col gap-1">
              {item.constraints.map((constraint: string, index: number) => (
                <li key={index} className="text-neutral-400">
                  <span className="text-xs bg-neutral-800 border-neutral-600 border rounded-sm px-2">
                    {constraint}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </ResizablePanel>
  );
};

export default ProblemDetails;
