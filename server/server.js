require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const governmentRoutes = require('./routes/governmentRoutes');
const unsafeAreaRoutes = require('./routes/unsafeAreaRoutes');
const connectDb = require('./db/db');
const cors = require('cors');  // Import CORS

const app = express();
connectDb();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,       // Only allow requests from specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true             // Allow cookies or credentials to be sent if needed
}));
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/government', governmentRoutes);
app.use('/api/unsafe-areas', unsafeAreaRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
