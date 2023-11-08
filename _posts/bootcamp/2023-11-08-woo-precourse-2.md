---
layout: post
title: 우아한 테크 코스 - 프리코스 3주차 회고
subtitle: 3주차 미션 - 로또
cover-img: /assets/img/posts/2023-11-01-woo-precourse-1-picture-1.png
#share-img: /assets/img/posts/path.jpg
#gh-repo:
#gh-badge: [star, fork, follow]
tags: [우테코]
comments: true
categories: bootcamp
---

## 서론
일주일이 빠르게 지나갔다. 이번에는 나름 뿌듯했다고 말할 수 있겠다. 아쉬운 점도 있었다. 하지만 전 주차 보다 더 몰입했고, 성장하는 내 모습을 볼 수 있어서 좋았다.
나는 오늘 밤엔 자고 있겠지만, 다음 날 리뷰가 기대된다.

## 학습 과정
[1,2주차 회고](https://dustjq1004.github.io/bootcamp/2023-11-01-woo-precourse-1/)에서 세웠던 계획이 먹혔다.
특별한 계획은 아니지만, 역시 계획을 세우면 실천하게 된다. 완전히 따라가지는 않았다. 아니 따라가지 못했다. 일정이 있었다는 변명과, 게으름이 한 몫을 하고 반성읋 했다.
그래서 전 주차 계획을 다시 짧게 말하자면,  
1. 일요일 까지 설계와 구현을 완료한다.
2. 리팩토링을 하면서 요구사항에 있는 내용과, 공통 피드백 내용을 학습한다.
3. 공통 피드백과 미션에 있는 내용만 학습한다.

일요일까지 완전히 구현은 못했고, 기능 구현과 리팩토링을 반복하면서 피드백과 요구사항 내용을 학습했다.
그래고 학습하고 고민을 계속 반복하고 구현된 기능을 뜯어고치면서 많이 배웠다. 배운 것들 중 중요했던 내용을 다시 세세하게 살펴보자.

### 공통 피드백
#### 1. 기능 목록을 재검토한다.

> 기능 목록을 클래스 설계와 구현, 함수(메서드) 설계와 구현과 같이 너무 상세하게 작성하지 않는다.  

내가 1,2주차에서 계속했던 내용이다. 나름 자세하게 설계를 한다는 이유로 시도를 했지만, 어느 정도 공감한다.
클래스명 메소드명까지 작성해놓고, 구현하면서 이름을 계속 바꿨다. 그에 따라서 문서를 많이 수정했었다.
국비지원때 클래스 다이어그램을 빡세게 구현했었고, 다시 따라해봤는데 그때도 계속 수정했던 기억이 났다.
클래스 다이어그램은 의존성을 한눈에 볼 수 있지만, 다른 방법으로 대체 가능하다. 클린 아키텍쳐..? 책에서 봤던 것 같은데
객체 카드를 만들었던 방법인 것 같다. 객체가 가지는 책임을 중점으로 설게하는 방법이었다. 클린 아키텍쳐 책이 어려워서 중간에 그만 두었는데
해당 부분은 다시 읽어봐야겠다.

#### 2. 값을 하드 코딩하지 않는다
매직 넘버, 매직 리터럴, 상수에 대해서 많이 배웠다.
1. 하드코딩은 의미를 파악하기 어렵게 한다.
2. 하드코딩은 유지보수를 하기 어렵게 만든다.

하드 코딩이 좋지 않은 이유는 개발을 배우기 시작할때 부터 많이 들어왔다. 그렇기 때문에 하드코딩을 하지 않으려고 많은 노력을 하지만 시간에 쫗기게 되면
어느 순간 하드코딩을 하고 있는 모습을 본다. 그래도 이번에 하드코딩을 없애는 새로운 방법을 배우고, 좋지 않은 이유를 다시 한번 느꼈다.

그리고 `java 상수`를 키워드로 구글링 하다 발견한 내용이 있다. 
- [https://www.slipp.net/questions/174](https://www.slipp.net/questions/174)

위에 사이트에서 누가 상수처리에 대해서 질문을 했고, 다양한 답변이 달려 있었다. 답변 달아주신 분들 중에 익숙한 닉네임도 있다.
요약한 내용은 다음과 같다.
1. 상수처리에 대한 기준
   - 상수 클래스를 만들고 관리하는 방벋도 좋지만, 다른 곳에서 사용하지 않고 상수를 사용하는 클래스에 연관성을 고려하여 가능하면 관련된 클래스에 둔다.
   - 연관된 클래스에 상수를 두는 방법이 코드 가독성면에서 좋다.

그리고 다른 사이트에서 하드 코딩에 대한 내용이 있었는데 링크를 다시 찾기가 어려워서 첨부를 못했다.

2. 규모가 작은 프로젝트에는 하드코딩이 더 편할 수 있다.
   - 유지보수를 하게 되는 비용보다 하드 코딩을 상수처리하는 비용이 크다면 굳이라는 의견도 있었다.

그리고 다음은 enum을 공부하다 발견한 사이트다. 유명한 이동욱님이 okky에 올리신 글이다.
enum 클래스 활용사례에 대한 글인데, 댓글이 많이 달렸었다.
- [https://okky.kr/articles/384729](https://okky.kr/articles/384729)

3. 공통 코드를 처리하는 방법
   - 테이블에서 코드를 관리를 한다.
   - enum 클래스로 관리를 한다.

공통코드 추가 삭제가 빈번하다면 테이블 관리를 해야한다. 다른 애플리케이션 환경을 고려하면 정답은 아닐 수 있다는 의견등이 있었다.
각각 장단점이 있다. 글을 읽고 생각한 내 생각은 결국 애플리케이션 규모를 고려하고, 자신만의 상수를 처리하는 기준을 있어야 겠다는 결론을 세웠다.
하드 코딩은 지양하는게 맞겠지만, 무분별한 상수 처리인지, 오버엔지니어링인지 고민을 많이 해봐야겠다.  

그리고 한가지 더 의문이 있었다.
```java
public static Map<WiningType, Integer> getWiningCountEmptyMap() {
    Map<WiningType, Integer> winingCounterMap = new TreeMap<>(Comparator.reverseOrder());
    for (WiningType winingType : values()) {
        winingCounterMap.put(winingType, 0);
    }
    return winingCounterMap;
}
```
타입별로 Map을 초기화하고 반환하는 메서드인데, 초기화를 위한 저 0도 처리를 해야 되는지 의문이 들었다. 메서드명으로 빈 Map을 반환한다.
그렇다면, 0은 의미를 파악하기 쉽고, 다른 곳에서 사용하지 않을 것 같다. 그래서 상수로 하지 않았지만 헷갈린다.

#### 3. 테스트를 작성하는 이유에 대해 본인의 경험을 토대로 정리해본다.

> 단지 기능을 점검하기 위한 목적으로 테스트를 작성하는 것은 아니다. 테스트를 작성하는 과정을 통해서 나의 코드에 대해 빠르게 피드백을 받을 수 있을 뿐만 아니라 학습 도구(학습테스트를 통해 JUnit 학습하기.pdf)로도 활용할 수 있다.

아직 어려운 피드백이다. 테스트는 어렵다. 아직 테스트를 제대로 경험해보질 못했고(프리코스 미션을 통해서 조금씩 배우고 있긴 하지만), 턱 없이 부족하다.
단위 테스트 책도 샀지만 읽지 못하고 있다. 우테코가 끝나고 읽자.  

그래도 차주에 빠른 피드백이 어떤 것인지 한 번 경험했다.
```java
class WiningNumbersTest {

    @Test
    @DisplayName("5등에 당첨된 로또가 1개다.")
    void countWiningTest1() {
        // given
        WiningNumbers winingNumbers = new WiningNumbers(new Lotto(List.of(1, 2, 3, 4, 5, 6)), new Bonus(7));
        List<Lotto> lottos = List.of(new Lotto(List.of(1, 2, 3, 11, 12, 13)),
                new Lotto(List.of(1, 9, 10, 11, 12, 13)),
                new Lotto(List.of(1, 2, 10, 11, 12, 13))
        );

        // when
        WiningTypeCount winingTypeCount = winingNumbers.countWining(lottos);
        int winingCount = winingTypeCount.getWiningCount(WiningType.FIVE);

        // then
        Assertions.assertEquals(winingCount, 1);
    }
}
```
당청 번호에 대한 도메인 클래스를 테스트하는 클래스다. 처음에는 "당첨된 로또가 5개다." 이렇게만 테스트 하려고 했는데, 그렇게 하면 countWining가 수정이 되어야 했다.
또는 WiningTypeCount 클래스에 메서들 추가하거나 반복문으로 총 합계를 구하는 로직이 테스트에 들어가야 했다. 그래서 이러한 경우가 내가 구현한 도메인에 대한 피드백이구나 생각을 했다.
그러고 나서 다시 생각해보니 테스트 내용을 살짝 바꾸기만 하면 됐다. 이러한 경험이 조금씩 쌓이면 테스트를 작성하는 이유에 대해서 정리할 수 있게 될 것이다.
결국 남들이 말하는 이유겠지만, 내 경험을 통해서 정리하고 포스팅을 하고싶다.

### 요구사항
#### 1. enum 클래스 사용
enum 클래스를 공부하면서 상수에 대해서도 같이 공부했다. enum에 사용방법과 emum을 사용하는 이유를 블로그에 포스팅을 했다.
상수에 대한 글은 아직 없는데 enum을 먼저 공부하게 됐다. 프리코스 후에 상수에 대한 글을 작성할 예정이다.
- [자바 enum 사용하기](https://dustjq1004.github.io/java/2023-11-06-java-enum-1/)

enum 사용해본 경험이 거의 없다. 처음 개발할 때 잠깐 공부했던 기억에서는 enum이 어려웠다. 전 회사에서는 상수 클래스를 사용한 흔적이 전혀 없었다. 공통 코드들은 모두 DB에 들어가 있고,
대부분 하드 코딩이거나 지역 변수에 있었다. 지금 생각해보면 정말 읽기 힘든 코드들이다. 그리고 나 또한 그렇게 작성하고 있었다. 아직 사용 경험을 더 해야하지만, 다시 공부하니 enum 활용에 대해서 좋은 점을 많이 배웠다.

#### 2. 일급 컬렉션
일급 컬렉션을 사용하라는 요구사항이 있었다. 해당 단어를 직접 언급하지 않았지만 다음과 같이 클래스가 주어졌고, 해당 클래스를 사용하는 요구사항이었다.

```java
public class Lotto {
    private final List<Integer> numbers;

    public Lotto(List<Integer> numbers) {
        validate(numbers);
        this.numbers = numbers;
    }

    private void validate(List<Integer> numbers) {
        if (numbers.size() != 6) {
            throw new IllegalArgumentException();
        }
    }

    // TODO: 추가 기능 구현
}
```
> - 제공된 Lotto 클래스를 활용해 구현해야 한다.
> - numbers의 접근 제어자인 private을 변경할 수 없다.
> - Lotto에 필드(인스턴스 변수)를 추가할 수 없다.
> - Lotto의 패키지 변경은 가능하다.

다음은 내가 추가로 구현한 `Lotto` 클래스다.
```java
public class Lotto {
    private final List<Integer> numbers;

    public Lotto(final List<Integer> numbers) {
        validate(numbers);
        List<Integer> mutableNumbers = new ArrayList<>(numbers);
        Collections.sort(mutableNumbers);
        this.numbers = mutableNumbers;
    }

    private void validate(List<Integer> numbers) {
        ModelValidation.validateSize(numbers);
        ModelValidation.validateDuplicate(numbers);
        ModelValidation.validateRange(numbers);
    }

    public int countCorrectNumbers(Lotto lotto) {
        int count = 0;
        for (Integer winingNumber : numbers) {
            if (lotto.containNumber(winingNumber)) {
                count++;
            }
        }
        return count;
    }

    public boolean containNumber(int number) {
        return numbers.contains(number);
    }

    public List<Integer> getNumbers() {
        return numbers;
    }
}
```
일급 컬렉션은 비즈니스 로직에 종속적인 자료구조다. 컬렉션 클래스를 다시 객체로 만들어 컬렉션을 감춘다. 캡슐화를 하는 것이다. 
일급 컬렉션은 불변성을 보장하며 내부 클래스에서 해당 자료구조를 사용하는 비즈니스 로직에 필요한 기능을 구현해 응집도를 높이게 된다.
하지만 getNumbers는 불변성을 깨트린다. 컬렉션을 가져가면서 List에 추가 삭제를 할 수 있게 된다. 아쉬웠던 부분이다.
물론 내가 일정관리를 잘했다면 리팩토링할 시간이 있었겠지만, 지금은 시간이 없다. 차라리 toString을 오버라이딩한 것이 나았겠다.  

어차피 현재 출력 부분에서 아래와 같이 사용하고 있기 때문이다. (참고로 글을 쓰고나서 바꿨다.)
- `lottos.forEach(lotto -> stringBuffer.append(lotto.getNumbers() + NEW_LINE));`


그리고 일급 컬렉션은 객체지향 생활에 있는 원칙 중 하나다. 그래서 객체지향 생활 원칙을 같이 공부 했다. 더 자세하게 알고 싶어서 위해 책을 구매했다.
- [객체 지향 생활 체조 알아보기](https://dustjq1004.github.io/java/2023-11-06-java-live-templates-for-object-calisthenics-1/)

일급 컬렉션 관련 글은 아직 작성하는 중이다. 다음 미션을 하면서 작성을 마무리할 예정이다.

### 핵심 목표
1. 클래스(객체)를 분리하는 연습
2. 도메인 로직에 대한 단위 테스트를 작성하는 연습

메일로 온 내용안에 있는 미션 목표다. 읽고 있던 Object 책을 다시 읽고, 클래스에 역할과 책임에 대해서 많이 공부했지만 아직도 갈피를 못잡겠다.
그래도 객체지향 생활 체조 원칙을 블로그를 통해 좀 더 알게 되면서 클래스 라인 수를 줄이고 객채에 메서들 줄이고 하니 조금은 알게 된 것 같다.
그러면서 도메인 클래스가 많아졌다. 사실 많은 편인지도 모르겠다. 빨리 코드리뷰를 하고 싶다.  

단위 테스트는... 이제 코드를 작성하고 프로젝트를 하게 될 때 꼭 작성해서 연습해야겠다는 생각이다.


---

## 마무리
시간 진짜 빠르다. 벌써 마지막 주다. 한달은 긴 시간이지만 무언가를 완벽히 학습하기에는 짧은 시간이다. 저번 주차보다는 이번 주차에 더 발전했다 생각하지만,
아쉬움은 항상 남는다. 그 아쉬움은 2주차 코드리뷰를 하지 않았다. 다른 사람의 코드를 계속 보긴 했지만 리뷰를 달거나 부탁을 하지 않았다. 당시에는 다른 사람 코드 분석에도
바쁘다고 생각했지만, 아니었다. 이 점이 아쉬움으로 남는다. 내일은 3주차 코드리뷰를 위해 많은 시간을 할애 해야겠다.
그리고 이번 주차에도 미션 내용 외로 배운 점이 있다. 개발자가 성장하는 방법을 알게 됐다. 프리코스는 개발자가 성장하는 방법을 제대로 알려준다.
학습한 내용을 적용시키기 하고, 구현 완료 후 내 코드를 스스로 리뷰할 수 있게 소감문을 작성한다. 그리고 다른 사람과 코드리뷰를 하게 된다.
글을 쓰고 내가 구현한 코드를 설명하면서 학습했던 내용들에 대해서 물음을 계속하게 한다. 제대로 능동적인 학습 방식을 알게 해준다. 
스프링을 사용하기 위해서 공부하는 것이 아니라 스프링 기반인 내 애플리케이션을 구현하기 위해서 스프링을 학습해야 한다. 모두 품질 좋은 애플리케이션을 만들기 위해서
학습한다.  

프리코스는 우테코에 맛보기라고 한다. 여기서도 배운 것들이 많지만 더 많은 것들을 배우기 위해서 우테코에 꼭 들어가고 싶다. 
그러려면, 다음 주 미션을 잘 마무리하고 코딩 테스트를 잘 준비를 해야겠지. 다음 주 미션이 기다려진다.