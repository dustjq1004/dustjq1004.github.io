---
layout: post
title: 자바의 스택
subtitle: 자바 자료구조 분석 - Stack
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [자료구조]
comments: true
categories: java
---

스택에 기본적인 설명은 생략한다. 이미 많은 곳에서 스택에 대한 설명이 되어있고, 그렇게 어렵지 않으니 스택이 어떤 자료구조인지는 구글에 검색하면 바로 나온다.

이 글에 정리할 내용은 스택이 어디에 어떻게 쓰이는 지에 대한 내용과 자바가 스택을 어떻게 구현 했는지 알고 싶어서 코드를 분석 할 것이고, 그것이 이 글을 작성하는 이유이다.

## LIFO

스택을 말하면 바로 떠오르는 약어이다. 선입후출, Last In First Out. 스택은 보통 쌓는다고 이야기 하고, 데이터를 상자 쌓듯이 차곡 차곡 쌓아올리는 구조이다. 우리가 상자 안에 물건을 넣은 다음 뺄때도 위에서 빼듯이 스택은 LIFO의 구조를 가지고 있다. 그래서 stack에 데이터를 넣을 때는 push(), 반대로는 pop() 이라는 함수가 있다.

## 스택은 어디에 쓰일까?

- 재귀 함수 호출 → DFS 에서 사용
- 인터럽트 처리, 수식의 계산, 서브루틴의 복귀 번지 저장
- 스택오버플로우, 스택언더플로우
- 버퍼오버플로우 취약점을 이용한 공격을 할때 스택 메모리의 영역에서 시도

## 자바에서 사용하는 스택

사실 스택이라는 것이 있고 어떤 구조이고 자바 스택에는 이러한 메서드가 있다만 알면 된다. 하지만 스택이 어떻게 구현되어있는지 하나 하나 보고 싶어졌다. 스택은 별로 어려운 자료구조는 아니다.

### Stack과 Vector

Stack class의 정의된 변수는 없다. Satck은 Vector를 상속 받는다 그리고 Vector의 메서드와 인스턴스 변수를 이용한다.

```java
package java.util;

public class Stack<E> extends Vector<E> {
    /**
     * Creates an empty Stack.
     */
    public Stack() {
    }
}

```
    
```java
package java.util;

public class Vector<E>
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{

    protected Object[] elementData;

    protected int elementCount;

    protected int capacityIncrement;

    public Vector(int initialCapacity, int capacityIncrement) {
        super();
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        this.elementData = new Object[initialCapacity];
        this.capacityIncrement = capacityIncrement;
    }
```

Vector도 인터페이스, 추상 클래스등 상속 받는 것이 많다. Vector위에 까지 분석하게 되면 많이 복잡해지고, 굳이 가지 알고 있지 않아도 자바의 Stack클래스에 대해 충분히 많이 알 수 있기 때문에 분석할 필요가 없다.

### 변수

| 변수 | 설명                                                                                                                                                                          |
| --- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| elementData | 데이터 담기는 Object 타입의 배열이다. Object 타입은 자바를 배우는 사람이면 기본적으로 다 알고 있을 것이다.                                                                                                         |
| elementCount | 배열의 길이를 이야기 한다. Stack에 담겨있는 요소들의 갯수이다.                                                                                                                                      |
| capacityIncrement | 자바의 배열은 길이가 정해져있다. 절대 길이를 추가하거나 줄일 수 없다. 그렇기 때문에 elementData의 길이를 늘려주려면 새로 배열을 만들어야 한다. 기존 배열 + capacityIncrement 하여 추가적으로 더 담을 배열의 갯수를 지정한다. Stack 객체를 생성하게 되면 0으로 초기화 된다. |

### 메서드

#### push(object o)

```java
class Vector {
	private void add(E e, Object[] elementData, int s) {
	      if (s == elementData.length)
	          elementData = grow();
	      elementData[s] = e;
	      elementCount = s + 1;
	}
}
```

스택의 push 메서드는 Vector의 add 메서드만 알면 된다.
현재 인덱스와 elementData의 길이가 같으면 grow 메서드를 호출한다.
grow 메서드는 capacityIncrement를 이용하여 elementData 배열을 새로 만들면서 길이를 추가한다.

