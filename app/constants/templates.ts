// 요약 생성 프롬프트 템플릿
export const SUMMARY_PROMPT_TEMPLATE = `다음 대화 내용을 요약하고 필요한 메타데이터를 추출해주세요.

다음 JSON 형식으로 응답해주세요:
{
  "summary": {
    "mainPoints": [
      "프로젝트 상황에 대한 요약",
      "진행 상황에 대한 요약",
      "기타 정보에 대한 요약"
    ],
    "participantComments": [
      "이름1: 담당, 진행 상황",
      "이름2: 담당, 진행 상황"
    ],
    "nextSteps": [
      "다음 작업 목록",
      "추가 작업 계획",
      "일정 계획"
    ]
  },
  "metadata": {
    "participants": $PARTICIPANTS,
    "keywords": [
      "핵심키워드1", 
      "핵심키워드2", 
      "핵심키워드3", 
      "핵심키워드4"
    ],
    "time": "$TIME",
    "progress": $PROGRESS
  }
}

위 형식으로 대화 내용을 요약해주세요:
1. summary 필드에는 대화 내용을 구조화된 형태로 요약해주세요.
2. metadata 필드에는 다음 정보를 포함해주세요:
   - participants: 대화에 참여한 사람 수를 숫자로
   - keywords: 대화에서 추출한 주요 키워드를 배열로
   - time: 대화 진행 시간 추정치를 "분" 단위로
   - progress: 프로젝트 진행률 추정치를 0-100 사이 퍼센트로

대화에서 진행률이 명시되지 않은 경우 대화 내용의 맥락에 따라 0-100 사이 값으로 추정해주세요.
특히 metadata.keywords는 $KEYWORDS개의 중요 키워드를 배열 형태로 제공해주세요.

대화 내용:
$MESSAGE`;

// 응답 생성 프롬프트 템플릿
export const RESPONSE_PROMPT_TEMPLATE = `다음 대화 내용을 분석하고, $STYLE_DESCRIPTION 에 카톡 대화에 대한 적절한 답변을 작성해주세요.

대화 내용: $MESSAGE

아래 JSON 형식으로 응답해주세요. 응답의 처음부터 끝까지 정확한 JSON 형식을 유지해주세요:

{
  "response": "대화 내용에 대한 적절한 응답 텍스트",
  "reasons": [
    "이 응답을 작성한 이유 1",
    "이 응답을 작성한 이유 2",
    "이 응답을 작성한 이유 3"
  ],
  "userName": "응답자의 이름"
}

'response' 필드에는 위 대화 내용을 잘 이해하고 그에 맞는 적절한 응답을 작성해주세요.
'reasons' 필드에는 해당 응답을 작성한 이유나 의도를 3가지 항목으로 설명해주세요.
'userName' 필드에는 응답자의 이름을 지정해주세요.

매우 중요: 
1. 대화를 요약하지 말고, 마치 대화의 한 참여자처럼 자연스러운 응답을 작성해주세요.
2. 응답할 때 반드시 지정된 userName의 입장에서 작성해주세요.
3. 응답의 시작에 userName을 포함해주세요.`;

// 스타일별 설명 및 예시
export const STYLE_DESCRIPTIONS = {
  formal: {
    description: '정중하고 공손한 답변을 작성해주세요. 격식을 갖추고, 전문적인 어조를 유지하세요.',
    example: '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.'
  },
  friendly: {
    description: '친근하고 편안한 답변을 작성해주세요. 격식은 조금 줄이고, 친근한 어조로 작성하세요.',
    example: '안녕하세요! 회의 내용 잘 확인했어요. 제안해주신 내용들 정말 좋네요. 다음 주 월요일까지 검토하고 피드백 드릴게요!'
  },
  concise: {
    description: '간결하고 핵심만 담긴 답변을 작성해주세요. 불필요한 내용 없이 핵심 메시지만 전달하세요.',
    example: '회의 내용 확인했습니다. 다음 주 월요일까지 피드백 드리겠습니다.'
  }
};

// 기본값 설정
export const DEFAULT_VALUES = {
  participants: 2,
  keywords: 4, 
  time: '30분',
  progress: 75,
  style: 'formal',
  userName: '지우'
}; 