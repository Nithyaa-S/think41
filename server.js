// server.js

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Routes
app.use('/products', productRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

  app.get('/',(req,res)=> {
  res.send('Welcome to the E-commerce API');
});
