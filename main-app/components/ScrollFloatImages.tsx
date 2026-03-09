"use client"

import type React from "react"
import { useEffect, useRef, type ReactNode, type RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "./ScrollFloatImages.css"

gsap.registerPlugin(ScrollTrigger)

interface ScrollFloatImagesProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement | null>
  containerClassName?: string
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
  scrub?: boolean | number
  style?: React.CSSProperties
}

const ScrollFloatImages: React.FC<ScrollFloatImagesProps> = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  animationDuration = 2.2,
  ease = "back.inOut(2)",
  scrollStart = "top bottom+=70%",
  scrollEnd = "bottom top+=10%",
  stagger = 0.1,
  scrub = 2.0,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window

    const ctx = gsap.context(() => {
      const imageElements = el.querySelectorAll(".scroll-float-image-item")

      gsap.fromTo(
        imageElements,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scale: 0.75,
          rotate: 8,
          transformOrigin: "50% 50%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scale: 1,
          rotate: 0,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, scrub])

  return (
    <div ref={containerRef} className={`scroll-float-images ${containerClassName}`} style={style}>
      {children}
    </div>
  )
}

export default ScrollFloatImages