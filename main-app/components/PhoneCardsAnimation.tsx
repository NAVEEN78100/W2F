"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface FeatureCard {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  emoji: string
}

interface PhoneCardsAnimationProps {
  featureCards: FeatureCard[]
}

export default function PhoneCardsAnimation({ featureCards }: PhoneCardsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Calculate initial positions for each card outside the phone
  const getCardPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI
    const radius = 400 // Increased radius to start further out
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  const cardProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0, 1, 1])

  // Create transforms for each card (assuming 5 cards max)
  const card0Position = getCardPosition(0, featureCards.length)
  const card1Position = getCardPosition(1, featureCards.length)
  const card2Position = getCardPosition(2, featureCards.length)
  const card3Position = getCardPosition(3, featureCards.length)
  const card4Position = getCardPosition(4, featureCards.length)

  const card0X = useTransform(cardProgress, [0, 1], [card0Position.x, 0])
  const card0Y = useTransform(cardProgress, [0, 1], [card0Position.y, -10])
  const card1X = useTransform(cardProgress, [0, 1], [card1Position.x, 0])
  const card1Y = useTransform(cardProgress, [0, 1], [card1Position.y, -5])
  const card2X = useTransform(cardProgress, [0, 1], [card2Position.x, 0])
  const card2Y = useTransform(cardProgress, [0, 1], [card2Position.y, 0])
  const card3X = useTransform(cardProgress, [0, 1], [card3Position.x, 0])
  const card3Y = useTransform(cardProgress, [0, 1], [card3Position.y, 5])
  const card4X = useTransform(cardProgress, [0, 1], [card4Position.x, 0])
  const card4Y = useTransform(cardProgress, [0, 1], [card4Position.y, 10])

  const cardScale = useTransform(cardProgress, [0, 0.5, 1], [0.8, 1, 0.35])
  const cardOpacity = useTransform(cardProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.9])

  const cardTransforms = [
    { x: card0X, y: card0Y },
    { x: card1X, y: card1Y },
    { x: card2X, y: card2Y },
    { x: card3X, y: card3Y },
    { x: card4X, y: card4Y },
  ]

  return (
    <div ref={containerRef} className="relative h-[100vh] overflow-hidden" suppressHydrationWarning>
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center px-4 relative" suppressHydrationWarning>
        {/* Central Phone Mockup - Fixed Position */}
        <motion.div
          className="w-48 h-[380px] sm:w-56 sm:h-[440px] md:w-64 md:h-[500px] bg-gray-900 rounded-[2.5rem] p-2 sm:p-3 shadow-2xl z-20 relative mx-auto"
          suppressHydrationWarning
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-full rounded-[2rem] bg-white relative overflow-hidden">
            {/* Phone Status Bar */}
            <div className="flex justify-between items-center px-3 sm:px-4 py-1.5 sm:py-2 text-gray-800 text-xs">
              <span>9:41</span>
              <div className="flex space-x-1">
                <div className="w-2.5 h-1 sm:w-3 sm:h-1.5 bg-gray-800 rounded-sm"></div>
                <div className="w-2.5 h-1 sm:w-3 sm:h-1.5 bg-gray-800 rounded-sm"></div>
                <div className="w-3 h-1 sm:w-4 sm:h-1.5 bg-gray-800 rounded-sm"></div>
              </div>
            </div>

            <div className="flex items-center justify-center h-full pt-6 sm:pt-8 pb-3 sm:pb-4">
              <div className="text-center text-gray-400 text-sm">{""}</div>
            </div>
          </div>
        </motion.div>

        {featureCards.map((card, index) => (
          <motion.div
            key={index}
            initial={false}
            className={`absolute w-40 h-28 sm:w-48 sm:h-32 md:w-52 md:h-36 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 shadow-2xl flex flex-col justify-between z-30 border border-white/10`}
            suppressHydrationWarning
            style={{
              x: cardTransforms[index]?.x || 0,
              y: cardTransforms[index]?.y || 0,
              scale: cardScale,
              opacity: cardOpacity,
              left: "50%",
              top: "50%",
              marginLeft: "-6.5rem", // Half of card width (52/4 = 13rem, 13/2 = 6.5rem)
              marginTop: "-4.5rem", // Half of card height (36/4 = 9rem, 9/2 = 4.5rem)
              background:
                index === 0
                  ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" // Green feature card
                  : index === 1
                    ? "linear-gradient(135deg, #f8b4cb 0%, #f472b6 100%)" // Pink feature card
                    : index === 2
                      ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)" // Blue feature card
                      : index === 3
                        ? "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)" // Purple card
                        : "linear-gradient(135deg, #fb923c 0%, #f97316 100%)", // Orange card
              zIndex: 30 + index,
              boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {card.emoji}
                </div>
                <span
                  className="text-white font-bold text-[13px] sm:text-[15px] leading-tight tracking-tight"
                  style={{
                    fontFamily: "'Sora', 'Poppins', 'Avenir Next', 'Segoe UI', sans-serif",
                    textShadow: "0 1px 8px rgba(0,0,0,0.18)",
                  }}
                >
                  {card.title}
                </span>
              </div>
            </div>

            <div className="text-white">
              <div className="space-y-1">
                <div
                  className="text-[11px] sm:text-[13px] opacity-95 leading-[1.3] font-medium"
                  style={{
                    fontFamily: "'Manrope', 'Inter', 'Segoe UI', sans-serif",
                    textShadow: "0 1px 6px rgba(0,0,0,0.14)",
                  }}
                >
                  {card.description}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="absolute inset-0 bg-white z-0"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.6, 0.3]),
          }}
        />
      </div>
    </div>
  )
}
