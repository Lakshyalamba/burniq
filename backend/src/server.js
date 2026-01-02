const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const prisma = require('./config/prisma');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database Connected Successfully via Prisma!");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1); 
  }
}

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: "Server is healthy and running 🚀" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 BurnIQ Backend is running on port: ${PORT}`);
  checkDatabaseConnection();
});