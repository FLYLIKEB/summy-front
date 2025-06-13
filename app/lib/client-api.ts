import axios from 'axios';
import {
  SUMMARY_PROMPT_TEMPLATE,
  RESPONSE_PROMPT_TEMPLATE,
  STYLE_DESCRIPTIONS,
  DEFAULT_VALUES
} from '../constants/templates';

// 외부 API URL - 프록시 API 경로 사용
// 개발 환경에서는 로컬 경로, 프로덕션 환경에서는 배포된 도메인 사용
export const API_URL = typeof window !== 'undefined' 
  ? `${window.location.origin}/api/proxy` 
  : '/api/proxy';

// 타임아웃 설정 (60초)
export const API_TIMEOUT = 60000;

// 응답 스타일 타입 정의
export type ResponseStyle = 'formal' | 'friendly' | 'concise';

// 메타데이터 타입 정의
export interface MetaData {
  participants: number;
  keywords: string[] | number;
  time: string;
  progress: number;
}

// 요약 결과 타입 정의
export interface SummaryData {
  mainPoints: string[];
  participantComments: string[];
  nextSteps: string[];
}

// 응답 데이터 타입 정의
export interface ApiResponse {
  summary?: SummaryData;
  participants: number;
  keywords: string[] | number;
  time: string;
  progress: number;
  [key: string]: any;
}

// 입력 텍스트 정리 및 크기 제한 함수
export const sanitizeInput = (text: string, maxLength: number = 2000): string => {
  if (!text) return '';
  
  // 텍스트가 너무 길면 줄임
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "... (생략됨)";
  }
  return text;
};

// API 요청 전송 함수
export const sendApiRequest = async (prompt: string, apiName: string = 'API'): Promise<any> => {
  console.log(`[${apiName}] 요청 전송 시작: ${new Date().toISOString()}`);
  console.log(`[${apiName}] 요청 데이터 길이: ${prompt.length}자`);
  
  // 프롬프트 내용 로깅 (긴 경우 처음 500자와 마지막 500자만 표시)
  if (prompt.length > 1000) {
    console.log(`[${apiName}] 프롬프트 내용(처음 500자):`, prompt.substring(0, 500) + '...');
    console.log(`[${apiName}] 프롬프트 내용(마지막 500자):`, '...' + prompt.substring(prompt.length - 500));
  } else {
    console.log(`[${apiName}] 프롬프트 전체 내용:`, prompt);
  }
  
  try {
    const response = await axios.post(API_URL, {
      message: prompt
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: API_TIMEOUT
    });
    
    console.log(`[${apiName}] 응답 수신 완료: ${new Date().toISOString()}`);
    console.log(`[${apiName}] 전체 응답 데이터:`, JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error: any) {
    console.error(`[${apiName}] 요청 오류:`, error);
    throw error;
  }
};

// JSON 파싱 함수
export const parseJsonResponse = (content: string): any => {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('JSON 형식을 찾을 수 없습니다');
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    throw error;
  }
};

// 요약 생성 프롬프트 생성 함수
export const getSummaryPrompt = (message: string, options: { 
  participants?: number, 
  keywords?: number, 
  time?: string, 
  progress?: number 
} = {}): string => {
  const {
    participants = DEFAULT_VALUES.participants,
    keywords = DEFAULT_VALUES.keywords,
    time = DEFAULT_VALUES.time,
    progress = DEFAULT_VALUES.progress
  } = options;
  
  return SUMMARY_PROMPT_TEMPLATE
    .replace('$PARTICIPANTS', participants.toString())
    .replace('$KEYWORDS', keywords.toString())
    .replace('$TIME', time)
    .replace('$PROGRESS', progress.toString())
    .replace('$MESSAGE', message);
};

// 응답 생성 프롬프트 생성 함수
export const getResponsePrompt = (message: string, options: { 
  style?: ResponseStyle, 
  userName?: string,
  participants?: number, 
  keywords?: number, 
  time?: string, 
  progress?: number 
} = {}): string => {
  const {
    style = DEFAULT_VALUES.style as ResponseStyle,
    participants = DEFAULT_VALUES.participants,
    keywords = DEFAULT_VALUES.keywords,
    time = DEFAULT_VALUES.time,
    progress = DEFAULT_VALUES.progress
  } = options;
  
  // 스타일 설명 가져오기
  const styleDescription = STYLE_DESCRIPTIONS[style]?.description || 
    STYLE_DESCRIPTIONS.formal.description;
  
  return RESPONSE_PROMPT_TEMPLATE
    .replace('$STYLE_DESCRIPTION', styleDescription)
    .replace('$PARTICIPANTS', participants.toString())
    .replace('$KEYWORDS', keywords.toString())
    .replace('$TIME', time)
    .replace('$PROGRESS', progress.toString())
    .replace('$MESSAGE', message);
};

// 대체 응답 생성 - 파싱 실패 시 사용
export const createFallbackResponse = (options: {
  participants?: number,
  keywords?: number | string[],
  time?: string,
  progress?: number
} = {}): ApiResponse => {
  const {
    participants = DEFAULT_VALUES.participants,
    keywords = ['대화', '요약', '커뮤니케이션', '미팅'],
    time = DEFAULT_VALUES.time,
    progress = DEFAULT_VALUES.progress
  } = options;
  
  const fallbackMainPoints = [
    "대화 내용에서 추출한 주요 내용 1",
    "대화 내용에서 추출한 주요 내용 2"
  ];

  const fallbackComments = [
    "참여자 1의 주요 발언",
    "참여자 2의 주요 발언"
  ];

  const fallbackNextSteps = [
    "다음 단계 계획 1",
    "다음 단계 계획 2"
  ];
  
  const keywordArray = Array.isArray(keywords) 
    ? keywords
    : ['대화', '요약', '커뮤니케이션', '미팅'].slice(0, Number(keywords));
  
  return {
    summary: {
      mainPoints: fallbackMainPoints,
      participantComments: fallbackComments,
      nextSteps: fallbackNextSteps
    },
    participants: participants,
    keywords: keywordArray,
    time: time,
    progress: progress
  };
}; 