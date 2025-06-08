/**
 * 파일 업로드 통합 과정
 * 
 * 1. 기존 상황
 *    - summy-front/hooks/useFileUpload.ts: 공통 훅
 *    - summy-front/app/home/hooks/useFileUpload.ts: 홈 화면 전용 훅
 * 
 * 2. 통합 결정 이유
 *    - 코드 중복 제거
 *    - 유지보수 용이성 향상
 *    - 일관된 사용자 경험 제공
 *    - 버그 발생 가능성 감소
 * 
 * 3. 통합 과정
 *    - 공통 훅(summy-front/hooks/useFileUpload.ts)을 기본 구현으로 채택
 *    - 홈 화면 전용 훅의 기능을 공통 훅에 통합
 *    - 파일 유효성 검사 로직을 validateFile 함수로 분리
 *    - 상수(MAX_FILE_SIZE, SUPPORTED_FILE_TYPES)를 constants에서 관리
 * 
 * 4. 주요 개선사항
 *    - 파일 검증 로직 통합 및 개선
 *    - 에러 처리 일원화
 *    - 타입 안정성 강화
 *    - 코드 구조화 및 문서화 개선
 */

import { useState, useRef } from 'react'
import { SUPPORTED_FILE_TYPES } from '@/app/home/constants'
import axios from 'axios'

// 파일 크기 제한 (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

interface UploadResponse {
  success: boolean
  message: string
  data?: any
}

/**
 * 파일 업로드 기능을 관리하는 커스텀 훅
 * 드래그 앤 드롭과 파일 선택 기능을 제공합니다.
 */
export const useFileUpload = () => {
  // 상태 관리
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /**
   * 파일 유효성 검사
   */
  const validateFile = (file: File): boolean => {
    // 파일 크기 검사
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`파일 크기는 ${MAX_FILE_SIZE / (1024 * 1024)}MB를 초과할 수 없습니다.`)
      return false
    }

    // 파일 확장자 검사
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
    const supportedExtensions = Object.values(SUPPORTED_FILE_TYPES)

    console.log('File validation:', {
      fileName: file.name,
      fileExtension,
      supportedExtensions,
      isExtensionSupported: supportedExtensions.includes(fileExtension)
    })

    if (!supportedExtensions.includes(fileExtension)) {
      setUploadError(`지원하지 않는 파일 형식입니다. 지원되는 형식: ${supportedExtensions.join(', ')}`)
      return false
    }

    return true
  }

  /**
   * 파일을 백엔드로 업로드하는 함수
   */
  const uploadFile = async (file: File): Promise<UploadResponse> => {
    if (!validateFile(file)) {
      return {
        success: false,
        message: uploadError || '파일 검증에 실패했습니다.'
      }
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          }
        },
      })

      return {
        success: true,
        message: '파일이 성공적으로 업로드되었습니다.',
        data: response.data
      }
    } catch (error) {
      console.error('파일 업로드 오류:', error)
      
      let errorMessage = '파일 업로드 중 오류가 발생했습니다.'
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data?.message || `서버 오류 (${error.response.status})`
        } else if (error.request) {
          errorMessage = '서버로부터 응답이 없습니다.'
        } else {
          errorMessage = error.message
        }
      }

      return {
        success: false,
        message: errorMessage
      }
    }
  }

  /**
   * 파일이 드래그되어 영역 위에 있을 때의 핸들러
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  /**
   * 파일이 드래그되어 영역을 벗어날 때의 핸들러
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  /**
   * 파일이 드롭되었을 때의 핸들러
   */
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setUploadError(null)
    setUploadProgress(0)

    const file = e.dataTransfer.files[0]
    if (!file) return

    try {
      setIsUploading(true)
      const uploadResult = await uploadFile(file)
      
      if (uploadResult.success) {
        setUploadedFile(file)
        setFileName(file.name)
      } else {
        setUploadError(uploadResult.message)
      }
    } catch (error) {
      console.error('파일 처리 오류:', error)
      setUploadError('파일을 처리하는 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  /**
   * 파일 입력 요소를 통해 파일이 선택되었을 때의 핸들러
   */
  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setUploadProgress(0)

    try {
      setIsUploading(true)
      const uploadResult = await uploadFile(file)
      
      if (uploadResult.success) {
        setUploadedFile(file)
        setFileName(file.name)
      } else {
        setUploadError(uploadResult.message)
      }
    } catch (error) {
      console.error('파일 처리 오류:', error)
      setUploadError('파일을 처리하는 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  /**
   * 업로드된 파일을 제거하는 핸들러
   */
  const handleRemoveFile = () => {
    setUploadedFile(null)
    setFileName(null)
    setUploadError(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  /**
   * 파일 업로드 상태를 초기화하는 함수
   */
  const resetFileUpload = () => {
    setUploadedFile(null)
    setFileName(null)
    setUploadError(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    isDragging,
    uploadedFile,
    fileName,
    isUploading,
    uploadProgress,
    uploadError,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handleRemoveFile,
    resetFileUpload
  }
} 