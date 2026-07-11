import type { Difficulty } from "../model";

const styles: Record<Difficulty, string> = {
  Bronze:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 ring-amber-600/20",
  Silver:
    "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 ring-zinc-500/20",
  Gold:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-400 ring-yellow-600/20",
  Platinum:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 ring-emerald-600/20",
};

export default function DifficultyBadge({
  difficulty,
  tier,
}: {
  difficulty: Difficulty;
  tier?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[difficulty]}`}
    >
      {tier ?? difficulty}
    </span>
  );
}
