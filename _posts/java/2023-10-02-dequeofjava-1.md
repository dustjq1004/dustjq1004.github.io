---
layout: post
title: 자바의 Deque
subtitle: 자바 자료구조 분석 - Deque
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [자료구조]
comments: true
categories: java
---


```java
public interface Deque<E> extends Queue<E> {
```

Deque는 인터페이스고 Queue 인터페이스를 상속 받는다. Deque는 "Double-ended Queue"의 약자로 Queue 확장시킨 개념이다.
양쪽 끝에 요소를 추가하거나 삭제할 수 있다. Deque는 스택과 큐의 기능을 제공해 다양한 곳에서 사용되는 선형 자료구조이다. Queue관련 문제가 나오면
Deque 구현체인 ArrayDeque를 많이 이용한다.

Deque 인터페이스는 Java 1.6 부터 컬렉션 프레임워크에 추가되었다.

```java
// This interface is a member of the Java Collections Framework.  
// Since: 1.6
```

## Deque 인터페이스를 살펴 보자.
```java
public interface Deque<E> extends Queue<E> {

    void addFirst(E e);
    
    void addLast(E e);
    
    boolean offerFirst(E e);
    
    boolean offerLast(E e);
    
    E removeFirst();
    
    E removeLast();
    
    E pollFirst();
    
    E pollLast();
    
    E getFirst();
    
    E getLast();
    
    E peekFirst();
    
    E peekLast();
    
    boolean removeFirstOccurrence(Object o);
    
    boolean removeLastOccurrence(Object o);

    // *** Queue methods ***
    
    boolean add(E e);
    
    boolean offer(E e);
    
    E remove();

    E poll();
    
    E element();
    
    E peek();
    
    boolean addAll(Collection<? extends E> c);

    // *** Stack methods ***
    
    void push(E e);
    
    E pop();
  
    boolean remove(Object o);
    
    boolean contains(Object o);
    
    int size();
    
    Iterator<E> iterator();
    
    Iterator<E> descendingIterator();

}
```
우선 아래쪽에 있는 메서드를 볼 필요가 있다. Stack methods, Queue methods 라고 주석으로 쓰여져 있고, Stack과 Queue에서 사용하는 기능을
얘기 한다는 것을 알 수 있다.

### Stack methods
스택은 First In Last Out 으로 마지막에 들어간 데이터가 먼저 나올 수 있다는 자료구조이다.
- push : 데이터를 넣는 메서드이고, 데이터를 넣을 때 마다 위로 쌓인다.
- pop : 데이터를 가져오는 메서드이고, 가장 나중에 들어간 데이터를 가져온다.
- remove : 일치하는 element를 삭제하고, 제거 여부 반환
- contains : 해당 element의 존재 여부를 확인
- size : 현재 들어있는 데이터의 개수를 반환
- iterator : 컬렉션내의 요소를 순환할 수 있는 방법을 제공
- descendingIterator : 내림차순으로 정렬하여 iterator를 제공

### Queue methods
queue Fist In First Out으로 처음 들어간 데이터가 먼저 나올 수 있는 자료구조이다.
- add : queue에 요소를 추가하는 메서드이다. 
- offer : queue에 요소를 추가한다.
- poll : 큐에서 데이터를 가져온다. 처음에 추가된 요소를 가져온다.
- remove : 요소 삭제하고, 제거된 요소 반환.
- peek : 요소를 삭제하지 않고, 첫번째 요소를 가져온다. 데이터가 비어있으면 null을 반환한다.
- element : 요소를 삭제하지 않고, 첫번째 요소를 가져온다. 데이터가 비어있으면 NoSuchElementException 발생.
- addAll : 인자로 들어온 컬렉션 배열을 끝에 모두 추가.

### Deque methods
Deque는 양쪽에서 추가 삭제를 할 수 있다.
- addFrist, addLast : 처음 또는 마지막에 요소를 추가할 수 있다.
- offerFirst, offerLast : 처음 또는 마지막에 요소를 추가한다.
- removeFirst, removeLast : 처음 또는 마지막 요소를 제거하고, 제거된 요소 반환. (비어있으면 예외 발생)
- pollFirst, pollLast : 처음 또는 마지막 요소를 제거하고 해당 요소를 가져온다. (널 반환)
- getFirst, getLast : 처음 또는 마지막 요소를 제거하지 않고 가져온다. (비어있으면 예외 발생)
- peekFirst, peekLast : 처음 또는 마지막 요소를 제거하지 않고 가져온다. (널 반환)
- removeOccurrence (First, Last) : 요소를 순회하며 equals로 비교해 첫번째로 해당하는 요소를 찾아 제거한다.



