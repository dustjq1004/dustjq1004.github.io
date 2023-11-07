---
layout: post
title: 객체 지향 생활 체조 알아보기
subtitle: 객체 지향 방식으로 개발할 때 지켜야하는 중요한 원칙에 대해서 알아본다. 
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [방법론, 우아한테크코스]
comments: true
categories: java
---

## 서론
우테코 프리코스를 하면서 객체 지향 생활 체조에 대해서 알아보는 시간을 갖게 됐다. 미션 내용에 직접적인 언급은 없다. 
하지만 미션 요구사항들 중 객체 지향 생활 체조와 관련된 요구사항들이 있다.

## 정의
객체지향 생활 체조 원칙은 품질 좋은 코드를 작성하기 위한 9가지 원칙을 말한다. 마틴 파울러 저자 소트웍스 앤솔로지에서 나온 내용이다.
마틴 파울러의 유명한 명언이 있다.

> 어떤 멍청이라도 컴퓨터가 이해할 수 있는 코드는 작성할 수 있다. 좋은 프로그래머는 사람이 이해할 수 있는 코드를 작성한다.

객체지향 생활 체조 원칙은 멍청이 개발자에서 좋은 프로그래머로 성장하기 위한 좋은 지침이라고 할 수 있겠다.
좋은 개발자가 되기 위해 숙지해야겠다. 지금은 여러 블로그를 참고하며 작성한다. 프리코스 이후에 책을 읽으면 더 좋을 것 같다.

## 원칙은?
1. 한 메서드에 오직 한 단계의 들여 쓰기만 한다.
2. else 예약어를 쓰지 않는다.
3. 모든 원시 값과 문자열을 포장한다.
4. 한 줄에 점을 하나만 찍는다.
5. 줄여 쓰지 않는다.(축약 금지)
6. 모든 엔티티를 작게 유지한다.
7. 3개 이상의 인스턴스 변수를 가지니 클래스를 쓰지 않는다.
8. 일급 컬렉션을 쓴다.
9. getter/setter/프로퍼티를 쓰지 않는다.

하나 하나씩 알아보자.
---
### 1. 한 메서드에 오직 한 단계의 들여 쓰기만 한다.
하나의 블록 `{}`을 만나게 되면 그 안에 코드 들은 들여 쓰기를 하게 된다. 
indent라고도 하는데, indent를 한 번만 하게 코드를 작성하자는 원칙이다. if문과 for문을 생각하면 된다.
죽음의 피라미드 if문을 본 적이 있는가? 무려 8중첩이었다. 파악하기 진짜 힘들었다. 보통 반복문이 중첩되는 경우는 드물지만 만약 반복문이 중첩되면 더 힘들 것이다.
```java
private Map<WiningType, Integer> calculateCountByWiningType(List<Integer> winingNumber, int bonus,
                                                            List<Lotto> lottos) {
    Map<WiningType, Integer> winingCountMap = WiningType.winingCountToMap();
    lottos.forEach(lotto -> {
        int correctCount = lotto.compare(winingNumber);
        boolean hasBonus = lotto.containBonus(bonus);
        Optional<WiningType> wining = WiningType.findByWiningType(correctCount, hasBonus);
        if (!wining.isEmpty()) {
            winingCountMap.computeIfPresent(wining.get(), (key, count) -> count + 1);
        }
    });
    return winingCountMap;
}
```
위에 코드를 보면 forEach문에 if문 조건이 들어가 들여쓰기가 2번 된 코드가 있다. 원칙에 위배되기 때문에 리팩토링을 해야 한다.
방법은 forEach안에 있는 로직을 다른 메소드로 추출할 생각이다.

```java
    private Map<WiningType, Integer> calculateCountByWiningType(List<Integer> winingNumber, int bonus,
                List<Lotto> lottos) {
        Map<WiningType, Integer> winingCountMap = WiningType.winingCountToMap();
        lottos.forEach(lotto -> {
            int correctCount = lotto.compare(winingNumber);
            boolean hasBonus = lotto.containBonus(bonus);
            collectCountByWiningType(correctCount, hasBonus, winingCountMap);
        });
        return winingCountMap;
    }

    private void collectCountByWiningType(int correctCount, boolean hasBonus, Map<WiningType, Integer> winingCountMap) {
        Optional<WiningType> wining = WiningType.findByWiningType(correctCount, hasBonus);
        if (!wining.isEmpty()) {
            winingCountMap.computeIfPresent(wining.get(), (key, count) -> count + 1);
        }
    }
```
추출된 메서드에 매개변수 수가 많아 거슬리긴 하지만 들여쓰기는 잘 해결됐다. 들여쓰기를 줄이기 되면 가독성이 증가한다.

### 2. else 예약어를 쓰지 않는다.
else 예약어를 쓰면 안되는 이유는 들여쓰기 깊이가 증가하기 때문이다. 위에 언급했었던 if문 피라미드에서도 if-else문이 남발이 됐었다.
if문 안에 또 if-else문이 있고, else문 안에 또 if문이 있었다. 왜 그렇게 했는지 도저히 이해가 안갔다. 그 뒤로 else 예약어를 안쓰려고 많이 노력 했었다.
```java
public String getGrade(int score) {
    String grade = "";
    if (score > 90) {
        grade = "A";   
    } else {
        if (score > 80) {
            grade = "B"
        } else {
            if (score > 70) {
                grade = "C"        
            }   
        }
    }
    
    return grade;
}
```
이런 간단한 구현은 쉽게 읽히겠지만 실무에서는 비즈니스로직이 엄청 복잡한 경우가 있다. 그러면 코드를 파악하기가 매우 힘들어진다.
지금 위에 코드도 파악은 쉽게 되지만 보기가 불편하긴 하다.

