---
layout: post
title: 자바의 Deque (2)
subtitle: 자바 자료구조 분석 - Deque, LinkedList
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [자료구조]
comments: true
categories: java
---


## 클래스 구조
![java-deque-2-picuter-1.png](..%2F..%2Fassets%2Fimg%2Fposts%2Fjava-deque-2-picuter-1.png)
**LinkedList**의 클래스 구조이다. 복잡해 보이긴 하는데 여기서는 우선 List와 Deque 인터페이스를 살펴본다.
두 인터페이스를 implements 한 LinkedList는 두 인터페이스의 기능을 가지고 있다.
또한 Cloneable는 자신을 복제(얕은 복사)할 수 있는 기능이고, Serializable은 직렬화에 대한 인터페이스이다.
그리고 AbstractSequentialList를 상속을 보면서 LinkedList는 비순차적 자료구조가 아닌 
순차적인 특징을 갖고 있다.  

이렇게 클래스 구조를 보면 이 클래스가 어떤 기능과 특징을 가지고 있는지 대충은 알 수 있다.

우선 LinkedList의 특징부터 알아보자.

## LinkedList란?
연결 리스트로 각 노드가 데이터와 포인터를 가지고 다음 노드를 가리켜 한줄로 연결되어 저장하는 자료구조를 말한다.
아래와 같이 노드는 다음 노드를 가리키는 주소 값을 가지고 있다.
![java-deque-2-picture-2.png](..%2F..%2Fassets%2Fimg%2Fposts%2Fjava-deque-2-picture-2.png)

이러한 특징으로 LinkedList는 추가와 삭제에 걸리는 시간이 O(1)의 시간이 걸리는 장점이 있다. 하지만, 반대로
탐색은 O(n)의 시간이 걸린다.

```java
public class LinkedList<E> {
    transient int size = 0;

    /**
     * Pointer to first node.
     */
    transient Node<E> first;

    /**
     * Pointer to last node.
     */
    transient Node<E> last;

    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
}


```
LinkedList 구현 클래스를 보면 Node 타입 변수 first,last를 가지고 있고, Node는 LinkedList static 내부 클래스인 것을 볼 수 있다.
Node에는 실제 데이터가 담기는 item과 이전 노드와 다음 노드의 주소 값을 가지고 있는 next, prev 변수가 있다.
LinkedList는 이중 연결 리스트이다.

> 연결 리스트의 종류는 다음과 같다.
> - 단일 연결 리스트 : 각 노드에 다음 노드를 가리키는 포인터 하나만 가지고 있는 단 방향 리스트
> - 이중 연결 리스트 : 각 노드에 다음 노드와 이전 노드를 가리키는 포인터 두개를 가지고 있는 양 방향 리스트
> - 원형 연결 리스트 : 단일 연결 리스트에서 마지막 노드가 맨 처음 노드를 가리켜 순환이 되는 구조.

![java-deque-2-picture-3.jpg](..%2F..%2Fassets%2Fimg%2Fposts%2Fjava-deque-2-picture-3.jpg)
### 문서에 언급된 다른 특징
- Note that this implementation is not synchronized. it must be synchronized externally.  
  동기화를 지원하지 않습니다. 외부 동기화를 해야 합니다.
    ```java
    List list = Collections.synchronizedList(new LinkedList(...));
    ```
  - `ConcurrentLinkedDeque` 가 있다. 사용한적은 없다.
- The iterators returned by this class's iterator and listIterator methods are fail-fast  
  LinkedList의 iterators는 fail-fas 방식입니다. `ConcurrentModificationException` 발생
  > fail-fast : 동작중 오류가 발생하면 바로 오류를 알리고 작업을 중단합니다. 
- 
---

## 메서드
### add(E e)
```java
 public boolean add(E e) {
    linkLast(e);
    return true;
}
```
`add()` 메서드는 `linkLast()`메서드를 호출한다.
`linkLast()`를 메서드를 보자.
```java
void linkLast(E e) {
    final Node<E> l = last;
    final Node<E> newNode = new Node<>(l, e, null);
    last = newNode;
    if (l == null)
        first = newNode;
    else
        l.next = newNode;
    size++;
    modCount++;
}
```
ArrayDeque와는 구현이 다르다. 배열과 연결리스트 구현 차이이다.
코드는 간단하다. 
1. 새로운 노드를 생성하면서 (Node 생성자에 있음) `last`의 주소를 `prev`에 담는다.
2. `last`는 새로운 노드로 재할당 된다.
3. l이 널이면 첫번째 노드라는 뜻.
4. l이 널이 아니면 l.next 에 새로운 노드를 재할당.

나머지 Deque의 메서드들은 비슷하게 구현되어있다.

ArrayDeque와 다른 점을 또 찾으면 get(int index, E e), add(int index, E e) 가 있다.

### get, add (index)
```java
Node<E> node(int index) {
    // assert isElementIndex(index);
    
    if (index < (size >> 1)) {
        Node<E> x = first;
        for (int i = 0; i < index; i++)
            x = x.next;
        return x;
    } else {
        Node<E> x = last;
        for (int i = size - 1; i > index; i--)
            x = x.prev;
        return x;
    }
}
```
코드를 보면 first 또는 last 부터 index까지 반복해서 탐색한다.
그래서 중간 탐색 또는 중간 삽입 삭제 같은 경우는 복잡도가 조금 증가한다.  
탐색 또는 중간 삽입 삭제 같은 경우는 LinkedList 사용을 다시 한번 생각해봐야한다.

