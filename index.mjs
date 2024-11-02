//index.mjs
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import gradesRouter from './routes/grades_agg.mjs';

import grades from "./routes/grades.mjs";
import grades_agg from "./routes/grades_agg.mjs";

dotenv.config();
// Set up the Express App
const PORT = process.env.PORT || 3000;
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", grades);
app.use("/grades", grades_agg);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