`int newCapacity = oldCapacity + ((capacityIncrement > 0) ? capacityIncrement : oldCapacity);`

`capacityIncrement` 가 0이면 `oldCapacity`를 이용한다. oldCapacity는 기존 배열의 길이다.
grow 가 호출 되지 않으면 스택은 상수시간이지만 grow 호출되면 배열을 새로만들고 기존에 값들을 담아주어야 하기 때문이 O(n) 만큼 시간복잡도가 증가할 수 있다.

#### pop()

```java
class Stack {
		public synchronized E pop() {
        E obj;
        int len = size();

        obj = peek();
        removeElementAt(len - 1);

        return obj;
		}
}
```

pop은 맨 끝에 추가된 배열의 요소를 가져온다. 상수시간을 가진다.
그리고 배열의 길이는 유지되고 맨 뒤의 값을 null로 변경하기만 한다.
`removeElementAt()` 은 Vector의 메서드이고, 배개변수로 받은 index에 위치한 배열을 제거해주는 용도이다.

#### peek()

```java
class Stack {
		public synchronized E peek() {
        int len = size();

        if (len == 0)
            throw new EmptyStackException();
        return elementAt(len - 1);
    }
}
```

peek 메서드는 맨 뒤 요소의 값을 가져오기만 한다. 상수시간을 가진다.

#### empry()
`public boolean empty() {    **return** size() == 0;}`

empty는 stack안이 비어있는지 확인하는 메서드이다. Vector에 있는 `elementCount` 로 판단한다. 상수시간이다.

#### search(Object o)
```java
class Stack {
	public synchronized int search(Object o) {
	    int i = lastIndexOf(o);
	
	    if (i >= 0) {
	        return size() - i;
	    }
	    return -1;
	}
}
```

search는 Object o의 값이 존재할 경우 위치하는 index 값을 반환한다.
탐색은 뒤에서 부터 하게 되고, O(n) 복잡도를 가진다.
`lastIndexOf` 메서드에서 탐색을 한다.

## 문제점

자바에서 구현된 Stack을 보면 Vector와 많이 연결되어 있다. 또한 메서드에 synchronized 키워드가 붙어있는 것을 볼 수 있다. 이 두가지 때문에 자바에서는 Stack 클래스를 잘 사용하지 않는다. 또한 배열로 되어있는 점이 불필요한 연산을 만들기도 한다.

### synchronized

synchronized는 멀티 쓰레드 환경에서 데이터를 안전하게 유지할 수 있게 해주는 키워드이다. Thread-Safe하다는 말을 많이 들어보았을 것 이다. synchronized는 스레드간에 동기화를 하여 데이터이 일관성을 유지한다.

그렇기 때문에 멀티스레드 환경에서는 불필요한 lock이 걸려 오버헤드가 발생할 수 있다.

### Vector

Stack을 보면 Vector를 상속을 받아서 구현하고 있다. 이 부분이 큰 문제가 된다. 객채제향 설계 원칙 중에 리스코프 치환 원칙에 위배된다.
그래서 자바의 Stack은 LSP를 설명할 때 자주 언급되는 예시다. 객체지향 프로그래밍 언어의 큰 특징인 상속과 다향성을 생각해보자.
하위 클래스는 상위 클래스로 형변환이 가능하단 것을 알고 있을 것이다. Vector는 Stack에서 기대하는 퍼블릭 인터페이스 외에 다양한 메서드를 가지고 있다.
단순히 추가 삭제 뿐만 아니라 중간에 있는 데이터를 바꿀 수도 있다.

```java
public static void main(String[] args) {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    
    stack.add(1, 10); // ???

    System.out.println(stack.toString());
}
// [1, 10, 3]
```

stack은 FIFO 구조다 잘못된 기능을 사용할 수 있게 되기 때문에 큰 문제가 된다.

또한 Stack은 배열을 사용하는 것 보단 Node를 사용하여 연결 리스트로 구현하는 것이 특정한 경우에 복잡도를 증가 시키지 않을 수 있다. 위에서 말했던 push시에 grow메서드를 호출 하는 경우이다.

Stack은 JDK 1.0 부터 있던 클래스이다. 그렇기 때문에 당시에 잘 못 설계되었다고 한다.
Stack보단 ArrayDeque 사용을 지향한다고 한다.