## 구현체
### ArrayDeque
Deque 구현체인 ArrayDeque를 살펴보자.
- 클래스명에서 알 수 있듯이 요소는 Object타입 배열에 담긴다. 이 뜻은 배열에 특징을 가진다는 의미이다.
데이터를 담는 LinkedList 방식과 배열 방식을 잘 이해하고 있어야 한다.

#### 생성자
```java
class ArrayDeque {
    public ArrayDeque() {
            elements = new Object[16];
    }
    public ArrayDeque(int numElements) {
        elements =
            new Object[(numElements < 1) ? 1 :
                       (numElements == Integer.MAX_VALUE) ? Integer.MAX_VALUE :
                       numElements + 1];
    }
    
    public ArrayDeque(Collection<? extends E> c) {
        this(c.size());
        copyElements(c);
    }
}
```
- 매개변수가 없을 경우 16길이의 배열을 생성한다.
- 객체를 생성할 때 요소의 길이를 정할 수 있다.
  해당 생성자가 있는 이유는 배열의 특징을 알면 알 수 있다. grow 메서드를 살펴보자.
- 컬렉션을 인자로 받아 데이터들을 요소에 추가한다.

#### 특징
- Array Deque는 용량 제한이 없다. out of memory 에러가 나지 않는 이상 계속 추가가 가능하다.
- Thread Safe 하지 않다. 외부 쓰레드 동기화가 없으면 멀티 쓰레드에서 동기화를 지원하지 않는다.
- Stack, Queue에서 LinkedList를 사용하는 것 보다 빠르다.

> **Thread-Safe**  
> 멀티 쓰레드 프로그래밍에서, 어떤 공유 자원에 여러 쓰레드가 동시에 접근해도, 프로그램 실행에 문제가 없는 상태를 의미.
> 한 스레드가 함수를 실행 중 일때, 다른 스레드가 같은 함수 동시에 접근하여도 결과에 이상 없이 정상적으로 동작하는 것을 보장한다.

#### addFirst 메서드
```java
class ArrayDeque {
  public void addFirst(E e) {
    if (e == null)
      throw new NullPointerException();
    final Object[] es = elements;
    es[head = dec(head, es.length)] = e;
    if (head == tail)
      grow(1);
  }
}
```
- grow 메서드는 ArrayDeque에 추가된 데이터의 개수와 elements의 배열의 크기와 같을 때 ```(head == tail)``` 배열의 크기와 주어진 needed 값에 따라서
  배열의 크기를 늘리는 메서드이다.
- dec은 데이터가 들어갈 head 앞에 인덱스를 가져온다. head < 0 이면, 0을 반환한다. 현재 head가 3이면 2를 가져오는 것 뿐이다.
  - head와 last가 겺쳐 값이 덮어씌어질 걱정은 없다. addFirst는 head를 하나 감소한 값에 값을 넣지만, addLast는 먼저 값을 넣은 다음에 tail을 하나 증가 시킨다.

```java
class ArrayDeque {
  public void addLast(E e) {
    if (e == null)
      throw new NullPointerException();
    final Object[] es = elements;
    es[tail] = e; // 값을 먼저 넣는다.
    if (head == (tail = inc(tail, es.length))) // tail 값을 증가 시킨 다음에 head와 같은지 확인
      grow(1);
  }
}
```

**removeFirst 메서드**  
removeFirst 메서드는 pollFirst를 내부에서 호출한다. 그리고 pollFirst 메서드가 반환한 값이 null이라면, NoSuchElementException 예외를 던진다.

**pollFirst 메서드**  
pollFirst는 elementAt으로 head의 값을 가져오고 head를 null처리 하여 삭제를 한다.

**getFirst 메서드**  
getFirst는 elementAt 메서드를 호출하고 그 값을 반환한다.

**기타 메서드**  
다른 last메서들들도 이러한 구조로 되어있고, add 또는 offer, remove메서들도 내부적으로 같은 메서드를 사용한다.

**시간 복잡도**
- 추가, 삭제 : O(1)
- 탐색 : O(1)


---
그래서 기본적인 추가,삭제,탐색 기능은 시간 복잡도가 상수 시간을 가진다. 물론, 기존 배열의 크기를 늘려야할 때는 복잡도가 증가하기는 한다. 하지만 대부분의 시간은 상수 시간이다.

ArrayDeque는 Stack, queue의 기능을 가지고 있고, 성능이 좋기 때문에 Queue 또는 Stack을 대신해 사용한다. 하지만, 멀티 스레드 환경을 지원하지 않는 단점 또한 존재한다.
그래서 자료구조는 상황에 따라서 알맞은 것을 찾아서 사용하면 좋다. ArrayDeque도 어떤 환경에서는 좋지 않은 퍼포먼스를 보이기 때문에 자바 자료구조 마다 특성을 잘 알고 사용해야 한다.

또 다른 구현체인 **LinkedList**는 다음 포스팅에서 알아볼 것이다.



