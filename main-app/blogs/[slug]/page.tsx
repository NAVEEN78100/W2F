"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Calendar, User, ArrowLeft, Share2, Heart, MessageCircle, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BlogDetailPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const params = useParams()
  const slug = params.slug as string

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Blog post data - in a real app, this would come from a CMS or API
  const blogPosts: Record<string, any> = {
    "rise-of-home-bakers": {
      title: "The Rise of Home Bakers: A Sweet Revolution",
      excerpt: "Discover how home bakers are transforming the culinary landscape with their artisanal creations...",
      category: "Home Bakers",
      author: "Sarah Johnson",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "/artisan-bread-baking.png",
      content: `
        <p>In recent years, we've witnessed an extraordinary transformation in the culinary world. Home bakers, once relegated to weekend hobbies and family gatherings, have emerged as serious contenders in the food industry, creating artisanal masterpieces that rival traditional bakeries.</p>

        <h2>The Pandemic Catalyst</h2>
        <p>The COVID-19 pandemic served as an unexpected catalyst for this movement. With restaurants closed and people spending more time at home, many discovered their passion for baking. What started as sourdough starters and banana bread quickly evolved into sophisticated pastries, custom cakes, and artisanal breads.</p>

        <p>Social media platforms became virtual storefronts, allowing home bakers to showcase their creations and build loyal customer bases. Instagram feeds filled with perfectly piped buttercream roses and golden croissants, creating a new generation of food entrepreneurs.</p>

        <h2>Quality Over Quantity</h2>
        <p>Unlike commercial bakeries focused on mass production, home bakers prioritize quality and personalization. They source premium ingredients, experiment with unique flavor combinations, and offer customization that large-scale operations simply cannot match.</p>

        <p>Many home bakers specialize in dietary restrictions and preferences that were previously underserved - gluten-free, vegan, keto, and allergen-free options have found their champions in home kitchens across the country.</p>

        <h2>Building Community</h2>
        <p>Home bakers have created tight-knit communities, sharing recipes, techniques, and support. Local Facebook groups, baking circles, and pop-up markets have become gathering places for both bakers and customers who appreciate handcrafted goods.</p>

        <p>This movement represents more than just food - it's about returning to craftsmanship, supporting local entrepreneurs, and building connections within communities.</p>

        <h2>The Future of Home Baking</h2>
        <p>As we look ahead, the home baking revolution shows no signs of slowing down. Many home bakers are transitioning to commercial spaces, opening small bakeries, or partnering with local cafes and restaurants.</p>

        <p>Technology continues to support this growth, with apps like WWF making it easier for home bakers to reach customers and manage orders. The future of baking is personal, artisanal, and community-driven.</p>
      `,
    },
    "top-star-dines": {
      title: "Top 10 Star Dines That Will Blow Your Mind",
      excerpt: "From Michelin-starred establishments to hidden gems, explore the finest dining experiences...",
      category: "Star Dines",
      author: "Michael Chen",
      date: "Dec 12, 2024",
      readTime: "8 min read",
      image: "/elegant-fine-dining.png",
      content: `
        <p>Fine dining represents the pinnacle of culinary artistry, where every dish tells a story and every meal becomes a memorable experience. Today, we're exploring ten exceptional restaurants that have redefined what it means to dine in style.</p>

        <h2>1. The Golden Spoon - New York</h2>
        <p>Chef Maria Rodriguez has created a temple to modern American cuisine, where seasonal ingredients meet innovative techniques. The tasting menu changes monthly, ensuring each visit offers something new and extraordinary.</p>

        <h2>2. Ocean's Edge - San Francisco</h2>
        <p>Perched on the cliffs overlooking the Pacific, this restaurant combines breathtaking views with exceptional seafood. Chef David Kim's approach to sustainable fishing practices makes every dish both delicious and environmentally conscious.</p>

        <h2>3. The Herb Garden - Chicago</h2>
        <p>Farm-to-table dining reaches new heights at this intimate restaurant where Chef Lisa Thompson grows many ingredients in the restaurant's own rooftop garden. The connection between soil and plate has never been more direct.</p>

        <h2>4. Fusion Dreams - Los Angeles</h2>
        <p>Chef Hiroshi Tanaka masterfully blends Japanese precision with California creativity, creating dishes that surprise and delight. The omakase experience here is truly unforgettable.</p>

        <h2>5. The Wine Cellar - Napa Valley</h2>
        <p>More than just a restaurant, this is a celebration of wine and food pairing. Chef Antoine Dubois creates dishes specifically designed to complement the extensive wine collection.</p>

        <h2>What Makes These Places Special</h2>
        <p>Each of these establishments shares common traits: exceptional ingredients, masterful technique, impeccable service, and an unwavering commitment to creating memorable experiences. They understand that fine dining is about more than just food - it's about creating moments that last a lifetime.</p>

        <p>The attention to detail extends beyond the kitchen to every aspect of the dining experience, from the carefully curated wine lists to the thoughtfully designed spaces that enhance the culinary journey.</p>
      `,
    },
    "food-trends-2024": {
      title: "2024 Food Trends: What's Hot in Culinary World",
      excerpt: "Stay ahead of the curve with the latest food trends that are shaping the industry...",
      category: "Food Trends",
      author: "Emma Rodriguez",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      image: "/food-trends-2024-colorful-dishes.png",
      content: `
        <p>As we navigate through 2024, the culinary landscape continues to evolve at an unprecedented pace. From ancient grains making a comeback to innovative plant-based alternatives, this year's food trends reflect our growing consciousness about health, sustainability, and global flavors.</p>

        <h2>Plant-Forward Fine Dining</h2>
        <p>Vegetables are no longer side dishes but the stars of the show. Restaurants are elevating plant-based cuisine to new heights, with chefs creating complex, satisfying dishes that celebrate the natural flavors and textures of vegetables, grains, and legumes.</p>

        <h2>Fermentation Renaissance</h2>
        <p>Ancient preservation techniques are experiencing a modern revival. From kimchi and kombucha to house-made miso and fermented hot sauces, restaurants are embracing fermentation for its health benefits and unique flavor profiles.</p>

        <h2>Global Comfort Foods</h2>
        <p>Diners are seeking comfort in familiar yet exotic flavors. Korean corn dogs, Filipino ube desserts, and Middle Eastern shakshuka are finding their way onto mainstream menus, offering comfort with a global twist.</p>

        <h2>Sustainable Seafood</h2>
        <p>Ocean-to-table dining is becoming the norm, with restaurants partnering directly with sustainable fisheries. Lesser-known fish species are gaining popularity as chefs educate diners about biodiversity and responsible consumption.</p>

        <h2>Functional Beverages</h2>
        <p>Drinks are becoming more than just refreshment. Adaptogenic teas, probiotic sodas, and vitamin-enhanced waters are meeting consumers' desire for beverages that support their health and wellness goals.</p>

        <h2>Zero-Waste Cooking</h2>
        <p>Sustainability extends beyond ingredients to preparation methods. Chefs are finding creative ways to use every part of ingredients, from vegetable scraps becoming broths to fruit peels being transformed into garnishes.</p>

        <h2>Looking Ahead</h2>
        <p>These trends reflect broader shifts in how we think about food - as medicine, as environmental stewardship, and as cultural connection. The restaurants and food businesses that embrace these movements are positioning themselves for success in an increasingly conscious market.</p>
      `,
    },
  }

  const currentPost = blogPosts[slug] || blogPosts["rise-of-home-bakers"]

  const relatedPosts = [
    {
      title: "Behind the Scenes: A Day with Local Chefs",
      slug: "day-with-local-chefs",
      category: "Latest",
      image: "/professional-chef-cooking.png",
    },
    {
      title: "The Art of Food Photography: Tips from Pros",
      slug: "food-photography-tips",
      category: "Food Trends",
      image: "/beautiful-food-styling.png",
    },
    {
      title: "Sustainable Dining: Restaurants Going Green",
      slug: "sustainable-dining",
      category: "Restaurant Reviews",
      image: "/eco-friendly-restaurant.png",
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

      {/* Back Button */}
      <div className="pt-32 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6">
        <header className="mb-12">
          <div className="mb-6">
            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentPost.category}
            </span>
          </div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentPost.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-6 text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{currentPost.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{currentPost.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{currentPost.readTime}</span>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 ${isLiked ? "text-red-500 border-red-500" : ""}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{isLiked ? "Liked" : "Like"}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </Button>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img
              src={currentPost.image || "/placeholder.svg"}
              alt={currentPost.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </header>

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
          style={{
            lineHeight: "1.8",
            fontSize: "18px",
          }}
        />

        {/* Author Bio */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {currentPost.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{currentPost.author}</h3>
              <p className="text-gray-600">
                Food writer and culinary enthusiast with over 10 years of experience exploring the world's diverse food
                cultures.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <Link
                key={index}
                href={`/blogs/${post.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </article>

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
