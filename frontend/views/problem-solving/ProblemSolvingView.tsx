"use client";

import dynamic from "next/dynamic";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Play, Send, RotateCcw, Clock, MemoryStick, Sparkles } from "lucide-react";
import {
  LANGUAGES,
  monacoLangMap,
  type Language,
  type Problem,
} from "@/entities/problem/model";
import { useProblemSolving } from "@/entities/problem/use-problem-solving";
import DifficultyBadge from "@/entities/problem/ui/DifficultyBadge";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
      에디터 불러오는 중…
    </div>
  ),
});

export default function ProblemSolvingView({ problem }: { problem: Problem }) {
  const {
    language,
    code,
    setCode,
    editorTheme,
    runState,
    results,
    mode,
    allPassed,
    changeLanguage,
    resetCode,
    judge,
  } = useProblemSolving(problem);

  return (
    <PanelGroup direction="horizontal" className="h-full">
      {/* 좌측: 문제 지문 */}
      <Panel defaultSize={45} minSize={25} className="flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={problem.difficulty} tier={problem.tier} />
            {problem.aiGenerated && (
              <span className="inline-flex items-center gap-1 rounded-md bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                <Sparkles size={12} /> AI 생성
              </span>
            )}
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-xl font-bold tracking-tight">
            {problem.id}. {problem.title}
          </h1>

          <div className="mt-3 flex gap-4 border-b border-zinc-200 pb-4 text-xs text-zinc-500 dark:border-zinc-800">
            <span className="inline-flex items-center gap-1">
              <Clock size={13} /> 시간 제한 {problem.timeLimit}
            </span>
            <span className="inline-flex items-center gap-1">
              <MemoryStick size={13} /> 메모리 제한 {problem.memoryLimit}
            </span>
          </div>

          <Section title="문제">
            <p className="whitespace-pre-line leading-relaxed">{problem.description}</p>
          </Section>
          <Section title="입력">
            <p className="whitespace-pre-line leading-relaxed">{problem.inputDesc}</p>
          </Section>
          <Section title="출력">
            <p className="whitespace-pre-line leading-relaxed">{problem.outputDesc}</p>
          </Section>

          {problem.examples.map((ex, i) => (
            <div key={i} className="mt-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="mb-1 text-xs font-semibold text-zinc-500">
                    예제 입력 {i + 1}
                  </div>
                  <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900">
                    {ex.input}
                  </pre>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold text-zinc-500">
                    예제 출력 {i + 1}
                  </div>
                  <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900">
                    {ex.output}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-zinc-200 transition hover:bg-brand dark:bg-zinc-800" />

      {/* 우측: 에디터 + 결과 (세로 분할) */}
      <Panel defaultSize={55} minSize={30}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={65} minSize={25} className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value as Language)}
                className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <button
                onClick={resetCode}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <RotateCcw size={13} /> 초기화
              </button>
            </div>
            <div className="flex-1">
              <MonacoEditor
                language={monacoLangMap[language]}
                theme={editorTheme}
                value={code}
                onChange={(v) => setCode(v ?? "")}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                  padding: { top: 12 },
                  tabSize: 4,
                }}
              />
            </div>
          </Panel>

          <PanelResizeHandle className="h-1.5 bg-zinc-200 transition hover:bg-brand dark:bg-zinc-800" />

          <Panel defaultSize={35} minSize={15} className="flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
              <span className="text-sm font-semibold">실행 결과</span>
              <div className="flex gap-2">
                <button
                  onClick={() => judge("run")}
                  disabled={runState === "running"}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <Play size={14} /> 예제 실행
                </button>
                <button
                  onClick={() => judge("submit")}
                  disabled={runState === "running"}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:opacity-50"
                >
                  <Send size={14} /> 제출
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 text-sm">
              {runState === "idle" && (
                <p className="text-zinc-500">
                  코드를 작성하고 <b>예제 실행</b> 또는 <b>제출</b>을 눌러보세요.
                  <span className="mt-1 block text-xs text-zinc-400">
                    ※ POC 단계라 실제 채점 대신 목업 결과가 표시됩니다.
                  </span>
                </p>
              )}

              {runState !== "idle" && (
                <div className="space-y-2">
                  {runState === "done" && (
                    <div
                      className={`mb-3 rounded-lg px-3 py-2 text-sm font-semibold ${
                        allPassed
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                      }`}
                    >
                      {allPassed
                        ? mode === "submit"
                          ? "맞았습니다!!"
                          : "예제를 모두 통과했습니다"
                        : "일부 테스트 케이스에서 실패했습니다"}
                    </div>
                  )}
                  {results.map((r) => (
                    <div
                      key={r.no}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800"
                    >
                      <span className="font-medium">
                        {mode === "run" ? "예제" : "테스트 케이스"} {r.no}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span>{r.time}</span>
                        <span>{r.memory}</span>
                        <span
                          className={`font-semibold ${
                            r.passed
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {r.passed ? "통과" : "실패"}
                        </span>
                      </div>
                    </div>
                  ))}
                  {runState === "running" && (
                    <div className="flex items-center gap-2 py-1 text-zinc-500">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                      채점 중…
                    </div>
                  )}
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h2 className="mb-1.5 text-sm font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="text-sm text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  );
}
