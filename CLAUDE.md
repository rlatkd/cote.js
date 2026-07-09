# CLAUDE.md — CoteJS 프로젝트

> **CoteJS 사이드 프로젝트 한정** 지침. 사용자의 전역 CLAUDE.md(실무·프로필)와 별개이며, 이 프로젝트에서 작업할 때 함께 적용된다.
>
> 이 파일은 **Claude를 위한 지침 + 확정 제약**만 담는다. 진행 중 고민·질문, 검토한 대안, 결정 근거, 해결방안 아이디어, 미래 TODO는 **[`docs/engineering-notes.md`](docs/engineering-notes.md)** 에 기록한다.

## 프로젝트 성격

- AI 기반 알고리즘 문제 생성·검증 + 온라인 코딩 테스트 플랫폼.
- **포트폴리오 / 학습 목적의 사이드 프로젝트** (실무 아님). 넓은 최신 기술 스택을 단계적으로 학습·구현하는 것이 목표.
- **구현은 전적으로 Claude가 담당한다.**

---

## 작업 원칙

### 1. 구현 난이도를 의사결정 기준으로 삼지 말 것

- 구현은 Claude가 하므로, **"구현이 어렵다 / 보일러플레이트가 많다 / 손이 많이 간다 / 세팅이 번거롭다"는 이유로 기술·아키텍처를 배제하거나 하향 추천하지 말 것.**
- 기술 스택·아키텍처·설계 선택은 오직 다음 3가지 기준으로만 판단한다:
  1. **포트폴리오 가치** (얼마나 어필되는가)
  2. **학습 가치** (얼마나 넓고 깊게 배우는가)
  3. **문제 적합성** (그 선택이 실제 문제에 맞는가)
- 단, **"오버엔지니어링"(문제에 맞지 않는 과설계)**은 계속 지적한다. 이건 난이도 이슈가 아니라 **적합성** 이슈이므로 기준 3에 해당한다. "어려워서 하지 말자"와 "안 맞아서 하지 말자"를 혼동하지 말 것.

### 2. 문서 역할 분리 — CLAUDE.md는 지침·제약만, 사고 과정은 엔지니어링 노트

- **CLAUDE.md** = 작업 원칙 + 아래 **확정 사항**(Claude가 지켜야 할 제약)만 유지한다. 간결하게.
- **[`docs/engineering-notes.md`](docs/engineering-notes.md)** = 진행 중 고민·질문, 검토한 대안, 결정 근거·배제 이유, 해결방안 아이디어, 미래 TODO를 누적 기록한다.
- 새 결정이 확정되면 → 엔지니어링 노트에서 논의를 정리하고, 그 **결론만** CLAUDE.md의 '확정 사항'에 반영한다.
- **문서는 살아있다 (living docs).** 이 프로젝트는 장기 진행되므로 `docs/`는 언제든 추가·개선·재구성한다. 결정이 바뀌면 ADR 상태를 갱신하고, **그 결정이 전체 틀·세부에 영향을 주면 루트 [`README.md`](README.md)(시스템 설계 문서)도 함께 갱신하며**, 작업이 진행되면 노트·TODO·아키텍처 문서를 최신으로 유지하고, 새 서비스·주제가 생기면 문서를 새로 만든다. 문서 최신화는 **별도 지시 없이도 작업의 일부로** 수행한다.
  - 갱신 대상 예시: 루트 `README.md`, `docs/` 전체(ADR·engineering-notes·TODO·architecture·guides·glossary), 그리고 이 `CLAUDE.md`의 '확정 사항'.
- **문서를 능동적으로 제안·도입한다.** 진행하면서 필요하다고 판단되는 새 문서(형식·구조·체계 포함)나 기존 문서의 개선점을 Claude가 **스스로 발견해 제안하고, 적절하면 직접 만들어 도입**한다. 사용자의 지시를 기다리지 않는다. 단, 기존 문서 체계를 크게 바꾸는 재구성은 도입 전 간단히 알린다.

