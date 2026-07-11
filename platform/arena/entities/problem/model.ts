// problem 도메인 모델 — 타입·순수 로직은 이제 공유 계약(@cotejs/contracts)에 산다.
// arena는 여기서 재수출만 하여 기존 import 경로(@/entities/problem/model)를 유지한다.

export {
  DIFFICULTIES,
  LANGUAGES,
  monacoLangMap,
  acceptanceRate,
} from "@cotejs/contracts";
export type {
  Difficulty,
  Language,
  Example,
  Problem,
} from "@cotejs/contracts";
