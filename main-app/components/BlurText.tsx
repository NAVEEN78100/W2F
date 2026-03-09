"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useMemo } from "react"

type BlurTextProps = {
  text?: string
  delay?: number
  className?: string
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
}

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("")
  const ref = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  })

  const globalProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const defaultFrom = useMemo(
    () =>
      direction === "top" ? { filter: "blur(10px)", opacity: 0, y: -50 } : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {elements.map((segment, index) => {
        const elementDelay = index * 0.05
        const elementStart = 0.1 + elementDelay
        const elementEnd = Math.min(elementStart + 0.2, 1)

        return (
          <motion.span
            key={index}
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
            animate={{
              opacity:
                globalProgress.get() > elementStart
                  ? globalProgress.get() > elementEnd
                    ? 1
                    : Math.min((globalProgress.get() - elementStart) / (elementEnd - elementStart), 1)
                  : 0,
              filter:
                globalProgress.get() > elementStart
                  ? `blur(${Math.max(10 - ((globalProgress.get() - elementStart) / (elementEnd - elementStart)) * 10, 0)}px)`
                  : "blur(10px)",
              y: 0,
            }}
            transition={{
              duration: 0.2,
              ease: easing,
              delay: (index * delay) / 1000,
            }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        )
      })}
    </p>
  )
}

export default BlurText
