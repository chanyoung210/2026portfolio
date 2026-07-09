# 포트폴리오 사이트 — 디자인 & 개발 가이드

알라딘 UI/UX 디자이너 채용 지원용 웹퍼블리셔 포트폴리오 사이트.
아래 가이드는 임의로 변경하지 않고 그대로 따른다.

---

## COLOR

- Background: `#FFFFFF`
- Text - Main: `#1A1A1F`
- Text - Sub: `#4A4A52`
- Text - Label/Muted: `#8C8C94`
- Accent (Point): `#2644BE`
  - 용도: Primary 버튼, 링크 hover, 프로젝트 번호/마커, 강조 키워드
  - 지정된 용도 외 남용 금지 (포인트 컬러로서 절제해서 사용)

---

## TYPOGRAPHY

### Font Family
- Headline (Hero, H1, H2): **A2Z** (SemiBold ~ Bold)
  - 영문/숫자는 A2Z 내장 Outfit 기반 그대로 사용 (별도 영문 폰트 불필요)
  - ExtraBold, Black 웨이트는 작은 크기에 사용 금지 (글자 뭉침으로 가독성 저하)
- Body / UI (Body, H3, Small): **Pretendard** (Regular ~ Medium)
- 폰트는 이 2종만 사용. 임의로 3번째 폰트 추가하지 않는다.

### Type Scale — Desktop
| 용도 | 크기 | line-height | weight |
|---|---|---|---|
| Hero Headline | 64px | 1.1 | 700 |
| H1 (섹션 제목) | 40px | 1.2 | 700 |
| H2 (서브섹션/프로젝트 제목) | 28px | 1.3 | 600 |
| H3 (소제목) | 20px | 1.4 | 600 |
| Body (본문) | 16px | 1.6 | 400 |
| Small (캡션/라벨) | 13px | 1.4 | 500 |

### Type Scale — Mobile
| 용도 | 크기 |
|---|---|
| Hero Headline | 36px |
| H1 | 28px |
| H2 | 22px |
| H3 | 18px |
| Body | 15px |
| Small | 12px |

---

## SHAPE

- Border-radius: `6px` (버튼, 카드, 이미지 공통 — 예외 없이 통일)

---

## SPACING (8px 배수 시스템)

일관성이 핵심 — 여백 크기를 임의로 정하지 말고 아래 배수 안에서만 사용한다.

| 값 | 용도 |
|---|---|
| 4px | 아이콘-텍스트 등 미세 간격 |
| 8px | 관련 요소 간 최소 간격 (라벨-값 등) |
| 16px | 기본 요소 간격 (버튼 내부 padding 등) |
| 24px | 컴포넌트 내부 요소 간 (카드 안 제목-본문) |
| 32px | 컴포넌트 간 간격 (카드-카드) |
| 48px | 섹션 내 그룹 간격 |
| 64px | 섹션-섹션 간격 |
| 96px | 큰 섹션 전환 지점 (필요한 경우만) |

여백은 넓게 쓰기보다 **정돈된 리듬**을 우선한다 (넓은 여백 선호하지 않음).

---

## BUTTON

### Primary (예: "프로젝트 보기", "연락하기")
- background: `#2644BE`
- color: `#FFFFFF`
- padding: `14px 28px`
- border-radius: `6px`
- font-weight: 600
- hover: background 어둡게(`#1E38A0`) + 2px 위로 이동, transition 적용

### Secondary (예: "더 보기" 등 덜 중요한 액션)
- background: transparent
- border: `1.5px solid #1A1A1F`
- color: `#1A1A1F`
- padding: `14px 28px`
- border-radius: `6px`
- hover: background `#1A1A1F`, color `#FFFFFF`로 반전

포인트 컬러는 Primary 버튼에만 사용. 버튼 개수는 많지 않게 유지.

---

## LAYOUT / RESPONSIVE

- Max-width: `1440px` (컨테이너 기준, 그 이상 화면은 중앙 정렬 + 좌우 여백)

