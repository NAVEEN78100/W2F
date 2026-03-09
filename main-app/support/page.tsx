"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  Search,
  HelpCircle,
  Book,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function SupportPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const supportCategories = [
    {
      title: "Getting Started",
      icon: <Book className="w-8 h-8" />,
      color: "from-blue-400 to-blue-600",
      articles: [
        "How to create your WWF account",
        "Setting up your profile and preferences",
        "Finding restaurants in your area",
        "Placing your first order",
      ],
    },
    {
      title: "Account & Profile",
      icon: <HelpCircle className="w-8 h-8" />,
      color: "from-green-400 to-green-600",
      articles: [
        "Managing your account settings",
        "Updating payment methods",
        "Changing your delivery address",
        "Privacy and security settings",
      ],
    },
    {
      title: "Orders & Delivery",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-orange-400 to-orange-600",
      articles: [
        "Tracking your order status",
        "Modifying or canceling orders",
        "Delivery time estimates",
        "What to do if your order is late",
      ],
    },
    {
      title: "Payments & Billing",
      icon: <Phone className="w-8 h-8" />,
      color: "from-purple-400 to-purple-600",
      articles: [
        "Accepted payment methods",
        "Understanding charges and fees",
        "Refunds and cancellations",
        "Billing disputes and resolution",
      ],
    },
  ]

  const popularArticles = [
    {
      title: "How to track my order?",
      category: "Orders & Delivery",
      readTime: "2 min read",
      views: "15.2k views",
    },
    {
      title: "Why was my order cancelled?",
      category: "Orders & Delivery",
      readTime: "3 min read",
      views: "12.8k views",
    },
    {
      title: "How to change my delivery address?",
      category: "Account & Profile",
      readTime: "1 min read",
      views: "10.5k views",
    },
    {
      title: "Payment failed - what should I do?",
      category: "Payments & Billing",
      readTime: "2 min read",
      views: "9.3k views",
    },
    {
      title: "How to contact restaurant directly?",
      category: "Getting Started",
      readTime: "1 min read",
      views: "8.7k views",
    },
    {
      title: "Refund policy and process",
      category: "Payments & Billing",
      readTime: "4 min read",
      views: "7.9k views",
    },
  ]

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "Start Chat",
      available: "Available 24/7",
      color: "bg-blue-500",
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support representative",
      icon: <Phone className="w-6 h-6" />,
      action: "Call Now",
      available: "Mon-Fri, 9 AM - 6 PM",
      color: "bg-green-500",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: <Mail className="w-6 h-6" />,
      action: "Send Email",
      available: "Response within 24 hours",
      color: "bg-orange-500",
    },
  ]

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
              <Link href="/explore" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            How can we help?
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find answers to your questions, get help with your orders, or contact our support team directly.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for help articles..."
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
      </section>

      {/* Support Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find help articles organized by topic to quickly resolve your questions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportCategories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                <div className="p-8">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-6`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{category.title}</h3>
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <div
                        key={articleIndex}
                        className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-sm">{article}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Popular Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most frequently accessed help articles by our community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.readTime}</span>
                  <span>{article.views}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Still Need Help?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you directly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center text-white mx-auto mb-6`}
                >
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-sm text-gray-500 mb-6">{option.available}</p>
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">{option.action}</Button>
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
