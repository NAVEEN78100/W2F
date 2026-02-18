"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pen, Trash2, Plus, LogOut } from 'lucide-react'

import { Restaurant } from '@/types/restaurant'
import { fetchRestaurants, updateRestaurant, deleteRestaurant, addRestaurant } from '@/lib/restaurant-service'

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [featuredDistricts, setFeaturedDistricts] = useState<Array<{ name: string; image?: string; order: number; isActive: boolean }>>([])
  const [featuredDirty, setFeaturedDirty] = useState(false)
  const [isSavingFeatured, setIsSavingFeatured] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)

  // Check authentication
  const handleLogin = () => {
    if (username === 'naveen' && password === 'name_sake') {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  const loadFeaturedDistricts = async () => {
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const res = await fetch(base + '/api/explore/featured-districts')
      const data = await res.json()
      if (data?.districts) {
        const normalized = data.districts.map((d: any, idx: number) => ({
          name: String(d?.name || d?.district || '').trim(),
          image: String(d?.image || '').trim(),
          order: typeof d?.order === 'number' ? d.order : idx,
          isActive: d?.isActive !== false,
        }))
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
        image: (d.image || '').trim(),
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

  const updateFeaturedAt = (index: number, patch: Partial<{ name: string; image?: string; isActive: boolean }>) => {
    setFeaturedDistricts((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], ...patch }
      return next
    })
    setFeaturedDirty(true)
  }

  const addFeaturedDistrict = () => {
    setFeaturedDistricts((prev) => ([...prev, { name: '', image: '', order: prev.length, isActive: true }]))
    setFeaturedDirty(true)
  }

  const removeFeaturedDistrict = (index: number) => {
    setFeaturedDistricts((prev) => prev.filter((_, i) => i !== index))
    setFeaturedDirty(true)
  }

  const moveFeaturedDistrict = (from: number, to: number) => {
    if (to < 0 || to >= featuredDistricts.length) return
    setFeaturedDistricts((prev) => {
      const next = [...prev]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
    setFeaturedDirty(true)
  }

  // Fetch restaurants
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (auth) setIsAuthenticated(true)

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
      if (restaurant.id === 0) {
        // Creating new restaurant
        const newRestaurant = await addRestaurant(restaurant)
        setRestaurants(prev => [...prev, newRestaurant])
      } else {
        // Updating existing restaurant
        await updateRestaurant(restaurant.id, restaurant)
        setRestaurants(prev => prev.map(r => r.id === restaurant.id ? restaurant : r))
      }
      setIsEditing(false)
      setEditingRestaurant(null)
    } catch (error) {
      console.error('Error saving restaurant:', error)
      alert('Error saving restaurant. Please try again.')
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

            <div className="space-y-3">
              {featuredDistricts.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto_auto] gap-3 items-center">
                  <Input
                    value={item.name}
                    onChange={(e) => updateFeaturedAt(idx, { name: e.target.value })}
                    placeholder="District name"
                    className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                  />
                  <Input
                    value={item.image || ''}
                    onChange={(e) => updateFeaturedAt(idx, { image: e.target.value })}
                    placeholder="Image URL (optional)"
                    className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                  />
                  <label className="text-sm text-gray-300 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.isActive}
                      onChange={(e) => updateFeaturedAt(idx, { isActive: e.target.checked })}
                    />
                    Active
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                      onClick={() => moveFeaturedDistrict(idx, idx - 1)}
                    >
                      Up
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                      onClick={() => moveFeaturedDistrict(idx, idx + 1)}
                    >
                      Down
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                    onClick={() => removeFeaturedDistrict(idx)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="border-[#ffb300]/20 text-[#ffb300] hover:bg-[#ffb300]/10"
                onClick={addFeaturedDistrict}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add District
              </Button>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-[#23242a]/95 border-[#ffb300]/20">
            <CardHeader>
              <CardTitle className="text-white">
                {editingRestaurant.id === 0 ? 'Add New Restaurant' : 'Edit Restaurant'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={async (e) => {
                e.preventDefault()
                try {
                  if (editingRestaurant.id === 0) {
                    // Creating new restaurant
                    const newRestaurant = await addRestaurant(editingRestaurant)
                    setRestaurants(prev => [...prev, newRestaurant])
                  } else {
                    // Updating existing restaurant
                    await updateRestaurant(editingRestaurant.id, editingRestaurant)
                    setRestaurants(prev => prev.map(r => r.id === editingRestaurant.id ? editingRestaurant : r))
                  }
                  setIsEditing(false)
                  setEditingRestaurant(null)
                } catch (error) {
                  console.error('Error saving restaurant:', error)
                  alert('Error saving restaurant. Please try again.')
                }
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                      required
                    />
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
                      value={editingRestaurant.rating}
                      onChange={e => setEditingRestaurant({...editingRestaurant, rating: parseFloat(e.target.value)})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">District</label>
                    <Input 
                      value={editingRestaurant.district}
                      onChange={e => setEditingRestaurant({...editingRestaurant, district: e.target.value})}
                      className="bg-[#181a20]/50 border-[#ffb300]/20 text-white"
                    />
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