### Breakpoints (2단계만 사용 — 절대 임의로 추가 금지)
- Base (PC): 기본 스타일, 별도 미디어쿼리 없음
- Breakpoint 1 (Tablet): `max-width: 1024px`
- Breakpoint 2 (Mobile): `max-width: 768px`

⚠️ 특정 요소가 애매하게 깨진다고 중간 breakpoint(예: 900px, 600px 등)를 임의로
추가하지 말 것. 반드시 1024px / 768px 두 기준 안에서 flex-wrap, grid 조정,
`clamp()` 등으로 해결한다.

---

## MOTION

- 부드러운 스크롤: **Lenis** 라이브러리 사용
- GNB 메뉴 클릭 시 해당 섹션으로 Lenis `scrollTo` 기능을 이용해 부드럽게 이동
  (각 섹션에 id 부여, GNB 메뉴 항목과 매칭)
- 전반적으로 스크롤 시 텍스트 순차 등장, 이미지 확대 등 섬세한 모션 적용

---

## 레이아웃 레퍼런스 원칙

- 큰 헤드라인 + 작은 서브텍스트의 과감한 크기 대비 구조
- 여백 넉넉하게보다는 "정돈된 리듬" 우선, 한 화면에 메시지 하나씩 배치
- 작은 라벨 디테일 활용 (예: `[프로젝트명]`, 번호 `01`·`02` 등)
- 무채색 기반 + 포인트 컬러는 절제해서 사용

---

## 섹션 구조 및 개별 기능 명세

### 1. Visual (히어로)
- 별도 특수 기술 없음, 기본 히어로 섹션

### 2. Motto (모토 텍스트) — Scroll-triggered text reveal
- 문단을 span 단위(단어 또는 줄)로 분리
- 평소(스크롤 전) 텍스트 색: `#8C8C94` (연한 회색)
- 스크롤해서 문단이 화면에 들어오면, 스크롤 진행률에 따라 위에서부터
  순서대로 진한 색(`#1A1A1F`)으로 하나씩 전환
- 텍스트가 사라지거나 나타나는 게 아니라 **색만 전환**
- 부드러운 transition 적용
- Lenis 스크롤 이벤트와 연동
- 구현 방식: IntersectionObserver 또는 스크롤 progress 계산

### 3. Portfolio (프로젝트 6개)
프로젝트 순서 (고정):
1. AIWEB 리디자인 — 상세페이지 방식
2. 투어버스 서비스 — 상세페이지 방식
3. 책나무 AI 디자인가이드 + MCP 퍼블리싱 효율화 — 상세페이지 방식
4. 프로모션 디자인 2개 — 한 섹션 내 이미지+설명 나열 (디자인만 기여)
5. 영수증 프로세스 간소화 — 한 섹션 내 이미지+설명 나열 (Before/After 스토리텔링, 배포 경험)
6. 송도맥주축제 / 싱어미닛 — 한 섹션 내 이미지만 (기여도 50%, 참고용)

- 1~3번(메인): 클릭 시 상세페이지로 이동, 문제/역할/과정/결과 구조
- 4~6번(서브): 한 페이지 스크롤 나열, 이미지 + 간단 설명
- 그리드: 2열 카드 레이아웃

### 4. Working Mindset (일하는 마인드 3가지)
- 3개 항목 아코디언(Accordion) 형태로 세로 나열
- 각 항목 hover 시, 마우스 커서 근처에 해당 항목 이미지가 나타나
  커서를 따라다님 (Cursor-following image reveal), 항목별 다른 이미지 3개
- 항목 클릭 시 아코디언처럼 펼쳐지며 상세 텍스트 노출
- 커서 추적 효과는 데스크톱 전용. 모바일(터치 환경)에서는
  커서 추적 없이 아코디언 기능만 동작

### 5. About Me + Contact
- 나를 나타내는 이미지들을 가로 무한 스크롤 배너(Marquee)로 표시
- 방향: 오른쪽 → 왼쪽
- **자동재생** (스크롤 위치와 무관하게 항상 자동으로 흐름)
- 하단에 연락처 및 이메일 정보

### GNB
- 클릭 시 해당 섹션으로 Lenis 기반 부드러운 스무스 스크롤 이동
