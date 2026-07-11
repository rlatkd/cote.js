// problem 도메인 계약 — zod 스키마를 단일 진실원으로 두고 타입을 추론한다.
// arena(프론트)와 hub(백엔드)가 이 파일 하나를 함께 import 한다(짝 A).

import { z } from "zod";

export const DIFFICULTIES = ["Bronze", "Silver", "Gold", "Platinum"] as const;
export const difficultySchema = z.enum(DIFFICULTIES);
export type Difficulty = z.infer<typeof difficultySchema>;

export const LANGUAGES = ["Python", "C++", "Java", "JavaScript"] as const;
export const languageSchema = z.enum(LANGUAGES);
export type Language = z.infer<typeof languageSchema>;

/** UI 언어명 → Monaco 언어 id */
export const monacoLangMap: Record<Language, string> = {
  Python: "python",
  "C++": "cpp",
  Java: "java",
  JavaScript: "javascript",
};

export const exampleSchema = z.object({
  input: z.string(),
  output: z.string(),
});
export type Example = z.infer<typeof exampleSchema>;

export const problemSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  difficulty: difficultySchema,
  tier: z.string(), // 예: "Silver III"
  timeLimit: z.string(), // 예: "1초"
  memoryLimit: z.string(), // 예: "256 MB"
  submissionCount: z.number().int(),
  acceptedCount: z.number().int(),
  tags: z.array(z.string()),
  aiGenerated: z.boolean(),
  description: z.string(),
  inputDesc: z.string(),
  outputDesc: z.string(),
  examples: z.array(exampleSchema),
  starterCode: z.record(z.string()),
});
export type Problem = z.infer<typeof problemSchema>;

/** 정답률(%) — 소수 첫째 자리까지. */
export function acceptanceRate(
  p: Pick<Problem, "submissionCount" | "acceptedCount">,
): number {
  if (p.submissionCount === 0) return 0;
  return Math.round((p.acceptedCount / p.submissionCount) * 1000) / 10;
}
