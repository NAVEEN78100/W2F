import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { 
  Building2, 
  Shield, 
  Users, 
  Plus, 
  Star, 
  ChefHat,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin
} from "lucide-react";
// import BottomNav from "../components/BottomNav";
import { blogsData } from "../data/blogsData";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [expandedFooterItem, setExpandedFooterItem] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    window.scrollTo(0, 0);

    // Use local blogsData instead of API
    setBlogs(blogsData);
  }, []);

  const filteredBlogs =
    filter === "All" ? blogs : blogs.filter((b) => b.category === filter);

  return (
    <div className="bg-[#FF3B2E] min-h-screen flex flex-col">
      {/* Header */}
      <section className="h-[40vh] flex flex-col justify-end px-6 md:px-12 lg:px-16 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-white w-full gap-4">
          {/* Left: BLOGS heading */}
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            BLOGS
          </h1>

          {/* Right: Description text (3 lines) */}
          <p className="max-w-md text-base md:text-xl leading-relaxed">
            Stay updated with Wander With Food News! <br />
            You can now dive beyond the aprons and know the culinary kings of your town <br />
            or explore the trending dishes every week. Don't miss out!
          </p>
        </div>
      </section>

      {/* Gap between header and white container */}
      <div className="h-8"></div>

      {/* White Container */}
      <div className="bg-white rounded-t-2xl shadow-lg mx-3 md:mx-6 lg:mx-12 mt-55 p-8 md:p-12 flex-1">
        
        {/* Top Left Heading */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-black">
            Dive Into The Scenes Beyond Aprons
          </h2>
        </div>

        {/* Dropdown */}
        <div className="flex justify-end mb-10">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#FF3B2E]"
          >
            <option value="All">All</option>
            <option value="Latest">Latest</option>
            <option value="Star Dines">Star Dines</option>
            <option value="Home Bakers">Home Bakers</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBlogs.map((blog, i) => (
            <Link
              to={`/blogs/${blog._id}`}
              key={blog._id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <span className="text-sm font-semibold text-[#FF3B2E]">
                  {blog.category}
                </span>
                <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 h-12"></div>

      {/* Final Call-to-Action Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight" style={{ color: "#FFD402" }}>
              1 million users,
              <span className="block">plus you.</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium px-4" style={{ color: "#FFD402" }}>
              It only takes few seconds to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
              <a 
                href="#" 
                className="block transition-all duration-300 ease-out hover:scale-105"
              >
                <img
                  src="/app-store-official.svg"
                  alt="Download on the App Store"
                  className="h-[60px] w-[155px] object-contain"
                />
              </a>
              <a 
                href="#" 
                className="block transition-all duration-300 ease-out hover:scale-105"
              >
                <img
                  src="/google-play-official.svg"
                  alt="Get it on Google Play"
                  className="h-[60px] w-[155px] object-contain"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12">
            <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
              {/* Partner with us */}
              <div className="border-2 border-orange-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-orange-50 to-yellow-50">
                <div 
                  className="p-4 sm:p-5 hover:bg-orange-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === 'partner' ? null : 'partner')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-orange-600 font-semibold text-base sm:text-lg">Partner with us</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-500 transition-transform duration-300 ${expandedFooterItem === 'partner' ? 'rotate-45' : ''}`} />
                  </div>
                </div>
                {expandedFooterItem === 'partner' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="pt-4 border-t border-orange-200">
                      <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                        Join our network of restaurant partners and reach thousands of food enthusiasts. Grow your business with WWF's powerful platform and increase your visibility in the local dining scene.
                      </p>
                      <a
                        href="http://localhost:3000/company/partners-react"
                        className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Partner with us →
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Report a problem */}
              <div className="border-2 border-red-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-50 to-orange-50">
                <div 
                  className="p-4 sm:p-5 hover:bg-red-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === 'problem' ? null : 'problem')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-red-600 font-semibold text-base sm:text-lg">Report a problem</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-red-500 transition-transform duration-300 ${expandedFooterItem === 'problem' ? 'rotate-45' : ''}`} />
                  </div>
                </div>
                {expandedFooterItem === 'problem' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="pt-4 border-t border-red-200">
                      <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                        We're here to help! If you've encountered an issue or have concerns about our service, please share your feedback with us. Your input helps us improve the WWF experience for everyone.
                      </p>
                      <a
                        href="http://localhost:3000/feedback"
                        className="inline-block bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Send Feedback →
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Help Center */}
              <div className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-cyan-50">
                <div 
                  className="p-4 sm:p-5 hover:bg-blue-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === 'help' ? null : 'help')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-blue-600 font-semibold text-base sm:text-lg">Help Center</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-500 transition-transform duration-300 ${expandedFooterItem === 'help' ? 'rotate-45' : ''}`} />
                  </div>
                </div>
                {expandedFooterItem === 'help' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="pt-4 border-t border-blue-200">
                      <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                        Find answers to frequently asked questions, learn how to use WWF features, and get support for any issues you may encounter. Our help center has everything you need.
                      </p>
                      <a
                        href="http://localhost:3000/support"
                        className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Visit Help Center →
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {/* Discover Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Discover</h3>
              <div className="space-y-3">
                <a href="/restaurants" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  WWF Card
                </a>
                <a href="/delivery" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Delivery
                </a>
              </div>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Company</h3>
              <div className="space-y-3">
                <a href="/about" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  About
                </a>
                <a href="/newsroom" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Newsroom
                </a>
                <a href="/partnerships" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Partnerships
                </a>
                <a href="/media" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Media Assets
                </a>
              </div>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Legal</h3>
              <div className="space-y-3">
                <a href="/cookie-policy" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Cookie Policy
                </a>
                <a href="/privacy" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Terms and Conditions
                </a>
                <a href="/disclaimers" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Disclaimers
                </a>
                <a href="/aml" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  AML Policy
                </a>
              </div>
            </div>

            {/* Help Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Help</h3>
              <div className="space-y-3">
                <a href="/developers" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Developers
                </a>
                <a href="/faq" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  FAQ
                </a>
                <a href="/support" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Help Center
                </a>
                <a href="/releases" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Release Notes
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section with Certifications and Social Media */}
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 pt-8 border-t border-gray-200">
            {/* Certification Badges */}
            <div className="flex items-center space-x-6 opacity-60">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-500" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-gray-500" />
              </div>
              <div className="text-xs text-gray-500 font-medium">
                <div>FOOD SAFETY</div>
                <div>CERTIFIED</div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-500" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            {/* Expanded Social Media Icons */}
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://threads.net/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="Threads"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01v-.017C1.5 8.417 2.35 5.563 3.995 3.512 5.845 1.205 8.598.024 12.186 0h.014c3.588.024 6.341 1.205 8.191 3.512 1.645 2.051 2.495 4.905 2.495 8.481v.017c0 3.576-.85 6.43-2.495 8.481-1.85 2.304-4.603 3.485-8.191 3.509z" />
                  <path
                    d="M12 8.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm0 7c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://youtube.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WWF Section */}
      <section className="bg-black py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Language Selector and Made By */}
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-xs">🌐</span>
              </div>
              <span className="text-sm">EN</span>
            </div>
            <div className="text-gray-400 text-sm">
              Made by <span className="text-orange-500 font-semibold tracking-widest">BINI</span>
            </div>
          </div>

          {/* W 2 F Images */}
          <div className="mb-24 min-h-[40vh] flex items-center justify-center">
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {/* W Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94], repeat: Infinity, repeatDelay: 2 }}
                viewport={{ once: false, amount: 0.5 }}
                className="flex-shrink-0 flex items-center justify-center scale-105"
              >
                <img
                  src="/w.png"
                  alt="W"
                  className="w-20 sm:w-32 md:w-40 lg:w-48 h-20 sm:h-32 md:h-40 lg:h-48 object-contain"
                />
              </motion.div>

              {/* 2 Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94], repeat: Infinity, repeatDelay: 2 }}
                viewport={{ once: false, amount: 0.5 }}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src="/2.png"
                  alt="2"
                  className="w-20 sm:w-32 md:w-40 lg:w-48 h-20 sm:h-32 md:h-40 lg:h-48 object-contain"
                />
              </motion.div>

              {/* F Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94], repeat: Infinity, repeatDelay: 2 }}
                viewport={{ once: false, amount: 0.5 }}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src="/f.png"
                  alt="F"
                  className="w-20 sm:w-32 md:w-40 lg:w-48 h-20 sm:h-32 md:h-40 lg:h-48 object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* WWF Event Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Wildlife Protection Card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-red-800 via-red-700 to-red-900 p-8 flex flex-col justify-between text-white shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-3xl">🦁</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Wildlife Protection</h3>
                <p className="text-white/80 text-sm">Protecting endangered species and their habitats worldwide</p>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">🌍</span>
                  </div>
                  <span className="text-sm font-medium">Global Initiative</span>
                </div>
              </div>
            </motion.div>

            {/* Marine Conservation Card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-green-700 via-teal-600 to-blue-700 p-8 flex flex-col justify-between text-white shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-3xl">🐋</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Marine Conservation</h3>
                <p className="text-white/80 text-sm">Preserving ocean ecosystems and marine biodiversity</p>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">🌊</span>
                  </div>
                  <span className="text-sm font-medium">Ocean Protection</span>
                </div>
              </div>
            </motion.div>

            {/* Climate Action Card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 p-8 flex flex-col justify-between text-white shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Climate Action</h3>
                <p className="text-white/80 text-sm">Fighting climate change through sustainable solutions</p>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">♻️</span>
                  </div>
                  <span className="text-sm font-medium">Sustainability</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Text */}
          <div className="text-gray-400 text-sm max-w-4xl mx-auto leading-relaxed">
            <p className="mb-4">
              © 2025 | World Wildlife Fund is dedicated to protecting wildlife and their habitats worldwide. WWF
              operates in over 100 countries and is supported by millions of members globally.
            </p>
            <p>
              WWF is committed to conservation, research, and advocacy to ensure a sustainable future for our planet.
              Join us in our mission to create a world where people and nature thrive together.
            </p>
          </div>
        </div>
      </section>

      {/* <BottomNav /> */}
    </div>
  );
}
