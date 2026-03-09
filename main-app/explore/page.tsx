"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MapPin, Star, Clock, Heart, Search, Filter } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function ExplorePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { scrollY } = useScroll()

  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]

  const areas = {
    Mumbai: ["Bandra", "Andheri", "Juhu", "Powai", "Lower Parel", "Worli"],
    Delhi: ["Connaught Place", "Khan Market", "Hauz Khas", "Karol Bagh", "Lajpat Nagar"],
    Bangalore: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Brigade Road"],
    Chennai: ["T. Nagar", "Anna Nagar", "Adyar", "Velachery", "OMR"],
  }

  const restaurants = [
    {
      id: 1,
      name: "The Golden Spoon",
      category: "Fine Dining",
      rating: 4.8,
      time: "45-60 min",
      image: "/restaurant-golden-spoon.png",
      cuisine: "Continental",
      price: "₹₹₹",
      featured: true,
    },
    {
      id: 2,
      name: "Spice Garden",
      category: "Indian",
      rating: 4.6,
      time: "30-45 min",
      image: "/restaurant-spice-garden.png",
      cuisine: "North Indian",
      price: "₹₹",
      featured: false,
    },
    {
      id: 3,
      name: "Ocean's Delight",
      category: "Seafood",
      rating: 4.7,
      time: "40-55 min",
      image: "/restaurant-oceans-delight.png",
      cuisine: "Coastal",
      price: "₹₹₹",
      featured: true,
    },
    {
      id: 4,
      name: "Burger Junction",
      category: "Fast Food",
      rating: 4.3,
      time: "20-30 min",
      image: "/restaurant-burger-junction.png",
      cuisine: "American",
      price: "₹",
      featured: false,
    },
    {
      id: 5,
      name: "Pasta Paradise",
      category: "Italian",
      rating: 4.5,
      time: "35-50 min",
      image: "/restaurant-pasta-paradise.png",
      cuisine: "Italian",
      price: "₹₹",
      featured: false,
    },
    {
      id: 6,
      name: "Sushi Zen",
      category: "Japanese",
      rating: 4.9,
      time: "50-65 min",
      image: "/restaurant-sushi-zen.png",
      cuisine: "Japanese",
      price: "₹₹₹₹",
      featured: true,
    },
  ]

  const restaurantLogos = ["🍕", "🍔", "🍜", "🥗", "🍰", "🍱", "🥘", "🍳", "🌮", "🍣", "🥙", "🍛"]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              WWF
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
                Home
              </Link>
              <Link href="/explore" className="text-orange-500 font-medium">
                Explore
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-gray-800 hover:text-orange-500 font-medium transition-colors">
                    <span>Company</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-xl border-0 rounded-xl">
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/about">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/blogs">Blogs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/partner">Partner with Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/contact">Enquire</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-800 hover:text-orange-500" disabled>
                Log in
              </Button>
              <Button className="bg-orange-500 text-white hover:bg-orange-600 rounded-full px-6" disabled>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="text-center z-10 max-w-4xl mx-auto text-white">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore
            <br />
            Amazing Food
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the best restaurants, cafes, and food experiences in your city. From fine dining to street food,
            find your next culinary adventure.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/90 border-0 h-12 text-gray-800 placeholder:text-gray-500"
                />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Restaurant Logos */}
        <div className="absolute bottom-20 left-0 right-0 overflow-hidden">
          <motion.div
            className="flex space-x-8 text-4xl opacity-30"
            animate={{ x: [-100, -2000] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {[...restaurantLogos, ...restaurantLogos].map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Location Selection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Choose Your Location</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your city and area to discover the best restaurants near you.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-3xl p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">Select City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Choose your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">Select Area</label>
                <Select value={selectedArea} onValueChange={setSelectedArea} disabled={!selectedCity}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Choose your area" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCity &&
                      areas[selectedCity as keyof typeof areas]?.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedCity && selectedArea && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full">
                  <MapPin className="w-5 h-5 mr-2" />
                  Explore {selectedArea}, {selectedCity}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Featured Restaurants</h2>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={restaurant.image || `/placeholder.svg?height=200&width=400&text=${restaurant.name}`}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {restaurant.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
                    <span className="text-lg font-semibold text-gray-600">{restaurant.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {restaurant.cuisine} • {restaurant.category}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{restaurant.time}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Order Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-4 text-lg bg-transparent">
              Load More Restaurants
            </Button>
          </div>
        </div>
      </section>

      {/* Must Try Dishes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Must Try Dishes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most popular and highly-rated dishes in your area.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Butter Chicken", restaurant: "Spice Garden", price: "₹320", image: "/dish-butter-chicken.png" },
              { name: "Margherita Pizza", restaurant: "Pizza Corner", price: "₹280", image: "/dish-pizza.png" },
              { name: "Chocolate Cake", restaurant: "Sweet Dreams", price: "₹180", image: "/dish-cake.png" },
              { name: "Biryani", restaurant: "Royal Kitchen", price: "₹350", image: "/dish-biryani.png" },
            ].map((dish, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={dish.image || `/placeholder.svg?height=150&width=300&text=${dish.name}`}
                  alt={dish.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-1">{dish.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{dish.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-orange-500">{dish.price}</span>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Food Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A visual feast of the amazing dishes and dining experiences waiting for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`/uest asks to render text in an image, so I will generate the image directly without prompt enhancement.png?height=300&width=300&text=Food ${i + 1}`}
                  alt={`Food ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">WWF</h3>
              <p className="text-gray-400">Wander With Food - Your culinary companion</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="text-gray-400 hover:text-white block">
                  About Us
                </Link>
                <Link href="/blogs" className="text-gray-400 hover:text-white block">
                  Blogs
                </Link>
                <Link href="/partner" className="text-gray-400 hover:text-white block">
                  Partner with Us
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="/contact" className="text-gray-400 hover:text-white block">
                  Contact
                </Link>
                <Link href="/feedback" className="text-gray-400 hover:text-white block">
                  Feedback
                </Link>
                <Link href="/support" className="text-gray-400 hover:text-white block">
                  Help Center
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white block">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white block">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white block">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WWF - Wander With Food. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
