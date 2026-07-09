# 작업 진행 상황

포트폴리오 사이트 (Vite + React) 작업 로그. 최신 날짜가 위로 오도록 정리.

---

## 2026-07-09

컴퓨터 크래시로 저장 못 하고 종료된 이전 세션 복구로 시작. 실제 파일 상태 확인 결과 About Me 마퀴 이미지 6장 / What I Do 커서 이미지 4장 / 송도맥주축제 / 모두의러닝(→지피티코리아 디자인으로 교체) 전부 이미 완성되어 있었음(PROGRESS.md만 기록이 안 됐던 상태). 이후 태블릿(1024px)·모바일(768px) 반응형 작업을 본격적으로 진행.

### GNB / Footer
- GNB: `Visual` 메뉴 항목 제거
- Footer "LET'S WORK TOGETHER." 패럴랙스 리빌 버그 수정 — 기존엔 전체 페이지 스크롤 길이 대비 마지막 15% 구간(`ARRIVE_START_PAGE_PROGRESS`)을 기준으로 삼아서, 포트폴리오 등 긴 섹션들 때문에 그 구간 대부분이 푸터가 화면에 보이기도 전에 소진되어 애니메이션이 거의 안 보이는 문제가 있었음 → 푸터 엘리먼트 자신의 진입 시점(`getBoundingClientRect` 기반) ~ 최대 스크롤 지점을 기준으로 재계산하도록 수정, 실제 스크롤 구간 전체가 리빌에 쓰이게 됨

### Motto 섹션 튜닝
- 우측 이미지(`me.png`) 패럴랙스 배율: `0.4 → 0.15 → 0.25`(최종) — 강도 왕복 튜닝 후 중간값으로 확정
- 텍스트 컬러 리빌 완료 지점(`REVEAL_END_RATIO`): `0.25 → 0.45 → 0.6 → 0.52`(최종)
- 패럴랙스 이동거리 버그 수정 — `scrolledPast` 값에 상한이 없어서 섹션이 길어질수록(텍스트 줄바꿈 많아지는 태블릿 등) 이미지가 무한정 위로 밀려 하단 여백이 포트폴리오와 어긋나 보이던 문제 → `vh` 상한 적용으로 해결

### Hero 재등장 애니메이션 — 시도 후 롤백
Visual/What I Do 텍스트가 스크롤로 벗어났다 돌아오면 다시 재생되게 하는 기능을 IntersectionObserver로 구현했으나(히스테리시스 처리까지 포함), 스크롤 관성(모멘텀) 정착 구간에서 버벅임이 계속 발생 → 사용자 요청으로 기능 전체 롤백, 최초 1회 재생 방식으로 원복.

### Hero 코너 로고 실험 — 시도 후 롤백
"Hello, Aladin" 옆 인라인 로고를 제거하고 우측 상단에 화면 밖까지 걸치는 큰 장식 로고(기울기 없음, overflow:hidden으로 크롭)로 교체하는 실험을 했으나 사용자 요청으로 완전히 원복. 이후 별도로 진행한 모바일 로고 작업(아래 참고)과는 무관.

### 태블릿(1024px) 반응형
- Motto: 이미지 컬럼 비율 `7:3 → 8:2 → 7.5:2.5`(최종), 그리드 스택 안 되게 유지(PC처럼 사이드바이사이드 유지 요청)
- Hero: `--fs-hero-impact` 클램프 하한 `80px → 90px`(태블릿에서 너무 작아 보이던 것 보정), `min-height: 72vh` 시도했다가 하단이 패럴랙스라 어색하다는 이유로 롤백(100vh 유지)
- Portfolio 상세페이지 "관련 프로젝트" 하단 바 — 기존 데스크톱 전용이었던 것을 태블릿에도 노출, 이미지/폰트 사이즈 소폭 확대
- Portfolio 섹션 `padding-top`: 다른 섹션(96px)과 안 맞던 것을 `32px → 96px`로 통일

