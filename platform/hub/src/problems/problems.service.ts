import { Injectable, NotFoundException } from "@nestjs/common";
import type { Difficulty, Problem } from "@cotejs/contracts";
import { PrismaService } from "../prisma/prisma.service";

const withExamples = {
  examples: { orderBy: { order: "asc" as const } },
};

@Injectable()
export class ProblemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Problem[]> {
    const rows = await this.prisma.problem.findMany({
      orderBy: { id: "asc" },
      include: withExamples,
    });
    return rows.map(toProblem);
  }

  async findOne(id: number): Promise<Problem> {
    const row = await this.prisma.problem.findUnique({
      where: { id },
      include: withExamples,
    });
    if (!row) throw new NotFoundException(`problem ${id} not found`);
    return toProblem(row);
  }
}

// Prisma row → contracts Problem 계약으로 매핑(Repository 경계).
type ProblemRow = {
  id: number;
  title: string;
  difficulty: string;
  tier: string;
  timeLimit: string;
  memoryLimit: string;
  submissionCount: number;
  acceptedCount: number;
  tags: string[];
  aiGenerated: boolean;
  description: string;
  inputDesc: string;
  outputDesc: string;
  starterCode: unknown;
  examples: { input: string; output: string }[];
};

function toProblem(row: ProblemRow): Problem {
  return {
    id: row.id,
    title: row.title,
    difficulty: row.difficulty as Difficulty,
    tier: row.tier,
    timeLimit: row.timeLimit,
    memoryLimit: row.memoryLimit,
    submissionCount: row.submissionCount,
    acceptedCount: row.acceptedCount,
    tags: row.tags,
    aiGenerated: row.aiGenerated,
    description: row.description,
    inputDesc: row.inputDesc,
    outputDesc: row.outputDesc,
    examples: row.examples.map((e) => ({ input: e.input, output: e.output })),
    starterCode: row.starterCode as Record<string, string>,
  };
}
