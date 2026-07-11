# 로컬 실행

현재 구현된 서버: **Postgres(도커) · hub(NestJS API) · arena(Next 프론트)**

## 최초 1회 세팅

```bash
cd platform && pnpm setup             # install + contracts 빌드 + prisma generate/migrate/seed
```

## 서버 켜기

```bash
cd infra && docker compose up -d      # 1) DB (Postgres) :5432  — 먼저 (hub가 DB에 붙음)
cd platform && pnpm dev               # 2) hub + arena 동시 (pnpm --parallel)
```

- hub: http://localhost:4000/api  ·  arena: http://localhost:3000 (자동 브라우저 오픈)

### 따로 켜고 싶으면

```bash
cd platform && pnpm dev:hub           # hub만  (= nest start --watch)
cd platform && pnpm dev:arena         # arena만 (= next dev)
```

> `contracts`(공유 타입)를 수정하면 재빌드 필요: `pnpm build:contracts`.

## 끄기

```bash
cd infra && docker compose down       # DB 중지 (데이터 유지)
# hub · arena 는 각 터미널에서 Ctrl+C
```

## 확인용

```bash
curl http://localhost:4000/api/problems     # 문제 목록(JSON)
curl http://localhost:4000/api/submissions  # 제출 목록(JSON)
```
