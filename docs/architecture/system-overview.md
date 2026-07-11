# 시스템 개요

전체 구성 다이어그램의 원본은 [/README.md](../../README.md) 2장. 여기서는 서비스 책임과 데이터 흐름을 요약한다.

## 서비스 구성

> 서비스 폴더명 = 역할 도메인 용어([ADR-0003](../decisions/0003-monorepo-structure.md)).

| 서비스(폴더) | 기술 | 책임 |
|---|---|---|
| arena | Next.js | 문제 조회·풀이·제출 UI, 채점 결과·랭킹 |
| hub | TypeScript + NestJS + Prisma | 회원·인증, 문제·제출·랭킹 등 비즈니스 로직 |
| setter | Python + FastAPI + LLM API/LangChain | 신규 문제 생성 |
| scout | Python + FastAPI + 자체 임베딩 | 기존 문제와 유사도 판정(pgvector) |
| tester | Python + FastAPI + Docker | 풀이 가능성·정답·테스트케이스 검증 |
| judge | Go + Docker Sandbox | 제출 코드 격리 실행·채점 |

저장소: **PostgreSQL(+pgvector)** 메인/AI 공용, **Redis** 캐시, **Kafka** 채점 큐.

## 두 갈래 데이터 흐름

### 1) 문제 생성·검증 파이프라인 (오프라인)

```
데이터셋 → 생성(LLM API) → 유사도 검증(임베딩/pgvector)
        → 품질 검증(정답 교차검증 / Judge 실행) → 사람 검수 게이트 → 공개
```

핵심: 자동 검증만으로 공개하지 않는다. **정답 교차검증 + 사람 검수**를 통과해야 문제 DB에 노출([engineering-notes](../engineering-notes.md) 참조).

### 2) 사용자 제출·채점 (온라인)

```
사용자 제출 → hub(NestJS) → Kafka → Judge Worker(Go)
           → Docker Sandbox 실행 → 결과 판정 → DB 저장 → arena 표시
```

핵심: 남의 코드를 실행하므로 **샌드박스 격리(seccomp/cgroups/네트워크 차단 등)**가 필수. Judge 착수 시 보안 노트로 상세화.

## 마일스톤과의 관계

전체를 한 번에 만들지 않고 M1~M5로 세로 슬라이스 구현([TODO](../TODO.md)). 현재: arena(Next) + hub(NestJS) + Postgres가 연결돼 문제·제출을 실제 DB에서 서빙(채점은 stub, Judge 마일스톤 예정).
