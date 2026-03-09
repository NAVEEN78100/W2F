import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function clearFeedback() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/support-database");
    
    const result = await mongoose.connection.collection("supportfeedbacks").deleteMany({});
    console.log(`Deleted ${result.deletedCount} support feedback records`);
    
    await mongoose.disconnect();
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

clearFeedback();
