import { ResponseStyle } from '../types';

export const EXAMPLE_CONVERSATION = `안녕하세요, 오늘 회의를 시작하겠습니다.

김철수: 안녕하세요. 제가 일정 조정안을 준비했습니다.
이영희: 네, 저도 기능 개발 현황을 보고드리겠습니다.
박지성: UI/UX 개선안도 준비했습니다.
정우성: 프로젝트 관리 방안도 논의하면 좋을 것 같습니다.

김철수: 먼저 일정 조정안을 설명드리겠습니다...
이영희: 기능 개발은 현재 일정대로 진행 중입니다...
박지성: UI/UX 개선안은 다음과 같습니다...
정우성: 프로젝트 관리를 위해 다음 사항들을 제안드립니다...

김철수: 일정 조정안에 대해 의견 주시겠습니까?
이영희: 네, 현재 일정과 충돌이 있어 조정이 필요해 보입니다.
박지성: UI/UX 개선안도 검토가 필요합니다.
정우성: 프로젝트 관리 방안도 함께 논의하면 좋겠습니다.

김철수: 다음 주 월요일까지 일정 조정안을 확정하도록 하겠습니다.
이영희: 기능 개발은 현재 일정대로 진행하겠습니다.
박지성: UI/UX 개선안은 다음 주 수요일까지 피드백 주시면 감사합니다.
정우성: 프로젝트 관리 방안도 함께 검토하도록 하겠습니다.

김철수: 다음 주 월요일까지 일정 조정안 확정
이영희: 기능 개발은 현재 일정대로 진행
박지성: UI/UX 개선안 검토 후 다음 주 수요일까지 피드백
정우성: 프로젝트 관리 방안도 함께 검토

다음 주 월요일까지 일정 조정안 확정
다음 주 수요일까지 UI/UX 개선안 피드백
다음 주 금요일까지 주간 진행상황 보고`;

export const EXAMPLE_SUMMARY = `1. 주요 내용
- Q2 프로젝트 일정 조정 논의
- 신규 기능 개발 계획 수립
- 팀원별 진행 상황 공유

2. 참여자별 발언
- 김팀장: Q2 마감일 6월 15일 확정 및 테스트 기간 2주 확보, 검색 기능 개선 최우선 지시
- 박개발: 프론트엔드 70%, 백엔드 80% 완료, 검색 기능 개선안 금요일까지 제출 예정
- 이디자인: 디자인 시스템 일관성 개선 필요, 다음 주까지 상세 기획안 작성
- 정기획: 신규 기능 2개 Q2, 1개 Q3로 연기 제안, 5월 1일까지 상세 일정표 작성

3. 감정/분위기 분석
- 건설적이고 협력적인 회의 분위기
- 일정 조정에 대한 팀원들의 긍정적 수용
- 효율적인 의사결정 과정

4. 다음 단계
- 5월 1일: 상세 일정표 작성
- 5월 15일: UI/UX 개선안 확정
- 6월 1일: 테스트 계획 수립
- 다음 주 월요일: 팀원별 진행 상황 공유

5. 통계 정보
- 참여자 수: 4명
- 회의 시간: 30분
- 주요 키워드: 일정 조정, 기능 개발, UI/UX 개선
- 진행률: 75%`;

export const DETAILED_SUMMARY = `1. 주요 내용
- 프로젝트 일정 조정 및 마감일 확정
- 새로운 기능 개발 우선순위 결정
- 팀원 역할 재배치 및 책임 명확화

2. 참여자별 발언
- 김팀장: Q2 마감일을 6월 15일로 확정하고, 테스트 기간을 2주 확보
- 박개발: 사용자 피드백을 바탕으로 검색 기능 개선이 우선순위
- 이디자인: UI/UX 개선안 제시 및 디자인 시스템 구축 필요성 언급
- 정기획: 신규 기능 3개 중 2개는 Q2, 1개는 Q3로 연기 제안

3. 감정/분위기 분석
- 전반적으로 긍정적이고 협력적인 분위기
- 일정 조정에 대한 팀원들의 이해와 수용
- 새로운 기능 개발에 대한 열정적인 논의

4. 다음 단계
- 5월 1일까지 상세 일정표 작성
- 5월 15일까지 UI/UX 개선안 확정
- 6월 1일까지 테스트 계획 수립`;

export const SUPPORTED_FILE_TYPES = {
  'text/plain': '.txt',
  'text/markdown': '.md',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
};

export const DEFAULT_STATISTICS = {
  participants: 4,
  duration: '30분',
  keywords: 3,
  progress: 75
};

export const DEFAULT_KEYWORDS = [
  { text: '일정 조정', color: 'purple' },
  { text: '기능 개발', color: 'mint' },
  { text: 'UI/UX 개선', color: 'purple' },
  { text: '프로젝트 관리', color: 'mint' }
];

export const RESPONSE_STYLES = {
  formal: {
    label: '격식있게',
    description: '공손하고 전문적인 톤으로 작성'
  },
  friendly: {
    label: '친근하게',
    description: '편안하고 친근한 톤으로 작성'
  },
  concise: {
    label: '간단히',
    description: '짧고 명확하게 작성'
  }
};

export const RESPONSE_REASONS = {
  formal: [
    '전문성과 신뢰도를 높이기 위해 격식있는 어조 사용',
    '공식적인 문서나 보고서에 적합한 스타일',
    '상대방의 지위나 상황을 고려한 존댓말 사용'
  ],
  friendly: [
    '친근하고 편안한 분위기 조성',
    '일상적인 대화나 팀 내 소통에 적합',
    '상대방과의 관계를 돈독히 하는 효과'
  ],
  concise: [
    '핵심 내용을 빠르게 전달',
    '불필요한 수식어나 장황한 설명 제거',
    '효율적인 커뮤니케이션'
  ]
};

// 파일 크기 제한 (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; 