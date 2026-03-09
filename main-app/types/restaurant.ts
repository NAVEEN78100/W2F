export interface Restaurant {
  id: number
  name: string
  description?: string
  image: string
  location?: string
  rating: number
  cuisine: string
  priceRange?: string
  openingHours?: string
  features?: string[]
  menu?: {
    name: string
    price: number
    description?: string
  }[]
  reviews?: {
    userId: string
    rating: number
    comment: string
    date: string
  }[]
  createdAt?: string
  updatedAt?: string
  featured?: boolean
  featuredCategory?: string
  emoji?: string
  district?: string
  deliveryTime?: string
  distance?: string
  category?: string
  signatureDish?: string
}