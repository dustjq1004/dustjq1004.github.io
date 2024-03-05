---
layout: post
title: 외부 설정 (feat 인프런 강의)
subtitle: 동기와 비동기의 차이에 대해서 알아보자
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [spring]
comments: true
categories: java
---

> 외부 설정이란?
> 다른 서버 환경에 맞게 외부 설정 값들을 관리할 수 있게 하는 기능

외부 설정이 필요한 이유는 시스템이 구동되는 환경마다 값이 달라질 수 있기 때문이다. DB연결에 필요한 url, id, pw 혹은 통신을 위한 Key 값들 등을 의미한다. 코드에 포함되지 않아야 하고(수정되지 않고 고정 값이기 때문에) 공개 되면 안되는 값들을 외부(OS, Java 시스템 설정, 파일) 설정을 이용해 값을 밖에서 가져와서 사용한다. 스프링에는 profile이라는 라이브러리를 지원한다.

- profile 별 파일 분리
- profile 별 그룹 기능
- 공개할 수 없는 주요 정보(비밀키 등)를 관리하고 보안 유지
- 환경 예시
    - 개발 환경과 운영 환경
    - DB와 서버 환경

## 과거 빌드 방식에 대한 번거로움

> 스프링이 앱 개발의 편리성 향상과 개발 속도 향상에 많은 이점을 주는 것을 생각한다. 과거 번거로웠던 일련의 작업들을 알아보면 스프링의 장점을 크게 알 수 있다.
>

### 1. 환경에 맞는 설정 값을 넣어 애플리케이션을 빌드하는 방식

예) 두 개의 jar 파일을 만든다.

- 개발_app.jar
- 운영_app.jar

### 단점

- 환경에 따라서 여러번 빌드하는 번거로움이 있다.
- 개발 버전과 운영 버전의 빌드 결과물의 차이
    - 개발용 빌드, 검증 후에 운영용 빌드를 해야 한다.
      그 사이에 다른 사람이 코드를 변경한다면 ? 같은 소스 코드인지 검증하기 어려워진다.
- 향후 다른 환경이 필요하였을 때 기존 빌드는 적용하기 어렵다. 프로젝트 이식성이 낮아진다.

### 2. 환경에 따라 변하는 설정값을 실행 시점에 주입 (외부 설정)

- 배포 환경과 무관한게 빌드는 한번만 한다. `app.jar`
- 설정 값은 외부에서 설정하고, 실행 시점에 환경에 설정된 값을 주입한다.

**변경되는 것과 변경되지 않는 것에 분리**

- 유지보수하기 좋은 애플리케이션의 기본 원칙이다.
- 환경에 따라 변하는 설정 값은 분리한다.
- 같은 기능인 빌드 과정은 한 번으로 줄인다.

## 외부 설정

### 외부 설정 방식

1. OS 환경 변수
    - OS에서 지원하는 외부 설정, 해당 OS를 사용하는 모든 프로세스에서 사용
2. 자바 시스템 속성
    - 자바에서 지원하는 외부 설정, 해당 JVM안에서 사용
3. 자바 커멘드 라인 인수
    - main(args) 인수
4. 외부 파일
    1. data/hello.txt
        - 개발 : url=dev.db.com
        - 운영 : url=prod.db.com
       
```
OS별 환경 변수 설정 명령어
- MAC, 리눅스 OS : printenv
- 윈도우 : set
```

## 자바

### 1. 환경 변수 값 읽기

```jsx
public class OsEnv {
    public static void main(String[] args) {
        Map<String, String> envMap = System.getenv();
        for (String key : envMap.keySet()) {
            log.info("env {}={}", key, System.getenv(key));
        }
    }
}
```

- 하지만 OS 환경 변수는 이 프로그램 뿐만 아니라 다른 프로그램에서도 사용할 수 있다. 전역 변수 같은 효과이기 때문이다. 하지만 자바 프로그램 안에서만 사용하는 외부 설정 값을 사용하고 싶을 때도 있다. 이러한 경우 자바 시스템 속성을 이용한다.

### 2. 자바 시스템 속성

JVM 안에서만 접근 가능한 외부 설정이다. 자바 내에서만 사용할 수 있다.

```jsx
public class JavaSystemProperties {
    public static void main(String[] args) {
        Properties properties = System.getProperties();
        for (Object key : properties.keySet()) {
            log.info("prop {} = {}", key, System.getProperty(String.valueOf(key)));
        }
    }
}
```

- 자바 코드는 -D 옵션을 사용해서 설정할 수 있다.
- java -Durl=devdb -Dusername=dev_user -Dpassword=dev_pw -jar app.jar

자바 코드로도 설정 할 수 있다.

```java
System.setProperty(propertyName, “aa”)
System.getProperty(propertyName)
```

### 3. 커맨드 라인 인수

java -jar app.jar dataA dataB

필요한 데이터를 마지막 위치에 스페이스로 구분해서 전달한다.

### 4. 커맨드 라인 옵션 인수

스프링에서는 커맨드 라인 수를 key=value 형식으로 편리하게 사용할 수 있게 표준을 만들었다.

- dash 2개 — 를 사용하며 key=value 형식으로 값을 가져올 수 있다.
    - —key=value 형식
    - —url=dev —username=user

**커맨드 라인 옵션 인수와 스프링 부트**

