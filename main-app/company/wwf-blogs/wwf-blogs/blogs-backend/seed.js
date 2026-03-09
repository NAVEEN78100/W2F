const mongoose = require("mongoose");
const Blog = require("./models/Blog");

const MONGO_URI = "mongodb://127.0.0.1:27017/blogsDB";

const sampleBlogs = [
  {
    title: "The Rise of Home Bakers",
    category: "Home Bakers",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    content: "Home bakers are transforming the food industry..."
  },
  {
    title: "Inside the Star Dines",
    category: "Star Dines",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468",
    content: "Luxury dining is about more than just food..."
  },
  {
    title: "Latest Food Trends 2025",
    category: "Latest",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    content: "From plant-based menus to immersive dining..."
  },
  {
    title: "Sustainable Cooking at Home",
    category: "Home Bakers",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    content: "Learn how to practice sustainable cooking..."
  },
  {
    title: "Celebrity Chefs Unveiled",
    category: "Star Dines",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    content: "Celebrity chefs are not just names—they are trendsetters..."
  },
  {
    title: "Home Baking Hacks You Need",
    category: "Home Bakers",
    image: "https://images.unsplash.com/photo-1599785209793-85f6f9f7a34f",
    content: "Quick and easy hacks every home baker must know..."
  },
  {
    title: "Tech Meets Dining",
    category: "Latest",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb",
    content: "From robots serving dishes to AI-powered menus..."
  },
  {
    title: "The Future of Star Restaurants",
    category: "Star Dines",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    content: "A look into how star restaurants are evolving..."
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Blog.deleteMany();
    console.log("🗑 Old blogs deleted");

    const inserted = await Blog.insertMany(sampleBlogs);
    console.log(`✅ ${inserted.length} blogs inserted`);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
    mongoose.disconnect();
  }
}

seed();
