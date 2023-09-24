---
layout: post
title: 이분 탐색, 이진 탐색 - Binary Search [문제 예시]
subtitle: 자바 알고리즘 분석 - 이분 탐색
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [알고리즘]
comments: true
categories: java
---

## Binary Search
이분 또는 이진 탐색이라고 불리는 Binary Search 알고리즘에 대해서 알아보자.

이름에 유츄할 수 있듯이 Binary Search는 정렬 된 숫자 배열에서 찾고하자 하는 숫자를 찾을 때 절반씩 나누어가며 찾는 방법이다.
순차 탐색과 마찬가지로 어렵지 않은 알고리즘이다. 이분 탐색에서 핵심은 탐색을 분할하여 진행하는 것 이다.

1. 정렬된 숫자이어야 한다.
2. 정렬된 숫자 배열에서 중간에서 시작하여 절반씩 좁혀가며 원하는 숫자를 찾는다.
3. 찾는 숫자 보다 중간 숫자가 작으면 중간 숫자 위를 탐색하고 반대면 아래를 탐색한다.

![java-binary-search-1-picture-1.gif](..%2F..%2Fassets%2Fimg%2Fposts%2Fjava-binary-search-1-picture-1.gif)
[https://blog.penjee.com/binary-vs-linear-search-animated-gifs/](https://blog.penjee.com/binary-vs-linear-search-animated-gifs/)

### 특징 (Chat GPT 답변)
이분 탐색을 특징을 하자면 다음과 같다.
1. 정렬된 데이터가 필요: 이분 탐색을 사용하려면 데이터가 오름차순 또는 내림차순으로 정렬되어 있어야 합니다. 이것은 주어진 데이터가 정렬되어 있지 않다면 먼저 정렬해야 함을 의미합니다.
2. 분할 및 탐색: 알고리즘은 현재 데이터 범위를 절반으로 분할하고, 찾고자 하는 원소가 현재 범위의 어느 쪽에 있는지를 비교하여 다음 탐색 범위를 결정합니다. 이것이 "이분" 탐색의 핵심입니다. 
3. 효율적: 이분 탐색은 데이터를 절반씩 줄여가면서 검색하기 때문에 일반적으로 다른 선형 검색 알고리즘보다 훨씬 효율적입니다. 선형 검색은 데이터 크기에 비례하는 시간이 걸릴 수 있지만 이분 탐색은 로그 시간 복잡도를 가지며, 매우 큰 데이터 세트에서도 빠르게 작동합니다.
4. 정확한 값을 찾거나 범위를 축소: 이분 탐색은 정확한 값을 찾는 용도로 사용할 수 있지만, 목표 원소가 데이터에 없는 경우 가장 가까운 값 또는 가장 가까운 범위를 찾을 수 있습니다.

구현은 다음과 같다.

```java
public class BinarySearch {

    int binarySearch(int start, int end, int search, int[] arr) {
        int mid = (start + end) / 2;

        if (start > end) return -1;
        
        if (search == arr[mid]) return arr[mid];

        if (arr[mid] >= search) return binarySearch(start, mid - 1, search, arr);
        else return binarySearch(mid + 1, end, search, arr);

    }
}
```
위에 구현코드는 재귀 함수로 되어있지만, while문으로도 구현할 수 있다.

로직은 비교적 간단하지만, 알고리즘을 응용할 수 있어야 한다. 
단순한 구현이지만 막상 코딩 테스트 문제를 보면 잘 떠오르지 않을 때가 많다. 백문불여일견 문제를 많이 풀어 응용할 수 있는 수준까지 끌어올려야 한다.

아래 코드는 이분 탐색으로 풀이한 코딩 테스트 문제이다.

### 이분 탐색 문제
**백준 - 과자 나눠주기**
```java

public class Main {

    public static int searchSnackBar(int start, int end, int[] bars, int joka) {
        int mid = (start + end) / 2;
        int cnt = 0;

        if (start > end) {
            return mid;
        }

        for (int i = 0; i < bars.length; i++) {
            if (bars[i] - mid >= 0) {
                cnt += bars[i] / mid;
            }
        }
        
        if (cnt >= joka) return searchSnackBar(mid + 1, end, bars, joka);
        else return searchSnackBar(start, mid - 1, bars, joka);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer stringTokenizer = new StringTokenizer(br.readLine());
        int joka = Integer.parseInt(stringTokenizer.nextToken());
        int bar = Integer.parseInt(stringTokenizer.nextToken());
        int[] bars = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

        Arrays.sort(bars);

        int result = searchSnackBar(1, bars[bars.length - 1], bars, joka);

        System.out.println(result);

        br.close();
    }
}

```
#### 문제 설명
문제를 요약하자면 조카 N명과 x길이를 가진 M개의 막대 과자가 있다. 조카에게 막대 과자 길이를 똑같이 나누어야할 때 
조카 1명이 가질 수 있는 막대 과자 최대의 길이를 구하는 문제이다.

#### 코드 설명
중간에 for문을 제외하고 맨 위 코드랑 똑같다. for문은 분할 기준 값을 구한다. 분할 기준을 요구사항에 맞게 변경 한 것이다.

- 조카 = 3, 막대 과자 = 10
- 막대 과자 n개의 길이 = 1 2 3 4 5 6 7 8 9 10 
- 답 = 8

mid 변수의 담긴 값은 우리가 찾고자하는 값이 된다. for문으로 구해지는 값 cnt는 bars에 
막대 길이(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) 들을 mid와 나눗셈 연산을 하여 나오는 몫을 구한다. 나오는 몫이 조카 수와 같다면
우리가 찾는 값이 된다.

- 현재 선택된 mid = 8, 조카 수 = 3

```
1. 1 / 8 = 0 
2. 2 / 8 = 0
3. 3 / 8 = 0
4. 4 / 8 = 0
5. 5 / 8 = 0
6. 6 / 8 = 0
7. 7 / 8 = 0
8. 8 / 8 = 1
9. 9 / 8 = 1
10. 10 / 8 = 1
```

cnt는 조카 수와 맞는 3이 된다. 하지만 맨 위 코드와 다른 차이점이 하나 더 있다. 해당 문제는 이 분 탐색을 끝까지 탐색한다.
이유는 최댓값이다. 

- 조카 = 4, 막대 과자 = 3
- 막대 과자 n개의 길이 = 10, 10, 15
- 답 = 7

다른 테스트 케이스를 봤을 때 6의 값도 조카 수와 맞는 몫이 4가 나오게 된다. 하지만 우리는 공평하게 배분된 막대 과자 길이 중 가장 큰 값을 찾아야 한다.

```if (cnt >= joka)```

조건 값을 최대로 잡힐 수 있도록 설정하고 끝까지 탐색한다. 이분 탐색 문제는 복잡도를 고려해 최적화를 요구하고, 정확한 값 보다는 최대 또는 최솟값을 구하는 문제가
많이 나온다고 한다.





