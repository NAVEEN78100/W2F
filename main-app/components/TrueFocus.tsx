"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import "../styles/TrueFocus.css"

interface TrueFocusProps {
  sentence: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
}

export default function TrueFocus({
  sentence,
  manualMode = false,
  blurAmount = 5,
  borderColor = "red",
  animationDuration = 2,
  pauseBetweenAnimations = 1,
}: TrueFocusProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [framePosition, setFramePosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const words = sentence.split(" ")

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setActiveIndex((prev) => {
            const nextIndex = prev === null ? 0 : (prev + 1) % words.length
            return nextIndex
          })
        },
        (animationDuration + pauseBetweenAnimations) * 1000,
      )

      return () => clearInterval(interval)
    }
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations])

  useEffect(() => {
    if (activeIndex !== null && containerRef.current) {
      const activeWord = containerRef.current.children[activeIndex] as HTMLElement
      if (activeWord) {
        const rect = activeWord.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        setFramePosition({
          top: rect.top - containerRect.top,
          left: rect.left - containerRect.left,
          width: rect.width,
          height: rect.height,
        })
      }
    }
  }, [activeIndex])

  const handleWordClick = (index: number) => {
    if (manualMode) {
      setActiveIndex(index === activeIndex ? null : index)
    }
  }

  return (
    <div
      className="focus-container"
      ref={containerRef}
      style={{ "--border-color": borderColor } as React.CSSProperties}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className={`focus-word ${activeIndex === index ? "active" : ""}`}
          onClick={() => handleWordClick(index)}
          style={{
            filter: activeIndex !== null && activeIndex !== index ? `blur(${blurAmount}px)` : "blur(0)",
            color: activeIndex === index ? borderColor : "inherit",
          }}
        >
          {word}
        </span>
      ))}

      {activeIndex !== null && (
        <div
          className="focus-frame"
          style={{
            top: framePosition.top,
            left: framePosition.left,
            width: framePosition.width,
            height: framePosition.height,
          }}
        >
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>
      )}
    </div>
  )
}
