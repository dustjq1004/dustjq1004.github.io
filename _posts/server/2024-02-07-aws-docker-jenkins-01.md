---
layout: post
title: AWS + Docker + Jenkins 사용하기 (1)
subtitle: AWS EC2에서 Docker 컨테이너를 사용하여 웹 서버를 배포하고, 젠킨스를 사용하여 자동배포 구성하기
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [웹서버]
comments: true
categories: server
---
> 해당 글은 플랫포머 배포 스터디에서 공부한 내용을 정리한 글입니다.

## AWS EC2 인스턴스 생성하기
회원가입시 최초 1년간 무료 프리티어 사용가능
> 주의! 요금 부과가 싫다면 EC2 생성시 public IPv4가 할당되지 않게 설정해야한다.
> 자동으로 IPv4 할당되게 체크가 되어있으니 확인 후 진행할 것

1. 인스턴스 시작하기
2. 인스턴스 생성 정보 폼 작성
    - Name : 인스턴스 이름 (임의 작성)
    - **Application and OS Images (Amazon Machine Image)**
        - Ubuntu로 진행
    - 인스턴스 유형 : t2.micro
        - Jenkins 설정 및 빌드시 부하로 인해 문제 발생 가능
        - 기존 RAM 사용을 올려주어야 한다. Linux Ram Switching
    - 키 페어 생성
        - 필수 : SSH 접속을 위함
        - 생성된 파일은 외부로 유출되지 않게 관리
    - 스토리지 구성
        - 무료는 최대 30GB 까지 구성 이상은 요금 부가
    - 인스턴스 시작 버튼 클릭

## Docker 사용하기

- 도커 컨테이너는 서버에 설치되는 코드, 런타임, 시스템 도구, 시스템 라이브러리 등 설치하여 실행 환경에 상관없이 동일한 환경을 제공한다.
- 기존에 수동으로 했던 Gradle 빌드 작업을 대신해주고 실행시켜준다.

### 1. Docker 설치하기 (Local - Mac)

- docker는 경로와 상관없이 사용가능

**홈페이지 다운로드**

1. 웹사이트 접속 후 `Docker Desktop for Mac with Apple silicon` (M1 or M2 일 경우) 버튼 클릭
    - https://docs.docker.com/desktop/install/mac-install/
2. .dmg 설치 후 실행
3. 회원가입 후 로그인
    1. Docker 앱에서 로그인
    2. 명령어 로그인

**명령어 로그인**

1. `docker login`
2. username, password 입력
   - username : 회원가입할 때 입력했던 정보, 우측 상단 프로필 클릭하면 나옴
![2024-02-07-aws-docker-jenkins-01-picture-01.png](..%2F..%2Fassets%2Fimg%2Fposts%2F2024-02-07-aws-docker-jenkins-01-picture-01.png)

**구글일 경우 비밀번호 설정하기 (비밀번호 모를 경우)**

1. https://hub.docker.com/ 접속
2. 우측 상단 프로필 클릭 - My Account
3. Change Password

**도커 명령어 간단히 알아보기**

`docker ps` : 실행 중인 docker container 목록을 보여준다.

`docker images` : 현재 local에 있는 도커 이미지들을 보여준다.

### 2. Docker 이미지 Build와 Docker Repository에 Push

**Dockerfile 작성하기**

Dockerfile은 Docker 에서 이미지를 생성하기 위한 용도로 작성하는 파일이다.

이미지를 만들기 위한 정보를 기술해 둔 템플릿 같은 개념

```shell
// Dockerfile
FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

- From : Form은 베이스 이미지를 지정하는 지시어. 도커 이미지를 만들 때 완전 무의 상태로 만드는게 아니라, 어느 정도 기본적인 구성 요소들이 갖추어진 상태의 이미지를 토대로 만드는 게 보통인데 이를 베이스 이미지라고 한다.

  `FROM openjdk:11-jdk` 하게 되면 도커 registry에서 openjdk - 11 이미지를 다운로드하여 새로 만들 이미지의 기초가 되도록 구성한다.

- COPY : Host 내에 있는 파일 또는 디렉토리를 컨테이너의 파일시스템으로 복사

  `COPY <src> <dest>`

- ENTRYPOINT : 컨테이너 시작시 실행될 command를 지정한다. shell, exec형태의 command가 가능
- ARG는 변수 선언 키워드다. `ARG 변수명=값` 형태로 변수 지정해서 사용 가능

**Docker image build**

`docker build -t {본인 dockerhub ID}/{dockerHub 레포지토리 name} .` → **도커 설치와 로그인 후 사용**

- 해당 명령어를 실행하면 도커가 Dockerfile을 읽고 이미지를 local에 만든다.

`docker images`

- 만들어진 이미지들 확인 가능

`docker push {본인 dockerhub ID}/{dockerHub 레포지토리 name}`

- 도커 이미지를 도커 원격 서버 저장소에 push한다. 깃허브와 유사한 것을 볼 수 있다.

`docker run -p 8080:8080 mooh2jj/docker-jenkins-github-test`

- 도커를 실행. port=8080, `mooh2jj/docker-jenkins-github-test` 에 있는 최신 이미지 실행

`nohup run -p 8080:8080 mooh2jj/docker-jenkins-github-test 2>&1 &`

- nohup은 사용자 세션이 종료되도 종료되지 않게 백그라운드 실행

`docker ps`

- 컨테이너 실행 상태를 볼 수 있다.

<aside>
💡 도커 이미지 만들 때 주의
빌드시 꼭  DokerHub에 등록된 레포지토리 이름 패턴이랑 똑같이 만들어야 한다.
`docker build -t {본인 dockerhub ID}/{dockerHub 레포지토리 name}`

</aside>

### 3. Docker로 웹서버 실행하기 (AWS EC2 - Ubuntu)

**순서**

1. EC2내에 Docker 설치하기
2. Docker login 하기
3. 도커 컨테이너 실행  

#### 1. **EC2내 Docker 설치하기**

```
# docker 설치
sudo apt-get update && \
    apt-get -y install apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      jq \
      software-properties-common && \
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
      $(lsb_release -cs) \
      stable" && \
   apt-get update && \
   apt-get -y install docker-ce

# 설치 완료 확인, 버전 확인
docker --version
```

#### 2. **Docker login**

`docker login` 명령어 입력

<p style="color:red;">docker sock access permission denied 문제 해결</p>

```
# 1) user 그룹 추가 
# ec2 인스턴스 재시작 이후에도 docker 연결이 될 수 있음!
sudo usermod -aG docker ${USER}

# 그룹에 대한 변경 사항을 활성화
newgrp docker

# docker 재시작 -> 안해도 됨!
# sudo systemctl restart docker

# 로그아웃후 재로그인 혹은 다음명령어 실행
docker login

or

# 2) /var/run/docker.sock 접근 권한 허용
sudo chmod 666 /var/run/docker.sock (비추)

# docker hub 로그인 id/pw 입력
docker login
```

#### 3. Docker 실행하기

```jsx
docker run -p 8080:8080 {본인 dockerhub ID}/{dockerHub 레포지토리 name}
nohup run -p 8080:8080 {본인 dockerhub ID}/{dockerHub 레포지토리 name} 2>&1 &
```
명령어를 입력하면 docker가 원격 저장소에 빌드 된 이미지를 가져와 웹서버를 실행한다.