"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RestaurantsSection() {
  const restaurants = [
    {
      id: 1,
      name: "Bella Vista",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      image: "/delicious-italian-pasta-with-tomato-sauce-and-basi.jpg",
      featured: true,
    },
    {
      id: 2,
      name: "Sakura Sushi",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "30-40 min",
      image: "/fresh-sushi-platter-with-salmon-tuna-and-rolls.jpg",
      featured: false,
    },
    {
      id: 3,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.7,
      deliveryTime: "20-30 min",
      image: "/colorful-indian-curry-with-rice-and-naan-bread.jpg",
      featured: true,
    },
    {
      id: 4,
      name: "Le Petit Café",
      cuisine: "French",
      rating: 4.6,
      deliveryTime: "35-45 min",
      image: "/elegant-french-croissant-and-coffee-breakfast.jpg",
      featured: false,
    },
  ]

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Featured Restaurants</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing restaurants and cuisines from around the world, all in one place.
          </p>
        </motion.div>

        {/* Restaurant Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Restaurant Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                {restaurant.featured && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Restaurant Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{restaurant.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{restaurant.cuisine} Cuisine</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>2.5 km</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl">Order Now</Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button className="bg-black text-white hover:bg-gray-800 rounded-xl px-8 py-4 text-lg">
            View All Restaurants
          </Button>
        </motion.div>
      </div>

      {/* Background Food Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            {["🍕", "🍔", "🍜", "🥗", "🍰", "🍱"][i]}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
