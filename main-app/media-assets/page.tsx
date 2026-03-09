"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, ImageIcon, FileText, Video, Palette, Share2, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function MediaAssetsPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = ["All", "Logos", "Brand Guidelines", "Screenshots", "Videos", "Press Kit"]

  const mediaAssets = [
    {
      id: 1,
      title: "WWF Primary Logo",
      category: "Logos",
      type: "PNG",
      size: "2.4 MB",
      dimensions: "2000x800px",
      preview: "/wwf-logo-primary.png",
      downloadUrl: "#",
      description: "Main WWF logo for light backgrounds",
    },
    {
      id: 2,
      title: "WWF Logo Dark",
      category: "Logos",
      type: "PNG",
      size: "2.1 MB",
      dimensions: "2000x800px",
      preview: "/wwf-logo-dark.png",
      downloadUrl: "#",
      description: "WWF logo variant for dark backgrounds",
    },
    {
      id: 3,
      title: "WWF Icon",
      category: "Logos",
      type: "SVG",
      size: "45 KB",
      dimensions: "512x512px",
      preview: "/wwf-icon.png",
      downloadUrl: "#",
      description: "WWF app icon in various formats",
    },
    {
      id: 4,
      title: "Brand Guidelines PDF",
      category: "Brand Guidelines",
      type: "PDF",
      size: "8.7 MB",
      dimensions: "A4",
      preview: "/brand-guidelines-preview.png",
      downloadUrl: "#",
      description: "Complete brand guidelines and usage instructions",
    },
    {
      id: 5,
      title: "Color Palette",
      category: "Brand Guidelines",
      type: "ASE",
      size: "12 KB",
      dimensions: "N/A",
      preview: "/color-palette-preview.png",
      downloadUrl: "#",
      description: "Official WWF color palette for Adobe Creative Suite",
    },
    {
      id: 6,
      title: "App Screenshots",
      category: "Screenshots",
      type: "ZIP",
      size: "15.3 MB",
      dimensions: "Various",
      preview: "/app-screenshots-preview.png",
      downloadUrl: "#",
      description: "High-resolution app screenshots for press and marketing",
    },
    {
      id: 7,
      title: "WWF Promo Video",
      category: "Videos",
      type: "MP4",
      size: "45.2 MB",
      dimensions: "1920x1080px",
      preview: "/promo-video-preview.png",
      downloadUrl: "#",
      description: "30-second promotional video showcasing WWF features",
    },
    {
      id: 8,
      title: "Press Kit Bundle",
      category: "Press Kit",
      type: "ZIP",
      size: "67.8 MB",
      dimensions: "Various",
      preview: "/press-kit-preview.png",
      downloadUrl: "#",
      description: "Complete press kit with logos, images, and fact sheet",
    },
  ]

  const filteredAssets =
    selectedCategory === "All" ? mediaAssets : mediaAssets.filter((asset) => asset.category === selectedCategory)

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case "png":
      case "jpg":
      case "svg":
        return <ImageIcon className="w-6 h-6" />
      case "pdf":
        return <FileText className="w-6 h-6" />
      case "mp4":
        return <Video className="w-6 h-6" />
      case "ase":
        return <Palette className="w-6 h-6" />
      default:
        return <FileText className="w-6 h-6" />
    }
  }

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
                  <button className="flex items-center space-x-1 text-orange-500 font-medium">
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-400 to-blue-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Media Assets
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Download official WWF logos, brand guidelines, screenshots, and other media assets for press, marketing, and
            partnership purposes.
          </motion.p>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="bg-orange-50 rounded-3xl p-12 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Usage Guidelines</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Please follow our brand guidelines when using WWF media assets. These materials are provided for press,
                marketing, and partnership purposes only.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-3">✅ Allowed Uses</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Press and media coverage</li>
                    <li>• Partnership announcements</li>
                    <li>• App store listings</li>
                    <li>• Marketing materials</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-3">❌ Prohibited Uses</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Modifying logo colors</li>
                    <li>• Using outdated versions</li>
                    <li>• Commercial resale</li>
                    <li>• Misleading representations</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-3">📋 Requirements</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Maintain minimum spacing</li>
                    <li>• Use approved color variants</li>
                    <li>• Include proper attribution</li>
                    <li>• Follow size guidelines</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Download Assets</h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Assets Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Preview Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-video">
                  <img
                    src={asset.preview || `/placeholder.svg?height=200&width=300&text=${asset.title}`}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">{asset.type}</span>
                  </div>
                </div>

                {/* Asset Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getIconForType(asset.type)}
                      <h3 className="font-bold text-gray-800 text-sm">{asset.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-4 line-clamp-2">{asset.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Size:</span>
                      <span>{asset.size}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Dimensions:</span>
                      <span>{asset.dimensions}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="px-3 bg-transparent">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Custom Assets */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Need Custom Assets?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Looking for specific assets not available here? Our team can provide custom materials for qualified
              partnerships and press opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg bg-transparent">
                View Brand Guidelines
              </Button>
            </div>
          </motion.div>
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
