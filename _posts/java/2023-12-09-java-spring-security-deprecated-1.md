---
layout: post
title: Spring Security - AuthenticationManager, HttpSecurity Deprecated 대응
subtitle: Deprecated 된 메서드 대응하기
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [Spring, deprecated, Spring-Security]
comments: true
categories: java
---
## 스프링 부트 3 백엔드 개발자 되기를 읽고
최근에 책을 읽으며 Spring을 공부하고 있었다. Spring Security로 로그인을 구현하던 중에 Deprecated 이슈가 있었다. 책과 버전을 다르게 진행 했었다.
(책 버전은 ```3.0.2``` 나는 ```3.2.0```으로 진행했다.) 다행히 책 예시가 있는 깃허브에 이슈가 올라와 있어서 크게 해매지는 않았지만 완벽히 해결되지도 
않았고, 이런 이슈는 정리하면 좋을 것 같아 블로그 글을 쓰게 됐다.
- [깃허브 이슈에 올라온 Deprecated 관련 링크](https://github.com/shinsunyoung/springboot-developer/issues/5)

## SecurityFilterChain
Spring Security 설정을 위해 SecurityFilterChain을 위해 HttpSecurity의 메서드 체인을 사용하던 중 deprecated 된 메서드가 많았다. 
WebSecurityConfigurerAdapter도 deprecated가 되고 이유가 궁금했다. 해당 이슈에 대해서 해결책은 깃허브 링크에 나와 있지만 deprecated된 이유를 알고 싶어 
열심히 구글링을 했다. 공식 문서에서 찾은 내용은 람다 형식으로 구성을 하기 위해서 deprecated를 했다고 나와있었다.

그래서 단순히 기존에 있는 내용을 람다 형식으로 구현하면 됐다.
```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http.authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/login", "/signup", "/user")
                    .permitAll()
                    .anyRequest()
                    .authenticated())
            .formLogin(formLogin -> formLogin
                    .loginPage("/login")
                    .defaultSuccessUrl("/articles"))
            .logout(logout -> logout
                    .logoutSuccessUrl("/login")
                    .invalidateHttpSession(true))
            .csrf(csrf -> csrf
                    .disable())
            .build();
}
```
어렵지 않았다. 보통 deprecated가 되면 공식 문서에 이유와 해결방식을 알려주는 경우도 있으니 꼭 확인하자.

## AuthenticationManagerBuilder
기헙 이슈에 올라온 내용들 중 해결되지 않은 것이 있었다. 다른 분이 DaoAuthenticationProvider를 객체 생성해서 빈으로 등록하는 방식으로 올려주시긴 하셨지만,
기존 Builder를 사용할 수 있을 것 같아 더 찾아봤다.

AuthenticationManagerBuilder는 AuthenticationManager타입 Builder 패턴으로 AuthenticationManagerBuilder 타입 구현체를 만든다.
즉 인증관리자 설정을 위한 작업이다. AuthenticationManagerBuilder는 사용자 정보를 가져올 서비스를 재정의 하거나 인증 방법 (LDAP, JDBC)기반 인증 등을 설정할 때 사용한다.


AuthenticationManagerBuilder에서도 and() 메서드가 deprecated가 됐다. 이것 또한 람다 구성을 위해서 deprecated 된 것 같다.
and() 주석을 보면 ```Deprecated For removal in 7.0. Use the lambda based configuration instead.```라고 적혀있다.

```java
@Bean
public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder,
                                                   UserDetailService userDetailService) throws Exception {
    AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
    authBuilder.userDetailsService(userDetailService)
            .passwordEncoder(bCryptPasswordEncoder)
    return authBuilder.build();
}
```
그래서 authBuilder 객체를 변수에 담아 놓고 build() 메서드를 호출하도록 변경했다.

---

