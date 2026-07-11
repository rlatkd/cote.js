# TODO / 로드맵

> 마일스톤은 [/README.md](../README.md) 16장 기반. 세부 작업은 여기서 체크리스트로 관리한다.

## 로드맵 (마일스톤)

- [ ] **M1 온라인 채점 코어** — arena(Next) + hub(NestJS) + PostgreSQL, 수기 등록 문제, Go Judge + Docker 샌드박스(격리), 동기 채점 *(arena·hub·DB 연결 ✅ / Judge·실채점 남음)*
- [ ] **M2 비동기 채점** — Kafka 도입, Judge Worker 분리
- [ ] **M3 AI 생성 파이프라인** — LLM API + LangChain 생성, 사람 검수 게이트
- [ ] **M4 유사도/품질 검증** — 자체 임베딩 + pgvector 유사도, 정답 교차검증 자동화
- [ ] **M5 운영 고도화** — Kubernetes 이관, 모니터링/로깅, 랭킹·통계·콘테스트

## 현재 스프린트: 프론트 POC ✅

- [x] 프로젝트 스캐폴딩 (Next + TS + Tailwind 직접), `frontend/`로 이동
- [x] 공통 컴포넌트 (Navbar / 테마토글 / 뱃지), mock 데이터
- [x] 홈 페이지 (대시보드)
- [x] **프론트 아키텍처 확정** — 자체 도메인 레이어드([ADR-0004](decisions/0004-frontend-architecture.md))
- [x] `frontend/` 재배치: `app`/`views`/`entities`/`shared` 레이어 구성
- [x] 문제 목록 페이지 (+ 검색·난이도·AI 필터 client island)
- [x] 문제 상세 페이지 (통합 split view + Monaco)
- [x] 채점 현황 페이지
- [x] 의존성 설치 + build/dev 실행 검증 (5개 라우트 200, Tailwind content 경로 버그 수정)
- [x] 도메인 UI(뱃지) → `entities/*/ui` 이동 (레이어 경계 정합)
- [x] 레이어 의존성 규칙 ESLint(`import/no-restricted-paths`) 강제 — lint 통과
- [x] **디자인 시스템 1차 도입** — 색 토큰(CSS 변수 단일 진실원) + 서체(Pretendard/JetBrains Mono, next/font 셀프 호스팅) + 표면 위계 + 전역 focus-visible + 빈 상태 + AiBadge 통일 + 시그니처 모션. `next build` 통과, 5개 라우트 200 재검증.
- [x] **하드 재개편 "Instrument"** — 1차가 시각적으로 너무 보수적이라(체감 변화 미미) 강한 컨셉으로 전면 재설계: 모노 구조 언어 + 각진 기하 + **시그널 앰버**(임시 토글로 앰버/시안/라임/코발트 비교 후 확정) + 계기형 배지. 5개 화면 전부 적용. `next build` 통과, 5라우트 200. 상세: [디자인 시스템](architecture/frontend-design-system.md)
- [x] pnpm 전환 정합 — `pnpm-workspace.yaml`의 `allowBuilds`(unrs-resolver) 미완값 수정, `pnpm dev` 자동 브라우저 오픈([opener.js](../../platform/arena/opener.js)) 추가
- [x] **기본 테마 다크→라이트 전환** (2026-07-11) — themeScript·ThemeToggle 기본값 라이트, 라이트 팔레트 bg/surface 3단 위계 보정. [ADR-0002](decisions/0002-poc-scope-and-design.md) 갱신

## 현재 스프린트: 백엔드 hub(NestJS) 세로 슬라이스 ✅

- [x] **백엔드 언어 재선정** — Kotlin+Spring → TypeScript + NestJS + Prisma, 프론트·백 타입 공유(짝 A). [ADR-0005](decisions/0005-backend-language-and-type-sharing.md)
- [x] **모노레포 재편** — `frontend` → `platform/arena`, `platform/hub`(NestJS)·`platform/contracts` 신설, 루트 밑 `platform/` 워크스페이스. 서비스 네이밍(arena/hub/judge/setter/scout/tester) 확정. [ADR-0003](decisions/0003-monorepo-structure.md)
- [x] `@cotejs/contracts` — Problem·Submission 타입 + zod 스키마 + 순수 도메인 함수, 빌드
- [x] hub — Prisma(Problem/Example/Submission) + Postgres(docker-compose) + seed(mock 7문제·제출 10건)
- [x] hub — Problems·Submissions 모듈: `GET /api/problems`·`/:id`·`/api/submissions`, `POST /api/submissions`(zod 검증)
- [x] arena 배선 — `entities/*/model.ts`가 contracts 재수출, `entities/*/api.ts`가 mock → hub fetch. views·viewmodel 무변경
- [x] 엔드투엔드 검증 — install→contracts 빌드→docker→migrate/seed→hub 기동→curl(GET·POST·404·400) + arena `next build` + 실런타임 렌더(hub 데이터가 HTML에 반영, 5라우트 200)
- [x] 실행법 루트 README Quick Start + [architecture/hub.md](architecture/hub.md)

## 보류 / 추후 재논의 (Deferred)

- [ ] hub 후속: 인증/인가, 랭킹·통계, 페이지네이션, 제출→judge(Kafka) 연결(= Judge 마일스톤)
- [ ] 데이터 모델 refine: `timeLimit`/`memoryLimit` 문자열 → 수치(ms·MB)
- [ ] AI/Judge 아키텍처 확정 시 [architecture/](architecture/) 상세화 (judge.md/setter.md/scout.md/tester.md)
- [ ] 폴리글랏 경계 계약: hub↔judge, hub↔AI를 IDL(Protobuf/Avro·OpenAPI)로 정의
- [ ] 데이터 라이선스 문제 결론 (공개 데이터셋 vs 자체 시드 문제)
- [ ] 향후 문서 생성: 데이터 모델/ERD, 보안 노트, 테스트 전략, 배포 런북
