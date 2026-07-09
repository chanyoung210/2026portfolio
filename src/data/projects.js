// Placeholder content — CLAUDE.md fixes the project order (1-6) and which
// ones get the "main" (overlay detail) vs "sub" (inline list) treatment.
// Swap `image`/`images`/text fields for real assets & copy when available;
// the structure below is what Portfolio.jsx and ProjectDetail.jsx expect.

export const PROJECTS = [
  {
    id: 'aiweb-redesign',
    type: 'main',
    title: 'AIWEB 리디자인',
    category: 'UI/UX Redesign',
    image: '/works/aiweb/sum.png',
    detail: {
      visual: '/works/aiweb/visual.png',
      subtitle: 'Renewal',
      body: [
        'AIWEB의 홈페이지 리뉴얼을 통해 사용자 경험을 향상시켰습니다. 내부 관계자, 클라이언트, 예비 지원자 각각의 목적과',
        '기존 홈페이지의 문제점을 분석하여, 홈페이지를 통해 브랜드의 가치를 효과적으로 전달하는 데 집중했습니다.',
      ],
      meta: [
        { label: 'Year', value: '2026. 03' },
        { label: 'Company', value: 'AIWEB' },
        { label: 'Role', value: 'UX/UI Design (100%) · Web Publishing (100%)' },
      ],
      sections: [
        {
          id: 'problem',
          image: '/works/aiweb/problem.png',
          label: '문제 정의',
          title:
            '저조한 디자인 퀄리티와 랜딩페이지 형식으로 인해 브랜드 가치가 드러나지 않는다',
          body: [
            '브랜드의 간판은 홈페이지입니다. 하지만 원페이지 랜딩페이지 형식과 정돈되지 않은 디자인은, 클라이언트와 예비 지원자에게',
            '"회사 소개는 어디서 확인할 수 있는지", "신뢰할 수 있는 회사인지"와 같은 의문을 갖게 했습니다. 브랜드 가치를 제대로 전달하기',
            '위한 개선이 필요한 상황이었습니다.',
          ],
        },
        {
          id: 'research',
          image: '/works/aiweb/research.png',
          label: 'UX 리서치',
          title:
            '정작 회사 내부는 무관심했지만, 외부에서는 홈페이지가 회사의 얼굴이었다',
          body: [
            '팀 인터뷰 결과, 회사 내부는 홈페이지에 무관심했지만 예비 지원자와 클라이언트에게는 회사의 첫인상이었습니다.',
            '이 온도 차를 좁히기 위해, 내부 설득이 필요한 관계자와 외부 방문자를 구분해 접근하기로 했습니다.',
          ],
        },
        {
          id: 'solution',
          image: '/works/aiweb/solution.png',
          flat: true,
          label: '문제 해결',
          title: '사용자군별 정보 우선순위에 맞춰 구조를 재배치한다',
          body: '내부 관계자에게는 설득력 있는 서비스 소개를, 클라이언트와 예비 지원자에게는 신뢰를 줄 수 있도록 핵심 실적과 포트폴리오를 메인페이지에 배치하기로 결정했습니다.',
        },
        {
          id: 'metrics',
          image: '/works/aiweb/num.png',
          label: '성과 지표',
          title: '숫자로 신뢰를 증명한다',
          body: '실적을 나열하는 대신, 숫자 하나로 설득력을 압축했습니다.',
        },
      ],
      carousel: {
        cards: [
          {
            image: '/works/aiweb/works-sum01.png',
            client: '국민연금공단',
            desc: '연간 SNS 온라인 홍보 운영, 영상콘텐츠 기획 제작, 국민연금 온에어 사이트 구축 및 운영',
          },
          {
            image: '/works/aiweb/works-sum03.png',
            client: '국무조정실',
            desc: '공공기관 SNS 온/오프라인 홍보 운영, 영상콘텐츠 기획 제작',
          },
          {
            image: '/works/aiweb/works-sum04.png',
            client: '우리금융캐피탈',
            desc: '퍼포먼스, 검색광고, 온라인 홍보대행',
          },
          {
            image: '/works/aiweb/works-sum05.png',
            client: '하나카드',
            desc: '퍼포먼스, 검색광고, 온라인 홍보대행, 랜딩페이지 제작',
          },
          {
            image: '/works/aiweb/works-sum06.png',
            client: 'IBK 기업은행',
            desc: '퍼포먼스, 검색광고, SNS 온라인 홍보 운영, 랜딩페이지 제작',
          },
          {
            image: '/works/aiweb/works-sum29.png',
            client: '한국언론진흥재단',
            desc: '정부광고 퍼포먼스 마케팅 대행',
          },
          {
            image: '/works/aiweb/works-sum31.png',
            client: '재정경제부',
            desc: '공공기관 SNS 온라인 홍보 운영',
          },
        ],
        ctaHref: 'https://www.aiweb.kr/works.html',
        label: '캐러셀',
        title: '커리어 탐색을 최소화하기 위해 포트폴리오를 제공한다',
        body: '이전 뉴스 영역은 회사의 전체적인 소식을 공유하는 건지, 제안서 현황을 공유하는 건지 제공 정보가 모호했습니다. 시선도 안 갔고, 특히 정리가 안 된 정보는 사용자에게 혼란을 줄 수 있어 커리어를 보여주는 방향으로 정리했습니다.',
      },
      retro: {
        image: '/works/aiweb/tobe.png',
        label: '회고',
        title: '프로젝트 전 과정을 혼자 완성하다',
        body: [
          '레퍼런스 수집부터 리디자인, AI 퍼블리싱, 오류 및 이메일 발송 테스트까지 4~5주간 전 과정을 혼자 진행했습니다.',
          '디자인과 코드 사이를 오가며 직접 검증했기에, 완성된 화면이 실제로 어떻게 작동하는지까지 책임질 수 있었습니다.',
        ],
      },
      cta: {
        webHref: 'https://www.aiweb.kr/index.html',
      },
    },
  },
  {
    id: 'tourbus-service',
    type: 'main',
    title: '투어버스 서비스',
    category: 'Product Design',
    image: '/works/bus/sum.png',
    detail: {
      visual: '/works/bus/visual.png',
      subtitle: 'TourBus Service',
      body: [
        '(주)한국정보통신은 주로 방한하는 외국인 고객을 대상으로 4개국어를 지원하는 투어버스 예매 서비스 프로젝트를 진행했습니다. 5일이라는 짧은 일정으로 진행되어 퍼블리싱만 담당할 예정이었지만, 기획안을 확인한 결과 시각 정보 없이 텍스트 중심으로만',
        '구성되어 있어 사용자가 실제 버스를 인식하는 데 어려움을 겪을 수 있다는 문제를 발견했습니다. 이에 사용자가 예매 과정에서',
        '자연스럽게 버스를 인식할 수 있도록 시안을 제작해 클라이언트에게 역으로 제안했고, 구조적인 변경은 어렵지만',
        '디자인은 적용할 수 있다는 답변을 받아 디자인까지 함께 진행하게 되었습니다.',
      ],
      meta: [
        { label: 'Year', value: '2026. 01' },
        { label: 'Company', value: '(주)한국정보통신' },
        { label: 'Role', value: 'UX (30%) · UI (100%) · Web Publishing (100%)' },
      ],
      sections: [
        {
          id: 'problem',
          image: '/works/bus/problem01.png',
          label: '문제 발견',
          title: '텍스트 위주 기획으론 사용자가 실제 버스를 찾기 어렵다.',
          body: [
            '텍스트 위주의 기능들은 사용자가 버스를 예매하는 데엔 문제가 없지만, 오프라인과의 연결이 약해 실제 낯선 환경에서',
            '버스를 찾고 인식하고 탑승하는 데에 문제가 생길 수 있다고 판단했습니다.',
          ],
        },
        {
          id: 'problem-define',
          image: '/works/bus/problem02.png',
          flat: true,
          label: '문제 정의',
          title: '버스 예매 여정에 사용자가 탑승할 버스의 시각 정보가 없다.',
          body: [
            '기획안에는 예매, 실시간 위치 확인 같은 기능은 잘 갖춰져 있었지만, 정작 사용자가 실제 버스를 마주하는 순간에 대한 고려는',
            '빠져 있었습니다. 공항이나 정류장처럼 낯선 환경에서, 기획안 그대로 퍼블리싱할 경우 승하차 지점과 탑승할 버스를',
            '구분할 수 있는 정보가 부족해 실제 이용 과정에서 혼란이 생길 수 있다는 결론에 이르렀습니다.',
          ],
        },
        {
          id: 'solution',
          image: '/works/bus/solution01.png',
          flat: true,
          label: '시안 작업',
          title: '버스의 외형을 찾아보지 않아도 인식할 수 있게 한다.',
          body: [
            '버스와 브랜드 캐릭터를 예약 화면과 실물 버스에 함께 노출해, 예매 과정에서 자연스럽게 탑승할 버스를 인식할 수 있도록',
            '유도했습니다.',
          ],
        },
        {
          id: 'resolution',
          image: '/works/bus/solution02.png',
          flat: true,
          label: '문제 해결',
          title: '예약 목록과 배차 화면에 버스와 캐릭터를 함께 노출해 사전 인지를 유도한다.',
          body: [
            '예약 목록의 각 회차별 항목에 실제 버스 외관 이미지와 캐릭터를 함께 노출하고, 브랜드 컬러와 캐릭터를 활용한 배너를 상단에',
            '배치해 사용자가 탑승 전부터 버스의 외관을 자연스럽게 인지할 수 있도록 적용했습니다.',
          ],
        },
      ],
      retro: {
        image: '/works/bus/tobe.png',
        label: '회고',
        title: '낯선 환경에서의 사용자에 공감하다.',
        body: [
          '실제 상하이를 여행하면서 언어가 달라 대중교통을 찾기 어려웠던 경험이 있습니다. 안내방송을 들어도 이 방향이 맞는 건지',
          '확신이 서지 않아, 핸드폰으로 위치를 계속 업데이트하며 확인하고 이동했던 기억이 나는데, 그 과정이 꽤 피로했었습니다.',
          'UI 구조 변경은 제한됐지만, 디자인으로 방한 사용자들이 여행 중 대중교통 이용에서 느낄 불안함을 없애고자 시간을 내어',
          '시안 작업을 하고 역제안을 했던 프로젝트입니다.',
        ],
      },
      cta: {
        webHref: 'https://www.easytaxfree.co.kr/',
      },
    },
  },
  {
    id: 'chaeknamu-ai-guide',
    type: 'main',
    title: '책나무 디자인가이드 + MCP',
    category: 'Design System / Figma to MCP',
    image: '/works/book/sum.png',
    detail: {
      visual: '/works/book/visual.png',
      subtitle: 'Platform',
      body: '책나무는 학생들의 문해력을 길러주는 오프라인 학원 브랜드입니다. 오프라인 강의를 온라인으로 전환하는 과정에서, 학생 플랫폼, 지사 플랫폼, 지점 플랫폼, 배송 플랫폼까지 총 4개의 플랫폼을 제작했습니다.',
      meta: [
        { label: 'Year', value: '2025. 08 ~ 2026. 05' },
        { label: 'Company', value: '책나무' },
        { label: 'Role', value: 'UX (30%) · UI (100%)' },
      ],
      sections: [
        {
          id: 'problem',
          image: '/works/book/problem.png',
          label: '문제 정의',
          title: '일정이 타이트하고 리소스가 부족하다.',
          body: [
            '프로젝트 초반부터 타이트한 일정과, 디자인 가이드·퍼블리싱 리소스 부족 문제가 명확하게 드러났습니다. 매번 기획부터',
            '산출물까지 기준 없이 빠르게만 대응하면, 결과물의 일관성이 무너지고 같은 문제를 반복해서 해결해야 하는 상황이 될 것이라고',
            '판단했습니다. 이를 막기 위해 시간을 아껴줄 프로세스가 필요했습니다.',
          ],
        },
        {
          id: 'solution',
          image: '/works/book/solution.png',
          flat: true,
          label: '문제 해결',
          title: 'AI 프로세스 도입으로 디자인 가이드와 퍼블리싱을 효율화한다.',
          body: [
            '시간과 리소스 문제를 해결하기 위해 GPT로 디자인 가이드 초안을 생성하고, Figma와 MCP로 연결해 디자인 규칙을 적용하는',
            '프로세스를 구축했습니다. 이를 통해 퍼블리싱에 필요한 산출물의 초안 완성도를 높이고, 반복 작업에 드는 시간을 줄일 수',
            '있었습니다.',
          ],
        },
        {
          id: 'design-guide',
          images: [
            {
              src: '/works/book/design01.png',
              alt: 'GPT로 생성한 컬러 토큰 시스템 초안 — 작성한 프롬프트와 도출된 컬러 목록, Figma 컬러 변수 적용 화면',
            },
            {
              src: '/works/book/design02.png',
              alt: '플랫폼별 컬러 토큰 가이드 표와 버튼·카드 컴포넌트 적용 예시',
            },
          ],
          flat: true,
          label: '디자인 가이드',
          title: 'AI로 토큰, 컴포넌트 초안 제작 및 적용',
          body: [
            '처음부터 완벽한 가이드를 만들기보다, AI로 빠르게 초안을 잡고 실제 제품에 맞춰 컬러와 여백, 폰트, 컴포넌트를 다듬어 가는',
            '방식으로 최소한의 디자인 가이드를 완성했습니다.',
          ],
        },
        {
          id: 'figma-to-mcp',
          image: '/works/book/mcp.png',
          flat: true,
          label: 'Figma to Mcp',
          title: 'MCP를 사용하여 퍼블리싱 협업 고도화',
          body: [
            'MCP를 그대로 사용했을 때는 결과물의 완성도가 높지 않았습니다. 이를 개선하기 위해 실제 퍼블리싱 코드처럼 클래스명과',
            '시멘틱 구조를 반영해, Frame이나 Group 같은 기본 이름 대신 요소 단위로 레이어명을 작성했습니다. 그 결과 개발자가 MCP를',
            '사용할 때의 초기 완성도를 높일 수 있었고, 내부 개발자 피드백을 기반으로 퍼블리싱 비용을 최대 80%까지 절감할 수',
            '있었습니다.',
          ],
        },
        {
          id: 'result',
          image: '/works/book/tobe.png',
          flat: true,
          label: '결과',
          title: 'AI 프로세스로 4개 플랫폼을 빠르고 일관되게 완성하다',
          body: [
            'AI 프로세스 도입 이후 퍼블리싱 공수는 내부 개발자 피드백 기준 최대 80% 감소했으며, 컬러 팔레트·타이포그래피·아이콘 선정 등 리서치 및 디자인 제작 시간 또한 크게 단축했습니다. 이는 정형화된 클래스명과 시멘틱 구조를 기반으로 한 레이어 설계가',
            'MCP의 코드 변환 정확도를 높이는 데 실질적으로 기여했음을 보여줍니다. 또한 디자인 구조를 4개 플랫폼에 일관되게',
            '적용하면서, 큰 소통 오류 없이 전 과정을 진행할 수 있었습니다. 이러한 결과는 AI 기반 프로세스가 리소스 제약 상황에서도',
            '일관성과 효율을 동시에 확보할 수 있는 방법론임을 보여줍니다.',
          ],
        },
      ],
      cta: {},
    },
  },
  {
    id: 'receipt-process',
    type: 'sub',
    title: '영수증 프로세스',
    category: 'A to Z 배포',
    image: '/works/aiapi/sum.png',
    detail: {
      visual: '/works/aiapi/visual.png',
      subtitle: '프로세스 효율화',
      body: [
        '반복적이고 규칙 기반의 지출경비 제출 프로세스에 AI API를 도입해 자동화했습니다. 인터뷰를 통해 제출자와 결재 담당자 각각의 문제를 파악하고, 비효율이 집중된 구간을 데이터로 확인한 뒤, 기획부터 디자인, 퍼블리싱, 배포까지 전 과정을 직접 진행해',
        '소요 시간을 38% 단축했습니다.',
      ],
      meta: [
        { label: 'Year', value: '2026.03' },
        { label: 'Company', value: '(주)지피티코리아' },
        { label: 'Role', value: 'Planning · Design · Publishing (100%)' },
      ],
      sections: [
        {
          id: 'discover',
          image: '/works/aiapi/discover.png',
          flat: true,
          label: '문제 발견',
          title: '지출경비 제출 프로세스의 문제를 모두가 동일하게 느끼고 있었다.',
          body: [
            '프로세스의 비효율을 실제 직원들이 어떻게 체감하는지 파악하기 위해 제출자와 결재 담당자를 대상으로 인터뷰를 진행했습니다. 제출자들은 영수증을 매번 찍어 올리고 중복·누락을 확인하는 과정을 번거롭고 소모적으로 느끼고 있었고, 결재 담당자는 통일되지 않은 파일명과 업로드 형태, 잘못 기입된 정보를 하나하나 확인하고 연락해야 하는 데 시간이 오래 걸린다고 답했습니다.',
            '제출자와 결재 담당자가 서로 다른 지점에서 문제를 겪고 있다는 것을 확인할 수 있었습니다.',
          ],
        },
        {
          id: 'problem',
          image: '/works/aiapi/problem.png',
          flat: true,
          label: '문제 정의',
          title: '프로세스의 절반 이상이 비효율이다.',
          body: [
            '기존 프로세스는 영수증 이미지 확인부터 제출까지 총 21분이 소요됐습니다. 이 중 누락 확인(5분), 파일명 변경(3분), 업로드 시 정보 대조 및 입력(6분)까지 총 14분, 전체 시간의 약 66%가 반복적이고 규칙 기반의 작업이었습니다. 이 부분은 AI를 통해',
            '자동화할 수 있는 요소라고 판단했습니다.',
          ],
        },
        {
          id: 'solution',
          image: '/works/aiapi/solution.png',
          flat: true,
          label: '문제 해결',
          title: 'AI API를 사용하여 반복 작업 비효율을 38% 개선했다.',
          body: [
            '영수증 처리 프로세스에 AI API를 도입한 결과, 전체 소요 시간은 21분에서 13분으로 약 38% 감소했습니다. 특히 누락 확인,',
            '파일명 변경, 정보 대조 및 입력 등 반복적으로 발생하던 작업 시간은 14분에서 5분으로 약 64% 단축되었습니다.',
            '이는 이미지 분석을 통해 지출 내역을 자동으로 추출하고, 파일명을 규칙에 따라 일괄 변환하며, 중복 및 누락 항목을 자동으로',
            '판별하는 기능이 실질적인 효율 개선으로 이어졌음을 보여줍니다. 반복적이고 규칙 기반의 업무일수록 AI 자동화의 효과가',
            '크게 나타난다는 것을 확인할 수 있었습니다.',
          ],
        },
      ],
      cta: {},
    },
  },
  {
    id: 'promotion-pokemon-megaweek',
    type: 'sub',
    title: '포켄스 메가위크',
    category: 'Promotion Design',
    image: '/works/promotion01/sum.png',
    detail: {
      visual: '/works/promotion01/visual.png',
      subtitle: 'Promotion Design',
      body: [
        '포켄스 강아지의 날 메가위크 프로모션에서 배너와 이벤트 페이지 디자인을 담당한 개인 작업입니다. 할인 혜택과 웰컴 쿠폰 등',
        '프로모션 정보를 사용자가 한눈에 파악할 수 있도록 비주얼과 레이아웃을 구성했습니다.',
      ],
      meta: [
        { label: 'Year', value: '2026.03' },
        { label: 'Company', value: '(주)포켄스' },
        { label: 'Role', value: 'Design (100%)' },
      ],
      sections: [
        {
          id: 'gallery',
          images: [
            {
              src: '/works/promotion01/01.png',
              alt: '포켄스 메가위크 배너와 카테고리 탭, 혜택 타이머가 담긴 이벤트 페이지 상단과 디자인 의도 주석',
            },
            {
              src: '/works/promotion01/02.png',
              alt: '인기 상품 리스트·그리드 보기 옵션과 카테고리 탭바가 담긴 상품 목록 화면과 디자인 의도 주석',
            },
            {
              src: '/works/promotion01/03.png',
              alt: '레퍼런스 서치부터 이미지 생성, 보정, 적용까지 이어지는 AI 이미지 제작 프로세스 다이어그램',
            },
            {
              src: '/works/promotion01/full.png',
              alt: '포켄스 메가위크 이벤트 페이지 전체 화면',
            },
          ],
          flat: true,
        },
      ],
      cta: {},
    },
  },
  {
    id: 'promotion-nps-proposal',
    type: 'sub',
    title: '국민은행 제안서',
    category: 'Promotion Design',
    image: '/works/promotion02/sum.png',
    detail: {
      visual: '/works/promotion02/visual.png',
      subtitle: 'Promotion Design',
      body: 'KB국민은행 블랙프라이데이 제안서용으로 제작한 프로모션 디자인입니다. 12개 제휴 브랜드 결제 시 자동 페이백과 럭키드로우 응모까지, 사용자의 행동을 최소화하면서 혜택을 빠르게 인지시킬 수 있도록 배너와 상세 페이지를 구성했습니다.',
      meta: [
        { label: 'Year', value: '2025.12' },
        { label: 'Company', value: '(주)에이아이웹' },
        { label: 'Role', value: 'Design (100%)' },
      ],
      sections: [
        {
          id: 'gallery',
          images: [
            {
              src: '/works/promotion02/01.png',
              alt: 'KB 블랙프라이데이 이벤트 배너, 이벤트 안내, 계좌 개설 유도 화면과 디자인 의도 주석',
            },
            {
              src: '/works/promotion02/02.png',
              alt: '페이백·럭키드로우 혜택 안내와 참여 방법 및 유의사항 화면과 디자인 의도 주석',
            },
            {
              src: '/works/promotion02/full.png',
              alt: 'KB국민은행 블랙프라이데이 제안서 페이지 전체 화면',
            },
          ],
          flat: true,
        },
      ],
      cta: {},
    },
  },
  {
    id: 'songdo-beer-festival',
    type: 'sub-imageonly',
    title: '송도맥주축제',
    category: 'Design & Publishing',
    image: '/works/beer/sum.png',
    detail: {
      visual: '/works/beer/visual.png',
      subtitle: 'Beer Festival',
      body: '경인방송에서 매년 진행하는 송도맥주축제 홈페이지 디자인과 카페24를 이용한 퍼블리싱을 진행했습니다. 사용자가 최대한 정보를 쉽게 알아볼 수 있도록 정보구조를 정리했고, 축제소개, 프로그램, 현장안내 등 방문객이 필요로 하는 정보를 페이지별로 명확히 구분해 접근성을 높였습니다.',
      meta: [
        { label: 'Year', value: '2025.08' },
        { label: 'Company', value: '(주)맥가이버팩토리' },
        { label: 'Role', value: 'Design (80%) · Web Publishing (70%)' },
      ],
      sections: [
        {
          id: 'gallery',
          image: '/works/beer/full.png',
          flat: true,
        },
      ],
      cta: {},
    },
  },
  {
    id: 'gpt-korea-design',
    type: 'sub-imageonly',
    title: '지피티코리아 디자인',
    category: '디자인',
    image: '/works/gko/sum.png',
    detail: {
      visual: '/works/gko/visual.png',
      subtitle: 'Design',
      body: [
        '(주)지피티코리아는 설립과 함께 새로운 브랜드 홈페이지가 필요한 상황이었습니다. AI 기업으로서의 전문성과 신뢰도를',
        '전달하는 것이 핵심 목적이었고, 이를 위해 서비스 소개, 리포트, 채용 정보 등 방문자가 필요로 하는 정보를 명확한 구조로',
        '설계하는 데 집중했습니다. 기획안을 바탕으로 디자인부터 상세 페이지 구성까지 전 과정을 진행했으며, 브랜드의 방향성을',
        '시각적으로 일관되게 전달하는 것을 목표로 삼았습니다.',
      ],
      meta: [
        { label: 'Year', value: '2024.09' },
        { label: 'Company', value: '(주)지피티코리아' },
        { label: 'Role', value: 'Design (100%)' },
      ],
      sections: [
        {
          id: 'gallery',
          image: '/works/gko/tobe.png',
          flat: true,
        },
      ],
      cta: {},
    },
  },
]
