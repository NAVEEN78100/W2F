import React from 'react'

interface Animation {
  id: number
  title: string
  description: string
}

interface AnimationSelectorProps {
  animations: Animation[]
  activeAnimation: number
  onSelect: (id: number) => void
}

const AnimationSelector: React.FC<AnimationSelectorProps> = ({ animations, activeAnimation, onSelect }) => {
  return (
    <div className="flex gap-4">
      {animations.map((animation) => (
        <button
          key={animation.id}
          onClick={() => onSelect(animation.id)}
          className={`w-14 h-14 rounded-full font-bold text-lg transition-all duration-300 ${
            activeAnimation === animation.id
              ? 'bg-white text-pink-500 scale-110 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
          }`}
        >
          {animation.id}
        </button>
      ))}
    </div>
  )
}

export default AnimationSelector
