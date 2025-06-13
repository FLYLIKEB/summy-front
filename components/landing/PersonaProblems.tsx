'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const personas = [
  {
    name: '연애 중인 직장인 A',
    emoji: '😩',
    image: '/images/personas/team-leader.svg',
    problem: '바쁜 업무 중에도 연인과의 대화를 놓치고 싶지 않아요.',
    problemFull: '하루 종일 바쁜 업무 중에도 연인과의 대화를 놓치고 싶지 않은데, 메시지를 제대로 읽고 답장하기가 어려워요. 때로는 대화 맥락을 놓치기도 하고요.',
    tags: ['#시간부족', '#대화맥락'],
    solution: '대화 자동 요약 및 맞춤형 답장 제안'
  },
  {
    name: '썸 타는 대학생 B',
    emoji: '🫣',
    image: '/images/personas/designer.svg',
    problem: '답장을 어떻게 해야 할지 고민이 많아요.',
    problemFull: '상대방의 메시지에 어떻게 답장해야 할지 항상 고민이에요. 적절한 톤과 내용으로 답장하고 싶은데, 매번 시간이 오래 걸려요.',
    tags: ['#답장고민', '#시간절약'],
    solution: '상황에 맞는 답장 문구 추천'
  },
  {
    name: '연애 초보 C',
    emoji: '😮‍💨',
    image: '/images/personas/developer.svg',
    problem: '대화를 어떻게 이어가야 할지 모르겠어요.',
    problemFull: '연애 경험이 적어서 대화를 어떻게 이어가야 할지 모르겠어요. 상대방의 관심사에 맞는 대화 주제를 찾고, 자연스럽게 대화를 이어가고 싶어요.',
    tags: ['#대화기술', '#관심사파악'],
    solution: '대화 주제 추천 및 자연스러운 대화 이어가기'
  },
  {
    name: '바쁜 직장인 D',
    emoji: '😅',
    image: '/images/personas/student.svg',
    problem: '대화 내용을 놓치고 적절한 반응이 어려워요.',
    problemFull: '업무로 바쁜 와중에 연인과의 대화를 놓치고, 나중에 보니 중요한 내용을 놓쳤어요. 적절한 시점에 적절한 반응을 하고 싶은데 어려워요.',
    tags: ['#정보정리', '#답장고민'],
    solution: '대화 내용 요약 및 상황별 답장 추천'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function PersonaProblems() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#1a1a1f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <h2 
            className="apple-section-title cursor-pointer" 
            onClick={() => {
              const problemsSection = document.getElementById('problems')
              if (problemsSection) {
                problemsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            title="왜 필요한가요? 섹션으로 이동"
          >
            왜 필요한가요?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            연애와 썸에서의 소통은 더욱 특별한 주의가 필요합니다
          </p>
        </div>

        {/* 모바일 스냅 스크롤 컨테이너 */}
        <div className="sm:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-4 w-max"
          >
            {personas.map((persona, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.04] transition-all duration-300 w-[85vw] max-w-sm snap-center flex-shrink-0 shadow-sm"
              >
                <div className="p-4">
                  <div className="flex flex-col items-center gap-3">
                    {/* 캐릭터 이미지와 이름을 나란히 배치 */}
                    <div className="flex items-center gap-3 w-full">
                      {/* 캐릭터 이미지 */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white/[0.04] border border-white/[0.06] shadow-sm flex-shrink-0">
                        <Image
                          src={persona.image}
                          alt={persona.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{persona.emoji}</span>
                          <h3 className="text-base font-medium text-white">{persona.name}</h3>
                        </div>
                        
                        {/* 태그 */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {persona.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-white/70 border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 내용 */}
                    <div className="text-left w-full">
                      <p className="text-white/80 text-xs mb-3">
                        &quot;{persona.problem}&quot;
                      </p>

                      {/* 해결책 */}
                      <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04] shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-base">✨</span>
                          <p className="text-white/70 text-xs">{persona.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 데스크톱 그리드 레이아웃 */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.04] transition-all duration-300 shadow-sm hover:bg-white/[0.04]"
            >
              <div className="p-5 lg:p-6">
                <div className="flex items-start gap-5">
                  {/* 캐릭터 이미지 */}
                  <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden bg-white/[0.04] border border-white/[0.06] shadow-sm">
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  {/* 내용 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{persona.emoji}</span>
                      <h3 className="text-xl font-medium text-white">{persona.name}</h3>
                    </div>
                    
                    <p className="text-white/80 text-sm mb-3">
                      &quot;{persona.problemFull}&quot;
                    </p>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {persona.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-white/70 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 해결책 */}
                    <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04] shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✨</span>
                        <div>
                          <p className="text-white font-medium text-xs mb-1">summy의 해결책</p>
                          <p className="text-white/70 text-sm">{persona.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 모바일 CTA 버튼 */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="sm:hidden fixed bottom-6 right-4 z-50"
        >
          <Link
            href="/home"
            className="px-4 py-2.5 bg-white/10 text-white rounded-lg text-sm font-medium transition-all hover:bg-white/15 backdrop-blur-md inline-flex items-center gap-2"
          >
            <span className="bg-white/10 p-1.5 rounded-full text-sm">🎮</span>
            시작하기
          </Link>
        </motion.div>
      </AnimatePresence>
    </section>
  )
} 