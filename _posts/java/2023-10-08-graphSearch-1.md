---
layout: post
title: 그래프 탐색 - Graph Search [문제 예시] (1)
subtitle: 자바 알고리즘 분석 - DFS 그래프 탐색 
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [알고리즘]
comments: true
categories: java
---
## 그래프 탐색 - DFS, BFS
그래프 탐색은 여러가지가 있지만 그 중 쉽고 처음 배우게 되는 탐색 방법이 **BFS**, **DFS**이다.    
DFS, BFS는 그래프를 순회하는 방식으로 아래와 같은 용도로 사용한다.
- 모든 노드를 한번씩 방문
- 노드를 한번씩 방문하면서 목표 노드 까지 가는 경로를 탐색
- 노드와 다른 노드가 이어져 있는지 확인

BFS, DFS는 개념 자체는 어렵지 않다. 다만, 구현이 좀 까다로울 수 있다고 느낄 수 있다. 그렇기 때문에 구현된 코드를 보면서 알아보도록 하겠다.
우선, 스택과 큐의 개념을 잘 알아야 한다. 또한 그래프의 특성을 알고 있으면 도움이 된다. 해당 포스트에서는 DFS에 대한 내용만 다룰 것이다.

백준 문제가 예시이기 때문에 문제를 아직 못 풀었거나 풀려고 하시는 분들은 스포 주의합니다.

## DFS - 깊이 우선 탐색
### [적록색약](https://www.acmicpc.net/problem/10026)
```java
class Solution {

    static boolean[][] visited;
    static char[][] rgb;
    static int[] a = new int[] {-1, 0, 0, 1};
    static int[] b = new int[] {0, -1, 1, 0};

    static char getChar(char a, int isRG) {
        if(isRG == 1) {
            a = a == 'G' ? 'R' : a;
        }
        return a;
    }
    
    static void dfs(int x, int y, int isRG) {
        visited[x][y] = true;
        char cur = getChar(rgb[x][y], isRG);

        for (int i = 0; i < a.length; i++) {
            int searchX = x + a[i];
            int searchY = y + b[i];

            if (searchX <= -1 || searchX >= n || searchY <= -1 || searchY >= n) continue;

            if (!visited[searchX][searchY] && getChar(rgb[searchX][searchY], isRG) == cur) {
                dfs(searchX, searchY, isRG);
            }
        }
    }
    
}
```
문제의 요구사항은 2차원 배열에 색을 뜻하는 문자열 'G', 'R', 'B' 가 주어진다. 주어진 2차원 배열을 가지고 구역의 개수와 적록색약이었을 때 구역의 개수를 출력하는 문제이다.
- 구역은 같은 색이면 구역으로 인정한다.
- 적록색약은 'R', 'G' 은 같은 색으로 판단한다.

**예시 1**
```
5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR
```
결과  
일반 : 4, 적록색약 : 3

**적록색약 일 경우**

**RRR**BB  
**GG**BBB  
BBBRR  
BBRRR  
RRRRR

RRR**BB**  
GG**BBB**  
**BBB**RR  
**BB**RRR  
RRRRR

RRRBB  
GGBBB  
BBB**RR**  
BB**RRR**  
**RRRRR**  

이렇게 구역이 정해지게 된다.  
이제 다시 구현 코드를 살펴 보겠다.
### 변수
- vistied : 방문을 표시하는 문제이다. 해당 노드를 방문 하였으면 true, 아니면 false이다.
- rgb : 'G', 'R', 'B' 값이 들어있는 2차원 배열이다.
- a,b : a와 b는 방향을 뜻한다. 이렇게 2차원 배열로 각 좌표를 탐색하거나, 이동을 요구하는 문제이면 방향이 필요하다. 각 방향은 상하좌우이다.
  - 참고로 대각선으로 이동을 요구하는 문제도 있다.

### getChar(char a, int isRG)
```java
class Solution {
    static char getChar(char a, int isRG) {
        if(isRG == 1) {
            a = a == 'G' ? 'R' : a;
        }
        return a;
    }
}
```
getChar 메서드는 적록색약일 때와 아닐 때를 구분하여 G -> R로 바꾸어 반환하는 메서드이다.
메서드 이름을 바꾸면 좋을 것 같다. getBlindessGreenColor...?

### DFS - 구현 코드 (Java)
```java
class Solution {
    
  static void dfs(int x, int y, int isRG) {
    visited[x][y] = true;
    char cur = getChar(rgb[x][y], isRG);

    for (int i = 0; i < a.length; i++) {
      int searchX = x + a[i];
      int searchY = y + b[i];

      if (searchX <= -1 || searchX >= n || searchY <= -1 || searchY >= n) continue;

      if (!visited[searchX][searchY] && getChar(rgb[searchX][searchY], isRG) == cur) {
        dfs(searchX, searchY, isRG);
      }
    }
  }
}
```
DFS는 한 방향을 끝까지 탐색한다고 생각하면 된다. 그리고 탐색한 방향이 끝났을 때 다시 돌아가 다른 방향을 탐색한다.

