"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pen, Trash2, Plus, LogOut, ImagePlus } from 'lucide-react'

import { Restaurant } from '@/types/restaurant'
import { fetchRestaurants, updateRestaurant, deleteRestaurant, addRestaurant } from '@/lib/restaurant-service'

type FeaturedDistrictRow = {
  id: string
  name: string
  symbolKey: string
  image?: string
  order: number
  isActive: boolean
}

const DISTRICT_SYMBOL_VARIANTS: Array<{ key: string; label: string; path: string }> = [
  { key: 'gateway', label: 'Gateway', path: `<path d="M20 62h88"/><path d="M28 62V34h72v28"/><path d="M40 34V24h48v10"/><path d="M52 62V45h24v17"/><path d="M36 42h8M84 42h8"/>` },
  { key: 'beach', label: 'Beach', path: `<path d="M16 62h96"/><path d="M24 62c8-8 24-8 32 0 8-8 24-8 32 0"/><path d="M44 48c0-8 6-14 14-14"/><path d="M58 34l10 10"/><path d="M28 52h72"/>` },
  { key: 'arch', label: 'Arch', path: `<path d="M20 62h88"/><path d="M28 62V36h72v26"/><path d="M46 62V46a18 18 0 0 1 36 0v16"/><path d="M32 42h8M88 42h8"/>` },
  { key: 'palace', label: 'Palace', path: `<path d="M20 62h88"/><path d="M28 62V38h72v24"/><path d="M40 38l12-10 12 10 12-10 12 10"/><path d="M56 62V48h16v14"/>` },
  { key: 'minar', label: 'Minar', path: `<path d="M20 62h88"/><path d="M34 62V28h20v34"/><path d="M74 62V24h20v38"/><path d="M34 36h20M74 34h20"/>` },
  { key: 'tower', label: 'Tower', path: `<path d="M20 62h88"/><path d="M40 62V30h16v32"/><path d="M72 62V26h16v36"/><path d="M36 30h24M68 26h24"/>` },
  { key: 'temple', label: 'Temple', path: `<path d="M20 62h88"/><path d="M32 62V40h64v22"/><path d="M28 40l36-16 36 16"/><path d="M56 62V48h16v14"/>` },
  { key: 'fort', label: 'Fort', path: `<path d="M20 62h88"/><path d="M28 62V34h72v28"/><path d="M28 34V26h10v8M90 34V26h10v8"/><path d="M54 62V46h20v16"/>` },
  { key: 'dome', label: 'Dome', path: `<path d="M20 62h88"/><path d="M28 62V46a36 36 0 0 1 72 0v16"/><path d="M64 24v-6"/><path d="M54 62V48h20v14"/>` },
  { key: 'city', label: 'City', path: `<path d="M20 62h88"/><rect x="24" y="36" width="20" height="26"/><rect x="52" y="30" width="24" height="32"/><rect x="84" y="40" width="20" height="22"/>` },
]

const SUGGESTED_POPULAR_DISTRICTS = [
  'Chennai',
  'T. Nagar',
  'Adyar',
  'Anna Nagar',
  'Mylapore',
  'Coimbatore',
  'Madurai',
  'Salem',
]

function getDefaultSymbolKey(name: string): string {
  const normalizedName = (name || '').trim()
  const hash = Array.from(normalizedName).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return DISTRICT_SYMBOL_VARIANTS[hash % DISTRICT_SYMBOL_VARIANTS.length].key
}

