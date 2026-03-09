"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ChevronLeft, Calendar, Clock, Share2, Heart, MessageCircle, BookOpen, ThumbsUp } from "lucide-react"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock blog post data - in real app, fetch based on slug
  const post = {
    id: 1,
    title: "The Rise of Plant-Based Cuisine in Urban Areas",
    content: `
      <p>The culinary landscape of our cities is undergoing a remarkable transformation. Plant-based cuisine, once considered a niche dietary choice, has evolved into a mainstream culinary movement that's reshaping how we think about food, sustainability, and dining experiences.</p>

      <h2>The Urban Revolution</h2>
      <p>In major cities across the globe, plant-based restaurants are no longer just serving salads and veggie burgers. Today's plant-based establishments are creating sophisticated, innovative dishes that rival traditional fine dining experiences. From molecular gastronomy techniques applied to vegetables to artisanal plant-based cheeses that fool even the most discerning palates, the creativity in this space is boundless.</p>

      <p>Cities like New York, London, Berlin, and Tel Aviv have become hotbeds for plant-based innovation. These urban centers provide the perfect ecosystem for culinary experimentation, with diverse populations eager to try new flavors and cooking techniques.</p>

      <h2>Sustainability Meets Flavor</h2>
      <p>What's driving this movement isn't just health consciousness—it's a growing awareness of environmental impact. Urban diners are increasingly conscious of their carbon footprint, and plant-based restaurants are responding with locally-sourced ingredients, zero-waste practices, and transparent supply chains.</p>

      <p>Many of these establishments partner with urban farms and vertical growing operations, creating a hyperlocal food system that reduces transportation emissions while ensuring peak freshness. This farm-to-table approach, applied to plant-based cuisine, creates a compelling narrative that resonates with environmentally conscious consumers.</p>

      <h2>The Technology Factor</h2>
      <p>Technology plays a crucial role in this culinary revolution. From precision fermentation creating plant-based proteins that mimic traditional animal products to AI-powered flavor profiling that helps chefs create more complex and satisfying plant-based dishes, innovation is happening at every level.</p>

      <p>Apps and platforms are also making plant-based dining more accessible, helping diners discover new restaurants, read reviews from like-minded food enthusiasts, and even connect with chefs and restaurant owners who share their values.</p>

      <h2>Looking Forward</h2>
      <p>As we look to the future, the plant-based movement in urban areas shows no signs of slowing down. With increasing investment in food technology, growing consumer demand, and a new generation of chefs who see plants as their primary canvas, we can expect even more exciting developments in this space.</p>

      <p>The rise of plant-based cuisine represents more than just a dietary trend—it's a fundamental shift in how we think about food, community, and our relationship with the planet. For urban food lovers, this means more choices, more flavors, and more opportunities to dine in alignment with their values.</p>
    `,
    author: "Sarah Johnson",
    authorBio:
      "Food journalist and plant-based cuisine expert with over 10 years of experience covering culinary trends.",
    authorAvatar: "👩‍💼",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "trends",
    image: "/modern-plant-based-restaurant.png",
    tags: ["Plant-Based", "Sustainability", "Urban Dining", "Food Trends"],
    emoji: "🌱",
    likes: 234,
    comments: 18,
    shares: 45,
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Hidden Gems: 10 Local Restaurants You Must Try",
      image: "/cozy-local-restaurant.png",
      emoji: "💎",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Mastering the Art of Homemade Pizza",
      image: "/placeholder-w6khp.png",
      emoji: "🍕",
      readTime: "12 min read",
    },
    {
      id: 4,
      title: "Street Food Culture Around the World",
      image: "/bustling-street-food.png",
      emoji: "🌮",
      readTime: "10 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/blogs">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>
            <div className="text-2xl font-bold text-orange-500">WWF</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">{post.title}</h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl">
                  {post.authorAvatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{post.author}</div>
                  <div className="text-sm text-gray-500">Food Journalist</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                {post.likes}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                {post.comments}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="absolute bottom-6 right-6 text-6xl">{post.emoji}</div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Article Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <Separator className="mb-8" />

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like this article
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              {post.likes} likes • {post.comments} comments • {post.shares} shares
            </div>
          </div>

          {/* Author Bio */}
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-3xl">
                  {post.authorAvatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">About {post.author}</h3>
                  <p className="text-gray-600 mb-4">{post.authorBio}</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <BookOpen className="w-6 h-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-800">Related Articles</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/blogs/${relatedPost.id}`}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-4 right-4 text-3xl">{relatedPost.emoji}</div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Separator className="mb-8" />
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Comments ({post.comments})</h3>

          <div className="space-y-6">
            {[
              {
                author: "Mike Chen",
                avatar: "👨‍💻",
                comment:
                  "Great article! I've noticed this trend in my city too. The plant-based restaurants here are getting really creative with their dishes.",
                time: "2 hours ago",
                likes: 12,
              },
              {
                author: "Emily Davis",
                avatar: "👩‍🍳",
                comment:
                  "As a chef, I can confirm that working with plant-based ingredients has pushed me to be more creative. The possibilities are endless!",
                time: "5 hours ago",
                likes: 8,
              },
              {
                author: "Alex Johnson",
                avatar: "👨‍💼",
                comment:
                  "The sustainability aspect is what drew me to plant-based dining initially, but now I genuinely prefer the flavors and creativity.",
                time: "1 day ago",
                likes: 15,
              },
            ].map((comment, index) => (
              <Card key={index} className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-lg">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-800">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.comment}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 p-6">
            <CardContent className="p-0">
              <h4 className="font-semibold text-gray-800 mb-4">Leave a comment</h4>
              <textarea
                className="w-full p-4 border rounded-lg resize-none"
                rows={4}
                placeholder="Share your thoughts..."
              />
              <div className="flex justify-end mt-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Post Comment</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
