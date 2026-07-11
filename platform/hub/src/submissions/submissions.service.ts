import { Injectable } from "@nestjs/common";
import type {
  CreateSubmissionInput,
  JudgeResult,
  Language,
  Submission,
} from "@cotejs/contracts";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SubmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Submission[]> {
    const rows = await this.prisma.submission.findMany({
      orderBy: { submittedAt: "desc" },
    });
    return rows.map(toSubmission);
  }

  async create(input: CreateSubmissionInput): Promise<Submission> {
    const problem = await this.prisma.problem.findUnique({
      where: { id: input.problemId },
    });
    const problemTitle = problem?.title ?? `#${input.problemId}`;

    // TODO(Judge 마일스톤): 실제 채점은 Kafka → Go judge → 샌드박스에서 수행한다.
    // 현재 hub 슬라이스는 제출을 영속화하고 "채점 중" 상태로 즉시 반환한다(POC).
    const pending: JudgeResult = "채점 중";

    const row = await this.prisma.submission.create({
      data: {
        user: input.user,
        problemId: input.problemId,
        problemTitle,
        result: pending,
        language: input.language,
        time: "—",
        memory: "—",
        length: input.code.length,
      },
    });
    return toSubmission(row);
  }
}

type SubmissionRow = {
  id: number;
  user: string;
  problemId: number;
  problemTitle: string;
  result: string;
  language: string;
  time: string;
  memory: string;
  length: number;
  submittedAt: Date;
};

function toSubmission(row: SubmissionRow): Submission {
  return {
    id: row.id,
    user: row.user,
    problemId: row.problemId,
    problemTitle: row.problemTitle,
    result: row.result as JudgeResult,
    language: row.language as Language,
    time: row.time,
    memory: row.memory,
    length: row.length,
    submittedAt: formatTimestamp(row.submittedAt),
  };
}

/** DateTime → "YYYY-MM-DD HH:mm:ss" */
function formatTimestamp(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  );
}
