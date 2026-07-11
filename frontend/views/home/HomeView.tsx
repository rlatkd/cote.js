import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Gauge, Trophy } from "lucide-react";
import { acceptanceRate, type Problem } from "@/entities/problem/model";
import DifficultyBadge from "@/entities/problem/ui/DifficultyBadge";

export default function HomeView({ problems }: { problems: Problem[] }) {
  const recent = problems.slice(0, 5);
  const aiCount = problems.filter((p) => p.aiGenerated).length;

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand">
          <Sparkles size={13} /> AI가 생성하고 검증한 문제로 연습하세요
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          매일 새로운 알고리즘 문제,
          <br />
          <span className="text-brand">AI</span>가 만들어 드립니다
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
          기존 문제와의 유사도 검증과 정답 교차검증을 거친 신선한 문제로 실전
          코딩 테스트를 준비하세요.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-hover"
          >
            문제 풀러 가기 <ArrowRight size={16} />
          </Link>
          <Link
            href="/status"
            className="inline-flex items-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            채점 현황 보기
          </Link>
        </div>
      </section>

      {/* 통계 */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Gauge size={18} />} label="등록 문제" value={`${problems.length}개`} />
        <Stat icon={<Sparkles size={18} />} label="AI 생성 문제" value={`${aiCount}개`} />
        <Stat icon={<ShieldCheck size={18} />} label="검증 통과율" value="92%" />
        <Stat icon={<Trophy size={18} />} label="누적 제출" value="43.9만" />
      </section>

      {/* 최근 문제 */}
      <section className="py-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">최근 등록된 문제</h2>
          <Link href="/problems" className="text-sm font-medium text-brand hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs text-zinc-500 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2.5 font-medium">번호</th>
                <th className="px-4 py-2.5 font-medium">제목</th>
                <th className="px-4 py-2.5 font-medium">난이도</th>
                <th className="hidden px-4 py-2.5 font-medium sm:table-cell">정답률</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recent.map((p) => (
                <tr key={p.id} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
                  <td className="px-4 py-3 font-mono text-zinc-500">{p.id}</td>
                  <td className="px-4 py-3">
                    <Link href={`/problems/${p.id}`} className="font-medium hover:text-brand">
                      {p.title}
                    </Link>
                    {p.aiGenerated && (
                      <span className="ml-2 inline-flex items-center gap-0.5 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                        <Sparkles size={9} /> AI
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <DifficultyBadge difficulty={p.difficulty} tier={p.tier} />
                  </td>
                  <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell">
                    {acceptanceRate(p)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-zinc-500">{label}</div>
    </div>
  );
}
