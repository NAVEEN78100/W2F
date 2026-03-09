import React, { useState, useEffect } from 'react'
import { Heart, X, Undo } from 'lucide-react'

const dishes = [
  {
    id: 1,
    name: 'Chicken Biryani',
    restaurant: 'Biryani Experiment',
    location: 'RS Puram',
    price: '₹280',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    color: 'from-orange-500 to-pink-500'
  },
  {
    id: 2,
    name: 'Butter Chicken',
    restaurant: 'The Spice Room',
    location: 'Gandhipuram',
    price: '₹320',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 3,
    name: 'Masala Dosa',
    restaurant: 'South Indian Delight',
    location: 'Saibaba Colony',
    price: '₹120',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    color: 'from-yellow-500 to-orange-500'
  }
]

const SwipeCardsAnimation: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, show: false })
  const [description, setDescription] = useState('Browse Favorite Dishes')

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))

      setCursorPos({ x: 260, y: 480, show: true })
      await new Promise(resolve => setTimeout(resolve, 300))
      setCursorPos({ x: 280, y: 460, show: true })
      await new Promise(resolve => setTimeout(resolve, 300))
      setCursorPos({ x: 300, y: 440, show: true })

      await new Promise(resolve => setTimeout(resolve, 500))
      setSwipeDirection('right')
      setDescription('Swipe Right to Wishlist')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 800))
      setCurrentCard(1)
      setSwipeDirection(null)
      setDescription('Browse Favorite Dishes')

      await new Promise(resolve => setTimeout(resolve, 1500))

      setCursorPos({ x: 100, y: 480, show: true })
      await new Promise(resolve => setTimeout(resolve, 300))
      setCursorPos({ x: 80, y: 460, show: true })
      await new Promise(resolve => setTimeout(resolve, 300))
      setCursorPos({ x: 60, y: 440, show: true })

      await new Promise(resolve => setTimeout(resolve, 500))
      setSwipeDirection('left')
      setDescription('Swipe Left to Skip')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 800))
      setCurrentCard(2)
      setSwipeDirection(null)
      setDescription('Browse Favorite Dishes')

      await new Promise(resolve => setTimeout(resolve, 1500))

      setCursorPos({ x: 260, y: 480, show: true })
      await new Promise(resolve => setTimeout(resolve, 300))
      setCursorPos({ x: 280, y: 460, show: true })
      await new Promise(resolve => setTimeout(resolve, 300))
      setCursorPos({ x: 300, y: 440, show: true })

      await new Promise(resolve => setTimeout(resolve, 500))
      setSwipeDirection('right')
      setDescription('Swipe Right to Wishlist')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 800))
      setCurrentCard(0)
      setSwipeDirection(null)
      setDescription('Browse Favorite Dishes')
    }

    sequence()
  }, [])

  const currentDish = dishes[currentCard]

  return (
    <div className="h-full bg-gray-950 text-white relative p-6 flex flex-col">
      {/* Cursor animation */}
      {cursorPos.show && (
        <div
          className="absolute z-50 pointer-events-none transition-all duration-300"
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        >
          <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Favourite</h1>
        <p className="text-yellow-400 text-sm font-semibold mb-1">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>📍 Coimbatore</span>
        </div>
      </div>

      {/* Centered Cards */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-[280px] mx-auto flex items-center justify-center h-[420px]">
          {dishes.map((dish, index) => {
            const isActive = index === currentCard
            const offset = index - currentCard

            return (
              <div
                key={dish.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  !isActive ? 'pointer-events-none' : ''
                }`}
                style={{
                  transform: `
                    translateX(${offset * 20}px)
                    translateY(${offset * 10}px)
                    scale(${isActive ? 1 : 0.95})
                    ${swipeDirection === 'right' && isActive ? 'translateX(400px) rotate(20deg)' : ''}
                    ${swipeDirection === 'left' && isActive ? 'translateX(-400px) rotate(-20deg)' : ''}
                  `,
                  opacity: Math.max(0, 1 - Math.abs(offset) * 0.3),
                  zIndex: 10 - Math.abs(offset)
                }}
              >
                <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[3/4] relative flex items-center justify-center">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${dish.color} opacity-20`}></div>

                    {/* Swipe animations */}
                    {swipeDirection === 'right' && isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center animate-scale">
                          <Heart className="w-16 h-16 fill-white text-white" />
                        </div>
                      </div>
                    )}
                    {swipeDirection === 'left' && isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center animate-scale">
                          <X className="w-16 h-16 text-white stroke-[3]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="bg-gray-900 p-6">
                    <h2 className="text-2xl font-bold mb-2">{dish.name}</h2>
                    <p className="text-gray-300 mb-1">{dish.restaurant}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        📍 {dish.location}
                      </p>
                      <p className="text-xl font-bold text-yellow-400">{dish.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Buttons and Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-center gap-8 pb-4">
          <button className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg border-2 border-red-500/20">
            <X className="w-8 h-8 text-red-500" />
          </button>
          <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
            <Undo className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
            <Heart className="w-10 h-10 text-white" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 pb-2">
          {dishes.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentCard ? 'w-8 bg-yellow-400' : 'w-2 bg-gray-700'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SwipeCardsAnimation
