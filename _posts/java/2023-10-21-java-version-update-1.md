---
layout: post
title: JAVA VERSION 변경 하기 - JDK 버전 변경 (우아한, Mac, Hombrew)
subtitle: 자바 버전 변경하기 - 맥북
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [우아한테크코스, 자바, Mac]
comments: true
categories: java
---
## 맥북에서 자바 버전 업데이트 하기
우아한 테크 코스 6기 프리코스 테스트를 지원하면서 자바 버전을 변경할 일이 생겼다. 
사실 버전하는 방식은 정보가 인터넷에 수두룩 하다. 중요한 것은 자바 11, 17 버전에 따른 변경 사항을 알아야 한다.
그래도 잔디 채울 겸 블로그 조회수가 오르길 바라며.. 포스팅을 한다.  

**추후 버전에 따른 변경과 따로 개발하며 적어 둔 내가 사용했을 때 유용했던 단축키 등을 포스팅할 것 이다.**

맥북에서 **Homebrew를** 이용한 자바 버전 **11 -> 17**로 변경하려고 한다.

---

```
$ java -version
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment Homebrew (build 17.0.9+0)
OpenJDK 64-Bit Server VM Homebrew (build 17.0.9+0, mixed mode, sharing)
```
```java -version```을 입력하면 현재 나의 JDK 버전을 조회할 수 있다.


```
$ brew install openjdk@17
```
명령어를 입력하여 자바 버전을 설치한다.

```
$ sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

ln은 link의 약자로 원본 파일이 디렉터리를 가리키는 링크파일을 만드는 명령어이다.
```/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk``` 에 대한 링크 파일을 생성한다. 

**sfn 옵션은 다음과 같다.**
- s : 심볼링 링크 생성
- f : 동일 링크파일이 있을 경우 기존 파일 지우고 새로 생성
- n : 대상 파일이 심볼릭 링크 파일이면, 기존 심볼릭 링크의 정보로 링크

링크 파일이 생성된 폴더로 가서 ll로 조회를 해보면 다음과 같이 @ 표시와 -> 표시로 원본 파일을 가리키는 링크 파일을 볼 수 있다.

```
/Library/Java/JavaVirtualMachines $ ll
total 0
drwxr-xr-x  3 root  wheel    96B  4 21  2021 adoptopenjdk-11.jdk
lrwxr-xr-x@ 1 root  wheel    48B 10 21 00:26 openjdk-17.jdk -> /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk
```
이렇게 하여 시스템이 **JDK 17** 버전을 찾을 수 있게 된다.

### zsh 을 이용할 경우
```
$ echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
```
첫째줄 명령어를 입력한다.
두번째 명령어로 shell 설정의 변경사항을 적용한다.


이제 다시 ```java -version``` 명령어를 이용해 제대로 변경되었는지 확인한다.
```
$ java -version
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment Homebrew (build 17.0.9+0)
OpenJDK 64-Bit Server VM Homebrew (build 17.0.9+0, mixed mode, sharing)
```

### 참조
- [https://blog.karsei.pe.kr/58](https://blog.karsei.pe.kr/58)
- [https://willnfate.tistory.com/entry/MacOS%EC%97%90-Homebrew%EB%A1%9C-Java-11-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0](https://willnfate.tistory.com/entry/MacOS%EC%97%90-Homebrew%EB%A1%9C-Java-11-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)
- 리눅스 명령어 책 참조 [리눅스 입문자를 위한 명령어 사전]
