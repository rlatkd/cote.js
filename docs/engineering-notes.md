# 엔지니어링 노트

> 진행 중 고민·질문, 검토한 대안, 해결방안 아이디어, 열린 질문을 기록한다.
> 확정된 결정은 [decisions/](decisions/)(ADR), 지켜야 할 제약 요약은 [/CLAUDE.md](../CLAUDE.md), 할 일은 [TODO.md](TODO.md).

---

## 진행 중 논의 (Deliberation Log)

### 프론트엔드 코드 아키텍처 — ✅ 결정됨: (C) 자체 도메인 레이어드 ([ADR-0004](decisions/0004-frontend-architecture.md) Accepted)

> 아래는 결정에 이른 논의 기록(히스토리).

- **맥락**: 스택·POC 디자인 확정 후 프론트 코드 아키텍처를 선정하는 중.
- **경위**:
  1. MVC / Hexagonal / FSD 등 정형 패턴 검토 시작.
  2. FSD → 사용자 제외.
  3. Hexagonal(프론트 적용) → "백엔드 냄새"라며 반려.
  4. 프론트 네이티브 후보 정리: Bulletproof React(feature-based), MVVM(훅=ViewModel), 상태 분리(TanStack Query + Zustand), Atomic(UI 한정).
  5. 사용자 정정: "네카라쿠배당토"는 예시일 뿐, 요지는 "FSD처럼 정형화된 트렌디한 named 아키텍처가 또 있냐".
  6. Claude 답: 그 조건(정형화 + 프론트 네이티브 + 폴더 레벨 + 트렌디)을 다 만족하는 FSD 경쟁자는 드묾. 직접 대안은 Bulletproof React 정도, Atomic은 UI 한정, MVVM 등은 층위가 다름.
  7. 사용자 제기: "이건 Next.js니까 Next.js에 최적화된 아키텍처로 가야 하지 않나" → Claude 동의.
- **현재 유력안**: **Next 네이티브 = RSC 서버우선 + feature-based 모듈 + thin `app/` 라우팅.**
  - 근거: Next.js App Router는 자체 아키텍처 모델(RSC / 서버·클라 경계 / Server Actions / layout)을 가짐. FSD·Bulletproof React 등은 SPA 시대 산물이지만, **FSD는 공식 App Router 가이드로 Next에 적응함**(아래 리서치). 따라서 "Next라 FSD 불가"는 성립하지 않음 — 선택은 '프레임워크 밀착(경량 feature-based)' vs '정형화(FSD)' 취향 문제로 좁혀짐. Next 공식 "Project Organization" 관례가 사실상 표준.
  - 구조안: `app/` = 라우팅·layout·loading/error·server action만 / `features/*` = 도메인 모듈(컴포넌트·훅·api 콜로케이트) / `components/ui` = 프레젠테이셔널 공용 / `lib/` = api 클라이언트·유틸.
  - RSC 기본, Monaco 통합 화면 등 인터랙션은 **client island**. MVVM(훅=ViewModel) 병행.
  - **다음 결정**: 아래 리서치 반영해 (A) 경량 feature-based+RSC / (B) FSD-on-Next 중 재선택 → 확정 시 [ADR-0004](decisions/0004-frontend-architecture.md)를 Accepted로 전환하고 `frontend/` 내부 재배치.

### 리서치 — 실무/글로벌 기업 프론트 아키텍처 (2026-07-09)

