const mongoose = require('mongoose');
require('dotenv').config();

async function dropSkuIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('products');

    // Get all indexes
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(i => i.name));

    // Drop sku_1 index if it exists
    try {
      await collection.dropIndex('sku_1');
      console.log('✅ Successfully dropped sku_1 index');
    } catch (error) {
      if (error.code === 27) {
        console.log('ℹ️  sku_1 index does not exist (already dropped)');
      } else {
        throw error;
      }
    }

    // Verify indexes after drop
    const indexesAfter = await collection.indexes();
    console.log('Indexes after drop:', indexesAfter.map(i => i.name));

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

dropSkuIndex();