### 모바일(768px) 반응형 — 섹션 공통
- 4개 섹션(Motto/Portfolio/WhatIDo/AboutMe) 상단 구분선: `© PORTFOLIO 2026` 라벨 숨김, 나머지 2개(섹션명/번호)만 좌우 배치. AboutMe는 모바일 전용 처리가 아예 없었어서 이번에 신규 추가
- `DIVIDER_LABELS[1]` 전체 섹션에서 괄호+부제 제거, 섹션 이름만 남김(예: `(MOTTO — DESIGN PHILOSOPHY)` → `MOTTO`) — 데스크톱에도 공통 반영되는 상수라 양쪽 다 적용됨
- WhatIDo/AboutMe 세로 패딩 `96px 0 → 60px 0`, Portfolio는 상하 각각 `padding-top`(96px, 위 항목) + `padding: 60px 0`로 재정리
- Motto/Portfolio 구분선 `margin-bottom`을 각각 84px/96px → 40px로 축소

### 모바일 — Motto
- 이미지 최대폭 `360px → 240px → 200px`(단계적 축소), 이미지-텍스트 간 `gap: 48px → 38px`
- 타이틀 텍스트를 데스크톱과 다른 모바일 전용 4줄 버전으로 새로 작성: "좋은 디자인은" / "긍정적인 경험 을" / "지속 가능한 환경 으로" / "만들 수 있다고 믿습니다." — 단순 재줄바꿈이 아니라 문구 자체가 짧아진 버전이라, 스크롤 연동 컬러 리빌·형광펜 하이라이트 로직을 데스크톱과 독립적으로(같은 스크롤 progress 공유, 각자 글자 수에 맞게 스케일) 새로 구성. 두 버전 다 DOM에 렌더링해두고 CSS로 표시 전환(Hero 헤드라인과 동일 패턴)
- (중간 시도) 원래 3줄 텍스트를 그대로 두고 `.line`을 `inline`으로 바꿔 자연스럽게 줄바꿈되게 했었으나, 형광펜이 항상 줄 시작이라고 가정한 마이너스 마진 트릭이 줄 중간에 형광펜이 오면서 깨짐 → 위의 "모바일 전용 4줄 재작성"으로 대체되며 함께 해결됨
- 형광펜 뒤 "을"/"으로"가 겹쳐 보이던 문제 — 형광펜과 다음 글자 사이에 띄어쓰기 추가로 해결(데스크톱 원문과 동일한 패턴)

### 모바일 — Hero
- 헤드라인 2줄 → 3줄로 분리: "Hello, Aladin" / "Designer" / "Portfolio." (데스크톱은 2줄 그대로, CSS로 표시 전환)
- 폰트 크기: 고정 `36px` → 데스크톱과 동일한 `cqw` 유동 방식(`clamp(42px, 15cqw, 76px)`)으로 전환, `line-height`도 모바일 전용 토큰(1.18) 추가
- 텍스트 가운데 정렬로 변경
- 로고 처리 — 여러 방식 시도 끝에 최종안 확정:
  1차: 로고를 "Aladin" 텍스트 위로 띄우는 방식 → 2차: 배경 레이어로 옮기고 패럴랙스 + `backdrop-filter`로 가독성 보정하는 방식(둘 다 시도 후 전체 롤백) → **최종**: 데스크톱과 동일한 하나의 `<img>` 엘리먼트를 그대로 두되, 모바일 미디어쿼리에서 `position:absolute`로 전환해 캡션 텍스트 바로 아래(캡션과 안 겹치게, `.inner` 기준 `top:100%`)로 슬라이드업 등장하도록 처리. 사이즈는 기존의 약 2.27배, 헤드라인 3줄이 다 끝난 뒤 등장. 기울기(`rotate(-12deg)`)는 모바일 버전에는 원래 없었고, 이후 사용자 요청으로 **PC 버전 로고의 기울기도 완전히 제거**함
- 서브텍스트: `<br>` 위치를 "완성" 뒤 → "하는" 뒤로 이동, 폰트는 한 단계 낮췄다가(H3→Body) 다시 원복(H3)

### 모바일 — What I Do
- `(04)` + 점 배지 제거
- 하단 아이템 리스트에서 번호(01~04) 제거, category/point를 `1fr / auto` 그리드로 좌우 배치(space-between 효과)
- 라벨-설명 영역 `row-gap: 4px → 8px`, 아이템 세로 패딩 `16px → 20px`(아이템 간 여백 +8px)
- 타이틀-아이템 리스트 `margin-bottom: 64px → 40px`

### 기타
- AIWEB 상세페이지 캐러셀 마지막 CTA 슬라이드("Works." / "더 보러가기 +") 배경색(`#fafafa`) 제거
- 파비콘을 사용자 제공 PNG(`favicon.png`)로 교체
- About Me 마퀴 이미지 파일명 `layout.png → book.png` 변경, 실제 픽셀 비율(333:453, 세로형)로 `aspectRatio` 수정(기존 `3/2`는 가로형 값으로 잘못 남아있던 것), alt 텍스트를 "도널드 노먼의 디자인과 인간 심리"로 수정

