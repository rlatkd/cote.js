# 프론트엔드 아키텍처

- **관련 ADR**: [0004. 프론트엔드 코드 아키텍처](../decisions/0004-frontend-architecture.md)
- **상태**: Active

## 책임

문제 조회·풀이·제출 UI, 채점 결과·랭킹·통계 표시. 비즈니스 규칙은 Backend API가 소유하고, 프론트는 조회/입력/표현을 담당.

## 아키텍처: 자체 정의 도메인 레이어드

named 폴더 아키텍처(FSD 등)를 그대로 베끼지 않고, 배민·Money Forward 실무 사례를 참고해 도메인에 맞는 레이어를 정의한다.

**단방향 의존: `app → views → entities → shared`**

| 레이어 | 역할 | 서버/클라 |
|---|---|---|
| `app/` | 라우팅 전용(얇게). 서버에서 데이터 페칭 후 `views`에 전달 | 서버 |
| `views/` | 화면 단위 UI 조합 (`entities` + `shared/ui`) | 정적=서버 / 인터랙션=클라 |
| `entities/` | 도메인별 `model`(타입)·`api`(Repository)·`use-*`(ViewModel 훅) | - |
| `shared/` | 도메인 무관 공용 `ui`·`lib`·`hooks` | - |

## 폴더 구조

```
frontend/
├─ app/                          # 라우팅 (얇게)
│  ├─ layout.tsx                 # 루트 레이아웃 + Navbar
│  ├─ page.tsx                   # 홈 → views/home
│  ├─ problems/
│  │  ├─ page.tsx                # 목록 → views/problem-list
│  │  └─ [id]/page.tsx           # 상세 → views/problem-solving
│  └─ status/page.tsx            # 채점 현황 → views/submission-status
├─ views/                        # 화면 조합
│  ├─ home/
│  ├─ problem-list/
│  ├─ problem-solving/           # 통합 split view + Monaco (client)
│  └─ submission-status/
├─ entities/                     # 도메인 모듈
│  ├─ problem/
│  │  ├─ model.ts                # Problem 타입·도메인 로직(acceptanceRate 등)
│  │  ├─ api.ts                  # Repository (현재 mock, 이후 Backend API)
│  │  └─ use-problem-solving.ts  # ViewModel (에디터·채점 상태 훅)
│  └─ submission/
│     ├─ model.ts
│     └─ api.ts
├─ shared/
│  └─ ui/                        # Navbar, ThemeToggle, DifficultyBadge, StatusBadge
└─ ...config
```

## 데이터 흐름 (RSC 방침)

- **정적/데이터 화면(홈·목록·지문·현황)**: `app/`의 서버 컴포넌트가 `entities/*/api`로 데이터를 페칭해 `views`에 props로 전달. `views`는 렌더링만.
- **인터랙션 화면(문제 풀이)**: `views/problem-solving`은 `"use client"`. 로직은 `entities/problem`의 ViewModel 훅으로 추출(MVVM).
- Artsy 교훈에 따라 **server-first를 교조적으로 적용하지 않음** — 인터랙션 덩어리는 client island로 명확히 분리.

## 상태 관리

- 서버 상태: RSC 서버 페칭 기본, 클라 캐싱 필요 시 TanStack Query(POC 이후).
- 클라 상태: 경량(테마·에디터 옵션)은 로컬 state / 필요 시 Zustand·Jotai.

## 데이터 연동

- POC: `entities/*/api.ts`가 목업 반환(비동기).
- 이후: 같은 `api.ts`를 Backend API(Kotlin) 호출로 교체. 뷰·뷰모델은 무변경(Repository 경계 덕분).
