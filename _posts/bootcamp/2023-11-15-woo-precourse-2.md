---
layout: post
title: 우아한 테크 코스 - 프리코스 4주차 회고
subtitle: 4주차 미션 - 크리스마스 이벤트
cover-img: /assets/img/posts/2023-11-01-woo-precourse-1-picture-1.png
#share-img: /assets/img/posts/path.jpg
#gh-repo:
#gh-badge: [star, fork, follow]
tags: [우테코]
comments: true
categories: bootcamp
---

## 서론
마지막 주 미션이 드디어 끝났다. 프리코스 과정은 제출만 하면 끝나겠지만 나한테는 아직 끝나지 않는 것 같다.
이번 주차도 배운 것들은 많았다. 하지만 배운 내용들이 아직 머릿속에 정리가 되지 않았다. 무엇이든 글로 작성하면서 정리해야만 알고 있다는 느낌이 든다.
이마저도 알고 제대로 사용하고 있는가에 대해선 자신있게 대답은 못하겠지만, 글 작성만으로도 차이가 크다. 그래서 학창시절에 공부잘하는 애들이 글 잘쓰고 요약을 잘했 던 것 같다.
아무튼 아직 우테코 프리코스를 하면서 알게된 것들을 모두 흡수하려면 아직 프리코스는 끝나지 않았다. 
아 물론 1차 코테도 있고, 우테코 선발과정이 완전히 끝나지 않았다. 하지만 미션 과제들은 끝났고, 코드리뷰를 하면서 계속 리팩토링 할 예정이다.  

이번 주 나는 어떤 것들을 알게 됐을까?

## 정리
### 1. 정확한 이유를 모르고 사용했다.
코드 리뷰를 보면서 좋아보이는 것들은 따라하려고 했다. 그런데 시간이 부족하단 이유로 몇가지는 공부하지 않고 사용했다.
그 결과 리뷰에 사용한 이유에 대한 질문이 달렸다.

예를 들어 Custom Excpetion을 사용하는 이유이다.
```java
class CustomException extends IllegalArgumentException {
    public CustomException(String errorMessage) {
        super(errorMessage);
    }
}
```
단순히 이 클래스 하나 만들고, `CustomException`을 그냥 던지게 해놓았다. 표준 예외가 있고 사용하는 이유와 예외처리를 커스텀하는 방식과 이유를 알아보지 않고 사용했다.
마지막 주도 이렇게 사용하고 있었다. 표준 예외를 사용하고 서비스 계층 예외에 대한 특수한 목적에 대해서 알고 사용하자.

### 2. 



