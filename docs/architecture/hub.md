# hub — 사용자 API 아키텍처 (Active)

> NestJS 백엔드(`platform/hub`). 결정 근거는 [ADR-0005](../decisions/0005-backend-language-and-type-sharing.md), 폴더 구조는 [ADR-0003](../decisions/0003-monorepo-structure.md).

## 책임

유저·문제·제출·랭킹 등 플랫폼 비즈니스 로직과 데이터 접근을 담당한다. 실제 코드 채점은 하지 않는다 — 제출을 받아 (추후) Kafka로 judge에 넘기는 **중심(hub)** 역할.

## 레이어 구조

Nest의 모듈 단위로 관심사를 나눈다. 요청 흐름은 단방향이다.

```
Controller (HTTP 경계, 라우팅·검증)
    ↓
Service   (비즈니스 로직)
    ↓
PrismaService (DB 접근 경계 = Repository)
    ↓
PostgreSQL
```

- **Controller**: URL·HTTP 메서드 매핑, 요청 본문을 zod 파이프로 검증, 응답 반환. 로직 없음.
- **Service**: 유스케이스 로직 + DB row → **계약(`@cotejs/contracts`) 타입 매핑**. 외부에 나가는 형태를 여기서 확정(Repository 경계).
- **PrismaService**: `PrismaClient` 확장(`@Global` 모듈로 주입). DB 접근을 한 곳에 격리 → 이후 스키마·엔진 교체가 이 경계 안에 갇힘.

## 모듈

| 모듈 | 엔드포인트 | 설명 |
|---|---|---|
| `ProblemsModule` | `GET /api/problems`, `GET /api/problems/:id` | 문제 목록·상세. 404 처리. |
| `SubmissionsModule` | `GET /api/submissions`, `POST /api/submissions` | 제출 목록 + 제출 생성(zod 검증). |
| `PrismaModule` | — | `PrismaService` 전역 제공. |

전역 프리픽스 `/api`, CORS 허용(개발). 포트 기본 `4000`(`PORT` env).

## contracts 경계 (짝 A)

`arena`(프론트)와 **같은 타입 패키지 `@cotejs/contracts`를 공유**한다.

- 타입·zod 스키마의 **단일 진실원**이 `contracts`에 있다(`Problem`, `Submission`, `createSubmissionSchema` 등).
- hub는 응답을 `contracts`의 `Problem`/`Submission` 타입으로 매핑하고, POST 본문을 `createSubmissionSchema`(zod)로 검증한다.
- 계약을 바꾸면 arena·hub 양쪽이 컴파일 단계에서 맞물린다. → 프론트-백 표류(drift) 차단.

## 데이터 모델 (Prisma)

`Problem` 1—N `Example`, `Problem` 1—N `Submission`. 초기 슬라이스는 arena가 쓰던 mock 형태를 그대로 담아 프론트 교체가 drop-in 되게 했다(예: `timeLimit`·`memoryLimit`을 문자열로). **수치화 모델링(ms·MB)은 후속 refine** — [engineering-notes](../engineering-notes.md) 참고.

## 미구현 (다음 마일스톤)

- **실제 채점**: 현재 `POST /submissions`는 제출을 영속화하고 `"채점 중"`으로 반환하는 stub. 진짜 채점은 **Judge(Go) 마일스톤**에서 Kafka → judge worker → 샌드박스로 연결한다.
- 인증/인가(Spring Security 대체), 랭킹·통계, 페이지네이션.
- hub↔judge 메시지 계약은 언어가 달라 `contracts`가 아닌 **Protobuf/Avro(IDL)** 로 정의 예정.

## 로컬 실행

```bash
# 1) DB
cd infra && docker compose up -d
# 2) hub (platform/hub)
pnpm prisma:generate && pnpm prisma:migrate && pnpm prisma:seed
pnpm start:dev            # http://localhost:4000/api
# 3) arena (platform/arena)
pnpm dev                  # http://localhost:3000  (HUB_URL 기본 localhost:4000)
```
