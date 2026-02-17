import { Restaurant } from '@/types/restaurant'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${API_URL}/api/restaurants/all`)
  const data = await response.json()
  if (!data.ok) throw new Error(data.error)
  return data.restaurants
}

export async function updateRestaurant(id: number, restaurant: Partial<Restaurant>): Promise<void> {
  const response = await fetch(`${API_URL}/api/restaurants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer admin_authenticated`
    },
    body: JSON.stringify(restaurant)
  })
  const data = await response.json()
  if (!data.ok) throw new Error(data.error)
}

export async function deleteRestaurant(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/restaurants/${id}`, {
    method: 'DELETE',
    headers: {
      // Add auth header here
      'Authorization': `Bearer admin_authenticated`
    }
  })
  const data = await response.json()
  if (!data.ok) throw new Error(data.error)
}

export async function addRestaurant(restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> {
  const response = await fetch(`${API_URL}/api/restaurants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add auth header here
      'Authorization': `Bearer admin_authenticated`
    },
    body: JSON.stringify(restaurant)
  })
  const data = await response.json()
  if (!data.ok) throw new Error(data.error)
  return data.restaurant
}