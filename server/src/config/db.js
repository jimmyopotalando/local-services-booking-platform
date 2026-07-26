// server/src/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Debug log to confirm .env is being read
    console.log("MONGO_URI value:", process.env.MONGO_URI);
    // Use environment variable for DB URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