- **기업은 스택은 공개해도 코드 아키텍처는 거의 공개 안 함.** Next.js 프로덕션 사용사(Netflix·TikTok·Uber·Nike·Starbucks·OpenAI·Stripe·Notion·Linear·Hulu 등)는 렌더링 전략(SSG/ISR/SSR)·사용 표면만 공개, named 코드 아키텍처는 대부분 비공개. → "대기업이 채택한 아키텍처를 그대로 베낀다"는 성립 어려움.
- **코테 운영사(LeetCode/프로그래머스/Codeforces/AtCoder)**: 프론트 아키텍처 신뢰할 만한 공개 자료 없음. Codeforces·AtCoder는 구형 서버렌더(Next 아님). 참고할 "코테 표준"은 없음.
- **문서화되어 수렴하는 사실**: ① 렌더링 = RSC + SSG/ISR/SSR + server/client 경계(모든 Next 프로덕션 공통). ② 코드 조직 = feature-based(folder-by-feature)가 지배적. ③ FSD = 정형 방법론, 은행/핀테크/이커머스 채택 증가 + **공식 Next App Router 가이드 존재**(`app/`=라우팅, `src/`=FSD 레이어). ④ 토스 = Turborepo 모노레포 + 관심사 분리.
- **정정 (Claude 오류)**: 이전에 "FSD는 Next와 이름 충돌로 부적합"이라 한 것은 오류. FSD 공식 가이드가 충돌을 해결함(`app/` 라우팅 + `src/` 레이어). FSD는 Next 프로덕션에서 사용됨. 단 소규모엔 무겁다는 평은 유효.
- **좁혀진 실질 후보(둘 다 프로덕션·트렌디)**: (A) 경량 feature-based + RSC(Next 네이티브) / (B) FSD-on-Next(정형·명시). 차이는 '형식·규칙 강제 수준' 하나. → 사용자 재선택 대기.
- 출처: [FSD Next 가이드](https://feature-sliced.design/blog/nextjs-app-router-guide), [Next 사용 기업](https://github.com/vercel/next.js/discussions/10640), [대규모 Next 아키텍처](https://www.freecodecamp.org/news/reusable-architecture-for-large-nextjs-applications/), [토스 프론트 챕터](https://toss.tech/article/toss-frontend-chapter).

### 리서치 2 — 기업 엔지니어링 블로그 실제 사례 (2026-07-09)

| 기업 | 실제 채택 | 핵심 |
|---|---|---|
| 배민(우아한형제들) | 자체 4레이어 `Web-Service ← Bridge(훅) ← Data(react-query·store·API) ← Model`, 단방향 의존, 디자인시스템 별개 | named 패턴 안 베끼고 도메인 맞춤 자체 정의 + Bad/Good 내부 가이드. v0→v2 반복 |
| Money Forward | entities 도메인 레이어(View / ViewModel=`entities/*/index.ts` / Repository=`mapper.ts` / DataSource) + RSC + Server Actions | 비즈로직 서버 이전, progressive enhancement, Feature Flag 4단계 점진 마이그레이션 |
| Artsy | App Router/RSC 도입 시도 후 **철회**, Pages Router 유지 | RSC/`use client` 경계 지옥(클라 코드가 RSC 경계 만나면 전체 실패), DX·단순함 > RSC 성능 |
| Airbnb/Shopify | 모노레포 + 의존성 버전 통일 + 업그레이드 자동화 | 대형사 "아키텍처"의 방점은 모노레포 운영·의존성 전략 |
| 카카오엔터 | Next Full Route Cache 최적화 | 실전 관심사는 캐싱 |

**교훈**:
1. 대기업은 named 폴더 아키텍처(FSD 등)를 evangelize하지 않음. 도메인 맞춤 자체 레이어 정의 + 내부 가이드로 규칙 강제(배민·Money Forward).
2. MVVM(entities/도메인 레이어) + Server Actions는 실무 검증 조합(Money Forward).
3. **RSC 서버우선은 만능 아님 (Claude 정정)**. Artsy는 철회. 인터랙션 무겁고 DX 중요한 앱엔 독일 수 있음. 우리 앱 핵심(Monaco 통합 에디터)이 인터랙션 덩어리라 해당 → server-first 교조 금지, 정적 영역(목록·지문)만 RSC.
4. 대형사 아키텍처 방점 = 모노레포 운영·의존성·업그레이드.

**후보 추가**: **(C) 자체 정의 layered/도메인 구조**(배민·Money Forward식) — `features`/`entities` 모듈 + 명시적 레이어(View/ViewModel/Repository/Data) + 단방향 의존 규칙 + MVVM + Server Actions, RSC 부분 적용. → "트렌디 기업이 실제로 하는 것"에 가장 근접. Claude 잠정 추천.

출처: [배민](https://techblog.woowahan.com/15084/), [Money Forward](https://global.moneyforward-dev.jp/2025/12/04/migrating-to-the-next-js-app-router-or-how-i-learned-to-stop-worrying-and-love-server-actions/), [Artsy](https://artsy.github.io/blog/2024/03/07/nextjs-at-artsy-retrospective/), [Airbnb](https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2), [카카오엔터 캐싱](https://fe-developers.kakaoent.com/2024/240418-optimizing-nextjs-cache).

---

## 아이디어 / 열린 질문

프로젝트 전반에서 아직 해소 안 된 설계 리스크·아이디어. 해당 서비스 착수 시 ADR/아키텍처 문서로 승격.

- **생성 문제 정답 신뢰성**: LLM 생성물은 지문 모호·정답 불일치가 흔함. N개 독립 풀이 교차검증(출력 일치 시에만 정답 채택) + brute-force vs 최적 풀이로 제한조건 변별력 확인 + 사람 검수 게이트. 검수 UI·자동화 수준 미정.
- **데이터 라이선스 (최우선 리스크)**: 백준/프로그래머스/LeetCode 문제 수집·활용은 ToS·저작권 이슈. 공개 데이터셋 확보 또는 자체 시드 문제 구축 방안 선결 필요.
- **샌드박스 보안**: Docker 컨테이너 단독은 보안 경계가 아님. seccomp/cgroups/네트워크 차단/gVisor·nsjail 필요. Judge 착수 시 보안 노트로 상세화.
- **LLM 비용**: 생성·검증마다 다회 호출 발생 → 호출량·캐싱·배치 전략 초기부터 관리.
