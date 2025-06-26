# 💖 LoveCentage

> 연인 또는 친구 간의 연락 비율, 기념일, 일정을 기록하고 시각화하는 감성 웹 애플리케이션

---

## 📌 프로젝트 개요

**LoveCentage**는 두 사람 사이의 소통을 시각화하고, 특별한 날을 기록하며, 일정 관리를 돕는 감성 기반 웹 서비스입니다.  
연락 비율을 하트로 표현하고, 기념일과 일정을 직관적으로 확인할 수 있습니다.

---

## 💡 주요 기능

### 1. 오늘의 연락 비율 시각화
- 하루 24시간 중 연락이 지속된 시간을 기준으로 퍼센트 계산
- 20시간 이상 연락 시 100%로 설정
- 하트 그래프를 통해 시각적으로 표현

### 2. 기념일 관리 페이지
- 기념일 제목과 날짜를 입력하여 저장
- D-Day 자동 계산 및 D-Day 기준 정렬
- 목록 슬라이드 UI 제공

### 3. 일정 관리 페이지
- 제목, 날짜, 시간, 설명을 입력하여 일정 등록
- 달력 형태 UI 제공
- 일정이 있는 날짜는 점(dot)으로 표시
- 일정 수정 및 삭제 기능
- 일정 전날 자동 알림 기능 (추가기능)

---

## 🧱 프로젝트 구조

```
📁 project-root/
├── index.html              # 메인 페이지 (연락 비율)
├── anniversary.html        # 기념일 페이지
├── schedule.html           # 일정 페이지
├── css/
│   └── style.css           # 전체 공통 스타일
├── js/
│   ├── contact.js          # 연락 비율 관련 스크립트
│   ├── anniversary.js      # 기념일 페이지 기능
│   └── schedule.js         # 일정 페이지 기능
├── server/
│   ├── server.js           # Express 서버 메인 엔트리
│   └── routes/
│       ├── auth.js         # 로그인 및 회원가입 라우터
│       ├── loveData.js     # 연락 데이터 API
│       ├── anniversary.js  # 기념일 API
│       └── schedule.js     # 일정 API
└── data/
    ├── users.json
    ├── loveData.json
    ├── anniversary.json
    └── schedule.json
```

---

## ⚙️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: JSON 파일 기반 로컬 데이터 저장
- **기타 기능**:
  - 하트 퍼센트 그래프 시각화
  - 기념일 D-Day 자동 계산
  - 일정 전날 알림 기능 등

---

## 🚀 시작 방법

1. 레포지토리 클론
   ```bash
   git clone https://github.com/yourusername/lovecentage.git
   ```

2. 서버 실행
   ```bash
   cd server
   npm install
   node server.js
   ```

3. 브라우저에서 실행
   ```
   http://localhost:3000
   ```

---

## 📌 향후 개선 예정

- 로그인 상태 유지 기능 (세션/토큰)
- 연락 그래프 일주일 이상 기간 분석 기능
- 일정 알림 푸시(PWA) 기능 등

---

## 📮 문의

- 제작자: 김보경, 박다은, 홍태민
- 깃허브: bovo22, dada3203, taemin2271
