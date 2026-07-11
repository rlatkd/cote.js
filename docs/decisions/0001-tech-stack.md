# 0001. 기술 스택 선정

- **상태**: Accepted (Backend API 항목은 [0005](0005-backend-language-and-type-sharing.md)로 대체됨)
- **일자**: 2026-07-09

## 맥락

포트폴리오·학습 목적의 폴리글랏 코딩 테스트 플랫폼. 넓은 최신 스택을 단계적으로 학습·구현하는 것이 목표이며, 구현 난이도는 판단 기준에서 제외한다(Claude가 구현). 판단 기준은 포트폴리오 가치 / 학습 가치 / 문제 적합성.

## 결정

| 영역 | 확정 |
|---|---|
| Frontend | Next.js + TypeScript + Tailwind(직접) + Monaco Editor |
| Backend API | ~~Kotlin + Spring Boot~~ → **TypeScript + NestJS + Prisma** ([0005](0005-backend-language-and-type-sharing.md)) |
| 문제 생성 | LLM API + LangChain |
| 임베딩(유사도) | 자체 Sentence Transformer (PyTorch / HuggingFace) |
| Vector 검색 | pgvector |
| Main DB | PostgreSQL |
| Cache | Redis |
| Judge 엔진 | Go 자체 구현 |
| Message Queue | Kafka |
| 배포 | Docker Compose (초기) → Kubernetes (후속) |
| 프론트 데이터패칭 | TanStack Query (POC 이후) |

## 근거

- **문제 생성 = LLM API**: 자체 모델 파인튜닝은 데이터·GPU·품질 확보가 범용 LLM 대비 이점이 없음. 대신 LangChain 오케스트레이션 학습에 집중.
- **임베딩 = 자체 모델**: Sentence Transformer는 소형이라 로컬 구동 가능. PyTorch/HuggingFace 생태계를 실제로 학습하는 지점. → 생성=API, 임베딩=자체 모델의 "하이브리드"가 학습 폭과 현실성을 동시에 확보.
- **pgvector**: 메인 DB(PostgreSQL)와 통합되어 별도 벡터 인프라 불필요.
- ~~**Kotlin**: JVM 계열이라 사용자의 Java 경험이 전이되면서 신규 언어 학습.~~ → 재검토 결과 실무(Java+Spring)와 겹쳐 학습 신규성이 낮다고 판단, [0005]에서 NestJS로 전환.
- **Go Judge 자체 구현**: 샌드박스·격리를 밑바닥부터 학습(가장 깊은 경험).

## 검토한 대안

- Backend Java(학습 이점 적음), 자체 생성 모델(비현실적), FAISS/Milvus(인프라 추가), MySQL(AI 서비스와 분리됨), Judge0 등 오픈소스(채점 내부 학습 얕음), LlamaIndex(LangChain과 역할 중복) — 모두 미채택.

## 결과

- 폴리글랏(6+ 언어) 경험 확보. 대신 서비스 간 통신·운영 복잡도 증가 → 마일스톤 단계적 구현으로 관리([0002] 및 로드맵).
- 데이터 라이선스·LLM 비용은 별도 리스크로 추적([engineering-notes](../engineering-notes.md)).
