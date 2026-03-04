import React, { useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface ComingSoonAnimationProps {
  onComplete?: () => void
}

const ComingSoonAnimation: React.FC<ComingSoonAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="h-full bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="text-center animate-fadeIn">
        <div className="relative inline-block mb-8">
          <Sparkles className="w-24 h-24 text-yellow-400 animate-pulse" />
          <div className="absolute inset-0 animate-ping">
            <Sparkles className="w-24 h-24 text-yellow-400 opacity-50" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          Coming Soon
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          More exciting features on the way!
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoonAnimation
