const express = require('express')
const router = express.Router()
const { getDb } = require('../db')

// GET /api/explore/districts
router.get('/districts', async (req, res) => {
  try {
    const db = getDb()
    const districts = await db.collection('districts').find({}).toArray()
    res.json({ ok: true, districts })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Failed to load districts' })
  }
})

// GET /api/explore/featured-districts
router.get('/featured-districts', async (req, res) => {
  try {
    const db = getDb()
    const districts = await db
      .collection('featured_districts')
      .find({ isActive: { $ne: false } })
      .sort({ order: 1 })
      .toArray()
    res.json({ ok: true, districts })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Failed to load featured districts' })
  }
})

// PUT /api/explore/featured-districts
router.put('/featured-districts', async (req, res) => {
  try {
    const { districts } = req.body || {}
    if (!Array.isArray(districts)) {
      return res.status(400).json({ ok: false, error: 'districts must be an array' })
    }

    const cleaned = districts
      .map((d, idx) => {
        const name = String(d?.name || d?.district || '').trim()
        if (!name) return null
        const image = String(d?.image || '').trim()
        const symbolKey = String(d?.symbolKey || d?.symbol || '').trim()
        return {
          name,
          image,
          symbolKey,
          order: typeof d?.order === 'number' ? d.order : idx,
          isActive: d?.isActive !== false,
        }
      })
      .filter(Boolean)

    const db = getDb()
    await db.collection('featured_districts').deleteMany({})
    if (cleaned.length) {
      await db.collection('featured_districts').insertMany(cleaned)
    }

    res.json({ ok: true, count: cleaned.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Failed to update featured districts' })
  }
})

// GET /api/explore/stats
router.get('/stats', async (req, res) => {
  try {
    const db = getDb()

    const [districtsCount, restaurantsCount, restaurantCuisines] = await Promise.all([
      db.collection('districts').countDocuments({}),
      db.collection('restaurants').countDocuments({}),
      db.collection('restaurants').distinct('cuisine'),
    ])

    const cuisineSet = new Set()
    ;(restaurantCuisines || []).forEach((cuisineValue) => {
      String(cuisineValue || '')
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .forEach((part) => cuisineSet.add(part.toLowerCase()))
    })

    res.json({
      ok: true,
      stats: {
        districts: districtsCount,
        restaurants: restaurantsCount,
        cuisines: cuisineSet.size,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Failed to load stats' })
  }
})

// GET /api/explore/:district
router.get('/:district', async (req, res) => {
  try {
    const { district } = req.params
    const db = getDb()

    // case-insensitive match for district field (escape regex special chars so dots/spaces match literally)
    const escapeForRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const escaped = escapeForRegex(district)
    const restaurants = await db
      .collection('restaurants')
      .find({ district: { $regex: `^${escaped}$`, $options: 'i' } })
      .toArray()

    // format a display name (capitalize words and preserve dots like 'T. Nagar')
    function formatDistrictName(d) {
      if (!d) return d
      return d
        .split(/\s+/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    }

    // Featured sections
    const featuredAmbience = restaurants.filter((r) => r.featured && r.featuredCategory === 'ambience')
    const featuredDishes = restaurants.filter((r) => r.featured && r.featuredCategory === 'dishes')

    res.json({ ok: true, district: formatDistrictName(district), restaurants, featuredAmbience, featuredDishes })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Failed to load district data' })
  }
})

module.exports = router
