// db/conn.mjs
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  let conn;
  try {
    // Connect to MongoDB
    conn = await client.connect();
    console.log("Connected to MongoDB");
    
    // Return the database object
    return conn.db("sample_trainings"); // Change to "grades" as that's the database you want
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw e; // Re-throw the error for further handling
  }
}

// Export the database connection
export default connectDB();
