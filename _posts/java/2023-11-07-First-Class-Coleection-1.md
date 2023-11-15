---
layout: post
title: 일급 컬렉션 알아보기
subtitle: 일급 컬렉션을 사용하는 이유를 알아본다. 
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [자바, 우아한테크코스]
comments: true
categories: java
---

## 일급 컬렉션
일급 컬렉션은 소트웍스 엔솔로지에서 나온 객체지향 생활 체조 원칙 중 하나다. ([객체지향 생활 체조 원칙 알아보기](https://dustjq1004.github.io/java/2023-11-06-java-live-templates-for-object-calisthenics-1/))  
컳렉션을 클래스를 감싸 캠슐화를 목적으로 사용한다. 코드를 먼저 보고 일급 컬렉션에 대해 자세히 알아보자.

```java
public class Order {
    private List<OrderLine> orderLines = new ArrayList<>();

    public void addOrderLine(OrderLine orderLine) {
        orderLines.add(orderLine);
    }

    public Money calculateTotal() {
        Money total = new Money(0);
        for (OrderLine orderLine : orderLines) {
            total = total.add(orderLine.calculateSubtotal());
        }
        return total;
    }
}
```
코드를 보면 알겠지만 일급 컬렉션은 어렵지 않게 사용할 수 있다. 단순히 `List, Map, Set` 과 같은 자료구조를 감싼 클래스가 있을 뿐이다.
단, 캡슐화를 지키기위한 몇 가지 규칙이 있다. 
- 컬렉션을 포함한 클래스는 반드시 다른 멤버변수는 없어야 한다.
- 그리고 해당 컬렉션만 들어있기 때문에 컬렉션을 활용한 로직만 구현해야 한다.

데이터를 꺼내서 쓰는 방식이 아닌 일급 컬렉션 안에 메서드로 로직을 구현하여 사용자가 사용할 수 있도록 한다.
컬렉션에 대한 상태과 행위를 한 곳에서 관리하게 한다는 뜻이다. 이렇게 하면 응집도가 높아진다.

일급 컬렉션을 사용하면서 얻게 되는 또 다른 장점들은 다음과 같다.
### 1. 관리 포인트가 증가한다.  
비즈니스에 종속적인 자료구조가 된다는 뜻인데 만약 해당 컬렉션이 중요한 도메인이고, 유효성이 꼭 필요한 컬렉션이라면 일급 컬렉션은 클래스로 만들어
한 곳에서 관리할 수 있게 한다.

```java
class Participants {
    List<String> people;
    
    public Participants(List<String> people) {
        this.people = people;
    }
}
```
오징어 게임 참가자들을 나타내는 일급 컬렉션이다. 이렇게 게임 참가자들이 있다고 하자.  
참가자들은 이름이 중복되면 안되고, 200명이 넘으면 안된다.


```java
class Participants {
    List<String> people;
    
    public Participants(List<String> people) {
        validate(people);
        this.people = people;
    }
    
    private void validate(List<String> people) {
        if (people.stream().distinct().count() < people.size()) {
            throw new IllegalArgumentException;
        }
        if (people.size() > 200) {
            throw new IllegalArgumentException;
        }
    }
}
```
위에 코드와 같이 유효성을 Participants에 넣어 Participants 객체를 생성할 때 마다 유효성을 처리할 수 있도록 할 수 있다.

### 2. 이름있는 컬렉션  
컬렉션에 이름있는 이름을 부여할 수 있게 된다.   
변수명으로 이름을 부여하면 되지 않나 생각이 들지만 다르다.

```java
Participants squidParticipants = new Participants();
Participants tetrisParticpants = new Participants();
Participants cartParticpants = new Participants();
```
이렇게 된다면 단순한 변수명에 불과하여 의미 부여를 할 수가 없고, 찾기가 힘들다.

```java
SquidParticipants squidParticipants = new Participants();
TetrisParticipants tetrisParticpants = new Participants();
CartParticipants cartParticpants = new Participants();
```
클래스 타입이 해당 컬렉션의 이름을 가지게 하면 검색하기 쉬워진다.

### 3. 불변성을 보장한다.
자바 자료구조를 final 변수에 담는다고 해서 완전한 불변성을 보장하진 않는다. 해당 변수에 새로운 컬렉션을 재할당은 불가능하겠지만,
그 안에 있는 요소들은 변경할 수 있다. 그렇기 때문에 getter로 아예 컬렉션을 가져오면 값을 마음대로 수정할 수 있게 된다.

```java
class Participants {
    List<String> people;

    public Participants(List<String> people) {
        validate(people);
        this.people = people;
    }

    public List<String> getPeople() {
        return people;
    }
}
```
컬렉션 객체 주소값으로 밖에서 사용할 수 있게 된다. 이러할 경우 `Collections.unmodifiableList(new ArrayList<>(값))` 와 같은 방식으로 완전하게 불변성을 만들어 줄 수는 있다.
하지만 굳이 그럴 필요가 있을까. 만약, `people` 리스트안에 있는 값 자체를 출력해야 한다면 getter대신 index로 조회할 수 있는 메서드를 만들어 주면 될 것 이다.

```java
class Participants {
    List<String> people;

    public Participants(List<String> people) {
        validate(people);
        this.people = people;
    }

    public String getPeople(int index) {
        return people.get(index);
    }
}
```
어 그런데 나는 stream forEach를 사용하고 싶은데?? 노 프러블럼😉  
람다를 사용해보자. `Consumer<T>`
```java
class Participants {
    List<String> people;

    public Participants(List<String> people) {
        validate(people);
        this.people = people;
    }

    public String getPeople(int index) {
        return people.get(index);
    }
    
    public void executeForEach(Consumer<String> action) {
        people.forEach(action);
    }
}
```
**Stream Foreach**는 `Consumer`를 구현한 람다 표현식을 받는다. `Consumer`타입에 람다 표현식을 넘기면 forEach를 클래스 내부에서 호출할 수 있다.
사실 이렇게 하는 방식이 맞는지는 모르겠다. 왜냐하면 애초에 이렇게 forEach를 사용해서 비즈니스 로직을 구현해야한다면 해당 비즈니스 로직을 구현하는 메서드를 일급 컬렉션 안에 하나 추가하면 된다.
그냥 이번에 코드리뷰를 하면서 알게된 함수형 람다 방식을 알게되면서 생각해봤다. 참고로만 봤으면 좋겠고, 내부에서 로직을 구현하도록 하자.



---
## 참고
- [https://lsj8367.tistory.com/m/entry/%EC%9D%BC%EA%B8%89-%EC%BB%AC%EB%A0%89%EC%85%98](https://lsj8367.tistory.com/m/entry/%EC%9D%BC%EA%B8%89-%EC%BB%AC%EB%A0%89%EC%85%98)
- [https://pomo0703.tistory.com/13](https://pomo0703.tistory.com/13)
- [일급 컬렉션을 활용해야 하는 이유](https://velog.io/@alsgus92/%EC%9D%BC%EA%B8%89-%EC%BB%AC%EB%A0%89%EC%85%98%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)