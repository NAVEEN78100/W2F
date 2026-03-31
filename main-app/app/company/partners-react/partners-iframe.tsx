"use client"

import { useCallback, useRef, useState } from "react"

interface PartnersIframeProps {
  src: string
  title?: string
}

export default function PartnersIframe({ src, title = "Partners React" }: PartnersIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [frameHeight, setFrameHeight] = useState<number>(1200)

  const syncHeight = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    try {
      const doc = iframe.contentDocument
      if (!doc) return

      const nextHeight = Math.max(
        doc.documentElement?.scrollHeight || 0,
        doc.body?.scrollHeight || 0,
      )

      if (nextHeight > 0) {
        setFrameHeight(nextHeight)
      }
    } catch {
      // Same-origin expected; silently ignore if access is blocked.
    }
  }, [])

  const handleLoad = useCallback(() => {
    syncHeight()

    const iframe = iframeRef.current
    if (!iframe) return

    try {
      const doc = iframe.contentDocument
      if (!doc) return

      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(() => syncHeight())
        if (doc.body) observer.observe(doc.body)
        if (doc.documentElement) observer.observe(doc.documentElement)
      }

      const view = iframe.contentWindow
      if (view) {
        view.addEventListener("resize", syncHeight)
      }
    } catch {
      // Same-origin expected; silently ignore if access is blocked.
    }

    setTimeout(syncHeight, 250)
    setTimeout(syncHeight, 1000)
  }, [syncHeight])

  return (
    <div className="w-full">
      <iframe
        ref={iframeRef}
        title={title}
        src={src}
        onLoad={handleLoad}
        scrolling="no"
        style={{ width: "100%", height: `${frameHeight}px`, border: "none", display: "block" }}
      />
    </div>
  )
}
