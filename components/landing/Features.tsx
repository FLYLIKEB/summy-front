'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionTitle } from '@/components/common/Section'

const features = [
  {
    title: '자동 요약',
    description: '카카오톡, 인스타그램 등 다양한 메신저의 대화를 자동으로 요약해드립니다. 긴 대화 내용도 핵심만 쏙쏙 뽑아서 보여드려요.',
    icon: '📝'
  },
  {
    title: '맞춤형 답장',
    description: '상대방의 말투와 감정을 분석해서 그에 맞는 답장을 제안해드립니다. 자연스러운 대화를 이어갈 수 있도록 도와드려요.',
    icon: '💌'
  },
  {
    title: '감정 분석',
    description: '대화 속 감정을 분석해서 상대방의 기분과 상황을 파악할 수 있게 해드립니다. 더 섬세한 소통이 가능해져요.',
    icon: '❤️'
  },
  {
    title: '맥락 이해',
    description: '이전 대화 내용을 기억하고 맥락을 이해해서 더 자연스러운 대화를 이어갈 수 있도록 도와드립니다.',
    icon: '🧠'
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

export default function Features() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#1a1a1f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <h2 
            className="apple-section-title cursor-pointer" 
            onClick={() => {
              const featuresSection = document.getElementById('features')
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            title="핵심 기능 섹션으로 이동"
          >
            핵심 기능
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            Summy는 카카오톡이나 인스타 메시지 같은 텍스트 대화를 자동으로 요약하고, 상대방의 말투와 감정에 맞는 답장을 제안해주는 AI 서비스입니다.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.04] transition-all duration-300 shadow-sm hover:bg-white/[0.04]"
            >
              <div className="p-5 lg:p-6">
                <div className="flex items-start gap-5">
                  {/* 아이콘 */}
                  <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden bg-white/[0.04] border border-white/[0.06] shadow-sm flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl">{feature.icon}</span>
                  </div>

                  {/* 내용 */}
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 