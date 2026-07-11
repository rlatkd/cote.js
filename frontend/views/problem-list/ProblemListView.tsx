"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import {
  acceptanceRate,
  type Difficulty,
  type Problem,
} from "@/entities/problem/model";
import DifficultyBadge from "@/entities/problem/ui/DifficultyBadge";

const DIFFICULTIES: (Difficulty | "전체")[] = [
  "전체",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
];

// 서버에서 페칭한 problems를 받아 클라이언트에서 필터링하는 client island.
export default function ProblemListView({ problems }: { problems: Problem[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "전체">("전체");
  const [aiOnly, setAiOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      if (difficulty !== "전체" && p.difficulty !== difficulty) return false;
      if (aiOnly && !p.aiGenerated) return false;
      if (q) {
        const hay = `${p.id} ${p.title} ${p.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [problems, query, difficulty, aiOnly]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">문제</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {filtered.length}
          {filtered.length !== problems.length && ` / ${problems.length}`}개
        </p>
      </div>

      {/* 필터 바 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="제목·번호·유형 검색"
            className="w-56 rounded-lg border border-zinc-300 bg-white py-1.5 pl-8 pr-3 text-sm outline-none transition focus:border-brand dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <div className="flex items-center gap-1">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                difficulty === d
                  ? "bg-brand text-white"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <button
          onClick={() => setAiOnly((v) => !v)}
          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            aiOnly
              ? "bg-brand/10 text-brand"
              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          }`}
        >
          <Sparkles size={13} /> AI 생성만
        </button>
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
            {filtered.map((p) => (
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
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-zinc-400"
                >
                  조건에 맞는 문제가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
