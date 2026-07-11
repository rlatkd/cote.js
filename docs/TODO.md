# TODO / 로드맵

> 마일스톤은 [/README.md](../README.md) 16장 기반. 세부 작업은 여기서 체크리스트로 관리한다.

## 로드맵 (마일스톤)

- [ ] **M1 온라인 채점 코어** — Next 프론트 + Kotlin API + PostgreSQL, 수기 등록 문제, Go Judge + Docker 샌드박스(격리), 동기 채점
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

> 남은 확인: 최신 변경(뱃지 이동·필터·ESLint) 반영 후 최종 `next build` 재실행 미완(변경 단순·lint 통과 상태).

## 보류 / 추후 재논의 (Deferred)

- [ ] 서비스 폴더 네이밍 컨벤션 확정 (`backend` vs `api`, `ai-generation`/`ai-similarity`/`ai-validator` 분리 방식 등)
- [ ] 백엔드/AI/Judge 아키텍처 확정 시 [architecture/](architecture/) 상세화
- [ ] 데이터 라이선스 문제 결론 (공개 데이터셋 vs 자체 시드 문제)
- [ ] 향후 문서 생성: API 계약(OpenAPI), 데이터 모델/ERD, 보안 노트, 테스트 전략, 배포 런북
