const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Living Room',
    description: 'Furniture for your living room including sofas, coffee tables, and entertainment units',
    order: 1
  },
  {
    name: 'Bedroom',
    description: 'Beds, wardrobes, nightstands, and bedroom furniture',
    order: 2
  },
  {
    name: 'Dining Room',
    description: 'Dining tables, chairs, and dining room furniture',
    order: 3
  },
  {
    name: 'Office',
    description: 'Office desks, chairs, and storage solutions',
    order: 4
  },
  {
    name: 'Storage',
    description: 'Cabinets, shelves, and storage furniture',
    order: 5
  },
  {
    name: 'Outdoor',
    description: 'Outdoor furniture for patios and gardens',
    order: 6
  },
  {
    name: 'Sofas & Seating',
    description: 'Sofas, sectionals, recliners, and accent chairs',
    order: 7
  },
  {
    name: 'Tables',
    description: 'Coffee tables, side tables, console tables',
    order: 8
  },
  {
    name: 'Lighting',
    description: 'Lamps, chandeliers, and lighting fixtures',
    order: 9
  },
  {
    name: 'Decor',
    description: 'Home decor items and accessories',
    order: 10
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories:`);
    createdCategories.forEach(cat => {
      console.log(`- ${cat.name} (${cat.slug})`);
    });

    console.log('\n✅ Categories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
