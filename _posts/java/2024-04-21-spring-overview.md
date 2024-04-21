---
layout: post
title: 스프링 OverView
subtitle: 스프링 개요
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [spring]
comments: true
categories: java
---
## Spring OverView
스프링은 Enterprise 애플리케이션을 쉽게 만들 수 있다. Enterprise 환경에서 자바 언어를 기반으로 필요한 모든 것들을 제공한다. 또한 JVM 위에 돌아가는 Grooby, Kotiln을 대신에서 사용할 수 있다. 그리고 애플리케이션의 요구사항에 따라 많은 아키텍쳐의 종류를 생성 할 수 있는 유연성을 가지고 있다.

스프링은 현재 `Spring Framework 6.0`, `java 17`버전 이상을 지원한다.

스프링은 **오픈 소스 프레임워크**이다. 그리고 많이 활성화된 커뮤니티를 가지고 있다.  
그래서 스프링 깃허브에서 **Contribute**에 참여할 수 있다.

## 스프링이 지원하는 기술들

### Spring Boot

스프링 부트는 웹 애플리케이션을 쉽고 빠르게 만들 수 있도록 도와준다. 스프링 내부에 **Tomcat 서버**를 내장하고 있어서 따로 Tomcat 서버에 구성할 필요가 없이 서버를 올릴 수 있다는 특징이 있다.

또한 **의존성 관리**를 자동으로 해준다.

```jsx
implementation 'org.springframework.boot:spring-boot-starter-web'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
implementation 'org.springframework.boot:spring-boot-starter-security'
```

따로 의존성 설정시 버전을 작성할 필요가 없고 위에 `starter-web`과 같은 의존성 패키지에 사용자가 필요한 기능들이 들어있다. (웬만한 기능은 다 있다. 애써 고생할 필요가 없다.)

스프링 부트가 없었던 과거에는 스프링 프레임워크를 사용하면서 여러 의존성 버전들을 관리하는 데에 어려움이 많았다.

### Spring Data

스프링 데이터는 기존 데이터베이스의 특성을 유지하면서 데이터 엑세스를 하는 스프링 기반 프로그래밍 모델이다. 스프링 데이터의 목적은 데이터 베이스와 자바를 분리하여 각자의 특성을 유지하고, 서비스를 사용할 수 있게 하는 데에 있다. 즉, 관계형과 비관계형 데이터베이스, 빅데이터, 클라우드 환경데이터베이스 등 쉽게 데이터에 접근할 수 있다.

> This is an umbrella project which contains many subprojects that are specific to a given database. The projects are developed by working together with many of the companies and developers that are behind these exciting technologies.
→ Spring Data는 많은 하위 프로젝트를 포함하는 프로젝트이다. 프로젝는 많은 회사 및 개발자들과 협업하면서 만들어졌다.
>

Spring Data Documents를 보면 나오는 문구이다. Spring Data는 많은 기능을 지원한다는 것을 알 수 있다.

대표적으로 **Spring Data JDBC, Spring Data JPA**가 있다.

### Spring Session

스프링 세션은 사용자 세션 정보를 관리하기 위한 API와 구현체를 제공한다.

스프링 세션은 애플리케이션 컨테이너 특정 솔루션에 연결되지 않고 클러스터 세션을 쉽게 지원할 수 있다.

> 클러스터된 세션(Clustered Session)
세션 클러스팅이라 하는데 두 대 이상의 WAS가 동일 세션으로 세션관리를 하는 것을 의미한다. 하나의 세션으로 다른 서버에서도 사용하여 세션 불일치 문제를 해결하는 것이다.
>

### Spring Security

스프링 시큐리티는 사용자 정의가 가능한 인증과 접근 제어를 사용할 수 있는 프레임워크이다. 즉, 로그인 관리를 쉽게 할 수 있다.

### Spring Rest Docs

REST API 문서 생성을 도와주는 도구이다. Swagger와 달리 테스트를 통과한 API만 문서화되기 때문에 안정성을 보장할 수 있다.

### Spring Batch

스프링 배치는 대량의 데이터 처리를 위한 배치 작업을 효율적으로 처리할 수 있는 기능을 제공한다. 대표적으로 대용량 데이터 처리, 트랜잭션 관리, 재시도 기능이 있다.

### Spring Cloud

스프링 클라우드를 사용하면 분산 시스템에서 일부 공통 패턴을 손 쉽게 구현할 수 있도록 도와주는 프레임워크이다. 스프링 클라우드를 사용하여 마이크로 서비스 아키텍쳐 구축을 용이하게 한다. 구성관리, 서비스 발견, 회로 차단자, API 게이트웨이 및 분산 추적과 같은 핵심 기능을 제공한다.

이외에도 많은 기술들이 있다. 다음 링크에 들어가면 스프링이 지원하는 기술들의 OverView를 볼 수 있다.

[Spring Boot - Document](https://spring.io/projects/spring-boot)

다음은 스프링 프레임워크 버전별 설명을 볼 수 있는 사이트이다.

[Spring Framework Versions](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions)

---
### 출처
스프링 공식 문서
