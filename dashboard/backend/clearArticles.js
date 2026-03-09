const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

async function clearArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const Article = require("./models/Article.js").default;
    await Article.deleteMany({});
    console.log("Cleared all articles from database");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

clearArticles();