## 2026-07-08

### 서브 프로젝트 클릭→상세페이지 확인 완료
지난 세션에서 반영만 하고 브라우저 확인이 안 됐던 부분(포켄스 메가위크/국민은행 제안서/영수증 프로세스 등 서브 카드 클릭 시 상세페이지 오픈) — 이번 세션에서 각 프로젝트에 실제 콘텐츠를 채우고 반복 확인하는 과정에서 정상 동작 확인됨. 별도 이슈 없음.

### 영수증 프로세스 상세페이지 — 인트로 + 섹션 3개 + CTA 완성
- 인트로(visual `works/aiapi/visual.png` / subtitle "프로세스 효율화" / body / meta) 실제 콘텐츠로 교체
- `detail.sections`에 문제 발견(discover.png) → 문제 정의(problem.png) → 문제 해결(solution.png) 3개 섹션 추가, 전부 인터뷰 카드·AS-IS/TO-BE 플로우 다이어그램이라 `flat: true` 적용
- `cta: {}` 추가 — 웹 링크 없이 "목록으로 돌아가기" Secondary 버튼만 렌더링 (책나무와 동일 패턴)

### 신규 패턴: 라벨/타이틀/본문 없는 "이미지만" 섹션
- 포켄스 메가위크/국민은행 제안서 상세페이지에서 "인트로 아래 이미지 여러 장만 세로 나열"이 필요해서 신규 지원
- `ProjectDetail.jsx`: `detail.sections` 항목에서 `label`/`title`/`body`가 전부 없으면 `.infoText` 블록 자체를 렌더링하지 않도록 조건 분기 (`hasText` 체크)
- `Portfolio.module.css`: 텍스트 없는 섹션은 `.infoImage`의 image→text용 68px `margin-bottom`이 의미 없어서, `.infoImageOnly` 모디파이어로 0 처리. 다음 요소와의 간격은 `.infoSection` margin-top(16px) + `.detail`의 flex gap(48px) = 64px로, CLAUDE.md 기본 섹션-섹션 간격 규칙과 자연스럽게 일치
- 이 패턴은 앞으로 이미지 나열형 서브 프로젝트에 재사용 가능

### 포켄스 메가위크 (`promotion-pokemon-megaweek`) — 인트로 + 갤러리 + CTA 완성
- 인트로(visual/subtitle "Promotion Design"/body/meta) 실제 콘텐츠로 교체
- 인트로 아래 이미지 갤러리(라벨/타이틀/본문 없음, gap 12px, `flat: true`) 추가: `01.png` → `02.png` → `03.png` → `full.png` (처음엔 `full.png`를 맨 앞에 뒀다가 사용자 피드백으로 맨 뒤로 정정)
- `cta: {}` 추가 — "목록으로 돌아가기" 버튼

### 국민은행 제안서 (`promotion-nps-proposal`) — 오타 수정 + 인트로 + 갤러리 + CTA 완성
- 타이틀 오타 수정: "국미은행 제안서 디자인" → "국민은행 제안서"
- 인트로(visual/subtitle "Promotion Design"/body/meta) 실제 콘텐츠로 교체
- 이미지 갤러리(같은 방식): `01.png` → `02.png` → `full.png`
- `cta: {}` 추가 — "목록으로 돌아가기" 버튼

### 참고 — `full.png` 배치 규칙
포켄스/국민은행 두 프로젝트 모두 `full.png`(주석 없는 전체 페이지 원본)는 **갤러리 맨 마지막**에 위치. 앞쪽 번호 이미지(01/02/03)는 주석이 달린 설명용 크롭 이미지.

---

## 2026-07-07

### 투어버스 서비스 상세페이지 — 완성
AIWEB에서 확립한 `sections`/`retro`/`cta` 패턴 그대로 채움. 인트로(visual/subtitle/body/meta) → 문제 발견(problem01.png) → 문제 정의(problem02.png, User Journey Map이라 `flat: true`) → 시안 작업(solution01.png, `flat: true`) → 문제 해결(solution02.png, `flat: true`) → 회고(`/works/bus/tobe.png`) → CTA(webHref: `https://www.easytaxfree.co.kr/`). Portfolio 목록 카테고리 라벨 "Service Design" → "Product Design"으로 변경.

