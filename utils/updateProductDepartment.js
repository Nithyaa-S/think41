// backend/utils/updateProductDepartments.js

const mongoose = require('mongoose');
const Product = require('../models/Products');
const Department = require('../models/Department');

// Replace this with your actual MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/mydb';

async function updateProductDepartments() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    const products = await Product.find();

    for (const product of products) {
      // Example logic: Match department by product category or name
      const departmentName = product.category || 'General';

      const department = await Department.findOne({ name: departmentName });

      if (department) {
        product.department = department._id;
        await product.save();
        console.log(`✅ Updated product '${product.name}' with department '${department.name}'`);
      } else {
        console.warn(`⚠️ No department found for category '${departmentName}' (Product: ${product.name})`);
      }
    }

    console.log('✅ All products updated with department IDs');
  } catch (err) {
    console.error('❌ Error updating product departments:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

updateProductDepartments();
