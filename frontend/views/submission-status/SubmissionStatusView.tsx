import Link from "next/link";
import type { Submission } from "@/entities/submission/model";
import StatusBadge from "@/shared/ui/StatusBadge";

export default function SubmissionStatusView({
  submissions,
}: {
  submissions: Submission[];
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">채점 현황</h1>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-zinc-50 text-left text-xs text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-medium">제출 번호</th>
              <th className="px-4 py-3 font-medium">사용자</th>
              <th className="px-4 py-3 font-medium">문제</th>
              <th className="px-4 py-3 font-medium">결과</th>
              <th className="px-4 py-3 font-medium">언어</th>
              <th className="px-4 py-3 text-right font-medium">시간</th>
              <th className="px-4 py-3 text-right font-medium">메모리</th>
              <th className="px-4 py-3 text-right font-medium">제출 시각</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {submissions.map((s) => (
              <tr
                key={s.id}
                className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
              >
                <td className="px-4 py-3 font-mono text-zinc-500">{s.id}</td>
                <td className="px-4 py-3 font-medium">{s.user}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/problems/${s.problemId}`}
                    className="hover:text-brand"
                  >
                    {s.problemTitle}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge result={s.result} />
                </td>
                <td className="px-4 py-3 text-zinc-500">{s.language}</td>
                <td className="px-4 py-3 text-right font-mono text-zinc-500">
                  {s.time}
                </td>
                <td className="px-4 py-3 text-right font-mono text-zinc-500">
                  {s.memory}
                </td>
                <td className="px-4 py-3 text-right text-zinc-400">
                  {s.submittedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
