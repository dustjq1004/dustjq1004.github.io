---
layout: post
title: Spring Web exception - Name of argument type [java.lang.Long]
subtitle: Name of argument exception 원인 및 해결
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [Spring, exception]
comments: true
categories: java
---

## Name of argument Exception
### 1. 원인
제목 그대로 controller request mapping 메서드 파라미터 이름을 찾을 수 없어서 발생한 오류이다. 원래는 요청 path, 파라미터 명이 매개변수 명과 같으면 생략 가능하지만,
원인은 자바 컴파일 모드 문제라 한다. 자바는 컴파일 된 바이트 코드에 메소드 인자 타입 정보만 가지고 있고, 변수명 정보는 debug 모드일 때만 가진다고 한다.

### 2. 해결
#### -1, 코드수정
```java
@PutMapping("/api/articles/{id}")
public ResponseEntity<Article> updateArticle(@PathVariable(value = "id") long id,
                                             @RequestBody UpdateArticleRequest request) {
```
해결은 위에서 처럼 어노테이션에 value 값으로 name을 일치 시키면 되지만 굳이 이것 때문에 불필요한 코드를 치고 싶지 않다.
그렇다면 설정을 통해서 다르게 해결할 수 있다.

#### -2. Intellij 설정
- Build, Execution, Deployment → Compiler → Java Compiler → Additional command line parameters
해당 경로로 이동해서 ```-parameters``` 하나 넣어주면 된다.

#### -3. Gradle 설정
```java
tasks.withType<JavaCompile>(){
    options.compilerArgs.add("-parameters")
}
```
Gradle이 자바 컴파일시 -parameters 설정을 해준다.  
나머지 설정들은 참고했던 블로그 또는 문서를 통해 찾을 수 있다.

---
## 참고
- [https://m.blog.naver.com/sm_woo/70185755273](https://m.blog.naver.com/sm_woo/70185755273)
- [https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-6.x#parameter-name-retention](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-6.x#parameter-name-retention)