import React from "react";

interface Animation {
  id: number;
  title: string;
  description: string;
}

interface AnimationSelectorProps {
  animations: Animation[];
  activeAnimation: number;
  onSelect: (id: number) => void;
  progress: number;
}

const AnimationSelector: React.FC<AnimationSelectorProps> = ({
  animations,
  activeAnimation,
  onSelect,
  progress,
}) => {
  // SVG circle parameters
  const size = 56; // container size
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex gap-4">
      {animations.map((animation) => {
        const isActive = activeAnimation === animation.id;

        return (
          <button
            key={animation.id}
            onClick={() => onSelect(animation.id)}
            className={`relative w-14 h-14 rounded-full font-bold text-lg transition-all duration-300 ${
              isActive
                ? "bg-white text-pink-500 scale-110 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
            }`}
          >
            {/* Circular Progress Bar - only for active animation */}
            {isActive && (
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox={`0 0 ${size} ${size}`}
              >
                {/* Background circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="rgba(236, 72, 153, 0.2)"
                  strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-75 ease-linear"
                />
              </svg>
            )}
            {/* Number */}
            <span className="relative z-10">{animation.id}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AnimationSelector;
