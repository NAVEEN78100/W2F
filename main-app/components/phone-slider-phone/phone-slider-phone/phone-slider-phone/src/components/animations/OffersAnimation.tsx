import React, { useState, useEffect } from 'react'
import { Gift, Share2, MapPin, ChevronRight } from 'lucide-react'

const offers = [
  {
    id: 1,
    title: '50% OFF',
    subtitle: 'On All Biryanis',
    restaurant: 'Biryani Experiment',
    location: 'RS Puram',
    validUntil: 'Valid till Dec 31',
    code: 'BIRYANI50',
    color: 'from-orange-500 to-pink-500',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'BUY 1 GET 1',
    subtitle: 'On Desserts',
    restaurant: 'Sweet Dreams Cafe',
    location: 'Gandhipuram',
    validUntil: 'Valid till Dec 25',
    code: 'SWEET2X',
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
  },
  {
    id: 3,
    title: '₹200 OFF',
    subtitle: 'On Orders Above ₹999',
    restaurant: 'The Spice Room',
    location: 'Saibaba Colony',
    validUntil: 'Valid till Jan 15',
    code: 'SPICE200',
    color: 'from-green-500 to-teal-500',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
  }
]

interface OffersAnimationProps {
  onComplete?: () => void
}

const OffersAnimation: React.FC<OffersAnimationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [currentOffer, setCurrentOffer] = useState(0)
  const [showShare, setShowShare] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, show: false })
  const [description, setDescription] = useState('Home Page')

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setCursorPos({ x: 300, y: 100, show: true })

      await new Promise(resolve => setTimeout(resolve, 800))
      setStep(2)
      setDescription('View Available Offers')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 1800))
      setDescription('Swipe Through Offers')
      setCurrentOffer(1)

      await new Promise(resolve => setTimeout(resolve, 1500))
      setCurrentOffer(2)

      await new Promise(resolve => setTimeout(resolve, 1500))
      setCursorPos({ x: 180, y: 650, show: true })

      await new Promise(resolve => setTimeout(resolve, 800))
      setShowShare(true)
      setDescription('Share Offer on Social Media')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 2500))
      setShowShare(false)
      setStep(1)
      setCurrentOffer(0)
      setDescription('Home Page')
      if (onComplete) onComplete()
    }

    sequence()
  }, [onComplete])

  return (
    <div className="h-full bg-gray-950 text-white relative">
      {cursorPos.show && (
        <div
          className="absolute z-50 pointer-events-none transition-all duration-300"
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        >
          <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      )}

      {step === 1 && (
        <div className="h-full p-6 flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Discover</h1>
              <p className="text-yellow-400 text-sm font-semibold">{description}</p>
              <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                <MapPin className="w-4 h-4" />
                <span>Coimbatore</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative">
                <Gift className="w-7 h-7 text-yellow-400" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-xs flex items-center justify-center font-bold">3</span>
              </button>
            </div>
          </div>

          <div className="relative mb-6">
            <button className="absolute top-4 right-4 z-10 bg-yellow-500 text-gray-900 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
              Offers
            </button>
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 h-48 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-3">Welcome!</h2>
                <p className="text-lg opacity-90">Discover amazing deals near you</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Popular Restaurants</h3>
            <div className="space-y-3">
              <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-4">
                <img
                  src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                  alt="Restaurant"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">Biryani Experiment</h4>
                  <p className="text-sm text-gray-400">Mughlai, Biryani</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-4">
                <img
                  src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                  alt="Restaurant"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">Sweet Dreams Cafe</h4>
                  <p className="text-sm text-gray-400">Desserts, Cafe</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="h-full flex flex-col animate-fadeIn">
          <div className="p-6 pb-4">
            <h2 className="text-2xl font-bold mb-1">Exclusive Offers</h2>
            <p className="text-yellow-400 text-sm font-semibold mb-1">{description}</p>
            <p className="text-gray-400 text-sm">Swipe to explore all available deals</p>
          </div>

          <div className="flex-1 px-6 pb-6 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{ transform: `translateX(-${currentOffer * 320}px)` }}
            >
              {offers.map((offer) => (
                <div key={offer.id} className="flex-shrink-0 w-[300px]">
                  <div className={`bg-gradient-to-br ${offer.color} rounded-2xl overflow-hidden shadow-2xl`}>
                    <div className="relative h-32">
                      <img
                        src={offer.image}
                        alt={offer.restaurant}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                        {offer.validUntil}
                      </div>
                    </div>

                    <div className="p-6 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                      <div className="relative z-10">
                        <h3 className="text-4xl font-bold mb-2">{offer.title}</h3>
                        <p className="text-xl opacity-90 mb-4">{offer.subtitle}</p>

                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-3">
                          <p className="text-sm font-semibold mb-1">{offer.restaurant}</p>
                          <p className="text-xs opacity-80 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {offer.location}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-mono font-bold text-sm">
                            {offer.code}
                          </div>
                          <button className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {offers.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentOffer ? 'w-8 bg-yellow-400' : 'w-2 bg-gray-700'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showShare && (
        <div className="absolute inset-0 bg-gray-950/95 z-40 flex items-end animate-slideUp">
          <div className="w-full bg-gray-900 rounded-t-3xl p-6">
            <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold mb-2">Share Offer</h3>
            <p className="text-sm text-gray-400 mb-6">Spread the word on your favorite platform</p>

            <div className="grid grid-cols-4 gap-6 mb-6">
              <button className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📱</span>
                </div>
                <span className="text-xs font-semibold">Instagram</span>
              </button>
              <button className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <span className="text-xs font-semibold">Facebook</span>
              </button>
              <button className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <span className="text-xs font-semibold">WhatsApp</span>
              </button>
              <button className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🐦</span>
                </div>
                <span className="text-xs font-semibold">Twitter</span>
              </button>
            </div>

            <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold py-3 rounded-xl">
              Copy Link to Share
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OffersAnimation