### 책나무 디자인가이드 + MCP 상세페이지 — 진행 중
인트로(visual/subtitle "Platform"/body/meta) → 문제 정의(problem.png) → 문제 해결(solution.png, `flat: true`) → 디자인 가이드(design01.png+design02.png, 세로 나열) → Figma to Mcp(mcp.png, `flat: true`) → 결과(tobe.png, `flat: true`) → CTA(webHref 없이 "목록으로 돌아가기"만) 까지 완성. 나머지 내용(있다면)은 다음 세션에 이어서.

**신규: 섹션 다중 이미지 지원 (`section.images`)**
- 기존 `detail.sections` 항목은 이미지 1장(`image`)만 지원했는데, "디자인 가이드" 섹션에서 2장을 세로로 12px 간격으로 나열해야 해서 확장함
- `ProjectDetail.jsx`: `(section.images ?? [section.image]).map(...)`로 배열/단일 필드 모두 지원 (기존 단일 이미지 섹션은 그대로 동작)
- `.infoImage`(Portfolio.module.css)에 `display:flex; flex-direction:column; gap:12px` 추가 — 이미지 1장일 때는 gap이 아무 영향 없어서 기존 섹션들 스타일 그대로 유지됨

**CTA 버튼 유연화**
- `detail.cta.webHref`가 없으면 "웹 보러가기" Primary 버튼을 아예 렌더링하지 않도록 `ProjectDetail.jsx` 수정 (라이브 URL이 아직 없는 프로젝트용). "목록으로 돌아가기" Secondary는 항상 렌더링됨

### Portfolio 카드 순서 변경
서브 프로젝트 순서를 영수증 프로세스 → 포켄스 메가위크 → 국민은행 제안서 순으로 변경 (CLAUDE.md에 적힌 고정 순서에서 사용자 요청으로 예외 적용).

### 진행 중이던 작업 — 다음 세션에 이어서 할 것
서브/서브-이미지온리 프로젝트(포켄스 메가위크, 국민은행 제안서, 영수증 프로세스, 송도맥주축제, 모두의러닝) 5개도 클릭 시 상세페이지가 열리도록 구조를 확장하는 중이었음:
- `ProjectCard.jsx`의 `SubCard`를 `<div>` → `<button onClick={onOpen}>`으로 변경 (MainCard와 동일한 클릭 패턴)
- `Portfolio.jsx`의 `MAIN_PROJECTS` 필터 제거, `displayProject`를 전체 `PROJECTS`에서 찾도록 변경
- `projects.js`의 5개 서브 프로젝트 항목에 더미 `detail: { subtitle, body, meta }` 추가 (visual은 별도 지정 안 함 → `ProjectDetail.jsx`가 자동으로 `project.image`(카드 썸네일)로 폴백)
- 위 코드/데이터 변경은 이미 반영됐고 lint(`oxlint`)도 통과했지만, **브라우저에서 직접 클릭해서 정상 동작하는지 확인은 아직 안 됨** — 다음 세션 시작 시 제일 먼저 확인할 것
- 실제 콘텐츠(문제 정의/역할/과정/결과 등)는 사용자가 단계적으로 추가할 예정이므로 지금은 더미 상태로 유지

## 2026-07-04

### AIWEB 프로젝트 상세페이지 — 재사용 가능한 섹션 패턴 확립
오늘 AIWEB 상세페이지를 처음부터 끝까지 채우면서 만든 구조가 **내일부터 투어버스 서비스 등 나머지 메인 프로젝트에도 그대로 반복 적용할 규칙**임. `src/data/projects.js`의 `aiweb-redesign` 항목이 실제 예시.

**섹션 순서 (확정)**
Renewal 인트로(비주얼 이미지+Year/Company/Role) → 문제 정의 → UX 리서치 → 문제 해결(이미지+텍스트) → 성과 지표(이미지+텍스트) → 캐러셀(클라이언트 포트폴리오 Swiper + 자체 텍스트) → 회고 → 마지막 CTA 버튼 2개

**`detail.sections` 배열 — 이미지+라벨+타이틀+본문 반복 섹션용**
- 각 항목: `{ id, image, label, title, body, flat? }`
- `ProjectDetail.jsx`가 `.map()`으로 렌더링, 클래스는 전부 공용 재사용: `.infoSection`(래퍼) → `.infoImage`+`.infoImg`(이미지, radius 6px) → `.infoText`(텍스트 박스) → `.infoLabel`/`.infoTitle`/`.infoBody`
- `flat: true`를 주면 `.infoImg` 대신 `.infoImgFlat`(radius 없음) 사용 — 사진이 아니라 "이미 완성된 다이어그램"류 이미지용 (예: solution.png)
- 문제 해결/성과 지표도 결국 이 배열의 항목일 뿐(이미지가 텍스트보다 먼저 오는 동일 패턴)

**⚠️ 버그로 배웠던 것 — `.infoText`는 `max-width`만으로는 안 됨**
`.infoText { max-width: 800px; margin: 0 auto; }`만 쓰면, flex 아이템의 cross-axis auto margin이 stretch를 무력화시켜서 **박스가 800px까지 안 늘어나고 내용물 크기만큼만 hug됨** (텍스트 짧은 성과 지표에서 364px로 측정되며 발견). 반드시 `width: 100%`를 같이 줘야 함 — `width: 100%; max-width: 800px; margin: 0 auto;`. 앞으로 800px 텍스트 컬럼 만들 때마다 이 조합 그대로 쓸 것.

**간격 규칙 (확정)**
- 섹션-섹션 전환: `.infoBody`의 `margin-bottom: 120px`(오늘 80→120으로 확대) + 다음 섹션 `.infoSection`의 `margin-top: 16px` + 부모 `.detail`의 `gap: 48px` = **184px** 고정
- 섹션 내부: 이미지→텍스트 68px, 라벨→타이틀 10px, 타이틀→본문 24px

**캐러셀 (`detail.carousel`, `SolutionCarousel.jsx`)**
- Swiper 라이브러리 신규 도입 (`npm install swiper`), 커스텀 상단 바(타이틀 "Works." + 좌우 화살표)로 `swiperRef.current.slidePrev()/slideNext()` 직접 제어 (Swiper 기본 네비게이션 UI는 안 씀)
- 슬라이드 높이를 카드마다 맞추려면 `.swiper-wrapper{align-items:stretch}` + `.swiper-slide{height:auto}`를 `:global()`로 명시적으로 걸어줘야 함 (기본값 `height:100%` 체인이 실제로는 hug되는 경우가 있어서 이렇게 오버라이드함)
- 마지막 슬라이드(CTA "Works" / "더 보러가기 +")는 `<a>` 태그가 아니라 순수 `<div>` (링크 제거함, hover 크로스슬라이드 효과만 CSS로 유지)
- `label`/`title`/`body` 필드를 캐러셀 자체에도 추가해서, Swiper 아래에 `.infoText` 재사용 텍스트 블록을 붙임

**마지막 CTA 버튼 2개 (`detail.cta`)**
- 좌: Secondary("목록으로 돌아가기", 기존 `onClose` 재사용) / 우: Primary("웹 보러가기", 새 탭 링크)
- 두 버튼 `width: 220px`로 통일, `font-weight: 500`(가이드 기본 600에서 한 단계 낮춤), Secondary 테두리는 `--color-text-muted`(연하게, 가이드 기본 `--color-text-main`에서 변경)
- Primary hover는 색 어둡게만 (`translateY` 위로 뜨는 효과는 제거함 — 가이드 기본 스펙에서 의도적으로 뺀 부분)

**Portfolio 상세페이지 열기/닫기 스크롤 버그 수정**
- 기존엔 상세페이지를 "열 때"만 Portfolio 섹션 상단으로 스크롤했음. 상세페이지가 길어지면서, "닫을 때" 스크롤 위치를 보정 안 해서 그리드로 돌아가면 Footer 쪽으로 떨어지는 문제 발견 → 열기/닫기 양쪽 다 Portfolio 섹션 상단으로 스크롤하도록 수정 (`Portfolio.jsx`, 최초 마운트 시에는 실행 안 되게 가드)

**신규: 우측 하단 "맨 위로" 버튼**
- `src/components/ScrollTopButton/` 신규 컴포넌트, 사이트 전역(App.jsx 레벨) 적용
- 400px 이상 스크롤 시 페이드인, 클릭 시 Lenis로 최상단 스크롤
- 원형(radius 50%) — 가이드의 6px 버튼 규격과 다른 의도적 예외 (커스텀 커서 원처럼 아이콘 전용 유틸리티로 분류)