```java
public String getGrade(int score) {
    if (score > 90) {
        return "A";   
    }
    if (score > 80) {
        return "B"
    }
    if (score > 70) {
        return "C"
    }
    
    return "D";
}
```
Early Return 패턴을 사용하면 구조를 쉽게 바꿀 수 있다. Ealry Retur이란, 조건문이 일치하면 즉시 반환하는 디자인 패턴이다.
뿐만 아니라 다향성을 활용해서 전략 패턴 또는 널 객체 패턴을 사용할 수도 있다고 한다.

### 3. 모든 원시값과 문자열을 포장한다.
primitive type을 캡슐화를 하라는 말이다. 이렇게 하는 이유는 **Primitive Obsession**이라는 **안티패턴**을 피하기 위함이다.
원시 타입에 집착이라고 하는데 문제점은 원시값은 의미를 가지고 있지 않다라는 문제다.
```java
public class Student {
    int grade;
    int score;
    int birth;
    
    public Student (int grade, int score, int birth) {
        this.grade = grade;
        this.score = score;
        this.birth = birth;
    }
}
```
Student 클래스의 변수들은 모두 같은 타입이다. 같은 타입이란 뜻은 객체를 생성할 때 값 들의 순서가 바뀌어서 들어간다면 Student객체는 더 이상 우리가
원하지 않는 객체가 된다. 값을 잘 할당하면 된다고 하겠지만, 컴파일 에러를 유발하지 않는다면 내가 아니더라도 분명 잘 못 쓰일 가능성이 적지 않게 있다.
그렇기 때문에 필요하면 원시 타입을 포장하고, 해당 객체 특징을 잘 구현해서 사용해야 한다. grade, score, birth도 캡슐화를 잘하여 사용하면 의도를 명확히 나타낼 수 있다.

### 4. 한 줄에 점 하나만 찍는다.
**디미터의 법칙이라고도 불리고, 인접한 친구에게만 말을 걸어라**로 유명하다고 한다. 디미터의 법칙은 다른 객체가 어떠한 자료를 갖고 있는지 속사정을 몰라야 한다는 뜻이다.
또한 최소 지식 원칙이라고도 한다. 디비터의 법칙을 준수하면 캡슐화를 높여 객체의 자율성과 응집도를 높일 수 있다. 방법은 원칙에 나와있듯이 점을 연쇄적으로 찍지 않으면 된다.
- 예외가 있다면 Builder 패턴과 같은 경우는 적용되지 않는다.

### 5. 줄여 쓰지 않는다.
변수명, 메서드명, 클래스명 등 약어로 축약해서 쓰지 말라는 듯이다. 축약하면 해당하는 것에 의미를 바로 알아챌 수가 없다. 의미 전달이 명확해야 좋은 코드이다.
만일 메서드명이 길어진다면 해당 메서드가 여러 책임을 지고 있는지 확인해야 한다.  
예를 들면 Lotto를 LT, 또는 축약 뿐만 아니라 for문에 i처럼 의미를 정확하게 알 수 없는 이름들은 사용하지 말아야 한다.

### 6. 모든 Entity를 작게 유지한다.
클래스의 길이가 길다면 책임을 많이 가지고 있다라는 뜻일 수도 있다. 책임을 다른 클래스로 분할해서 작게 유지하도록 신경써야 한다.
실상 클래스가 길어지면 읽기가 힘들다. 
- 해당 원칙은 **class를 50줄 이상**, **패키지 안에 파일은 10개**가 넘지 않는 것을 권장하고 있다.

### 7. 2개를 초과하는 인스턴스 변수를 가진 클래스를 쓰지 않는다.
인스턴스가 많은 클래스는 응집도가 낮다라는 의미이다. 대부분의 클래스는 인스턴스 변수 하나만으로 일을 할 수 있다고 한다. 또는 필요한 경우 최대 2개까지 사용할 수가 있다고 한다.
- 단일 이스턴스 변수만을 사용해 상태를 유지하는 Class 
- 2개의 독룁된 변수를 조화롭게 협력시키는 Class  

두 가지 종류의 클래스만 있도록 하는 것이 응집도를 유지할 수 있는 방법이라고 말한다.

### 8. 일급 컬렉션을 쓴다.
일급 컬렉션이란, 원시 타입을 포장한 것 처럼 컬렌션도 클래스로 포장하고 해당 클래스에는 컬렉션을 제외한 다름 인스턴스 변수는 없게 해야 한다.
지금 우테코 프리코스를 진행하고 있는데 프리코스 미션 중 Lotto에서 요구사항으로 제시된 Lotto클래스가 일급 컬렉션이다.
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
외부에서는 해당 컬렉션을 수정할 수 없게 하여 캡슐화를 지키게 한다. 필요한 값이 있으면 Lotto클래스안에 메서드로 사용자가 해당 인터페이스를 사용하도록 구현해야 한다.
여기도 **사용자는 시켜기만 해라!** 원칙인 것 같다.

### 9. getter,setter,프로퍼티를 쓰지 않는다.
일반적으로 묻지말고 시켜라라고 알려진 원칙이다. 객체의 상태에 기반한 모든 행동들은 객체가 스스로 결정하도록 해야한다. 
객체를 외부에서 결정하지 않게 하는 것이다. 필요하다면 getter까지는 허용하지만, getter를 사용하지 않더라고 구현할 수 있다.
사용자는 그저 시키기만 할 수 있도록 노력해서 구현해보자.

---
## 참고
- [https://hudi.blog/thoughtworks-anthology-object-calisthenics/](https://hudi.blog/thoughtworks-anthology-object-calisthenics/)
- [https://blogshine.tistory.com/241](https://blogshine.tistory.com/241)