// hub(백엔드 API) 접근 공용 헬퍼. 서버 컴포넌트에서 호출된다.
// 기본은 로컬 hub. 배포 시 HUB_URL 환경변수로 주입.

const HUB_URL = process.env.HUB_URL ?? "http://localhost:4000";

export async function hubGet<T>(path: string): Promise<T> {
  const res = await fetch(`${HUB_URL}/api${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`hub GET ${path} → ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** 404를 undefined로 흡수하는 GET(상세 조회용). */
export async function hubGetOptional<T>(path: string): Promise<T | undefined> {
  const res = await fetch(`${HUB_URL}/api${path}`, { cache: "no-store" });
  if (res.status === 404) return undefined;
  if (!res.ok) {
    throw new Error(`hub GET ${path} → ${res.status}`);
  }
  return res.json() as Promise<T>;
}
