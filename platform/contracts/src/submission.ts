// submission 도메인 계약. arena·hub 공유.

import { z } from "zod";
import { languageSchema } from "./problem";

export const JUDGE_RESULTS = [
  "맞았습니다",
  "틀렸습니다",
  "시간 초과",
  "메모리 초과",
  "런타임 에러",
  "컴파일 에러",
  "채점 중",
] as const;
export const judgeResultSchema = z.enum(JUDGE_RESULTS);
export type JudgeResult = z.infer<typeof judgeResultSchema>;

export const submissionSchema = z.object({
  id: z.number().int(),
  user: z.string(),
  problemId: z.number().int(),
  problemTitle: z.string(),
  result: judgeResultSchema,
  language: languageSchema,
  time: z.string(),
  memory: z.string(),
  length: z.number().int(),
  submittedAt: z.string(), // "YYYY-MM-DD HH:mm:ss"
});
export type Submission = z.infer<typeof submissionSchema>;

/** 제출 생성 요청 계약 (arena → hub POST /submissions) */
export const createSubmissionSchema = z.object({
  problemId: z.number().int(),
  language: languageSchema,
  code: z.string().min(1),
  user: z.string().default("guest"),
});
export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
