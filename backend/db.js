// =============================================================================
// Database Connection
// =============================================================================
// MongoDB connection handler for flight search application

require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Deprecated in newer mongoose versions
    });

    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📝 Database: ${conn.connection.name}`);

    // Connection event listeners
    conn.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
    });

    conn.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;