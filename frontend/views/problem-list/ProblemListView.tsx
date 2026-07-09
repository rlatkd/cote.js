import Link from "next/link";
import { Sparkles } from "lucide-react";
import { acceptanceRate, type Problem } from "@/entities/problem/model";
import DifficultyBadge from "@/shared/ui/DifficultyBadge";

export default function ProblemListView({ problems }: { problems: Problem[] }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">문제</h1>
          <p className="mt-1 text-sm text-zinc-500">
            총 {problems.length}개 · AI 생성{" "}
            {problems.filter((p) => p.aiGenerated).length}개
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-medium">번호</th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">유형</th>
              <th className="px-4 py-3 font-medium">난이도</th>
              <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">
                제출
              </th>
              <th className="px-4 py-3 text-right font-medium">정답률</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {problems.map((p) => (
              <tr
                key={p.id}
                className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
              >
                <td className="px-4 py-3 font-mono text-zinc-500">{p.id}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/problems/${p.id}`}
                    className="font-medium hover:text-brand"
                  >
                    {p.title}
                  </Link>
                  {p.aiGenerated && (
                    <span className="ml-2 inline-flex items-center gap-0.5 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                      <Sparkles size={9} /> AI
                    </span>
                  )}
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <DifficultyBadge difficulty={p.difficulty} tier={p.tier} />
                </td>
                <td className="hidden px-4 py-3 text-right font-mono text-zinc-500 sm:table-cell">
                  {p.submissionCount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-medium">{acceptanceRate(p)}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
