const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const prisma = require('./config/prisma');

// Environment variables load karne ke liye
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Frontend aur Backend ke beech communication allow karne ke liye
app.use(express.json()); // JSON data handle karne ke liye

// Database Connection Check Logic
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database Connected Successfully via Prisma!");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1); // Agar DB connect na ho toh server band kar do
  }
}

// Routes
// Saare Auth related routes (Signup, Login) '/api/auth' prefix se chalenge
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: "Server is healthy and running 🚀" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 BurnIQ Backend is running on port: ${PORT}`);
  checkDatabaseConnection();
});