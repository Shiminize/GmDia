const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/api/models/Product');

dotenv.config();

const products = [
  {
    name: 'Classic Solitaire Ring',
    price: 1200,
    description: 'Beautiful solitaire ring with lab-grown diamond',
    imageUrl: 'https://via.placeholder.com/300x200?text=Ring1',
    category: 'rings',
    metalOptions: ['yellow-gold', 'white-gold'],
    diamondShapeOptions: ['round', 'oval']
  },
  {
    name: 'Diamond Tennis Bracelet',
    price: 2500,
    description: 'Elegant tennis bracelet with multiple diamonds',
    imageUrl: 'https://via.placeholder.com/300x200?text=Bracelet1',
    category: 'bracelets',
    metalOptions: ['white-gold', 'platinum'],
    diamondShapeOptions: ['round']
  },
  {
    name: 'Emerald Cut Necklace',
    price: 1800,
    description: 'Stunning emerald cut diamond necklace',
    imageUrl: 'https://via.placeholder.com/300x200?text=Necklace1',
    category: 'necklaces',
    metalOptions: ['rose-gold', 'yellow-gold'],
    diamondShapeOptions: ['emerald', 'round']
  },
  {
    name: 'Princess Cut Engagement Ring',
    price: 1500,
    description: 'Modern princess cut engagement ring',
    imageUrl: 'https://via.placeholder.com/300x200?text=Ring2',
    category: 'rings',
    metalOptions: ['platinum', 'white-gold'],
    diamondShapeOptions: ['princess', 'round']
  }
];

const seedProducts = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected! Seeding products...');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 