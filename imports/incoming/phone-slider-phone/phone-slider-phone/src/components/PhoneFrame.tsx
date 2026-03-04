import React, { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-[55px] blur-2xl"></div>

      {/* Phone frame */}
      <div className="relative w-[350px] h-[685px] bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-[6px] border-slate-700/50 overflow-hidden">
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[48px] pointer-events-none"></div>

        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-3xl z-50 flex items-center justify-center shadow-lg">
          <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
        </div>

        {/* Screen content */}
        <div className="w-full h-full bg-gradient-to-b from-gray-950 to-black overflow-hidden relative">
          {/* Status bar */}
          <div className="absolute top-4 left-6 text-white text-sm font-medium z-40">9:41</div>
          <div className="absolute top-4 right-6 flex items-center gap-1.5 z-40">
            {/* Signal icon */}
            <svg className="w-4 h-4 text-white opacity-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            {/* WiFi icon */}
            <svg className="w-4 h-4 text-white opacity-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
            </svg>
            {/* Battery icon */}
            <svg className="w-6 h-6 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="7" width="18" height="10" rx="2" strokeWidth="2"/>
              <rect x="4" y="9" width="14" height="6" fill="currentColor" fillOpacity="0.9"/>
              <path d="M20 10v4" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Content area */}
          <div className="pt-12 h-full">
            {children}
          </div>
        </div>

        {/* Bottom reflection effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none rounded-b-[48px]"></div>
      </div>
    </div>
  )
}

export default PhoneFrame
