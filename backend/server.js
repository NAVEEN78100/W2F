require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connect } = require('./db')

const app = express()
app.use(cors())
const BODY_LIMIT = process.env.BODY_LIMIT || '20mb'
app.use(express.json({ limit: BODY_LIMIT }))
app.use(express.urlencoded({ limit: BODY_LIMIT, extended: true }))

const exploreRoutes = require('./routes/explore')
const restaurantRoutes = require('./routes/restaurants')

const PORT = process.env.PORT || 4000
// Prefer an explicit env var, otherwise fall back to local MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'wwf'

console.log(`Using MongoDB URI: ${MONGODB_URI}`)

// connect to MongoDB (local by default)
connect(MONGODB_URI, MONGODB_DB)
  .then(() => {
    app.use('/api/explore', exploreRoutes)
    app.use('/api/restaurants', restaurantRoutes)
    app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
