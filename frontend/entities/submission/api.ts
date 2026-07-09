// submission Repository — POC 목업.

import type { Submission } from "./model";

const submissions: Submission[] = [
  { id: 78412093, user: "sanghoon", problemId: 100001, problemTitle: "정원사의 물결 정렬", result: "맞았습니다", language: "Python", time: "148 ms", memory: "31 MB", length: 612, submittedAt: "2026-07-09 14:22:10" },
  { id: 78412031, user: "sanghoon", problemId: 100001, problemTitle: "정원사의 물결 정렬", result: "틀렸습니다", language: "Python", time: "—", memory: "—", length: 588, submittedAt: "2026-07-09 14:19:44" },
  { id: 78411002, user: "devkim", problemId: 7576, problemTitle: "토마토", result: "맞았습니다", language: "C++", time: "92 ms", memory: "18 MB", length: 1204, submittedAt: "2026-07-09 14:05:31" },
  { id: 78410877, user: "algo_master", problemId: 9019, problemTitle: "DSLR", result: "시간 초과", language: "Java", time: "—", memory: "—", length: 1533, submittedAt: "2026-07-09 13:58:12" },
  { id: 78410512, user: "novice22", problemId: 1000, problemTitle: "두 수의 합", result: "맞았습니다", language: "JavaScript", time: "76 ms", memory: "24 MB", length: 142, submittedAt: "2026-07-09 13:50:03" },
  { id: 78410344, user: "hayoon", problemId: 100002, problemTitle: "캐시된 미로 탈출", result: "런타임 에러", language: "C++", time: "—", memory: "—", length: 2011, submittedAt: "2026-07-09 13:41:29" },
  { id: 78410120, user: "devkim", problemId: 1932, problemTitle: "정수 삼각형", result: "맞았습니다", language: "Python", time: "104 ms", memory: "29 MB", length: 402, submittedAt: "2026-07-09 13:30:57" },
  { id: 78409998, user: "sanghoon", problemId: 100002, problemTitle: "캐시된 미로 탈출", result: "메모리 초과", language: "Java", time: "—", memory: "—", length: 1890, submittedAt: "2026-07-09 13:22:41" },
  { id: 78409771, user: "coder_lee", problemId: 2231, problemTitle: "분해합", result: "맞았습니다", language: "C++", time: "4 ms", memory: "2 MB", length: 356, submittedAt: "2026-07-09 13:10:08" },
  { id: 78409650, user: "novice22", problemId: 2231, problemTitle: "분해합", result: "컴파일 에러", language: "Java", time: "—", memory: "—", length: 401, submittedAt: "2026-07-09 13:02:55" },
];

export async function getSubmissions(): Promise<Submission[]> {
  return submissions;
}
