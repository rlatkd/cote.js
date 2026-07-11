# 아키텍처 문서

시스템이 **어떻게 생겼는지**(구조·데이터 흐름·컴포넌트 책임)를 설명한다. "무엇을 왜 정했는지"는 [decisions/](../decisions/)(ADR), 여기서는 그 결정이 반영된 실제 구조를 다룬다.

## 문서

| 문서 | 내용 |
|---|---|
| [system-overview.md](system-overview.md) | 전체 시스템 구성·서비스·데이터 흐름 |
| [frontend.md](frontend.md) | 프론트엔드 내부 아키텍처 (Active) |
| [frontend-design-system.md](frontend-design-system.md) | 프론트 디자인 시스템 — 색 토큰·서체·표면 위계·모션·접근성 (Active) |
| [_template.md](_template.md) | 서비스 아키텍처 문서 템플릿 |

## 방침

- 서비스별 상세 아키텍처 문서는 **해당 서비스를 착수할 때** 생성한다(빈 껍데기 미리 만들지 않음).
- 예정: `backend-api.md`, `ai-generation.md`, `ai-similarity.md`, `ai-validator.md`, `judge.md`.
