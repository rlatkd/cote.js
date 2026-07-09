// problem 도메인 모델 (타입 + 순수 도메인 로직). 데이터·부수효과 없음.

export type Difficulty = "Bronze" | "Silver" | "Gold" | "Platinum";

export interface Example {
  input: string;
  output: string;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  tier: string; // 예: "Silver III"
  timeLimit: string; // 예: "1초"
  memoryLimit: string; // 예: "256 MB"
  submissionCount: number;
  acceptedCount: number;
  tags: string[];
  aiGenerated: boolean;
  description: string;
  inputDesc: string;
  outputDesc: string;
  examples: Example[];
  starterCode: Record<string, string>;
}

export const LANGUAGES = ["Python", "C++", "Java", "JavaScript"] as const;
export type Language = (typeof LANGUAGES)[number];

export const monacoLangMap: Record<Language, string> = {
  Python: "python",
  "C++": "cpp",
  Java: "java",
  JavaScript: "javascript",
};

/** 정답률(%) — 소수 첫째 자리까지. */
export function acceptanceRate(p: Problem): number {
  if (p.submissionCount === 0) return 0;
  return Math.round((p.acceptedCount / p.submissionCount) * 1000) / 10;
}