### 3. 문자가 아니라 의도로 판단할 것 (사람처럼 생각하라)

- 지시의 **표면 문구가 아니라 실제 의도와 맥락**을 읽고 판단한다. 사용자가 진짜 원하는 것, 상황상 당연히 필요한 것을 스스로 추론해 능동적으로 처리한다. 기계적 최소 이행 금지.
- **이 원칙을 특정 키워드·상황 트리거로 축소하지 말 것.** (예: "'~등'이 나오면 확장한다" 식으로 좁게 encode하는 것 자체가 이 원칙 위반이다. "~등"은 문자주의의 한 증상일 뿐, 원칙은 그보다 넓다.) 규칙을 패턴 매칭으로 만들지 말고, 매 순간 의도를 해석하라.
- 빠진 것·함께 필요한 것을 알아서 챙기고, 애매하면 의도를 먼저 헤아린다. 단, 되돌리기 어렵거나 외부에 영향 주는 행동은 능동적으로 판단하되 실행 전 확인한다(전역 지침 우선). 능동성과 무분별함은 다르다.

---

## 확정 사항 (Claude가 지켜야 할 제약)

> 각 항목의 배경·배제 이유·논의 경위는 엔지니어링 노트 참조.

### 기술 스택

| 영역 | 확정 | 배제/보류 |
|---|---|---|
| Frontend | Next.js + TypeScript + Tailwind(직접) + Monaco Editor | — |
| Backend API | Kotlin + Spring Boot | Java |
| 문제 생성 | LLM API + LangChain | 자체 모델 파인튜닝, LlamaIndex |
| 임베딩(유사도) | 자체 Sentence Transformer (PyTorch / HuggingFace) | 임베딩 API |
| Vector 검색 | pgvector | FAISS / Milvus |
| Main DB | PostgreSQL | MySQL |
| Cache | Redis | — |
| Judge 엔진 | Go 자체 구현 | Judge0 등 오픈소스 |
| Message Queue | Kafka | RabbitMQ / Redis |
| 배포 | Docker Compose (초기) → Kubernetes (후속) | — |
| 프론트 데이터패칭 | TanStack Query (POC 이후) | 기본 fetch |

### POC 범위 / 디자인

- 백준식 다중 페이지 구조(홈 / 문제 목록 / 문제 상세 / 채점 현황) + **리트코드식 통합 split view**(문제 상세 안에 좌:지문 / 우:Monaco 에디터 + 결과).
- 백준의 낡은 외관 대신 **현대적 비주얼**(미니멀·타이포·다크). 다크 모드 기본 + 라이트 토글.

### 아키텍처 (일부 진행 중)

- **프론트엔드**: **확정** — 자체 정의 도메인 레이어드(`app` 라우팅 → `views` 화면 → `entities` 도메인 → `shared` 공용, 단방향 의존) + MVVM(entities의 훅=ViewModel) + Server Actions. RSC는 정적 화면만 부분 적용(인터랙션은 client island). 배민·Money Forward 실무 사례 기반. 상세: [ADR-0004](docs/decisions/0004-frontend-architecture.md), [architecture/frontend.md](docs/architecture/frontend.md).
- **백엔드(Kotlin)**: (잠정) Hexagonal.
- **AI(Python/FastAPI)**: (잠정) Layered + LangChain 체인 모듈 분리.
- **Judge(Go)**: (잠정) 경량 클린 (`cmd/` + `internal/`: consumer·executor·sandbox 어댑터).

### 모노레포 구조

- 폴리글랏 모노레포, **서비스별 최상위 폴더**로 분해. 프론트엔드 폴더명 = `frontend` (확정, 잠정).
- Turborepo `apps/packages`는 JS 전용이라 폴리글랏엔 부적합 → 미채택.
- 나머지 서비스 폴더명·전체 컨벤션은 추후 재논의(노트 TODO).
