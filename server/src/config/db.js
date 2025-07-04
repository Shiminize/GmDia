const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGO_URI ? 'Found' : 'Missing');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Additional connection options for better reliability
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Provide helpful error messages
    if (error.message.includes('bad auth')) {
      console.error('🔑 Authentication failed. Please check your MongoDB Atlas credentials:');
      console.error('   1. Verify username and password in .env file');
      console.error('   2. Check if user exists in MongoDB Atlas');
      console.error('   3. Ensure user has proper database permissions');
      console.error('   4. Verify IP whitelist includes your current IP');
    }
    
    console.error('💡 To continue development without MongoDB Atlas:');
    console.error('   1. Install MongoDB locally: brew install mongodb-community');
    console.error('   2. Start local MongoDB: brew services start mongodb-community');
    console.error('   3. Update MONGO_URI to: mongodb://localhost:27017/facetandco');
    
    process.exit(1);
  }
};

module.exports = connectDB;
