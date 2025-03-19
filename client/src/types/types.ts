// Defined types for the client application

// Define the interface for Problem model
export interface IProblem extends Document {
  _id: number;
  id: number;
  title: string;
  description: string;
  solution?: string;
  acceptance: string;
  difficulty: "Easy" | "Medium" | "Hard";
  frequency: string;
  status: string;
  filter: (problem: any) => Promise<boolean>;
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  constraints: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IExecutionResult {
  expected: string;
  input: string;
  output: string;
  passed: boolean;
  testCase: number;
}

export interface IConsoleOutputPanel {
  executionResultsLoading: boolean;
  examples: IExample[];
  executionResults: IExecutionResult[];
  testResultTerminal: boolean;
  setTestResultTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  testCaseTerminal: boolean;
  setTestCaseTerminal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ICodeEditorPanel {
  problemStatus: string;
  problemId: number;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  executionResults?: IExecutionResult[];
  setExecutionResults: React.Dispatch<React.SetStateAction<IExecutionResult[]>>;
  setExecutionResultsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTestResultTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  setTestCaseTerminal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IExample {
  input: string;
  output: string;
  explanation: string;
}

export interface DisplayProblemsPropsInterface {
  filteredProblems: string;
  setFilteredProblems?: React.Dispatch<React.SetStateAction<string>>;
  filteredDifficulty: string;
  setFilteredDifficulty?: React.Dispatch<React.SetStateAction<string>>;
  filteredStatus: string;
  setFilteredStatus?: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProblemsInterface {
  id: number;
  status: string;
  title: string;
  solution: string;
  acceptance: string;
  difficulty: string;
  frequency: string;
}
