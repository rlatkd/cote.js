# 시작하기

현재 실행 가능한 서비스는 **프론트엔드 POC**뿐이다(mock 데이터). 다른 서비스는 아직 미구현.

## 사전 요구

- Node.js 18.17+ (권장 20+ / 개발 환경 22)
- npm

## 프론트엔드 POC 실행

```bash
cd frontend
npm install
npm run dev
```

- 개발 서버: http://localhost:3000
- 데이터: `frontend/lib/mockData.ts` 목업 (백엔드 불필요)
- 코드 에디터(Monaco)는 기본 설정상 CDN에서 로드되므로 최초 실행 시 인터넷 연결 필요.

## 페이지

| 경로 | 화면 |
|---|---|
| `/` | 홈(대시보드) |
| `/problems` | 문제 목록 |
| `/problems/[id]` | 문제 상세 (통합 split view + 에디터) |
| `/status` | 채점 현황 |

> 채점·실행은 POC 단계라 실제 실행이 아니라 목업 결과를 지연 표시한다.

## 다음 단계

프론트 아키텍처 확정 후 `frontend/` 재배치 → 나머지 페이지 구현 → 이후 마일스톤([TODO](../TODO.md)).