**시도했다가 되돌린 것**
- "AIWEB 상세페이지 열려있을 때 Portfolio 외 다른 섹션(Hero/Motto/What I Do/About/Footer) 전부 숨기기" 기능을 구현했다가, 새로고침 시 Hero가 계속 노출되는 버그가 발견되어 **전체 되돌림**. 관련 코드 전부 제거 확인함 (App.jsx, Portfolio.jsx, 각 섹션 컴포넌트, global.css 전부 원상복구). 다시 시도할 경우 처음부터 새로 설계할 것 — 어설프게 재활용하지 말 것.

### 전체 코드 점검 (감사) 결과 — 아직 안 고친 것들
어제~오늘 사이 전체 코드 점검을 한 번 진행함 (색상/폰트/spacing 토큰, 반응형, 애니메이션, 미사용 코드). 그중 실제로 고친 건 미사용 파일 삭제(`SectionPlaceholder/`, `intro.mp4`)뿐이고, 아래는 **아직 미해결 상태로 남아있음**:
- **폰트 패밀리 가이드 위반**: 가이드 표 기준 H3 스케일은 Pretendard(Body/UI)여야 하는데, `.infoTitle`(AIWEB 각 섹션 타이틀), `.titleIndex`/`.category`(What I Do), `.detailFieldLabel` 전부 A2Z(Headline)로 되어 있음. 오늘 AIWEB 작업에서도 그대로 이어받아 씀 — 내일 투어버스 작업 시 같은 패턴을 그대로 복제하게 되므로, 고칠 거면 지금 손대는 게 나음.
- Portfolio 플레이스홀더 색상(`#fafafa`, `#d6d6db`)이 Portfolio/AboutMe/WhatIDo 3곳에 토큰 없이 중복
- About Me 마퀴 이미지 6장, What I Do 커서 이미지 4장 여전히 placeholder(`image: null`)
- 나머지 항목은 지난 감사 대화 기록 참고 (이 파일엔 실제로 변경된 것 위주로만 남김)

## 2026-07-03

### Portfolio 섹션
- 카드가 그리드 밖으로 삐져나가던 버그 수정 (grid item에 `min-width: 0` 누락이 원인 — 긴 타이틀 텍스트가 트랙을 밀어냄)
- 프로모션 디자인 1건 → **포켄스 메가위크** / **국민연금 제안서 프로모션디자인**(현재 타이틀은 **국미은행 제안서 디자인**) 2건으로 분리
- 송도맥주축제/싱어미닛 1건 → 2건으로 분리, 싱어미닛은 이후 타이틀 **모두의러닝**(라벨: 랜딩페이지)으로 변경
- 카드 디자인 통일 (main/sub 구분 없이 보더·패딩 제거, hover 시 살짝 떠오르는 효과 공통 적용), `01`/`02` 순서 번호 라벨 제거
- 카드 썸네일 비율 정사각형 → 최종 **640:520**으로 확정
- 상단 구분선 라벨 3개 정렬을 `justify-content: space-between` 대신 `grid(1fr auto 1fr)`로 변경 (가운데 라벨이 좌우 텍스트 길이에 따라 밀리던 문제 수정)
- 서브 카드 설명 문구(placeholder) 전부 제거 → 카테고리 라벨 + 타이틀만 노출
- **실제 썸네일 연결**: `public/works/{aiweb,bus,book,promotion01,promotion02,aiapi,beer,modo}/sum.png`
  - 연결 과정에서 `ProjectCard`/`ProjectDetail`가 애초에 `project.image` 값을 전혀 확인하지 않고 항상 placeholder만 그리던 걸 발견 → 이미지 유무 분기 로직(`ProjectImage`) 신규 추가
- 타이틀/라벨 수정: 책나무 → **책나무 디자인가이드 + MCP** / 라벨 **Design System / Figma to MCP**, 영수증 프로세스 간소화 → **영수증 프로세스** / 라벨 **A to Z 배포**, 송도맥주축제 라벨 **Design & Publishing**
- 상세페이지 전환 방식을 전체화면 오버레이 → 폴드(fold) 전환 → **다시 원래의 섹션 내부 fade in/out 방식으로 최종 복구** (마지막 요청 기준 확정)
- 메인 프로젝트 상세페이지의 큰 비주얼 이미지는 사용자가 별도 제작 예정 — 현재 placeholder 유지

