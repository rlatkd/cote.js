// problem Repository — 데이터 소스 접근.
// POC 단계라 목업을 비동기로 반환한다. 이후 이 파일만 Backend API 호출로 교체하면
// views/viewmodel은 무변경(Repository 경계).

import type { Problem } from "./model";

const defaultStarter: Record<string, string> = {
  Python: `import sys\ninput = sys.stdin.readline\n\ndef solve():\n    # 여기에 풀이를 작성하세요\n    pass\n\nsolve()\n`,
  "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // 여기에 풀이를 작성하세요\n    return 0;\n}\n`,
  Java: `import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // 여기에 풀이를 작성하세요\n    }\n}\n`,
  JavaScript: `const input = require('fs').readFileSync(0, 'utf8').trim().split('\\n');\n\n// 여기에 풀이를 작성하세요\n`,
};

const problems: Problem[] = [
  {
    id: 1000,
    title: "두 수의 합",
    difficulty: "Bronze",
    tier: "Bronze V",
    timeLimit: "1초",
    memoryLimit: "256 MB",
    submissionCount: 128430,
    acceptedCount: 96322,
    tags: ["구현", "사칙연산"],
    aiGenerated: false,
    description:
      "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
    inputDesc: "첫째 줄에 A와 B가 공백으로 구분되어 주어진다. (0 < A, B < 10)",
    outputDesc: "첫째 줄에 A+B를 출력한다.",
    examples: [
      { input: "1 2", output: "3" },
      { input: "5 4", output: "9" },
    ],
    starterCode: defaultStarter,
  },
  {
    id: 2231,
    title: "분해합",
    difficulty: "Bronze",
    tier: "Bronze II",
    timeLimit: "2초",
    memoryLimit: "192 MB",
    submissionCount: 74210,
    acceptedCount: 43518,
    tags: ["브루트포스", "구현"],
    aiGenerated: false,
    description:
      "어떤 자연수 N이 있을 때, 그 자연수 N의 분해합은 N과 N을 이루는 각 자리수의 합을 의미한다. 어떤 자연수 M의 분해합이 N인 경우, M을 N의 생성자라 한다. 자연수 N이 주어졌을 때, N의 가장 작은 생성자를 구해내는 프로그램을 작성하시오.",
    inputDesc: "첫째 줄에 자연수 N(1 ≤ N ≤ 1,000,000)이 주어진다.",
    outputDesc: "첫째 줄에 답을 출력한다. 생성자가 없는 경우에는 0을 출력한다.",
    examples: [{ input: "216", output: "198" }],
    starterCode: defaultStarter,
  },
  {
    id: 1932,
    title: "정수 삼각형",
    difficulty: "Silver",
    tier: "Silver I",
    timeLimit: "2초",
    memoryLimit: "256 MB",
    submissionCount: 52104,
    acceptedCount: 33820,
    tags: ["다이나믹 프로그래밍"],
    aiGenerated: false,
    description:
      "맨 위층부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이동은 대각선 왼쪽 또는 대각선 오른쪽으로만 가능하다. 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라.",
    inputDesc:
      "첫째 줄에 삼각형의 크기 n(1 ≤ n ≤ 500)이 주어지고, 둘째 줄부터 n개의 줄에 걸쳐 삼각형이 주어진다. 각 정수는 0 이상 9999 이하이다.",
    outputDesc: "첫째 줄에 합이 최대가 되는 경로의 합을 출력한다.",
    examples: [
      { input: "5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5", output: "30" },
    ],
    starterCode: defaultStarter,
  },
  {
    id: 7576,
    title: "토마토",
    difficulty: "Gold",
    tier: "Gold V",
    timeLimit: "1초",
    memoryLimit: "256 MB",
    submissionCount: 89340,
    acceptedCount: 38122,
    tags: ["BFS", "그래프 탐색"],
    aiGenerated: false,
    description:
      "격자 모양 상자에 담긴 토마토들 중 일부는 익었고 일부는 익지 않았다. 하루가 지나면 익은 토마토의 인접한(상하좌우) 익지 않은 토마토들이 익는다. 며칠이 지나면 상자 안의 토마토들이 모두 익게 되는지, 그 최소 일수를 구하는 프로그램을 작성하라.",
    inputDesc:
      "첫째 줄에 상자의 크기 M, N이 주어진다. 둘째 줄부터 토마토의 상태가 주어진다. (1: 익은 토마토, 0: 익지 않은 토마토, -1: 토마토가 없는 칸)",
    outputDesc:
      "모든 토마토가 익을 때까지의 최소 일수를 출력한다. 모두 익지 못하는 상황이면 -1을 출력한다.",
    examples: [
      { input: "6 4\n0 0 0 0 0 0\n0 0 0 0 0 0\n0 0 0 0 0 0\n0 0 0 0 0 1", output: "8" },
    ],
    starterCode: defaultStarter,
  },
  {
    id: 9019,
    title: "DSLR",
    difficulty: "Gold",
    tier: "Gold IV",
    timeLimit: "6초",
    memoryLimit: "256 MB",
    submissionCount: 41200,
    acceptedCount: 12844,
    tags: ["BFS", "그래프 탐색"],
    aiGenerated: false,
    description:
      "네 개의 명령어 D, S, L, R을 이용하여 레지스터에 저장된 수 A를 B로 바꾸는 최소 명령어 열을 구하는 프로그램을 작성하라.",
    inputDesc:
      "첫째 줄에 테스트 케이스의 개수 T가 주어지고, 각 테스트 케이스마다 두 정수 A, B(0 ≤ A, B < 10000)가 주어진다.",
    outputDesc: "각 테스트 케이스마다 A를 B로 바꾸는 최소 명령어 열을 출력한다.",
    examples: [
      { input: "3\n1234 3412\n1000 1\n1 16", output: "LL\nL\nDDDD" },
    ],
    starterCode: defaultStarter,
  },
  {
    id: 100001,
    title: "정원사의 물결 정렬",
    difficulty: "Silver",
    tier: "Silver II",
    timeLimit: "1초",
    memoryLimit: "256 MB",
    submissionCount: 842,
    acceptedCount: 517,
    tags: ["정렬", "구현", "그리디"],
    aiGenerated: true,
    description:
      "정원사 하윤은 N개의 화분을 일렬로 배치하려 한다. 각 화분에는 높이가 정해진 식물이 심겨 있으며, 하윤은 '물결 배치'를 좋아한다. 물결 배치란 임의의 i(2 ≤ i ≤ N-1)에 대해 i번째 화분의 높이가 양옆보다 크거나(봉우리) 양옆보다 작은(골짜기) 형태가 번갈아 나타나는 배치를 말한다. 주어진 화분들을 재배치하여 물결 배치를 만들 때, 인접한 화분 높이 차의 총합이 최소가 되도록 하라.",
    inputDesc:
      "첫째 줄에 화분의 개수 N(3 ≤ N ≤ 100,000)이 주어진다. 둘째 줄에 각 화분의 높이 h_i(1 ≤ h_i ≤ 10^9)가 공백으로 구분되어 주어진다.",
    outputDesc: "물결 배치를 만족하는 최소 높이 차 총합을 출력한다.",
    examples: [
      { input: "4\n1 3 2 4", output: "6" },
      { input: "5\n5 5 5 5 5", output: "0" },
    ],
    starterCode: defaultStarter,
  },
  {
    id: 100002,
    title: "캐시된 미로 탈출",
    difficulty: "Gold",
    tier: "Gold III",
    timeLimit: "2초",
    memoryLimit: "512 MB",
    submissionCount: 401,
    acceptedCount: 133,
    tags: ["BFS", "비트마스킹", "그래프 탐색"],
    aiGenerated: true,
    description:
      "지훈이는 K개의 열쇠 색이 존재하는 미로에 갇혔다. 각 칸은 빈 칸, 벽, 특정 색의 문, 특정 색의 열쇠 중 하나이다. 문은 대응하는 색의 열쇠를 하나라도 소지하고 있으면 통과할 수 있다. 시작점에서 출구까지 이동하는 최소 이동 횟수를 구하라. 단, 이미 방문한 (위치, 보유 열쇠 집합) 상태는 다시 방문하지 않는다.",
    inputDesc:
      "첫째 줄에 미로의 크기 R, C와 열쇠 색의 수 K(1 ≤ K ≤ 6)가 주어진다. 이후 R개의 줄에 걸쳐 미로가 주어진다.",
    outputDesc:
      "출구까지의 최소 이동 횟수를 출력한다. 탈출이 불가능하면 -1을 출력한다.",
    examples: [{ input: "1 5 1\nS.a.E", output: "4" }],
    starterCode: defaultStarter,
  },
];

// 목업 지연(실제 네트워크 흉내). 서버 컴포넌트에서 await로 호출.
export async function getProblems(): Promise<Problem[]> {
  return problems;
}

export async function getProblem(id: number): Promise<Problem | undefined> {
  return problems.find((p) => p.id === id);
}
