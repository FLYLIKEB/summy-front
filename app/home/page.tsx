// 필요한 의존성 모듈 import
'use client'

import React, { useState, useEffect } from 'react'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useSummarize } from './hooks/useSummarize'
import { useResponse } from './hooks/useResponse'
import { FileUpload } from './components/FileUpload'
import { TextInput } from './components/TextInput'
import { ActionButtons } from './components/ActionButtons'
import { SummaryResult } from './components/SummaryResult'
import { ResponseSuggestion } from './components/ResponseSuggestion'

// 데모 페이지 컴포넌트
export default function DemoPage() {
  // 사용자 입력 상태 관리
  const [input, setInput] = useState('')
  
  // 파일 업로드 관련 기능
  const {
    uploadedFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handleRemoveFile,
    resetFileUpload
  } = useFileUpload();

  // 요약 기능 관련 상태와 핸들러
  const {
    isSummarizing,
    result,
    handleSummarize
  } = useSummarize();

  // 답변 제안 기능 관련 상태와 핸들러
  const {
    isSuggesting,
    suggestedResponse,
    selectedStyle,
    isEditing,
    editedResponse,
    showReason,
    handleSuggestResponse,
    handleCopyResponse,
    handleStyleChange,
    handleEditResponse,
    handleSaveResponse,
    toggleReason,
    updateEditedResponse,
    cancelEditing
  } = useResponse();

  // 파일 업로드 시 입력값 업데이트
  useEffect(() => {
    if (uploadedFile) {
      // File 객체를 텍스트로 변환
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
      };
      reader.readAsText(uploadedFile);
    }
  }, [uploadedFile]);

  // 요약 버튼 클릭 핸들러
  const handleSummarizeClick = () => {
    handleSummarize(input);
  }

  // 답변 제안 버튼 클릭 핸들러
  const handleSuggestClick = () => {
    handleSuggestResponse(input);
  }

  return (
    <div className="min-h-screen bg-[#1a1a1f]/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* 페이지 헤더 */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-medium mb-3 sm:mb-4">
              요약 체험하기
            </h1>
            <p className="text-sm sm:text-base opacity-70 max-w-md mx-auto">
              실제 대화를 입력하거나 파일을 업로드하세요. AI가 빠르게 분석하여 요약해드립니다.
            </p>
          </div>

          {/* 입력 컨테이너 */}
          <div className="bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/[0.06] shadow-sm overflow-hidden">
            {/* 파일 업로드 섹션 */}
            <div className="p-4 sm:p-6">
              <FileUpload />
            </div>

            {/* 구분선 */}
            <div className="relative py-2 sm:py-3 px-4 sm:px-6">
              <div className="w-full border-t border-white/[0.04]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2d2d3a] px-3 sm:px-4 text-xs sm:text-sm text-white/40 rounded-full">
                또는
              </div>
            </div>

            {/* 텍스트 입력 섹션 */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <TextInput
                value={input}
                onChange={setInput}
                onResetFileUpload={resetFileUpload}
              />
            </div>
          </div>

          {/* 액션 버튼 섹션 - 더 깔끔하게 중앙 배치 */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <ActionButtons
              isSummarizing={isSummarizing}
              isSuggesting={isSuggesting}
              onSummarize={handleSummarizeClick}
              onSuggestResponse={handleSuggestClick}
            />
          </div>

          {/* 응답 컨테이너 */}
          <div className="mt-8 sm:mt-10">
            {/* 답변 제안 결과 섹션 */}
            {suggestedResponse && (
              <div className="mb-6 sm:mb-10">
                <ResponseSuggestion
                  isEditing={isEditing}
                  editedResponse={editedResponse}
                  selectedStyle={selectedStyle}
                  onStyleSelect={handleStyleChange}
                  onEdit={handleEditResponse}
                  onUpdateResponse={updateEditedResponse}
                  onCancelEditing={cancelEditing}
                  onSaveResponse={handleSaveResponse}
                  showReason={showReason}
                  onToggleReason={toggleReason}
                />
              </div>
            )}

            {/* 요약 결과 섹션 */}
            {result && (
              <SummaryResult result={result} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 