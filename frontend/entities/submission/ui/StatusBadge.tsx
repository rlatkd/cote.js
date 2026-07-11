import type { JudgeResult } from "../model";

const styles: Record<JudgeResult, string> = {
  "맞았습니다":
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  "틀렸습니다":
    "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
  "시간 초과":
    "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  "메모리 초과":
    "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  "런타임 에러":
    "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
  "컴파일 에러":
    "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  "채점 중":
    "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
};

export default function StatusBadge({ result }: { result: JudgeResult }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${styles[result]}`}
    >
      {result === "채점 중" && (
        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
      )}
      {result}
    </span>
  );
}
