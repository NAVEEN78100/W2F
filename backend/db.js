const { MongoClient } = require("mongodb")

let client
let db

async function connect(uri, dbName) {
  if (db) return { client, db }
  client = new MongoClient(uri)
  await client.connect()
  db = client.db(dbName)
  console.log(`Connected to MongoDB database: ${dbName}`)
  return { client, db }
}

function getDb() {
  if (!db) throw new Error("Database not connected. Call connect first.")
  return db
}

module.exports = { connect, getDb }
