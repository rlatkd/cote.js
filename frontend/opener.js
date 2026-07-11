// dev 서버가 실제로 응답할 때까지 폴링한 뒤 기본 브라우저로 연다.
// 외부 패키지 없이 Node 기본 모듈만 사용한다. `pnpm dev`에서 next dev와 함께 실행된다.
const { spawn } = require('node:child_process');
const http = require('node:http');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const URL = `http://${HOST}:${PORT}`;

const TIMEOUT_MS = 60_000; // 최대 대기
const INTERVAL_MS = 400; // 폴링 간격

function openBrowser(url) {
  const cmd =
    process.platform === 'darwin' ? 'open'
    : process.platform === 'win32' ? 'start'
    : 'xdg-open';
  // win32의 start는 셸 내장 명령이라 shell:true 필요
  spawn(cmd, [url], { stdio: 'ignore', detached: true, shell: process.platform === 'win32' }).unref();
}

function ping() {
  return new Promise((resolve) => {
    const req = http.get(URL, (res) => {
      res.resume();
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1_000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

(async () => {
  const deadline = Date.now() + TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (await ping()) {
      openBrowser(URL);
      return;
    }
    await new Promise((r) => setTimeout(r, INTERVAL_MS));
  }
  // 타임아웃: dev 프로세스는 건드리지 않고 조용히 종료
  console.warn(`[opener] ${URL} 응답 없음 — 브라우저 자동 실행을 건너뜁니다.`);
})();
