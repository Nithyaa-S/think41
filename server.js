const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const departmentRoutes = require('./routes/departments'); // ✅ new

require('dotenv').config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// ✅ Mount the routes
app.use('/products', productRoutes);
app.use('/api/departments', departmentRoutes); // ✅ added

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
