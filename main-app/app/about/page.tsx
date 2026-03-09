"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, Users, Target, Heart, Award, Globe, Utensils, Star, MapPin } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { number: "1M+", label: "Happy Users", icon: <Users className="w-8 h-8" />, emoji: "👥" },
    { number: "50+", label: "Partner Restaurants", icon: <Utensils className="w-8 h-8" />, emoji: "🍽️" },
    { number: "10+", label: "Cities Covered", icon: <MapPin className="w-8 h-8" />, emoji: "🌍" },
    { number: "4.8", label: "Average Rating", icon: <Star className="w-8 h-8" />, emoji: "⭐" },
  ]

  const values = [
    {
      title: "Quality First",
      description: "We partner only with restaurants that meet our high standards for food quality and service.",
      icon: <Award className="w-12 h-12" />,
      emoji: "🏆",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Community Focused",
      description: "Supporting local businesses and bringing communities together through food.",
      icon: <Heart className="w-12 h-12" />,
      emoji: "❤️",
      color: "from-pink-400 to-red-500",
    },
    {
      title: "Innovation Driven",
      description: "Constantly improving our technology to provide the best food discovery experience.",
      icon: <Target className="w-12 h-12" />,
      emoji: "🎯",
      color: "from-blue-400 to-purple-500",
    },
    {
      title: "Global Vision",
      description: "Expanding worldwide to connect food lovers with amazing culinary experiences everywhere.",
      icon: <Globe className="w-12 h-12" />,
      emoji: "🌎",
      color: "from-green-400 to-blue-500",
    },
  ]

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Former restaurant owner with 15+ years in the food industry. Passionate about connecting people with great food.",
      avatar: "👨‍💼",
      color: "from-orange-400 to-red-500",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Tech veteran with expertise in mobile apps and AI. Leading our technology innovation.",
      avatar: "👩‍💻",
      color: "from-blue-400 to-purple-500",
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Operations",
      bio: "Logistics expert ensuring smooth delivery operations and restaurant partnerships.",
      avatar: "👨‍🔧",
      color: "from-green-400 to-blue-500",
    },
    {
      name: "Emily Davis",
      role: "Head of Marketing",
      bio: "Creative strategist building our brand and connecting with food communities worldwide.",
      avatar: "👩‍🎨",
      color: "from-pink-400 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">About WWF</h1>
            </div>
            <div className="text-2xl font-bold text-orange-500">WWF</div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-400 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              {["🍕", "🍔", "🍜", "🥗", "🍰", "🍱", "🥘", "🍳", "🌮", "🍣"][i]}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Wander With Food</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              We're on a mission to connect food lovers with amazing culinary experiences, supporting local businesses
              and building stronger communities through the power of food.
            </p>
            <div className="text-6xl mb-8">🍽️</div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in the food community</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="text-6xl mb-4">{stat.emoji}</div>
                    <div className="text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  WWF was born from a simple idea: everyone deserves access to amazing food experiences. Our founders,
                  passionate food lovers themselves, noticed how difficult it was to discover great local restaurants
                  and authentic cuisines.
                </p>
                <p>
                  Starting in 2020 with just 5 partner restaurants, we've grown into a platform that connects over 1
                  million users with 50+ amazing food establishments across 10+ cities. But we're just getting started.
                </p>
                <p>
                  Today, WWF is more than just a food delivery app. We're a community that celebrates culinary
                  diversity, supports local businesses, and brings people together through the universal language of
                  food.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl overflow-hidden">
                <img
                  src="/diverse-group-eating.png"
                  alt="People enjoying food together"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Bringing People Together</h3>
                  <p className="opacity-90">Through the power of food</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center text-white`}
                      >
                        {value.icon}
                      </div>
                      <div className="text-6xl">{value.emoji}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind WWF</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-r ${member.color} mx-auto mb-4 flex items-center justify-center text-4xl`}
                    >
                      {member.avatar}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-orange-500 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Food Journey</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Ready to discover amazing restaurants and be part of our growing food community?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/explore">
                <Button className="bg-white text-orange-500 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold">
                  Explore Restaurants
                </Button>
              </Link>
              <Link href="/partner">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-500 rounded-full px-8 py-4 text-lg font-semibold bg-transparent"
                >
                  Become a Partner
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
