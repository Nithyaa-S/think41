// popularDepartment.js
const mongoose = require('mongoose');
const Department = require('./models/Department');

async function getUniqueDepartmentNames() {
  try {
    // Connect to DB (if not already connected)
    await mongoose.connect('mongodb://localhost:27017/mydb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Get distinct department names
    const uniqueNames = await Department.distinct('name');
    console.log('📌 Unique Department Names:', uniqueNames);

    // Disconnect after use (optional for scripts)
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error fetching departments:', error);
  }
}

getUniqueDepartmentNames();