### What I Do 섹션 (신규)
- 상단 라벨 3개 + "What I Do" 대형 타이틀(중앙 정렬, `clamp(48px, 10vw, 140px)`), `(04)` + 점 장식은 타이틀 우측 상단 superscript 배지로 배치
- 타이틀 글자별 stagger 등장 애니메이션 — 스크롤로 섹션 진입 시(IntersectionObserver) 트리거, 히어로보다 느린 리듬으로 조정
- 4개 항목 테이블(카테고리 / 세부항목 / 설명 / 번호, 비율 2:1.5:5:1.5), 각 행 설명 문구 실제 카피로 채움
- 행에 마우스오버 시 커서 근처에 고정 크기(200×240px, 비율 5:6) 이미지 박스가 나타나고, 다른 행으로 옮기면 위/아래로 교차 슬라이드. 1024px 이하에서는 비활성화
- (버그 수정) `grid-area`를 `grid-template-areas` 없이 단독으로 지정해서 컬럼이 전부 겹치던 문제 → 데스크톱은 auto-placement로, `grid-area`는 모바일 breakpoint 안에서만 사용하도록 수정

### About Me 섹션 (신규)
- 이미지 마퀴 배너(우→좌 자동 무한 루프), 6장, 이미지마다 높이를 다르게 줘서 리듬감 부여
- 무한 루프 이음새를 CSS `-50%` 키프레임 대신 **JS로 실측한 픽셀 값 기반 requestAnimationFrame**으로 재구현 (이미지 크기가 제각각이라 픽셀 반올림 오차로 이음새가 보일 수 있어서)
- 영문/국문 캡션 텍스트, `overflow: hidden` 처리

### Footer 섹션 (신규)
- 배경 `#131B42`, 태그라인 + 연락처(이메일/전화) + "LET'S WORK TOGETHER." 대형 타이틀 + 카피라이트
- 스크롤에 따라 타이틀이 아래→제자리로 올라오는 패럴랙스 도착 효과 — 페이지 전체 스크롤 진행률(`scrollTop` vs `scrollHeight - clientHeight`) 기준으로 재계산해서 스크롤 최하단에서 정확히 100% 도착하도록 수정, ease-out 큐빅 적용, 이동거리/투명도 폭을 더 크게 키워 다이나믹하게 조정
- 이메일 클릭 시 클립보드 복사 + 커스텀 커서가 알약(pill) 모양으로 커지며 "COPY"/"COPIED!" 텍스트 표시

### 전역 / 버그 수정
- 커스텀 커서: `mix-blend-mode: difference`가 자식 요소에 있어서 (`position: fixed` 부모가 별도 stacking context를 만들어) 제대로 반전되지 않던 버그 수정 — 블렌드 모드를 부모 요소로 이동
- 커서에 텍스트를 표시할 수 있는 공용 컨벤션(`data-cursor-text`) 추가, `CustomEvent`로 "복사 완료" 같은 일회성 피드백 전달 가능하도록 구조화
- Hero/What I Do의 글자 stagger 애니메이션에서 `prefers-reduced-motion` 접근성 처리가 CSS 우선순위 문제로 무력화되던 버그 발견 및 수정 (`!important` 적용)
- Mindset 섹션 placeholder 완전히 제거 (GNB 메뉴에서도 제거) — 사용자 요청으로 섹션 자체를 없앰
- 인트로 영상(`intro.mp4`) 전체화면 오버레이를 추가했다가, 요청에 따라 다시 제거함. `public/intro.mp4` 파일은 남아있으나 미사용
- Motto-Portfolio 섹션 사이 여백이 과도했던 문제 수정 (양쪽 섹션 padding 조정, 8px spacing 토큰 기준)

## 2026-07-02

### 프로젝트 세팅
- Node.js LTS 설치, Vite + React 스캐폴딩
- Lenis 부드러운 스크롤 도입 (`src/lib/LenisProvider.jsx`)
- CLAUDE.md 기준 디자인 토큰 정리 (`src/styles/tokens.css`): 컬러, 타이포 스케일, 8px spacing, 브레이크포인트(1024px/768px), 컨테이너 max-width 1440px + 좌우 padding

### GNB
- Visual / Motto / Portfolio / What I Do / About 메뉴, Lenis 기반 스무스 스크롤 이동 (Mindset은 이후 제거됨)
- 스크롤 방향 감지: 아래로 스크롤 시 숨김, 위로 스크롤 시 재표시, 최상단 근처에서는 항상 표시

