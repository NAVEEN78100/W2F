"use client"

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Clock, ChevronLeft, Star } from 'lucide-react'
import ScrollVelocity from '@/components/ScrollVelocity'

export default function ExplorePage() {
  const [ripple, setRipple] = useState<{x: number, y: number, key: string} | null>(null)
  const router = useRouter()
  const hasAutoScrolledOnSearchRef = useRef(false)

  const [districts, setDistricts] = useState<any[]>([])
  const [featuredDistricts, setFeaturedDistricts] = useState<any[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [displayDistrict, setDisplayDistrict] = useState<string>('')
  const restaurantSectionRef = useRef<HTMLDivElement>(null)

  const [restaurants, setRestaurants] = useState<any[]>([])
  const [featuredAmbience, setFeaturedAmbience] = useState<any[]>([])
  const [featuredDishes, setFeaturedDishes] = useState<any[]>([])

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showDistrictGrid, setShowDistrictGrid] = useState<boolean>(false)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    fetch(base + '/api/explore/districts')
      .then((r) => r.json())
      .then((data) => { if (data?.districts) setDistricts(data.districts) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    fetch(base + '/api/explore/featured-districts')
      .then((r) => r.json())
      .then((data) => { if (data?.districts) setFeaturedDistricts(data.districts) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!selectedDistrict) {
      setRestaurants([])
      setFeaturedAmbience([])
      setFeaturedDishes([])
      setDisplayDistrict('')
      return
    }
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    const url = base + '/api/explore/' + encodeURIComponent(selectedDistrict)
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data?.ok) {
          setRestaurants(data.restaurants || [])
          setFeaturedAmbience(data.featuredAmbience || [])
          setFeaturedDishes(data.featuredDishes || [])
          setDisplayDistrict(data.district || selectedDistrict)
        }
      })
      .catch(() => {})
  }, [selectedDistrict])

  const filteredRestaurants = restaurants.filter((r) => {
    const q = searchQuery.trim().toLowerCase()
    return (
      q === '' ||
      (r.name || '').toLowerCase().includes(q) ||
      ((r.cuisine || '') as string).toLowerCase().includes(q)
    )
  })

  const filteredDistricts = districts.filter((d: any) => {
    const q = searchQuery.trim().toLowerCase()
    return q !== '' && (d?.name || '').toLowerCase().includes(q)
  })

  useEffect(() => {
    const q = searchQuery.trim()

    if (!q) {
      hasAutoScrolledOnSearchRef.current = false
      return
    }

    if (!selectedDistrict || hasAutoScrolledOnSearchRef.current || !restaurantSectionRef.current) {
      return
    }

    const targetTop = Math.max(
      0,
      restaurantSectionRef.current.getBoundingClientRect().top + window.scrollY - 220,
    )

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    })

    hasAutoScrolledOnSearchRef.current = true
  }, [searchQuery, selectedDistrict])

  const restaurantLogos = [
    { name: 'Indian', logo: '🍛' },
    { name: 'Chinese', logo: '🥡' },
    { name: 'Italian', logo: '🍝' },
    { name: 'Thai', logo: '🍜' },
    { name: 'Mexican', logo: '🌮' },
    { name: 'BBQ', logo: '🍖' },
    { name: 'Seafood', logo: '🦞' },
    { name: 'Cafe', logo: '☕' },
    { name: 'Desserts', logo: '🍰' },
    { name: 'Vegan', logo: '🥗' },
    { name: 'Biryani', logo: '🍚' },
    { name: 'Tandoori', logo: '🍗' },
    { name: 'Noodles', logo: '🍜' },
    { name: 'Pizza', logo: '🍕' },
    { name: 'Burgers', logo: '🍔' }
  ];

  const featuredList = featuredDistricts.length > 0
    ? featuredDistricts
    : districts.slice(0, 10)

  const featuredIcons = [
    <svg key="arch" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 52h48" />
      <path d="M14 52V30l18-14 18 14v22" />
      <path d="M24 52V36h16v16" />
    </svg>,
    <svg key="tower" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="24" y="10" width="16" height="42" rx="2" />
      <path d="M20 52h24" />
      <path d="M28 18h8M28 26h8M28 34h8" />
    </svg>,
    <svg key="gate" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 52h48" />
      <path d="M14 52V28h36v24" />
      <path d="M22 28V20h20v8" />
      <path d="M28 52V36h8v16" />
    </svg>,
    <svg key="temple" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 28h48" />
      <path d="M12 28l20-12 20 12" />
      <path d="M16 52V28h32v24" />
      <path d="M28 52V40h8v12" />
    </svg>,
    <svg key="bridge" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 50h52" />
      <path d="M10 50V34a22 22 0 0 1 44 0v16" />
      <path d="M18 50V36M46 50V36" />
    </svg>,
    <svg key="palace" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 52h40" />
      <path d="M20 52V28h24v24" />
      <path d="M24 28V18h16v10" />
      <path d="M28 52V36h8v16" />
    </svg>,
    <svg key="dome" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 52h40" />
      <path d="M16 52V34a16 16 0 0 1 32 0v18" />
      <path d="M32 18V12" />
    </svg>,
    <svg key="fort" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 52h44" />
      <path d="M14 52V24h36v28" />
      <path d="M20 24V16h8v8M36 24V16h8v8" />
    </svg>,
    <svg key="monument" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 52h48" />
      <path d="M22 52V20h20v32" />
      <path d="M24 20l8-10 8 10" />
    </svg>,
    <svg key="city" viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="30" width="16" height="22" rx="2" />
      <rect x="26" y="22" width="16" height="30" rx="2" />
      <rect x="44" y="34" width="12" height="18" rx="2" />
      <path d="M14 52v-6M32 52v-8M50 52v-4" />
    </svg>,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] to-[#0f0f13]">
      {/* WWF Landing Section */}
      <div className="relative bg-gradient-to-br from-[#0a1628] via-[#1a365d] to-[#2d3748] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-cover mix-blend-overlay opacity-10"></div>
        
        {/* Background decorative circles */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="md:max-w-xl">
              <Button variant="ghost" size="sm" onClick={() => router.push('/')} className="mb-6 hover:bg-white/10 text-white">
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span>Back to Home</span>
              </Button>
              <h1 className="text-left text-4xl md:text-6xl font-extrabold leading-tight text-white">
                Where the World
                <br />
                Finds Food
              </h1>
            </div>

            <div className="md:max-w-md md:pt-12 text-left md:text-right">
              <p className="text-base md:text-[15px] leading-relaxed text-white/80">
                Discover authentic local restaurants paired with strong curation and delightful experiences.
                Manage your food journey confidently and securely.
              </p>
              {/* Removed Explore Now button as requested */}
            </div>
          </div>

          {/* Single translucent stats panel */}
          <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-white">{districts.length || 26}<span className="text-white/70">+</span></div>
                <div className="mt-3 inline-block px-4 py-1 rounded-full text-xs font-semibold bg-sky-300/30 text-white border border-white/30">Districts</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white">150<span className="text-white/70">+</span></div>
                <div className="mt-3 inline-block px-4 py-1 rounded-full text-xs font-semibold bg-sky-300/30 text-white border border-white/30">Restaurants</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white">80<span className="text-white/70">+</span></div>
                <div className="mt-3 inline-block px-4 py-1 rounded-full text-xs font-semibold bg-sky-300/30 text-white border border-white/30">Cuisines</div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-scrolling restaurant logos - similar to country flags */}
        <div className="mt-16 pb-8 space-y-4">
          {/* First row - scrolls left to right */}
          <div className="overflow-hidden relative">
            <div className="flex gap-3 animate-scroll-rtl">
              {[...restaurantLogos, ...restaurantLogos, ...restaurantLogos, ...restaurantLogos].map((r, idx) => (
                <div
                  key={`rtl-${r.name}-${idx}`}
                  className="inline-flex items-center gap-2 px-4 h-12 min-w-[92px] bg-transparent rounded-xl hover:scale-105 transition-transform flex-shrink-0 border border-white/40 text-white"
                >
                  <span className="text-2xl leading-none">{r.logo}</span>
                  <span className="text-sm font-semibold tracking-wide">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Second row - scrolls right to left */}
          <div className="overflow-hidden relative">
            <div className="flex gap-3 animate-scroll-ltr">
              {[...restaurantLogos, ...restaurantLogos, ...restaurantLogos, ...restaurantLogos].reverse().map((r, idx) => (
                <div
                  key={`ltr-${r.name}-${idx}`}
                  className="inline-flex items-center gap-2 px-4 h-12 min-w-[92px] bg-transparent rounded-xl hover:scale-105 transition-transform flex-shrink-0 border border-white/40 text-white"
                >
                  <span className="text-2xl leading-none">{r.logo}</span>
                  <span className="text-sm font-semibold tracking-wide">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll-rtl {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @keyframes scroll-ltr {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-rtl {
            animation: scroll-rtl 40s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-scroll-ltr {
            animation: scroll-ltr 40s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-scroll-rtl:hover,
          .animate-scroll-ltr:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      {/* Search and District Selection Section */}
      <div className="relative bg-gradient-to-r from-[#ffb300] to-[#ff7a1a] py-8 md:py-10" id="district-selection">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-cover mix-blend-overlay opacity-20"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-[#181a20]">Discover Local Flavors</h2>
            <p className="text-lg text-[#181a20]/90 mb-4 max-w-2xl">Choose your district and explore the best restaurants, amazing ambience, and must-try signature dishes.</p>
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-lg">
                <input
                  suppressHydrationWarning
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return
                    const q = searchQuery.trim().toLowerCase()
                    if (!q) return
                    const matchedDistrict = districts.find((d: any) => (d?.name || '').toLowerCase().includes(q))
                    if (matchedDistrict?.name) {
                      setSelectedDistrict(matchedDistrict.name)
                      setShowDistrictGrid(true)
                      setTimeout(() => {
                        if (restaurantSectionRef.current) {
                          restaurantSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 300)
                    }
                  }}
                  placeholder="Search restaurants or cuisines..."
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/95 border-2 border-[#181a20]/10 focus:border-[#181a20]/20 focus:ring-0 text-[#181a20] placeholder-[#181a20]/60"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#181a20]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {searchQuery && (
                <Button onClick={() => setSearchQuery('')} variant="outline" className="h-12 border-2">
                  Clear
                </Button>
              )}
            </div>

            <div className="mt-6 popular-districts-highlight rounded-2xl px-4 py-4 md:px-5 md:py-5">
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">Popular Districts</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {featuredList.map((item, idx) => {
                  const name = item?.name || item?.district || String(item || '')
                  const image = item?.image || ''
                  const icon = featuredIcons[idx % featuredIcons.length]
                  return (
                    <button
                      key={`${name}-${idx}`}
                      onClick={() => {
                        setSelectedDistrict(name)
                        setTimeout(() => {
                          if (restaurantSectionRef.current) {
                            restaurantSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }
                        }, 300)
                      }}
                      className="featured-district-card group"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <span className="featured-district-icon">
                        {image ? (
                          <img src={image} alt={name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                        ) : (
                          icon
                        )}
                      </span>
                      <span className="featured-district-text">{name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <style>{`
          .district-btn {
            position: relative;
            overflow: hidden;
          }
          .district-btn .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background: rgba(255,179,0,0.3);
            pointer-events: none;
          }
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
          .district-btn.selected {
            box-shadow: 0 0 0 4px #ffb30055, 0 4px 24px #ffb30055;
            border-color: #ffb300;
          }
          .district-btn.selected::after {
            content: '';
            display: block;
            position: absolute;
            left: 10%;
            right: 10%;
            bottom: 0;
            height: 4px;
            background: linear-gradient(90deg,#ffb300,#ff7a1a);
            border-radius: 2px;
            animation: underline 0.5s;
          }
          @keyframes underline {
            from { width: 0; opacity: 0; }
            to { width: 80%; opacity: 1; }
          }
          .district-btn:hover {
            box-shadow: 0 0 0 4px #ffb30033, 0 2px 12px #ffb30033;
            border-color: #ffb300;
          }
          .fade-in {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            animation: fadeInUp 0.7s forwards;
          }
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .featured-district-card {
            width: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 8px 6px;
            color: rgba(255, 255, 255, 0.98);
            border-radius: 12px;
            transition: transform 0.25s ease, color 0.25s ease;
            animation: featured-fade-up 0.5s ease both;
          }
          .featured-district-card:hover {
            transform: translateY(-4px);
            color: #ffffff;
          }
          .featured-district-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.92);
          }
          .featured-district-card:hover .featured-district-icon {
            color: #ffffff;
          }
          .featured-district-text {
            font-size: 0.95rem;
            font-weight: 600;
          }
          .popular-districts-highlight {
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow:
              inset 0 0 0 1px rgba(255, 255, 255, 0.2),
              0 8px 30px rgba(255, 255, 255, 0.12);
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.14) 0%,
              rgba(255, 255, 255, 0.04) 55%,
              rgba(255, 255, 255, 0.08) 100%
            );
            backdrop-filter: blur(3px);
            overflow: hidden;
          }
          .popular-districts-highlight::before {
            content: '';
            position: absolute;
            top: -140%;
            left: -40%;
            width: 60%;
            height: 320%;
            background: linear-gradient(
              110deg,
              transparent 0%,
              rgba(255, 255, 255, 0.05) 35%,
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0.07) 65%,
              transparent 100%
            );
            transform: rotate(12deg);
            animation: glossySweep 3.8s ease-in-out infinite;
            pointer-events: none;
          }
          .popular-districts-highlight > * {
            position: relative;
            z-index: 1;
          }
          @keyframes featured-fade-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glossySweep {
            0% { left: -60%; opacity: 0; }
            10% { opacity: 1; }
            60% { left: 120%; opacity: 0.95; }
            100% { left: 120%; opacity: 0; }
          }
          @media (max-width: 640px) {
            .featured-district-card { width: 96px; }
            .featured-district-text { font-size: 0.85rem; }
          }
        `}</style>
        {/* District Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="text-lg text-[#ffb300] font-semibold">Choose Your District</div>
            <Button
              type="button"
              variant="outline"
              className="h-9 px-3 text-xs border-[#ffb300]/50 text-[#ffb300] hover:bg-[#ffb300]/10"
              onClick={() => setShowDistrictGrid((prev) => !prev)}
            >
              {showDistrictGrid ? 'Hide District List' : 'Show District List'}
            </Button>
          </div>

          {searchQuery.trim() !== '' && (
            <div className="mb-3">
              {filteredDistricts.length > 0 ? (
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full max-w-5xl mx-auto">
                    {filteredDistricts.map((d: any) => (
                      <button
                        key={`search-${d.name}`}
                        className={`district-btn px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border border-[#ffb300]/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffb300] focus:ring-offset-2 focus:ring-offset-[#181a20] whitespace-normal break-words text-center relative overflow-hidden ${
                          selectedDistrict && selectedDistrict.toLowerCase() === d.name.toLowerCase()
                            ? 'selected bg-gradient-to-r from-[#ffb300] to-[#ff7a1a] text-[#181a20]'
                            : 'bg-[#23242a]/80 text-gray-300 hover:bg-[#ffb300]/20 hover:text-[#ffb300] hover:border-[#ffb300]'
                        }`}
                        style={{ minWidth: '128px', minHeight: '42px', letterSpacing: '0.4px', padding: '0.55rem 0.85rem' }}
                        onClick={() => {
                          setSelectedDistrict(d.name)
                          setTimeout(() => {
                            if (restaurantSectionRef.current) {
                              restaurantSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }, 300)
                        }}
                      >
                        <span className="block w-full">{d.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-300">No district match for "{searchQuery}".</div>
              )}
            </div>
          )}

          {showDistrictGrid ? (
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full max-w-5xl mx-auto">
                {districts.length === 0 ? (
                  <div className="col-span-full text-gray-400 flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-5 w-5 text-[#ffb300]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="#ffb300" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    Loading districts...
                  </div>
                ) : (
                  districts.map((d: any) => (
                    <button
                      key={d.name}
                      className={`district-btn px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 border border-[#ffb300]/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffb300] focus:ring-offset-2 focus:ring-offset-[#181a20] whitespace-normal break-words text-center relative overflow-hidden ${
                        selectedDistrict && selectedDistrict.toLowerCase() === d.name.toLowerCase()
                          ? 'selected bg-gradient-to-r from-[#ffb300] to-[#ff7a1a] text-[#181a20] scale-110'
                          : 'bg-[#23242a]/80 text-gray-300 hover:bg-[#ffb300]/20 hover:text-[#ffb300] hover:border-[#ffb300] hover:scale-105'
                      }`}
                      style={{ minWidth: '128px', minHeight: '42px', letterSpacing: '0.4px', padding: '0.55rem 0.85rem', boxShadow: selectedDistrict && selectedDistrict.toLowerCase() === d.name.toLowerCase() ? '0 4px 24px 0 #ffb30055' : undefined }}
                      onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        setRipple({x, y, key: d.name + Date.now()});
                        setSelectedDistrict(d.name);
                        setTimeout(() => {
                          if (restaurantSectionRef.current) {
                            restaurantSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 300);
                      }}
                    >
                      <span className="block w-full">{d.name}</span>
                      {ripple && ripple.key.startsWith(d.name) && (
                        <span
                          className="ripple"
                          style={{ left: ripple.x, top: ripple.y, width: 40, height: 40 }}
                          onAnimationEnd={() => setRipple(null)}
                        />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-300">
              Click "Show District List" to view all districts.
            </div>
          )}
        </div>

  {/* Only show restaurant/featured sections if a district is selected and data is loaded */}
  {selectedDistrict && (
          <>
          <div ref={restaurantSectionRef} className="space-y-16">
            {/* All Restaurants */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">
                Restaurants in {displayDistrict || selectedDistrict}
                {searchQuery && <span className="text-lg font-normal text-gray-400 ml-3">Search results for "{searchQuery}"</span>}
              </h2>
              {filteredRestaurants.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((r: any, idx: number) => (
                    <article key={r.id || r.name} className={`group relative rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 fade-in`} style={{ animationDelay: `${idx * 80}ms` }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ffb300] to-[#ff7a1a] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative bg-[#23242a]/80 backdrop-blur-sm border border-[#ffb300]/20 rounded-2xl overflow-hidden hover:border-[#ffb300]/40">
                        <div className="relative h-48">
                          <img src={r.image || 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3'} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-lg font-bold text-white">{r.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-xs text-white">{r.cuisine}</span>
                              {r.featured && <span className="px-2 py-1 rounded-md bg-[#ffb300] text-xs text-[#181a20] font-medium">Featured</span>}
                            </div>
                          </div>
                          {r.rating && (
                            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 text-[#181a20] text-sm font-medium">
                              <Star className="w-4 h-4 text-[#ffb300] fill-current" />
                              <span>{r.rating}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                              {r.deliveryTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{r.deliveryTime}</span>
                                </div>
                              )}
                              {r.distance && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{r.distance}</span>
                                </div>
                              )}
                            </div>
                            {r.priceRange && <span className="text-[#ffb300]">{r.priceRange}</span>}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#ffb300]/20 bg-[#23242a]/70 p-6 text-gray-300">
                  No restaurants available for {displayDistrict || selectedDistrict} yet.
                </div>
              )}
            </section>

            {/* Featured Ambience */}
            {featuredAmbience.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Featured Restaurants in {displayDistrict || selectedDistrict} – Best in Ambience
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredAmbience.map((r: any) => (
                    <article key={r.id || r.name} className="group relative rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ffb300] to-[#ff7a1a] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative bg-[#23242a]/80 backdrop-blur-sm border border-[#ffb300]/20 rounded-2xl overflow-hidden hover:border-[#ffb300]/40">
                        <div className="relative h-48">
                          <img src={r.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3'} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-[#ffb300] text-xs text-[#181a20] font-medium">Featured Ambience</span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-lg font-bold text-white mb-1">{r.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-xs text-white">{r.cuisine}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Featured Must Try */}
            {featuredDishes.length > 0 && (
              <section className="mb-20">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Featured Restaurants in {displayDistrict || selectedDistrict} – Must Try Dishes
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredDishes.map((r: any) => (
                    <article key={r.id || r.name} className="group relative rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ffb300] to-[#ff7a1a] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative bg-[#23242a]/80 backdrop-blur-sm border border-[#ffb300]/20 rounded-2xl overflow-hidden hover:border-[#ffb300]/40">
                        <div className="relative h-48">
                          <img src={r.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3'} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-[#ffb300] text-xs text-[#181a20] font-medium">Must Try</span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-lg font-bold text-white mb-1">{r.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-xs text-white">{r.cuisine}</span>
                            </div>
                            {r.signatureDish && (
                              <div className="mt-2 px-3 py-1 rounded-md bg-white/90 text-sm text-[#181a20] inline-block">
                                Try: {r.signatureDish}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
        )}
      </div>
    </div>
  )
}
