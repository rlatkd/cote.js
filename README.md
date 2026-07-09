# AI 기반 알고리즘 문제 생성 및 코딩 테스트 플랫폼

> **프로젝트 성격**: 넓은 기술 스택을 단계적으로 학습·구현하기 위한 아키텍처 청사진입니다.
> 모든 컴포넌트를 한 번에 구축하지 않고, 아래 [16. 마일스톤](#16-마일스톤단계적-구현-로드맵)의 우선순위에 따라 세로 슬라이스 단위로 구현합니다.

## 1. 프로젝트 개요

알고리즘 문제 데이터를 기반으로 AI가 새로운 코딩 테스트 문제를 생성하고, 생성된 문제를 자동 검증한 뒤 **사람이 최종 검수**하여 사용자에게 제공하는 알고리즘 플랫폼.

## 주요 기능

- 알고리즘 문제 데이터 수집 및 분석
- AI 기반 신규 알고리즘 문제 생성
- 기존 문제와의 유사도 검증
- 생성 문제 품질 검증 (정답 교차검증 포함)
- 생성 문제 사람 검수 게이트
- 온라인 코딩 테스트 환경 제공
- 자동 채점 시스템 제공


# 2. 시스템 구성

```
                     Algorithm Problem Dataset
          (Baekjoon / Programmers / LeetCode 등)
              ※ 데이터 라이선스 확인 필요 (14. 리스크 참고)
                                |
                                v

          +--------------------------------+
          | AI Problem Generation Service  |
          | Python + FastAPI               |
          | LLM API + LangChain            |
          +--------------------------------+

                                |
                +---------------+---------------+
                |                               |
                v                               v

    +--------------------------+    +--------------------------+
    | Similarity Validator     |    | Problem Validator        |
    | Python + FastAPI         |    | Python + FastAPI         |
    | Sentence Transformer     |    | LLM + Docker Execution   |
    | (자체 임베딩 모델)        |    | 정답 교차검증(N-풀이 일치)|
    | pgvector                 |    | Test Case Validation     |
    +--------------------------+    +--------------------------+

                |                               |
                +---------------+---------------+
                                |
                                v

                     +-------------------------+
                     | Human Review Gate       |
                     | 생성 문제 사람 검수      |
                     | (승인 시에만 노출)       |
                     +-------------------------+

                                |
                                v

          +----------------+
          | Problem DB     |
          | PostgreSQL     |
          | + pgvector     |
          +----------------+

                |
                v

          Online Coding Platform

                |
      +---------+---------+
      |                   |
      v                   v
+----------------------+    +---------------------------+
| Frontend             |    | Backend API Server        |
| Next.js              |    | Kotlin + Spring Boot      |
| TypeScript           |    | Spring Security           |
| Monaco Editor        |    | Spring Data JPA           |
+----------------------+    +---------------------------+
                                  |
                                  v

                     +-------------------------+
                     | Database                |
                     | PostgreSQL              |
                     | Redis                   |
                     +-------------------------+

                                  |
                                  v

                     +-------------------------+
                     | Message Queue           |
                     | Apache Kafka            |
                     +-------------------------+

                                  |
                                  v

                     +-------------------------+
                     | Judge System            |
                     | Go                      |
                     | Worker                  |
                     +-------------------------+

                                  |
                                  v

                     +-------------------------+
                     | Sandbox Environment     |
                     | Docker (격리 강화)       |
                     | C++ / Java / Python     |
                     | Code Execution          |
                     +-------------------------+
```

# 3. AI Problem Generation Service

## 목적

기존 알고리즘 문제 데이터를 분석하여 새로운 코딩 테스트 문제 생성.

## 주요 기능

- 알고리즘 유형 분석
- 난이도 분석
- 문제 구조 분석
- 문제 스토리 생성
- 입력/출력 조건 생성
- 제한 조건 생성
- 예상 풀이 알고리즘 생성
- 테스트 케이스 생성

## 접근 방식

문제 **생성**은 자체 모델 파인튜닝 대신 **LLM API 호출**로 처리한다. 파인튜닝은 양질의 데이터셋·GPU·품질 확보 난이도가 사이드 범위를 벗어나며, 범용 LLM 대비 품질 이점이 없기 때문이다. 대신 **LangChain 기반 프롬프트 체이닝·오케스트레이션** 학습에 집중한다.

## 기술 스택

| 구분 | 기술 |
|---|---|
| Language | Python |
| Framework | FastAPI |
| LLM | LLM API (예: OpenAI / Anthropic 등) |
| LLM Framework | LangChain |
| Database | PostgreSQL |


# 4. Problem Similarity Validator

## 목적

생성된 문제가 기존 알고리즘 문제와 지나치게 유사한지 검증.

## 주요 기능

- 문제 Embedding 생성 (자체 소형 모델)
- Vector Similarity 검색 (pgvector)
- 기존 문제와 유사도 계산
- Threshold 기반 문제 폐기
- 유사 문제 이력 관리

## 접근 방식

임베딩은 **자체 소형 모델(Sentence Transformer 계열)**을 로컬에서 구동한다. 수백 MB 규모라 GPU 없이 CPU로도 동작하며, PyTorch / HuggingFace Transformers 생태계를 실제로 학습하는 지점이다. 생성된 벡터는 **pgvector**에 저장·검색하여 별도 벡터 인프라 없이 PostgreSQL 하나로 통합한다.

## 처리 흐름

```
Generated Problem

    ↓

Embedding 생성 (자체 Sentence Transformer)

    ↓

pgvector Similarity 검색

    ↓

Similarity Score 계산

    ↓

기준 초과 시 Problem Reject
```

## 기술 스택

| 구분 | 기술 |
|---|---|
| Language | Python |
| Framework | FastAPI |
| NLP Model | Sentence Transformer (자체 구동, PyTorch / HuggingFace) |
| Vector Store | pgvector (PostgreSQL 확장) |


# 5. Problem Validator

## 목적

생성된 문제가 실제 코딩 테스트 문제로 적합한지 검증.

## 검증 항목

- 문제 조건 오류 검사
- 알고리즘 풀이 가능 여부
- 예상 풀이 생성 가능 여부
- 테스트 케이스 검증
- 난이도 적합성 검증
- 실행 결과 검증

## 정답 신뢰성 확보 (핵심)

단일 LLM이 "풀이를 생성해 통과하면 OK"로 판정하면, 같은 LLM이 지문을 동일하게 오해할 경우 검증이 무력화된다. 이를 막기 위해 다음을 적용한다:

- **교차검증(N-풀이 일치)**: 서로 다른 세션/모델로 여러 풀이를 독립 생성하고, **출력이 모두 일치할 때만** 기대 정답으로 채택한다.
- **제한조건 변별력 검사**: brute-force 풀이와 최적 풀이를 모두 실행하여, 제한조건(시간/메모리)이 실제로 두 풀이를 구분하는지 확인한다.
- **사람 검수 게이트**: 자동 검증을 통과해도 사용자 노출 전 사람이 최종 검수하여 승인한 문제만 공개한다.

## 처리 흐름

```
Generated Problem

    ↓

LLM Problem Analysis

    ↓

Solution Code Generation (N개 독립 생성)

    ↓

Test Case Generation

    ↓

Judge Execution (N-풀이 출력 일치 확인)

    ↓

Validation Result

    ↓

Human Review Gate (승인 시에만 공개)
```

## 기술 스택

| 구분 | 기술 |
|---|---|
| Language | Python |
| Framework | FastAPI |
| Execution Environment | Docker |


# 6. Online Coding Platform

## 목적

사용자가 알고리즘 문제를 조회하고 코드를 작성 및 제출하는 서비스.

## 주요 기능

- 문제 목록 조회
- 문제 상세 조회
- 코드 작성
- 코드 제출
- 채점 결과 조회
- 풀이 기록 관리
- 사용자 랭킹
- 문제 통계


# 7. Frontend Service

## 기술 스택

| 구분 | 기술 |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS |
| Code Editor | Monaco Editor |

## 아키텍처

자체 정의 도메인 레이어드 (`app → views → entities → shared`, 단방향 의존) + MVVM + Server Actions. RSC는 정적 화면만 부분 적용. 상세: [docs/architecture/frontend.md](docs/architecture/frontend.md), [docs/decisions/0004](docs/decisions/0004-frontend-architecture.md).


# 8. Backend API Service

## 목적

사용자 서비스 및 플랫폼 비즈니스 로직 담당.

## 주요 기능

- 회원 관리
- 인증/인가
- 문제 관리
- 제출 관리
- 풀이 기록 관리
- 랭킹 관리
- 사용자 통계

## 기술 스택

| 구분 | 기술 |
|---|---|
| Language | Kotlin |
| Framework | Spring Boot |
| ORM | Spring Data JPA |
| Security | Spring Security |
| Database | PostgreSQL |
| Cache | Redis |


# 9. Judge System

## 목적

사용자가 제출한 코드를 격리된 환경에서 실행하고 결과를 반환하는 자동 채점 시스템.

## 주요 기능

- 코드 실행
- Compile Error 처리
- Runtime Error 처리
- Time Limit 검사
- Memory Limit 검사
- Test Case 비교
- 채점 결과 반환

## 샌드박스 보안 (핵심)

남의 코드를 실행하는 시스템이므로 Docker 컨테이너 하나로는 보안 경계가 되지 못한다. 다음을 반드시 갖춘다:

- **리소스 제한**: cgroups 기반 CPU/메모리/프로세스 수 제한, fork bomb 방어
- **네트워크 차단**: 컨테이너 외부 네트워크 egress 완전 차단
- **시스템콜 제한**: seccomp 프로파일 적용 (필요 시 gVisor / nsjail 등 격리 강화)
- **파일시스템**: read-only 마운트 + 임시 쓰기 영역 격리, 실행 후 폐기
- **실행 계정**: 비특권 사용자로 실행, 타임아웃 강제 종료

## 처리 흐름

```
User Submission

    ↓

Backend API

    ↓

Message Queue (Kafka)

    ↓

Judge Worker (Go)

    ↓

Docker Sandbox

    ↓

Execution Result

    ↓

Database 저장
```

## 기술 스택

| 구분 | 기술 |
|---|---|
| Language | Go |
| Message Queue | Kafka |
| Container | Docker |


# 10. Database

## Main Database (PostgreSQL)

- User
- Problem
- Problem Category
- Submission
- Test Case
- Solved Problem
- Ranking
- Contest

## AI Database (PostgreSQL + pgvector)

- Problem Embedding
- Generated Problem History
- Similarity Result
- Validation Result
- Human Review Log


# 11. Infrastructure

## 기술 스택

| 구분 | 기술 |
|---|---|
| Cloud | AWS |
| Container | Docker |
| Orchestration | Docker Compose (초기) → Kubernetes (후속) |
| CI/CD | GitHub Actions |
| Reverse Proxy | Nginx |


# 12. Final Technology Stack

| 영역 | 기술 |
|---|---|
| Frontend | Next.js + TypeScript |
| Backend API | Kotlin + Spring Boot |
| AI Service | Python + FastAPI |
| 문제 생성 | LLM API + LangChain |
| 임베딩/NLP | Sentence Transformer (PyTorch / HuggingFace, 자체 구동) |
| Vector Store | pgvector (PostgreSQL 확장) |
| Main Database | PostgreSQL |
| Cache | Redis |
| Message Queue | Kafka |
| Judge Server | Go |
| Sandbox | Docker (격리 강화) |
| Deployment | Docker Compose (초기) → Kubernetes (후속) |
| Cloud | AWS |


# 13. 아키텍처 결정 기록 (요약)

| 결정 | 채택 | 배제/보류 | 이유 |
|---|---|---|---|
| 문제 생성 | LLM API | 자체 모델 파인튜닝 | 데이터·GPU·품질 확보 난이도가 과함 |
| 임베딩 | 자체 Sentence Transformer | 임베딩 API | ML 생태계 실제 학습 목적 |
| 벡터 저장 | pgvector | FAISS / Milvus | PostgreSQL로 통합, 인프라 최소화 |
| LLM 프레임워크 | LangChain | LlamaIndex | 생성 파이프라인 오케스트레이션에 적합 |
| 메인 DB | PostgreSQL | MySQL | AI 서비스와 통일, pgvector 활용 |
| 배포 | Docker Compose (초기) | Kubernetes (후속) | 초기 완주율 우선, 트래픽 발생 후 이관 |


# 14. 리스크 및 주의사항

- **데이터 라이선스 (최우선)**: 백준·프로그래머스·LeetCode 문제 수집·활용은 각 사이트 ToS 및 저작권 이슈가 있다. 개인 학습용과 서비스 제공은 다르므로, 사용 가능한 공개 데이터셋 확보 또는 자체 시드 문제 구축 방안을 먼저 확정한다.
- **생성 문제 신뢰성**: LLM 생성물은 지문 모호·조건 오류·정답 불일치가 흔하다. 5장의 교차검증 + 사람 검수 게이트 없이 자동 공개 금지.
- **LLM API 비용**: 생성·검증마다 다회 호출이 발생하므로 호출량·캐싱·배치 전략을 초기부터 관리한다.
- **샌드박스 보안**: 9장의 격리 요건은 선택이 아닌 필수. 미비 시 서버 침해로 직결된다.


# 15. 데이터 흐름 요약

```
데이터셋 → 생성(LLM API) → 유사도 검증(임베딩/pgvector)
        → 품질 검증(교차검증/Judge) → 사람 검수 → 공개
        → 사용자 제출 → Kafka → Go Judge → Docker Sandbox → 결과 저장
```


# 16. 마일스톤(단계적 구현 로드맵)

넓은 스택을 한 번에 세우지 않고, 각 단계마다 **동작하는 세로 슬라이스**를 완성한다.

| 단계 | 목표 | 범위 |
|---|---|---|
| **M1** | 온라인 채점 코어 | Next.js + Kotlin/Spring + PostgreSQL, 수기 등록 문제, Go Judge + Docker Sandbox(격리), 동기 채점 |
| **M2** | 비동기 채점 | Kafka 도입, Judge Worker 분리, 제출량 처리 |
| **M3** | AI 생성 파이프라인 | LLM API + LangChain 생성, 사람 검수 게이트 |
| **M4** | 유사도/품질 검증 | 자체 임베딩 + pgvector 유사도, 정답 교차검증 자동화 |
| **M5** | 운영 고도화 | Kubernetes 이관, 모니터링/로깅, 랭킹·통계·콘테스트 |
