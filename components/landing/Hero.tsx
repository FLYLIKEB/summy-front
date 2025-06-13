'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../common/Logo'
import ScrollDownButton from '../common/ScrollDownButton'

/**
 * 히어로 섹션 컴포넌트
 * 
 * 웹사이트의 메인 랜딩 영역으로 서비스의 핵심 가치를 보여주고
 * 사용자가 서비스에 빠르게 접근할 수 있는 경로를 제공합니다.
 */
export default function Hero() {
  // 스크롤 관련 상태 관리
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 상태 설정
    setMounted(true)
    
    // 스크롤 이벤트 핸들러: 300px 이상 스크롤 시 상단 이동 버튼 표시
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    // 이벤트 리스너 등록 및 클린업
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 페이지 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 애니메이션 적용
    })
  }

  // 서버사이드 렌더링 대응: 마운트 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null
  }

  return (
    <section className="relative h-screen flex flex-col justify-start pt-[12vh] sm:pt-[15vh] overflow-hidden bg-apple-dark">
      {/* 주요 콘텐츠 영역 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-5 md:space-y-6 mb-5 md:mb-6">
            {/* 로고 영역 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight cursor-pointer"
              onClick={() => {
                const heroSection = document.getElementById('hero')
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              title="맨 위로 이동"
            >
              <Logo variant="text" size="xl" />
            </motion.h1>

            {/* 주요 특징 설명 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-4">
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
                  일상 속에서 느낀 문제에서 시작된 프로젝트
                </p>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                  연애나 썸을 타는 상황에서, 상대의 말을 어떻게 받아치고, 어떤 타이밍에 어떤 말을 해야 할지 고민하셨나요?
                </p>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                  많은 사람들이 "답장을 여러 번 지웠다", "어떻게 말할지 너무 오래 고민한다", "대화 내용을 다시 보고 싶다"는 이야기를 했습니다.
                </p>
              </div>
            </motion.div>

            {/* CTA 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            >
              <Link
                href="/home"
                className="apple-button apple-button-primary px-8 py-3 text-lg rounded-full"
              >
                시작하기
              </Link>
              <Link
                href="#features"
                className="apple-button apple-button-secondary px-8 py-3 text-lg rounded-full"
              >
                자세히 알아보기
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />

      {/* 스크롤 다운 버튼 컴포넌트 */}
      <ScrollDownButton delay={0.8} />

      {/* 스크롤 업 버튼: 페이지를 충분히 내렸을 때만 표시됨 */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-2.5 bg-white-opacity-06 backdrop-blur-md rounded-full text-white hover:bg-white-opacity-10 transition-all border border-white-opacity-04"
            aria-label="맨 위로 스크롤"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
} 