### Hero (Visual) 섹션
- "Hello, Aladin(👋→logo.png)" / "Designer Portfolio." 2줄 헤드라인 + 서브텍스트 구조
- `companyName` prop으로 회사명 분리 (다른 곳 지원 시 재사용 가능)
- 글자 단위 stagger 등장 애니메이션, 로고 → 2줄 순서로 자연스럽게 이어지는 캐스케이드
- 헤드라인 폰트 크기를 `vw` 대신 `cqw`(컨테이너 폭 기준)로 계산해서 와이드 스크린에서 텍스트가 컨테이너 밖으로 넘쳐 줄바꿈이 깨지는 버그 근본 수정
- 로고(logo.png) 위 마우스 오버 시 커스텀 커서 대신 손모양 포인터로 전환되는 이스터에그

### Motto 섹션
- Split Layout (텍스트 7 : 이미지 3), 상단 구분선(© PORTFOLIO 2026 / MOTTO — DESIGN PHILOSOPHY / 02-05)
- 모토 텍스트 3줄, 스크롤 진행률에 따른 글자 단위 컬러 리빌(연한 회색 → 진한 색)
- "긍정적인 경험", "지속 가능한 환경" 두 구간 형광펜(마커) 하이라이트
- me.png 이미지 실제 비율(560:748)에 맞춰 크롭/축소 없이 표시, 이미지 컬럼 패럴랙스(태블릿 이하 비활성화)

### 전역
- 커스텀 원형 커서: 마우스 좌표에 딜레이 없이 1:1 반응, 버튼/링크 hover 시 확대, 터치 기기에서는 비활성화

## 🔧 진행 중 / 참고 필요

- **A2Z 폰트 파일 여전히 미보유**: `public/fonts/`에 아직 폰트 파일 없음, Pretendard로 폴백 중. 파일 확보되면 경로에 넣기만 하면 적용됨.
- **AIWEB 상세페이지는 완성**: Renewal → 문제 정의 → UX 리서치 → 문제 해결 → 성과 지표 → 캐러셀 → 회고 → CTA 버튼까지 전부 실제 콘텐츠로 채움. 이 구조/클래스 재사용 규칙은 위 2026-07-04 항목 참고.
- **폰트 패밀리 가이드 위반 미해결**: H3 스케일 타이틀들(`.infoTitle` 등)이 전부 Pretendard가 아니라 A2Z로 되어 있음 (2026-07-04 항목 참고) — 투어버스 작업 시작 전에 고칠지 결정 필요.
- **송도맥주축제 / 지피티코리아 디자인(구 모두의러닝) / About Me 마퀴 / What I Do 커서 이미지**: 2026-07-09 기준 전부 실제 콘텐츠로 완성 확인됨 (아래 2026-07-09 항목 참고).
- **모바일 반응형(768px)**: Hero/Motto/Portfolio/WhatIDo/AboutMe/GNB/Footer 전 섹션 1차 작업 완료(2026-07-09). 태블릿(1024px)도 Motto/Hero/Portfolio 위주로 진행됨. 다만 투어버스/책나무/영수증프로세스/포켄스/국민은행 등 프로젝트 상세페이지 자체는 아직 모바일/태블릿 검수 전.

## 📋 다음에 할 것

1. **디자인 디벨롭 여지 확인** — 2026-07-09에 반응형(태블릿/모바일) 위주로 대량 튜닝 진행함. 전체적으로 한 번 더 훑으면서 다듬을 부분 있는지 점검
2. **프로젝트 상세페이지 태블릿/모바일 검수** — 투어버스/책나무/영수증프로세스/포켄스/국민은행/송도맥주축제/지피티코리아 디자인 등, Hero/Motto/Portfolio/WhatIDo/AboutMe만큼 반응형 손을 못 댐
3. **Working Mindset 섹션** — 사용자 요청으로 placeholder까지 완전히 제거된 상태. 필요 시 처음부터 다시 설계 필요 (마인드 3가지 아코디언, 데스크톱 hover 시 커서 따라다니는 이미지 리빌, 모바일은 아코디언만)
4. A2Z 폰트 파일 확보 후 적용
5. **폰트 패밀리 가이드 위반 미해결** — H3 스케일 타이틀(`.infoTitle` 등)이 Pretendard가 아니라 A2Z로 되어 있음, 여러 프로젝트에 이미 복제된 패턴이라 고칠 거면 한 번에 일괄 수정 필요