**RRR**BB  
GGBBB

위에 예시에서 (0,0)좌표에서 탐색을 시작하였을 때 
1. 우측 방향이 우선이면 RRR - 3번째 R ```(0, 2)``` 까지 가게 된다. 탐색을 하면서 ```visited = true```로 변경한다.
2. 우측에 B가 있으니 다른 방향을 탐색하게 된다. 
3. 다른 탐색할 수 있는 방향. 아래 쪽 방향을 탐색하려고 한다.
   - 아래 밖에 없으나, 더 이상 탐색할 수 없다.
4. 이전 탐색 ```(0, 1)```로 돌아가게 된다.
5. ```(0, 1)```에서 또 다시 다른 방향을 탐색하려고 한다.
   - 더 이상 탐색할 수 없으니 돌아가게 된다.
6. ```(0, 0)```도 같다.
7. 탐색을 끝낸다.

적록색약이라면 어떻게 되었을까. G가 있는 곳 까지 한 구역으로 보고 탐색하게 된다. dfs 구현은 Stack 자료구조가 핵심이다. 재귀 메서드의 구조는 Stack구조로 탐색할 메서드가 쌓인다. 그래서 재귀 메서드로 bfs를 구현할 수 있고, 스택 자료구조를
활용하면 for문으로 bfs를 구현할 수도 있다.

위에 구현코드는 재귀로 구현되어있다.
```
for (int i = 0; i < a.length; i++) {
  int searchX = x + a[i];
  int searchY = y + b[i];

  if (searchX <= -1 || searchX >= n || searchY <= -1 || searchY >= n) continue;

  if (!visited[searchX][searchY] && getChar(rgb[searchX][searchY], isRG) == cur) {
    dfs(searchX, searchY, isRG);
  }
}
```
- 해당 for문은 방향에 대한 루프이다.
- a -> x, b -> y 에 대한 뱡향이고, for문은 상좌우하 순이다. 방향 순서는 의미 없다.
- ```if (searchX <= -1 || searchX >= n || searchY <= -1 || searchY >= n) continue;```
  - 해당 조건은 2차원 배열 범위를 넘어설 경우이다.
- 이제 탐색을 하지 않았거나, 같은 색일 경우 dfs 메서드를 다시 호출하게 된다.

### DFS와 메모리 사용 - 스택오버 플로우
메모리 사용은 DFS 단점이다. DFS은 깊게 파고들 수록 Stack에 탐색할 데이터가 쌓이기 때문에 깊이가 깊을 수록 메모리 사용에 유의해야한다.
문제와 상황에 따라서 또한 구현에 따라서 스택 자료구조에 한계가 오게되면 스택오버플로우가 나기 때문에 주의해햐한다. 스택오버플로우는 에러인 점과 보안에 취약해지기 때문에
각별히 주의가 필요하다.

### 최적화 방식은?
최적화에 대해서 많이 모르기 때문에 **chat GPT**에 질문을 해보았다.

![img.png](/assets/img/posts/java-graph-search-1-picture-1.png)

생각보다 많은 방식이 있었다. 참고해놓고 조만간 해당 방식들에 대해서 공부하여 포스팅을 해봐도 좋을 것 같다. 
TCO 또는 메모이제이션과 같은 몰랐던 새로운 개념과 깊이를 제한한 다음에는 어떠한 방식으로 문제해결을 할 것인지에 대한 내용,
그래프 표현 최적화 등 많을 것을 알게 될 것 같아 기쁘다.

### 시간 복잡도
시간 복잡도는 그래프의 따라 달라질 수 있겠지만 트리구조일 경우 **O(V + E)** 를 가진다.
그래프가 순환 구조일 경우 노드와 간선을 여러번 방문할 수도 있다.  
V는 노드, E는 간선의 수이다.

---
## 정리
그래프 순회 탐색인 DFS에 대해서 알아보았다.
- DFS은 스택 자료구조를 통한 알고리즘 탐색 방법이다.
- 깊이 우선 탐색이라하여 한 곳으로 탐색할 수 있을 때까지 탐색하고 아니면 되돌아가 다른 곳을 탐색한다.
  - ex) 미로 찾기
- 목표 노도에 도달할 수 있는 경로가 여러 개일 경우 DFS는 최단경로를 보장하지 않는다.
- 메모리 사용에 주의 <span style="color:red;">**(스택오버플로우)**</span>
- 그래프 연결성 검사
- 시간 복잡도 : **O(V + E)**