'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'gradient-primary' | 'gradient-secondary' | 'gradient-dark' | 'transparent'
  spacing?: boolean
  id?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'transparent',
  spacing = true,
  id
}) => {
  const backgroundStyles = {
    'gradient-primary': 'bg-gradient-to-b from-purple-900/30 to-transparent backdrop-blur-sm',
    'gradient-secondary': 'bg-gradient-to-b from-black to-gray-900',
    'gradient-dark': 'bg-gradient-to-b from-gray-900 to-black',
    'transparent': '',
  }

  return (
    <section id={id} className={cn(
      spacing && 'section-padding',
      backgroundStyles[background],
      'relative overflow-hidden',
      className
    )}>
      {children}
    </section>
  )
}

// SectionTitle 컴포넌트
interface SectionTitleProps {
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  centered = true,
  className,
}) => {
  return (
    <div className={cn(
      'component-spacing',
      centered && 'text-center',
      centered && description && 'max-w-2xl mx-auto',
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}

// SectionContainer 컴포넌트
interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'narrow' | 'medium' | 'wide' | 'extra-wide'
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className,
  size = 'wide',
}) => {
  const sizeClasses = {
    'narrow': 'content-narrow',
    'medium': 'content-medium',
    'wide': 'content-wide',
    'extra-wide': 'content-extra-wide',
  }

  return (
    <div className={cn(
      'container-padding',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
} 