```jsx
public class CommandLineBean {

    private final ApplicationArguments arguments;

    public CommandLineBean(ApplicationArguments arguments) {
        this.arguments = arguments;
    }

    @PostConstruct
    public void init() {
        log.info("source {}", List.of(arguments.getSourceArgs()));
        log.info("optionNames {}", arguments.getOptionNames());
        Set<String> optionNames = arguments.getOptionNames();
        for (String optionName : optionNames) {
            log.info("option args {}={}", optionName, arguments.getOptionValues(optionName));
        }
    }
}
```

- `arguments.getOptionNames()`로 key 값들을 Set<String> 으로 가져올 수 있다.
- `arguments.getOptionValues(optionName)` key 값을 매개변수로 값을 가져올 수 있다.
- 스프링 부트는 커멘드 라인을 포함해서 커멘드 라인 옵션 인수를 ApplicationArguments 에 저장하고 스프링 빈으로 등록 한다.

## 스프링

지금까지 봤던 방법들은 모두 key-value 형식으로 데이터를 받고 있다. 그래서 스프링은 각자 다른 방식을 통합하여 어디서 설정했던 데이터인지 상관없이 데이터를 모두 합해서 가져올 수 있게 만들었다.

- Environment, PropertySource

### Environment

- 특정 외부 설정에 종속되지 않고, 일관성 있게 key=value 형식의 외부 설정에 접근할 수 있다.
- 외부 설정은 Environment를 통해서 조회하면 된다.

```jsx
public class EnvironmentCheck {

    private final Environment env;

    public EnvironmentCheck(Environment env) {
        this.env = env;
    }

    @PostConstruct
    public void init() {
        String url = env.getProperty("url");
        String username = env.getProperty("username");
        String password = env.getProperty("password");
        log.info("env url={}", url);
        log.info("env username url={}", username);
        log.info("env password url={}", password);
    }
}
```

- application.properties, application.yml 도 PropertySource에 추가된다.

### 우선순위

1. 커멘드 라인 옵션 인수
2. 자바 시스템 속성 실행
- 더 유연한 것이 우선권을 가진다.
  (변경하기 어려운 파일 보다 실행시 원하는 값을 줄 수 있는 자바 시스템이 우선권을 가진다)
- 범위가 넒은 것 보다 좁은 것이 우선권을 가진다.

외부 설정은 파일을 관리해야하는 단점이 있다. 서버가 10대면 파일이 10개다.

설정 파일은 변경 이력을 확인하기 어렵고, 변경이력이 프로젝트 코드에 어떤 영향을 주는지 파악하기 힘들다. 그래서 서버 환경 별 설정 데이터 모두 애플리케이션 코드와 함께 넣고 빌드시 구별해서 사용하게 한다.

## **내부 설정 데이터(파일) - 흔히 쓰는 방식**

> application.properties, application.yml
스프링을 처음 배울때 부터 이 방식으로 빌드할 것이다.
>
1. 프로젝트 안에 소스 코드 뿐만 아니라 각 환경에 필요한 설정 데이터도 함께 포함해서 관리한다.
2. 빌드 시점에 개발, 운영 설정 파일을 모두 포함해서 빌드
   주의 → 소스코드 형상관리를 Github와 같은 Public 또는 Private이라도 외부 업체를 이용할 경우 Secret Key가 포함되지 않도록 주의해야한다.
3. app.jar는 개발, 운영 두 설정 파일을 모두 가지고 배포된다.
4. 실행할 때 외부 설정으로 넘어온 프로필 값이 dev라면 application-dev.properties를 읽고 prod라면 application-prod.properties를 사용한다.

### 내부 파일 분리

파일의 변경 사항을 배포한다. 설정 파일을 jar에 포함시켜서 관리한다.

- 개발 : application-dev.properties
- 운영 : application-prod.properties
- 실행 시점 구분 (에시)
    - 개발 → dev
    - 운영 - prod
    - 스프링은 프로필을 넘겨서 제공
    - 프로필 = dev → dev.properties
    - 프로필 = prod → prod.properties

### **프로필**

spring.profiles.active  외부 설정에 값을 넣으면 스프링은 값과 일치하는 프로필을 사용한다.

- spring.profiles.active = dev
- spring.profiles.active = prod

### 내부 파일 합체

분리된 내부 파일을 하나로 합칠 수 있다.

### 우선순위

프로필에 설정 없이 실행하면 프로필은 default 값으로 적용 된다.

default로 지정 하거나 맨위에 spring.config.activate.on-profile 값을 설정 하지 않은 하위 설정 값들이 사용 된다.

1. 프로필 기준 값이 우선이 된다.
2. 같은 key값이 적용 된다면 아래에 있는 설정이 위에 있는 설정을 덮는다.

## 전체 우선순위 (맨 아래가 우선순위가 높음)

1. 설정 데이터 (application.properties)
2. OS 환경 변수
3. 자바 시스템 속성
4. 커맨드 라인 옵션 인수
5. @TestPropertySource(테스트용도)

### 설정 데이터 파일 우선순위

- jar 내부 application.properties
- jar 내부 application-{}.properties
- jar 외부 application.properties
- jar 외부 application-{}.properties
- 더 유연한 것이 우선권을 가진다.
  (변경하기 어려운 파일 보다 실행시 원하는 값을 줄 수 있는 자바 시스템 속성 우선)
- 범위가 넒은 것 보다 좁은 것이 우선권을 가진다.
- OS 환경변수보다 자바 시스템 변수가 우선권을 가진다.