function getDistrictAutoIcon(name: string, symbolKey?: string): string {
  const normalizedName = (name || '').trim()
  const resolvedKey = symbolKey || getDefaultSymbolKey(normalizedName)
  const resolvedVariant = DISTRICT_SYMBOL_VARIANTS.find((variant) => variant.key === resolvedKey)
  const symbol = resolvedVariant?.path || DISTRICT_SYMBOL_VARIANTS[0].path
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="96" viewBox="0 0 128 96">
      <g fill="none" stroke="#5f646b" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
        ${symbol}
      </g>
    </svg>
  `
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function createDistrictRow(
  district: Partial<Omit<FeaturedDistrictRow, 'id'>> = {},
  order: number,
): FeaturedDistrictRow {
  const generatedId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  const resolvedName = String(district.name || '').trim()
  const resolvedSymbolKey = String(district.symbolKey || '').trim() || getDefaultSymbolKey(resolvedName)

  return {
    id: generatedId,
    name: resolvedName,
    symbolKey: resolvedSymbolKey,
    image: String(district.image || '').trim() || getDistrictAutoIcon(resolvedName, resolvedSymbolKey),
    order,
    isActive: district.isActive !== false,
  }
}

async function fileToDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload a valid image file.')
  }

  const maxFileSizeMb = 12
  if (file.size > maxFileSizeMb * 1024 * 1024) {
    throw new Error(`Image size must be less than ${maxFileSizeMb} MB.`)
  }

  const imageUrl = URL.createObjectURL(file)

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Unable to load image file.'))
      img.src = imageUrl
    })

    const maxDimension = 900
    const width = image.width
    const height = image.height
    const scale = Math.min(1, maxDimension / Math.max(width, height))
    const targetWidth = Math.max(1, Math.round(width * scale))
    const targetHeight = Math.max(1, Math.round(height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Unable to process image file.')
    }

    context.drawImage(image, 0, 0, targetWidth, targetHeight)

    const outputType = 'image/jpeg'
    const outputQuality = 0.65
    return canvas.toDataURL(outputType, outputQuality)
  } finally {
    URL.revokeObjectURL(imageUrl)
  }
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [featuredDistricts, setFeaturedDistricts] = useState<FeaturedDistrictRow[]>([])
  const [featuredDirty, setFeaturedDirty] = useState(false)
  const [isSavingFeatured, setIsSavingFeatured] = useState(false)
  const [showExistingDistricts, setShowExistingDistricts] = useState(false)
  const [newDistrictName, setNewDistrictName] = useState('')
  const [newDistrictSymbolKey, setNewDistrictSymbolKey] = useState(DISTRICT_SYMBOL_VARIANTS[0].key)
  const [editingDistrictId, setEditingDistrictId] = useState<string | null>(null)
  const [editingDistrictName, setEditingDistrictName] = useState('')
  const [editingDistrictSymbolKey, setEditingDistrictSymbolKey] = useState(DISTRICT_SYMBOL_VARIANTS[0].key)
  const [isEditing, setIsEditing] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)

  const districtOptions = Array.from(
    new Set(
      featuredDistricts
        .map((district) => (district.name || '').trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b))

  // Check authentication
  const handleLogin = () => {
    if (username === 'naveen' && password === 'name_sake') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const loadFeaturedDistricts = async () => {
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const [featuredRes, districtsRes] = await Promise.all([
        fetch(base + '/api/explore/featured-districts'),
        fetch(base + '/api/explore/districts'),
      ])

      const featuredData = await featuredRes.json()
      const districtsData = await districtsRes.json()

      const featuredRows = Array.isArray(featuredData?.districts) ? featuredData.districts : []
      const allDistricts = Array.isArray(districtsData?.districts) ? districtsData.districts : []

      const makeNameKey = (value: string) => value.trim().toLowerCase()
      const mergedByName = new Map<string, any>()

      featuredRows.forEach((district: any) => {
        const districtName = String(district?.name || district?.district || '').trim()
        if (!districtName) return
        mergedByName.set(makeNameKey(districtName), {
          ...district,
          name: districtName,
          district: districtName,
        })
      })

      allDistricts.forEach((district: any) => {
        const districtName = String(district?.name || district?.district || '').trim()
        if (!districtName) return
        const key = makeNameKey(districtName)
        if (mergedByName.has(key)) return
        mergedByName.set(key, {
          name: districtName,
          district: districtName,
          isActive: true,
          order: mergedByName.size,
        })
      })

      SUGGESTED_POPULAR_DISTRICTS.forEach((districtName) => {
        const key = makeNameKey(districtName)
        if (mergedByName.has(key)) return
        mergedByName.set(key, {
          name: districtName,
          district: districtName,
          isActive: true,
          order: mergedByName.size,
        })
      })

      const mergedRows = Array.from(mergedByName.values())
        .sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0))

      if (mergedRows.length) {
        const normalized = mergedRows.map((d: any, idx: number) =>
          createDistrictRow(
            {
              name: String(d?.name || d?.district || '').trim(),
              symbolKey: String(d?.symbolKey || d?.symbol || '').trim() || getDefaultSymbolKey(String(d?.name || d?.district || '')),
              image: getDistrictAutoIcon(
                String(d?.name || d?.district || ''),
                String(d?.symbolKey || d?.symbol || '').trim() || getDefaultSymbolKey(String(d?.name || d?.district || '')),
              ),
              isActive: d?.isActive !== false,
              order: typeof d?.order === 'number' ? d.order : idx,
            },
            idx,
          ),
        )
        setFeaturedDistricts(normalized)
        setFeaturedDirty(false)
      }
    } catch (error) {
      console.error('Error loading featured districts:', error)
    }
  }

  const saveFeaturedDistricts = async () => {
    setIsSavingFeatured(true)
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const payload = featuredDistricts.map((d, idx) => ({
        name: d.name.trim(),
        symbolKey: d.symbolKey,
        image: getDistrictAutoIcon(d.name, d.symbolKey),
        order: idx,
        isActive: d.isActive,
      })).filter((d) => d.name)

      const res = await fetch(base + '/api/explore/featured-districts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ districts: payload }),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText || 'Failed to save featured districts')
      }
      setFeaturedDirty(false)
    } catch (error) {
      console.error('Error saving featured districts:', error)
      alert('Error saving featured districts. Please try again.')
    } finally {
      setIsSavingFeatured(false)
    }
  }

  const addFeaturedDistrict = () => {
    const name = newDistrictName.trim()
    if (!name) return

    const exists = featuredDistricts.some((district) => district.name.trim().toLowerCase() === name.toLowerCase())
    if (exists) {
      alert('District already exists in popular list.')
      return
    }

    setFeaturedDistricts((prev) => {
      return [
        ...prev,
        createDistrictRow(
          { name, symbolKey: newDistrictSymbolKey, image: getDistrictAutoIcon(name, newDistrictSymbolKey) },
          prev.length,
        ),
      ]
    })
    setNewDistrictName('')
    setNewDistrictSymbolKey(DISTRICT_SYMBOL_VARIANTS[0].key)
    setFeaturedDirty(true)
  }

  const removeFeaturedDistrict = (id: string) => {
    setFeaturedDistricts((prev) => prev.filter((district) => district.id !== id).map((district, index) => ({ ...district, order: index })))
    setFeaturedDirty(true)
  }

  const startEditFeaturedDistrict = (district: FeaturedDistrictRow) => {
    setEditingDistrictId(district.id)
    setEditingDistrictName(district.name)
    setEditingDistrictSymbolKey(district.symbolKey || getDefaultSymbolKey(district.name))
  }

  const cancelEditFeaturedDistrict = () => {
    setEditingDistrictId(null)
    setEditingDistrictName('')
  }

  const saveEditFeaturedDistrict = () => {
    if (!editingDistrictId) return

    const name = editingDistrictName.trim()
    if (!name) {
      alert('District name is required.')
      return
    }

    setFeaturedDistricts((prev) =>
      prev.map((district, index) =>
        district.id === editingDistrictId
          ? {
              ...district,
              name,
              symbolKey: editingDistrictSymbolKey,
              image: getDistrictAutoIcon(name, editingDistrictSymbolKey),
              order: index,
            }
          : district,
      ),
    )
    setFeaturedDirty(true)
    cancelEditFeaturedDistrict()
  }

  const handleRestaurantImageFile = async (file: File) => {
    try {
      const imageData = await fileToDataUrl(file)
      setEditingRestaurant((prev) => (prev ? { ...prev, image: imageData } : prev))
    } catch (error: any) {
      alert(error?.message || 'Failed to process restaurant image.')
    }
  }

  // Fetch restaurants
  useEffect(() => {
    if (isAuthenticated) {
      fetchRestaurants()
        .then(restaurants => {
          setRestaurants(restaurants)
        })
        .catch(error => {
          console.error('Error fetching restaurants:', error)
        })

      loadFeaturedDistricts()
    }
  }, [isAuthenticated])

  const handleSubmit = async (restaurant: Restaurant) => {
    try {
      if ((restaurant.image || '').startsWith('data:image/') && (restaurant.image || '').length > 2_000_000) {
        throw new Error('Image is too large. Use a smaller image or image URL.')
      }

      if (restaurant.id === 0) {
        // Creating new restaurant
        const newRestaurant = await addRestaurant(restaurant)
        setRestaurants(prev => [...prev, newRestaurant])
        alert('Restaurant added successfully.')
      } else {
        // Updating existing restaurant
        await updateRestaurant(restaurant.id, restaurant)
        setRestaurants(prev => prev.map(r => r.id === restaurant.id ? restaurant : r))
        alert('Restaurant updated successfully.')
      }
      setIsEditing(false)
      setEditingRestaurant(null)
    } catch (error) {
      console.error('Error saving restaurant:', error)
      const message = error instanceof Error ? error.message : 'Error saving restaurant. Please try again.'
      alert(message)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this restaurant?')) return

    try {
      await deleteRestaurant(id)
      setRestaurants(prev => prev.filter(r => r.id !== id))
    } catch (error) {
      console.error('Error deleting restaurant:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#181a20] to-[#0f0f13] flex items-center justify-center">
        <Card className="w-[400px] bg-[#23242a]/80 backdrop-blur-sm border-[#ffb300]/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Dashboard Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin() }} className="space-y-4">
              <div>
                <Input 
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                />
              </div>
              <div>
                <Input 
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#ffb300] to-[#ff7a1a] text-[#181a20] hover:shadow-lg hover:shadow-[#ffb300]/25"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] to-[#0f0f13]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Restaurant Dashboard</h1>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card className="mb-10 bg-[#23242a]/80 backdrop-blur-sm border-[#ffb300]/20">
          <CardHeader>
            <CardTitle className="text-white">Popular Districts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-400">
              These districts appear in the "Popular Districts" strip on the Explore page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3">
              <Input
                value={newDistrictName}
                onChange={(e) => setNewDistrictName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addFeaturedDistrict()
                  }
                }}
                placeholder="Add new district name"
                className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
              />
              <select
                value={newDistrictSymbolKey}
                onChange={(e) => setNewDistrictSymbolKey(e.target.value)}
                className="h-10 rounded-md border border-[#ffb300]/20 bg-[#181a20]/50 px-2 text-sm text-white"
              >
                {DISTRICT_SYMBOL_VARIANTS.map((variant) => (
                  <option key={variant.key} value={variant.key} className="bg-[#181a20] text-white">
                    {variant.label}
                  </option>
                ))}
              </select>
              <img
                src={getDistrictAutoIcon(newDistrictName || 'District', newDistrictSymbolKey)}
                alt="New district symbol preview"
                className="h-10 w-14 rounded-md object-cover border border-[#ffb300]/20"
              />
              <Button
                type="button"
                variant="outline"
                className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                onClick={addFeaturedDistrict}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add District
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                onClick={() => setShowExistingDistricts((prev) => !prev)}
              >
                {showExistingDistricts ? 'Hide Existing Districts' : 'Show Existing Districts'}
              </Button>
            </div>

            {showExistingDistricts && (
              <div className="space-y-3">
                {featuredDistricts.map((item, idx) => {
                  const isEditingDistrict = editingDistrictId === item.id

                  return (
                    <div key={`${item.id}-${idx}`} className="rounded-lg border border-[#ffb300]/15 bg-[#181a20]/30 p-3">
                      {isEditingDistrict ? (
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-center">
                          <Input
                            value={editingDistrictName}
                            onChange={(e) => setEditingDistrictName(e.target.value)}
                            placeholder="District name"
                            className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                          />
                          <select
                            value={editingDistrictSymbolKey}
                            onChange={(e) => setEditingDistrictSymbolKey(e.target.value)}
                            className="h-10 rounded-md border border-[#ffb300]/20 bg-[#181a20]/50 px-2 text-sm text-white"
                          >
                            {DISTRICT_SYMBOL_VARIANTS.map((variant) => (
                              <option key={variant.key} value={variant.key} className="bg-[#181a20] text-white">
                                {variant.label}
                              </option>
                            ))}
                          </select>
                          <img
                            src={getDistrictAutoIcon(editingDistrictName, editingDistrictSymbolKey)}
                            alt="District icon preview"
                            className="h-10 w-14 rounded-md object-cover border border-[#ffb300]/20"
                          />
                          <div className="md:col-span-3 flex gap-2 justify-end">
                            <Button
                              type="button"
                              variant="outline"
                              className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                              onClick={saveEditFeaturedDistrict}
                            >
                              Save Edit
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-gray-500/20 text-gray-300 hover:bg-gray-500/10"
                              onClick={cancelEditFeaturedDistrict}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={getDistrictAutoIcon(item.name, item.symbolKey)}
                              alt={`${item.name || 'District'} icon`}
                              className="h-10 w-14 rounded-md object-cover border border-[#ffb300]/20"
                            />
                            <div className="text-white font-medium">{item.name}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                              onClick={() => startEditFeaturedDistrict(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                              onClick={() => removeFeaturedDistrict(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <p className="text-xs text-gray-400">Add new districts above, then use Edit/Remove for existing districts and Save.</p>
              <Button
                type="button"
                className="bg-gradient-to-r from-[#ffb300] to-[#ff7a1a] text-[#181a20] hover:shadow-lg hover:shadow-[#ffb300]/25"
                onClick={saveFeaturedDistricts}
                disabled={isSavingFeatured || !featuredDirty}
              >
                {isSavingFeatured ? 'Saving...' : 'Save Popular Districts'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <Card key={restaurant.id} className="bg-[#23242a]/80 backdrop-blur-sm border-[#ffb300]/20">
              <CardHeader>
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-sm text-white/80">{restaurant.cuisine}</p>
                  </div>
                  {restaurant.featured && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#ffb300] to-[#ff7a1a] text-[#181a20]">
                      Featured: {restaurant.featuredCategory}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-400">Rating: <span className="text-white">{restaurant.rating}</span></div>
                  <div className="text-gray-400">Time: <span className="text-white">{restaurant.deliveryTime}</span></div>
                  <div className="text-gray-400">Distance: <span className="text-white">{restaurant.distance}</span></div>
                  <div className="text-gray-400">District: <span className="text-white">{restaurant.district}</span></div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      setIsEditing(true)
                      setEditingRestaurant(restaurant)
                    }}
                    variant="outline"
                    className="flex-1 border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                  >
                    <Pen className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDelete(restaurant.id)}
                    variant="outline"
                    className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Restaurant Card */}
          <Card 
            className="bg-[#23242a]/80 backdrop-blur-sm border-[#ffb300]/20 border-dashed hover:border-[#ffb300]/40 transition-colors cursor-pointer group"
            onClick={() => {
              setEditingRestaurant({
                id: 0,
                name: '',
                cuisine: '',
                rating: 0,
                image: '',
                featured: false,
                featuredCategory: '',
                emoji: '',
                district: '',
                deliveryTime: '',
                distance: '',
                category: '',
                priceRange: '',
                signatureDish: ''
              })
              setIsEditing(true)
            }}
          >
            <CardContent>
              <div className="h-full flex flex-col items-center justify-center py-12">
                <Plus className="w-12 h-12 text-[#ffb300]/40 group-hover:text-[#ffb300] transition-colors mb-4" />
                <p className="text-[#ffb300]/60 group-hover:text-[#ffb300] font-medium transition-colors">Add New Restaurant</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isEditing && editingRestaurant && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <Card className="w-full max-w-4xl max-h-[92vh] overflow-hidden bg-[#23242a]/95 border-[#ffb300]/20">
            <CardHeader>
              <CardTitle className="text-white">
                {editingRestaurant.id === 0 ? 'Add New Restaurant' : 'Edit Restaurant'}
              </CardTitle>
              <p className="text-sm text-gray-400">Fill the form neatly and save to update the restaurant list.</p>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[calc(92vh-110px)] pr-1 sm:pr-2">
              <form onSubmit={async (e) => {
                e.preventDefault()
                await handleSubmit(editingRestaurant)
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Name</label>
                    <Input 
                      value={editingRestaurant.name}
                      onChange={e => setEditingRestaurant({...editingRestaurant, name: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Image URL</label>
                    <Input 
                      value={editingRestaurant.image}
                      onChange={e => setEditingRestaurant({...editingRestaurant, image: e.target.value})}
                      onPaste={(e) => {
                        const imageFile = Array.from(e.clipboardData.files || []).find((file) => file.type.startsWith('image/'))
                        if (!imageFile) return
                        e.preventDefault()
                        handleRestaurantImageFile(imageFile)
                      }}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                      required
                    />
                    <div
                      className="rounded-md border border-dashed border-[#ffb300]/30 bg-[#181a20]/40 px-3 py-2 text-xs text-gray-300"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault()
                        const droppedImage = Array.from(e.dataTransfer.files || []).find((file) => file.type.startsWith('image/'))
                        if (!droppedImage) return
                        handleRestaurantImageFile(droppedImage)
                      }}
                      onPaste={(e) => {
                        const pastedImage = Array.from(e.clipboardData.files || []).find((file) => file.type.startsWith('image/'))
                        if (!pastedImage) return
                        e.preventDefault()
                        handleRestaurantImageFile(pastedImage)
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1">
                          <ImagePlus className="h-3.5 w-3.5" />
                          Drop / paste image
                        </span>
                        <label className="cursor-pointer rounded-md border border-[#ffb300]/30 px-2 py-1 text-[#ffb300] hover:bg-[#ffb300]/10">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              handleRestaurantImageFile(file)
                              e.currentTarget.value = ''
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    {editingRestaurant.image && (
                      <img
                        src={editingRestaurant.image}
                        alt="Restaurant preview"
                        className="h-24 w-full rounded-md object-cover border border-[#ffb300]/20"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Cuisine</label>
                    <Input 
                      value={editingRestaurant.cuisine}
                      onChange={e => setEditingRestaurant({...editingRestaurant, cuisine: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Rating</label>
                    <Input 
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={Number.isFinite(editingRestaurant.rating) ? editingRestaurant.rating : ''}
                      onChange={e => {
                        const nextValue = e.target.value
                        if (nextValue === '') {
                          setEditingRestaurant({ ...editingRestaurant, rating: 0 })
                          return
                        }

                        const parsed = Number.parseFloat(nextValue)
                        setEditingRestaurant({
                          ...editingRestaurant,
                          rating: Number.isFinite(parsed) ? parsed : 0,
                        })
                      }}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">District</label>
                    <select
                      value={editingRestaurant.district || ''}
                      onChange={e => setEditingRestaurant({...editingRestaurant, district: e.target.value})}
                      className="w-full h-10 rounded-md border border-[#ffb300]/20 bg-[#181a20]/50 px-3 text-white"
                    >
                      <option value="" className="bg-[#181a20] text-white">Select district</option>
                      {districtOptions.map((districtName) => (
                        <option key={districtName} value={districtName} className="bg-[#181a20] text-white">
                          {districtName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Price Range</label>
                    <Input 
                      value={editingRestaurant.priceRange}
                      onChange={e => setEditingRestaurant({...editingRestaurant, priceRange: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Delivery Time</label>
                    <Input 
                      value={editingRestaurant.deliveryTime}
                      onChange={e => setEditingRestaurant({...editingRestaurant, deliveryTime: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Distance</label>
                    <Input 
                      value={editingRestaurant.distance}
                      onChange={e => setEditingRestaurant({...editingRestaurant, distance: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Category</label>
                    <Input 
                      value={editingRestaurant.category}
                      onChange={e => setEditingRestaurant({...editingRestaurant, category: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Emoji</label>
                    <Input 
                      value={editingRestaurant.emoji}
                      onChange={e => setEditingRestaurant({...editingRestaurant, emoji: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                      placeholder="🍛"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Signature Dish</label>
                    <Input 
                      value={editingRestaurant.signatureDish}
                      onChange={e => setEditingRestaurant({...editingRestaurant, signatureDish: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Featured Category</label>
                    <select 
                      value={editingRestaurant.featuredCategory}
                      onChange={e => setEditingRestaurant({...editingRestaurant, featuredCategory: e.target.value})}
                      className="w-full px-3 py-2 bg-[#181a20]/50 border border-[#ffb300]/20 text-white rounded-md"
                    >
                      <option value="">Not Featured</option>
                      <option value="ambience">Featured Ambience</option>
                      <option value="dishes">Featured Dishes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                      <input 
                        type="checkbox"
                        checked={editingRestaurant.featured}
                        onChange={e => setEditingRestaurant({...editingRestaurant, featured: e.target.checked})}
                        className="rounded"
                      />
                      Featured Restaurant
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setEditingRestaurant(null)
                    }}
                    className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#ffb300] to-[#ff7a1a] text-[#181a20] hover:shadow-lg hover:shadow-[#ffb300]/25"
                  >
                    {editingRestaurant.id === 0 ? 'Create' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}