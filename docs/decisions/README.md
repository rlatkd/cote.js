# 아키텍처 결정 기록 (ADR)

확정된 주요 결정을 1건당 1문서로 남긴다. "왜 이렇게 정했는지"를 미래의 나(그리고 포트폴리오를 보는 사람)에게 설명하는 기록이다.

## 작성 규칙

- 파일명: `NNNN-제목.md` (4자리 일련번호).
- 상태(Status): `Proposed`(논의 중) → `Accepted`(확정) → `Superseded by NNNN`(다른 결정으로 대체) / `Deprecated`.
- 확정된 결정은 이 문서(ADR)에 정식 기록하고, [/CLAUDE.md](../../CLAUDE.md) '확정 사항'에는 결론만 요약한다.
- 템플릿: [template.md](template.md).

## 목록

| # | 제목 | 상태 |
|---|---|---|
| [0001](0001-tech-stack.md) | 기술 스택 선정 | Accepted |
| [0002](0002-poc-scope-and-design.md) | POC 범위 및 디자인 방향 | Accepted |
| [0003](0003-monorepo-structure.md) | 모노레포 폴더 구조 | Accepted (일부 잠정) |
| [0004](0004-frontend-architecture.md) | 프론트엔드 코드 아키텍처 | Accepted |
