'use client'

import React, { useState, useEffect } from 'react'
import PhoneFrame from '@/components/PhoneFrame'
import AnimationSelector from '@/components/AnimationSelector'
import QRScanAnimation from '@/components/animations/QRScanAnimation'
import BrowseRestaurantsAnimation from '@/components/animations/BrowseRestaurantsAnimation'
import OffersAnimation from '@/components/animations/OffersAnimation'
import SwipeCardsAnimation from '@/components/animations/SwipeCardsAnimation'
import ComingSoonAnimation from '@/components/animations/ComingSoonAnimation'

export default function DemoPage() {
  const [activeAnimation, setActiveAnimation] = useState(1)
  const [showRestart, setShowRestart] = useState(false)

  const animations = [
    { id: 1, title: 'QR Scan & Rate', description: 'Scan QR codes at restaurants, view menus, and leave ratings with instant rewards', component: <QRScanAnimation />, duration: 17000 },
    { id: 2, title: 'Browse & Filter', description: 'Discover top-rated places in Coimbatore with powerful filtering options', component: <BrowseRestaurantsAnimation />, duration: 8500 },
    { id: 3, title: 'Exclusive Offers', description: 'View and share special offers from your favorite restaurants', component: <OffersAnimation />, duration: 9000 },
    { id: 4, title: 'Swipe to Save', description: 'Swipe right to wishlist dishes, swipe left to skip', component: <SwipeCardsAnimation />, duration: 12000 },
    { id: 5, title: 'Coming Soon', description: 'More exciting features on the way', component: <ComingSoonAnimation />, duration: 4000 },
  ]

  useEffect(() => {
    const current = animations.find(a => a.id === activeAnimation)
    if (!current) return
    const timer = setTimeout(() => {
      if (activeAnimation < animations.length) setActiveAnimation(prev => prev + 1)
      else setShowRestart(true)
    }, current.duration)
    return () => clearTimeout(timer)
  }, [activeAnimation])

  const currentAnimation = animations.find(a => a.id === activeAnimation)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-orange-500 to-orange-400 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="flex-1 text-white max-w-xl">
          <div className="mb-8">
            <div className="w-1 h-24 bg-yellow-400 mb-6"></div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">{currentAnimation?.title.toUpperCase()}</h1>
            <p className="text-xl opacity-90">{currentAnimation?.description}</p>
          </div>

          <AnimationSelector animations={animations} activeAnimation={activeAnimation} onSelect={setActiveAnimation} />

          {showRestart && (
            <button onClick={() => { setShowRestart(false); setActiveAnimation(1) }} className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
              RESTART DEMO
            </button>
          )}
        </div>

        <div className="flex-shrink-0">
          <PhoneFrame>{currentAnimation?.component}</PhoneFrame>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes scale { 0% { transform: scale(0); opacity: 0 } 50% { transform: scale(1.1) } 100% { transform: scale(1); opacity: 1 } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out }
        .animate-slideIn { animation: slideIn 0.5s ease-out }
        .animate-slideUp { animation: slideUp 0.3s ease-out }
        .animate-scale { animation: scale 0.4s ease-out }
      `}</style>
    </div>
  )
}
