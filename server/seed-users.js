const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/api/models/User');

dotenv.config();

const createDemoUsers = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected! Creating demo users...');
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@facetandco.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
    } else {
      // Create admin user
      const adminUser = await User.create({
        name: 'Facet & Co. Admin',
        email: 'admin@facetandco.com',
        password: 'admin123',
        isAdmin: true
      });
      console.log('Admin user created successfully!');
      console.log('Email: admin@facetandco.com');
      console.log('Password: admin123');
    }

    // Check if demo customer exists
    const existingCustomer = await User.findOne({ email: 'customer@facetandco.com' });
    
    if (existingCustomer) {
      console.log('Demo customer already exists!');
    } else {
      // Create demo customer
      const customerUser = await User.create({
        name: 'Demo Customer',
        email: 'customer@facetandco.com',
        password: 'customer123',
        isAdmin: false
      });
      console.log('Demo customer created successfully!');
      console.log('Email: customer@facetandco.com');
      console.log('Password: customer123');
    }

    console.log('\n=== DEMO CREDENTIALS ===');
    console.log('Admin Login:');
    console.log('  Email: admin@facetandco.com');
    console.log('  Password: admin123');
    console.log('\nCustomer Login:');
    console.log('  Email: customer@facetandco.com');
    console.log('  Password: customer123');
    console.log('========================\n');
    
    process.exit();
  } catch (error) {
    console.error('Error creating demo users:', error);
    process.exit(1);
  }
};

createDemoUsers(); 