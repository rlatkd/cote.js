# 0003. 모노레포 폴더 구조

- **상태**: Accepted (일부 잠정)
- **일자**: 2026-07-09

## 맥락

프론트엔드·백엔드·AI·Judge 등 여러 폴리글랏 서비스를 한 저장소에 둔다. 최상위 폴더를 어떻게 나눌지 결정 필요.

## 결정

- **폴리글랏 모노레포 + 서비스별 최상위 폴더**.
- 프론트엔드 폴더명 = `frontend` (확정, 잠정).
- 나머지 서비스 폴더명·전체 컨벤션은 **추후 재논의**(보류).

예상 구조:

```
/
├─ frontend/          Next.js
├─ api/               Kotlin + Spring (사용자 API)   ← 'backend'보다 명확(잠정)
├─ ai-generation/     Python (문제 생성)
├─ ai-similarity/     Python (유사도 검증)
├─ ai-validator/      Python (문제 검증)
├─ judge/             Go (채점 워커)
├─ infra/             docker-compose, k8s manifests
└─ docs/
```

## 근거

- 서비스 분해가 폴더에 그대로 드러나 마이크로서비스 설계를 한눈에 보여줌(포트폴리오 자산).
- 폴리글랏이라 서비스 독립성이 높고, docker-compose로 오케스트레이션하는 편이 자연스러움.

## 검토한 대안

- **Turborepo/Nx `apps/packages`**: JS/TS 모노레포 전용 도구 컨벤션. Kotlin/Go/Python은 도구 밖이라 폴리글랏엔 반만 맞음 → 미채택.
- `backend` 단일 명칭: AI·Judge도 넓게는 백엔드라 이름이 모호 → `api`로 구체화 검토(잠정).

## 결과

- Next.js 코드를 루트 → `frontend/`로 이동 완료.
- 나머지 서비스 폴더명은 각 서비스 착수 시 확정([TODO](../TODO.md) Deferred).
