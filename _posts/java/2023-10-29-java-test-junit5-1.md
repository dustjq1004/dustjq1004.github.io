---
layout: post
title: 자바 테스트 - Junit5
subtitle: 자바 테스트 도구 JUnit 알아가기
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [테스트, 우아한테크코스]
comments: true
categories: java
---

[JUnit5 User Guide](https://junit.org/junit5/docs/current/user-guide/)를 참고하여 공부한 내용을 정리하였다.

## Junit 5 알아가기
Junit5은 자바 애플리케이션을 테스트를 자동하기 위한 테스트 프레임워크이다. 
- 테스트 자동화 (Automation Test) : 기능을 검증하는 코드를 작성
- Junit5는 JDK 8 이상 버전에서 사용할 수 있다.
- Junit 3, 4를 Dependency 한다.
- 다른 프레임워크 : TestNG, Spock

### Junit5 기본 구조
![java-test-junit5-1-picture-1.png](..%2F..%2Fassets%2Fimg%2Fposts%2Fjava-test-junit5-1-picture-1.png)

JUnit5는 Junit Platform, Junit Jupiter, Junit Vintage로 이루어져 있다.
Junit Platform은 TestEngine 플랫폼에서 실행되는 API를 정의하고 테스트 프레임워크를 시작하기 위한 기반 역할을 한다.
Junit Jupiter는 JUnit5를 사용하기 위한 구현체를 제공하고, Junit Vintage는 Junit 3,4를 사용하기 위한 구현체를 제공한다.

- Junit5는 스프링 부트 2.2부터 기본 테스팅 프레임워크에 내장되어있다.

### Junit5 사용하기

#### @Test
메서드에 테스트를 지정하는 annotation. 메소드 위에 명시하면 해당 메서드는 테스트 메서드임을 나타낸다.
- Junit5 부터는 접근 제어자를 생략할 수 있다.
  
```java
class MyTest {
    
    @Test
    void testMethod() {
        
    }
}
```

#### @DisplayName
@DispayName은 해당 테스트 메서드가 어떤 테스트인지 명시할 수 있다. @DispayName은 이모티콘, 띄어쓰기 등을 사용할 수 있다.
```java
class MyTest {
    
    @Test
    @DispayName("테스트 입니다.")
    void testMethod() {
        
    }
}
```


#### @Disabled
전체 테스트 클래스 또는 개별 메서드 테스트를 비활성화할 수 있다.
- @Disabled는 값이 없이 제공될 수는 있으나, 해당 테스트가 비활성화된 이유를 제공하는 것을 권장한다.
- 또한 @EnabledOnXXX, @DisabledOnXXX annotation을 제공하고, 해당 annotation들은 조건부 테스트 실행을 할 수 있다.

  
```java
class MyTest {
    
    @Test
    @DispayName("테스트 입니다.")
    void enabledTest() {
        System.out.println("활성 테스트");
    }

    @Test
    @Disabled("이유")
    @DispayName("비활성 테스트 입니다.")
    void disabledTest2() {
        System.out.println("비활성 테스트");
    }
}
```

### 테스트 실행 순서
테스트 실행 순서는 추가 설정이 없으면 명확하지 않은 알고리즘을 사용하여 예측가능한 실행 순서를 보장한다. 이러한 접근 방식은 테스트 스위트를 실행하는 과정을 예측
가능하게 만들어, 다른 환경 또는 다른 시점에서 동일한 빌드 결과를 얻을 수 있도록 도와준다.

- 단위 테스트는 일반적으로 실행 순서에 의존해서는 안되지만 특정 테스트 메서드 실행 순서를 적용해야할 때 또는 기능 테스트, 통합 테스트를 작성할 때는 필요하다.
Junit5는 정렬을 지정할 수 있는 기능을 제공한다.
  
```java
class MyOrderTest {
    
    @Test
    @Order(1)
    void orderOneTest() {
        
    }

    @Test
    @Order(2)
    void orderTwoTest() {

    }

    @Test
    @Order(3)
    void orderThreeTest() {

    }
}
```
- 자세한 내용은 아래 공식 문서를 통해 확인할 수 있다.  
[JUnit 5 - 테스트 실행 순서](https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-execution-order)

### Test LifeCycle
Junit Jupiter는 메서드별 테스트 인스턴스 생명 주기를 갖고 있다. 테스트 메서드를 독립적으로 실행시키기 위해 존재 하며 각 테스트 메서드를 실행하기 전에
각 테스트 클래스의 새 인스턴스를 만든다. 이는 JUnit Jupiter의 기본 동작이며 모든 이전 버전의 JUnit과 유사하다.

- LifeCycle 기본 값은 `PER_METHOD`이다. 위에 설명했듯이 각 테스트 메서드를 독립적으로 실행시키기 위해 메서드 마다 새 인스턴스를 생성한다는 뜻이다.
- LifeCycle 값을 PER_CLASS로 설정하면 메서드는 동일한 클래스 인스턴스에서 실행된다. 테스트 메서드가 인스턴스 변수에 의존한다면 
  테스트 메서드가 같은 변수 공간을 사용을 하게 된다.
- 그렇게 되면 해당 변수를 실행할때 마다 초기화를 해야 할 수도 있다.
- 다음과 같은 방법으로도 설정할 수 있다.
  - 파일 외부설정 방식 : `junit.jupiter.testinstance.lifecycle.default = per_class`
  - 자바 실행 파라미터 방식 : `-Djunit.jupiter.testinstance.lifecycle.default=per_class`

#### Test LifeCycle Annotation

**@BeforeAll**
- 테스트 실행 전에 한번만 실행시키는 Annotation, static 메서드에만 사용할 수 있다.

**@BeforeEach**
- @Test가 있는 메서드가 실행될 때 마다 이전에 실행시키는 Annotation.

**@AfterAll**
- 테스트 종료 후 한번만 실행, static 메서드에만 사용 가능.

**@AfterEach**
- @Test가 있는 메서드가 종료할 때 마다 실행.
  
```java
public class LifeCyCleTest {

    @BeforeAll
    static void beforeAll() {
        System.out.println("LifeCyCleTest.beforeAll");
    }

    @BeforeEach
    void beforeEach() {
        System.out.println("LifeCyCleTest.beforeEach");
    }

    @Test
    void 테스트_실행1() {
        System.out.println("LifeCyCleTest.테스트_실행1");
    }

    @Test
    void 테스트_실행2() {
        System.out.println("LifeCyCleTest.테스트_실행2");
    }

    @AfterEach
    void afterEach() {
        System.out.println("LifeCyCleTest.afterEach");
    }

    @AfterAll
    static void afterAll() {
        System.out.println("LifeCyCleTest.afterAll");
    }
}
```

**실행 결과**
```
LifeCyCleTest.beforeAll
LifeCyCleTest.beforeEach
LifeCyCleTest.테스트_실행1
LifeCyCleTest.afterEach
LifeCyCleTest.beforeEach
LifeCyCleTest.테스트_실행2
LifeCyCleTest.afterEach
LifeCyCleTest.afterAll
```
### 반복 테스트와 매개변수 할당
JUnit 5는 반복 테스트와 매개변수에 값을 할당해주는 Annotation을 제공한다.

#### @ParameterizedTest, @ValueSource
**공식 문서 예시**
```java
@ParameterizedTest
@ValueSource(strings = { "racecar", "radar", "able was I ere I saw elba" })
void palindromes(String candidate) {
    assertTrue(StringUtils.isPalindrome(candidate));
}
```
위와 같이 선언하면 String 타입 candidate 변수에 strings 안에 있는 문자열 값들이 순서대로 할당 된다.

다음은 `@ValueSource`에 사용할 수 있는 타입들이다.
1. short
2. byte
3. int
4. long
5. float
6. double
7. char
8. boolean
9. String
10. Class

널과 빈 값을 테스트하기 위해 널 또는 빈 값을 허용하는 Annotation도 있다. 매개변수화 된 테스트를 위해 널 또는 빈 값을 포함한 다양한 입력을 다루도록 할 수 있다.
- @NullSource
  - @NullSource는 primitive type (int, short, long ....) 에는 사용할 수 없다.
- @EmptySource
  - @EmptySource는 String, Collection 또는 구현된 Collection 하위 타입에 사용할 수 있다. (기본 생성자를 가지고 있어야 한다)
  - 또한 primitive arrays, object arrays에도 사용할 수 있다.
- @NullAndEmptySource

#### @EnumSource
Enum도 할당할 수 있는 Annotation이 있다.
```java
@ParameterizedTest
@EnumSource(names = { "DAYS", "HOURS" })
void testWithEnumSourceInclude(ChronoUnit unit) {
    assertTrue(EnumSet.of(ChronoUnit.DAYS, ChronoUnit.HOURS).contains(unit));
}
```
- @EnumSource value는 생략할 수 있다. 생략시 첫번째 파라미터 타입이 사용된다. 하지만, 파라미터가 Enum 타입을 참조하지 않으면 테스트는 실패하게 된다.
  이러한 상황에서는 value에 Enum 타입을 명시해야 한다.


#### @MethodSource
@MethodSource는 테스트 클래스나 외부 클래스에 있는 한 이상의 팩토리 메서드를 참조할 수 있게 한다. 해당 Annotation 사용하여 
테스트 데이터를 동적으로 생성할 수 있다.
- 테스트 클래스 내부에 있는 팩토리 메서드는 Lifecycle.PER_CLASS가 아니면 static이어야 한다. 
- 외부 클래스에 있는 팩토리 메서드는 항상 static이어야 한다.
- return 값은 Stream 타입이어야 한다.
- Arguments를 통해 매개변수를 여러 개 받을 수 있다.
  
```java
@ParameterizedTest
@MethodSource("stringIntAndListProvider")
void testWithMultiArgMethodSource(String str, int num, List<String> list) {
    assertEquals(5, str.length());
    assertTrue(num >=1 && num <=2);
    assertEquals(2, list.size());
}

static Stream<Arguments> stringIntAndListProvider() {
  return Stream.of(
  arguments("apple", 1, Arrays.asList("a", "b")),
  arguments("lemon", 2, Arrays.asList("x", "y"))
  );
}
```

#### @CsvSource
- csv형식으로 파라미터 값을 지정할 수 있다.
- 구분은 쉼표로 한다.
- @CsvFileSource를 통해 csv파일을 읽어올 수 있다.  
  `@CsvFileSource(resources = "/two-column.csv", numLinesToSkip = 1)`
  
```java
@ParameterizedTest
@CsvSource({
        "'carA, carB', 4"
})
void testWithCsvSource(String name, int count) {
    System.out.println("name = " + name);
    System.out.println("count = " + count);
}
```
---
휴휴 넘 많다.