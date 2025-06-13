import React, { useRef, useState } from 'react'
import { Card } from '@/components/common/card'
import { Icon } from './common/Icon'
import { Button } from '@/components/common/Button'

interface FileUploadProps {
  onFileChange?: (file: File | null) => void
  className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file)
    if (onFileChange) {
      onFileChange(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const handleRemoveFile = () => {
    handleFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAreaClick = () => {
    fileInputRef.current?.click()
  }

  const fileName = uploadedFile?.name

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleAreaClick}
        className={`p-4 sm:p-6 border border-dashed rounded-lg transition-all cursor-pointer
          ${isDragging 
            ? 'border-white/30 bg-white/[0.02]' 
            : 'border-white/[0.12] hover:border-white/20 hover:bg-white/[0.01]'
          }`}
      >
        {uploadedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-white/[0.06] rounded-full">
                <Icon name="file" className="w-4 h-4 text-white/80" />
              </div>
              <span className="text-white/80 text-sm sm:text-base truncate max-w-[16rem] sm:max-w-[24rem]">{fileName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFile()
              }}
              className="apple-button apple-button-secondary !p-1.5 rounded-full"
            >
              <Icon name="remove" className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            {/* <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/[0.06] rounded-full">
              <Icon name="upload" className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
            </div>
            <div className="text-center">
              <p className="text-white/70 mb-1 text-xs sm:text-sm">
                파일을 드래그하거나 클릭하여 업로드하세요
              </p>
              <p className="text-xs text-white/40">
                텍스트 파일, 이미지 또는 PDF 파일 지원
              </p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  )
} 