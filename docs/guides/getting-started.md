# 시작하기

현재 실행 가능한 것: **arena(Next 프론트) · hub(NestJS API) · Postgres(도커)**. 문제·제출을 실제 DB에서 서빙한다(채점은 stub — Judge 마일스톤 예정).

## 사전 요구

- Node.js 18.17+ (권장 20+ / 개발 환경 22)
- pnpm 10+ (개발 환경 11)
- Docker + Docker Compose (Postgres 구동)

## 실행

서버 켜는 명령은 **[/RUN.md](../../RUN.md)** 에 한 줄씩 정리돼 있다(최초 세팅 + Postgres/hub/arena).

- arena: http://localhost:3000
- hub: http://localhost:4000/api
- 데이터: hub가 Postgres에서 서빙. arena의 `entities/*/api.ts`가 `HUB_URL`(기본 `localhost:4000`)로 fetch.
- 코드 에디터(Monaco)는 기본 설정상 CDN에서 로드되므로 최초 실행 시 인터넷 연결 필요.

> **pnpm 빌드 스크립트 승인**: 네이티브 의존성(`unrs-resolver`, `@prisma/*` 등)이 postinstall 빌드를 필요로 한다. [`platform/package.json`](../../platform/package.json)의 `pnpm.onlyBuiltDependencies`로 승인돼 있다(누락 시 `ERR_PNPM_IGNORED_BUILDS` 또는 Prisma 엔진 미설치).

## 페이지 (arena)

| 경로 | 화면 |
|---|---|
| `/` | 홈(대시보드) |
| `/problems` | 문제 목록 |
| `/problems/[id]` | 문제 상세 (통합 split view + 에디터) |
| `/status` | 채점 현황 |

> 문제 지문·목록·제출 현황은 hub(실 DB)에서 온다. 단, 에디터의 **실행/제출 채점은 아직 stub**(실제 코드 실행은 Judge 마일스톤).

## 다음 단계

hub 후속(인증·랭킹·페이지네이션) 및 제출→judge(Kafka) 연결 → 이후 마일스톤([TODO](../TODO.md)).
