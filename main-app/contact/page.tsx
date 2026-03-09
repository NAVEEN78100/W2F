"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your enquiry! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      enquiryType: "",
    })
  }

  const enquiryTypes = [
    "General Enquiry",
    "Partnership",
    "Technical Support",
    "Business Collaboration",
    "Media & Press",
    "Feedback",
  ]

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "hello@wanderwithfood.com",
      description: "Send us an email anytime",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "Bangalore, India",
      description: "Come say hello at our office",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: "9:00 AM - 6:00 PM",
      description: "Monday to Friday",
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-400 to-red-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have questions about WWF? Want to partner with us? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-orange-500 mb-2">{info.details}</p>
                <p className="text-gray-600">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-12 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enquiry Type *</label>
                  <Select
                    value={formData.enquiryType}
                    onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {enquiryTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief subject of your enquiry"
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your enquiry..."
                  required
                  className="min-h-32"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg rounded-full"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to questions you may have about WWF.</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do I become a partner restaurant?",
                answer:
                  "Visit our Partner with Us page to see the different categories and eligibility criteria. You can apply directly through our online form.",
              },
              {
                question: "Is WWF available in my city?",
                answer:
                  "We're expanding rapidly across India. Check our Explore page to see if we're available in your area, or contact us to request expansion to your city.",
              },
              {
                question: "How can I provide feedback about the app?",
                answer:
                  "We love hearing from our users! You can submit feedback through our Feedback page or contact us directly through this form.",
              },
              {
                question: "Do you offer business partnerships?",
                answer:
                  "Yes! We're always looking for strategic partnerships. Please select 'Business Collaboration' as your enquiry type and tell us about your proposal.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
