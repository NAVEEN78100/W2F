import React, { useState, useEffect } from 'react'
import { ChevronLeft, Filter, Star, Plus, MapPin } from 'lucide-react'

const restaurants = [
  {
    id: 1,
    name: 'Biryani Experiment',
    location: 'Mughlai, Biryani',
    area: 'RS Puram',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop'
  },
  {
    id: 2,
    name: 'South Indian Delight',
    location: 'South Indian',
    area: 'Gandhipuram',
    rating: 4.3,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop'
  },
  {
    id: 3,
    name: 'Curry House',
    location: 'North Indian',
    area: 'Saibaba Colony',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop'
  },
  {
    id: 4,
    name: 'Paneer Palace',
    location: 'Vegetarian',
    area: 'RS Puram',
    rating: 4.4,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop'
  },
  {
    id: 5,
    name: 'Coastal Kitchen',
    location: 'Seafood',
    area: 'Peelamedu',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop'
  },
]

interface BrowseRestaurantsAnimationProps {
  onComplete?: () => void
}

const BrowseRestaurantsAnimation: React.FC<BrowseRestaurantsAnimationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [showCategories, setShowCategories] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, show: false })
  const [description, setDescription] = useState('Select Your Category')

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setCursorPos({ x: 220, y: 320, show: true })

      await new Promise(resolve => setTimeout(resolve, 800))
      setShowCategories(false)
      setStep(2)
      setDescription('Browse Available Restaurants')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 1500))
      setCursorPos({ x: 300, y: 140, show: true })

      await new Promise(resolve => setTimeout(resolve, 800))
      setShowFilter(true)
      setDescription('Apply Filters')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 1000))
      setCursorPos({ x: 150, y: 350, show: true })

      await new Promise(resolve => setTimeout(resolve, 500))
      setCursorPos({ x: 150, y: 420, show: true })

      await new Promise(resolve => setTimeout(resolve, 800))
      setFilteredRestaurants([restaurants[0], restaurants[3]])
      setShowFilter(false)
      setDescription('Filtered Results')
      setCursorPos({ x: 0, y: 0, show: false })

      await new Promise(resolve => setTimeout(resolve, 2500))
      setStep(1)
      setShowCategories(true)
      setFilteredRestaurants(restaurants)
      setDescription('Select Your Category')
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

      {showCategories && (
        <div className="h-full p-6 flex flex-col animate-fadeIn">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Discover Coimbatore</h1>
            <p className="text-yellow-400 text-sm font-semibold mb-2">{description}</p>
            <p className="text-gray-400">Choose from hotels, restaurants, hangout spots, or home bakers</p>
          </div>

          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
              <div className="text-5xl mb-3">🏨</div>
              <span className="font-semibold text-center text-lg">Star Hotels</span>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
              <div className="text-5xl mb-3">🍴</div>
              <span className="font-semibold text-center text-lg">Restaurants</span>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
              <div className="text-5xl mb-3">📍</div>
              <span className="font-semibold text-center text-lg">Hangout Spots</span>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
              <div className="text-5xl mb-3">🎂</div>
              <span className="font-semibold text-center text-lg">Home Bakers</span>
            </div>
          </div>
        </div>
      )}

      {!showCategories && (
        <div className="h-full flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between p-6 pb-4">
            <ChevronLeft className="w-6 h-6" />
            <div className="text-center">
              <h2 className="text-xl font-bold">Restaurants</h2>
              <p className="text-xs text-yellow-400 font-semibold">{description}</p>
            </div>
            <Filter className="w-6 h-6 text-yellow-400 cursor-pointer" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Showing {filteredRestaurants.length} restaurants in Coimbatore
            </p>
            {filteredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="bg-gray-900 rounded-xl p-4 mb-4 flex items-center gap-4 animate-slideIn hover:bg-gray-800 transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                  <p className="text-sm text-gray-400">{restaurant.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{restaurant.rating}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{restaurant.area}</span>
                  </div>
                </div>
                <Plus className="w-6 h-6 text-yellow-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {showFilter && (
        <div className="absolute inset-0 bg-gray-950/95 z-40 flex items-end animate-slideUp">
          <div className="w-full bg-gray-900 rounded-t-3xl p-6">
            <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold mb-2">Apply Filters</h3>
            <p className="text-sm text-gray-400 mb-6">Refine your search to find perfect restaurants</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block font-semibold">Cuisine Type</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-full text-sm font-semibold">
                    Biryani ✓
                  </button>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">
                    South Indian
                  </button>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">
                    North Indian
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block font-semibold">Rating</label>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">4.0+</button>
                  <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-full text-sm font-semibold">4.5+ ✓</button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block font-semibold">Location</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-full text-sm font-semibold">
                    RS Puram ✓
                  </button>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">
                    Gandhipuram
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold py-3 rounded-xl">
              Apply 3 Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrowseRestaurantsAnimation
