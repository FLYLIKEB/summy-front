'use client'

import React, { useState } from 'react'
import { PlayCircle, DownloadCloud, ArrowRight, Rewind, Pause } from 'lucide-react'
import { useToast } from '../common/Toast'

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const { showToast } = useToast()
  
  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    showToast({
      type: 'success',
      title: '비디오 제어',
      message: isPlaying ? '비디오가 일시정지 되었습니다.' : '비디오가 재생됩니다.',
    })
  }
  
  const handleDownload = () => {
    showToast({
      type: 'info',
      title: '다운로드',
      message: '데모 영상 다운로드를 시작합니다.',
    })
  }

  return (
    <section className="relative py-16 md:py-24 bg-apple-dark overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2 
          className="apple-section-title cursor-pointer" 
          onClick={() => {
            const demoSection = document.getElementById('demo')
            if (demoSection) {
              demoSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          title="서비스 미리보기 섹션으로 이동"
        >
          서비스 미리보기
        </h2>

        <div className="apple-section-container">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in">
            <p className="text-white/60 text-sm sm:text-base">
              요약부터 답장 제안까지, summy의 핵심 기능을 직접 체험해보세요
            </p>
          </div>

          <div className="apple-card overflow-hidden mx-auto">
            <div className="relative aspect-video rounded-t-xl overflow-hidden animate-fade-in">
    					<iframe 
                className="w-full h-full object-cover"
                src="https://youtu.be/MlzEKwIg8FM?si=uGmsN4mTu06nABJV" 
                title="summy 데모 영상" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="apple-card-content flex flex-col md:flex-row items-center justify-between">
              <div className="animate-slide-in-up mb-4 md:mb-0" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg sm:text-xl font-medium mb-1">대화의 바다에서 인사이트를 발굴</h3>
                <p className="text-white/60 text-sm">
                  2시간 미팅 요약과 완벽한 답장까지, 커뮤니케이션의 새로운 경험
                </p>
              </div>
              <div>
                <button
                  className="apple-button apple-button-secondary text-white/70 hover:text-white"
                  onClick={() => showToast({
                    type: 'info',
                    message: '더 많은 예제를 확인하는 페이지로 이동합니다.'
                  })}
                >
                  <span className="flex items-center gap-2">
                    더 많은 예제 보기
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 