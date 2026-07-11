# 개발 컨벤션

프로젝트 전반의 코드·커밋·네이밍 규칙. 확정된 것만 적고, 서비스가 늘면 보강한다.

## 공통

- 각 서비스는 자기 언어의 표준 포매터/린터를 따른다 (TS: ESLint+Prettier, Python: ruff/black, Go: gofmt).
- 문서·주석·커밋 메시지는 한국어 허용. 식별자(변수·함수·타입)는 영어.
- 비밀값은 커밋 금지. 환경변수/시크릿으로 관리.

## 커밋 메시지

- 형식: `<type>: <요약>` (예: `feat: 문제 목록 페이지 추가`).
- type: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`.
- 결정이 바뀌는 커밋은 관련 ADR도 함께 갱신.

## 브랜치 (Git 도입 시)

- `main`: 배포 가능 상태.
- 작업: `feat/<주제>`, `fix/<주제>` 등.

## 프론트엔드 (Next.js / TS)

- 서버 컴포넌트 기본, `"use client"`는 상호작용 잎사귀에만.
- 파일/폴더: 컴포넌트는 `PascalCase.tsx`, 훅은 `useXxx.ts`, 유틸은 `camelCase.ts`.
- 스타일: Tailwind 유틸리티 직접. 반복되는 조합만 컴포넌트로 추출.
- 경로 별칭 `@/*` 사용.

## 문서

- 결정 → ADR(`docs/decisions/`), 논의/근거 → `engineering-notes.md`, 할 일 → `TODO.md`, 구조 → `architecture/`.
- 상세는 [/docs/README.md](../README.md)의 역할 분리 참조.
