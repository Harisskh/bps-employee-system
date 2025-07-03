const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test simple query
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('📅 Current time:', result[0].current_time);
    
    // Test user table (if exists)
    try {
      const userCount = await prisma.user.count();
      console.log('👥 Total users:', userCount);
    } catch (err) {
      console.log('⚠️  Tables not created yet');
    }
    
    console.log('🎉 Test completed!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Check if PostgreSQL is running');
    }
    
    if (error.message.includes('password')) {
      console.log('💡 Check password in .env file');
    }
    
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();