import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itineraryRoutes from "./routes/itineraryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';
dotenv.config();
//console.log("✅ OpenAI Key Loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend's URL
  credentials: true, // If you're using cookies or sessions
}));


app.use(express.json()); // ✅ Middleware to parse JSON

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/itineraries", itineraryRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`✅ MongoDB Connected`);
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => console.error(`❌ MongoDB connection error: ${error.message}`));
