import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const sampleProducts = [
  {
    name: "Classic White T-Shirt",
    slug: "classic-white-tshirt",
    description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
    short: "Premium cotton t-shirt with a comfortable fit.",
    price: 29.99,
    category: "Tops",
    tags: ["Casual", "Basic", "Cotton"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a"
    ],
    colors: ["#FFFFFF", "#000000", "#D6C7B3"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 150,
    rating: 4.5,
    reviews: 89,
    featured: true,
    onSale: false
  },
  {
    name: "Denim Jacket",
    slug: "denim-jacket",
    description: "Classic denim jacket with a modern fit. Made from durable, high-quality denim.",
    short: "Classic denim jacket with a modern fit.",
    price: 89.99,
    category: "Jackets",
    tags: ["Denim", "Casual", "Outerwear"],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
    images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0"],
    colors: ["#4A5568", "#2D3748"],
    sizes: ["S", "M", "L", "XL"],
    stock: 75,
    rating: 4.8,
    reviews: 124,
    featured: true,
    onSale: false
  },
  {
    name: "Summer Floral Dress",
    slug: "summer-floral-dress",
    description: "Light and breezy floral dress perfect for summer occasions. Features adjustable straps and a flowing silhouette.",
    short: "Light and breezy floral dress perfect for summer.",
    price: 59.99,
    salePrice: 44.99,
    category: "Dresses",
    tags: ["Summer", "Floral", "Casual"],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"],
    colors: ["#FED7D7", "#C6F6D5"],
    sizes: ["XS", "S", "M", "L"],
    stock: 45,
    rating: 4.6,
    reviews: 67,
    featured: false,
    onSale: true
  },
  {
    name: "Leather Messenger Bag",
    slug: "leather-messenger-bag",
    description: "Handcrafted leather messenger bag with multiple compartments. Perfect for work or travel.",
    short: "Handcrafted leather messenger bag with multiple compartments.",
    price: 149.99,
    category: "Bags",
    tags: ["Leather", "Professional", "Travel"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    colors: ["#8B4513", "#000000"],
    stock: 30,
    rating: 4.9,
    reviews: 156,
    featured: true,
    onSale: false
  },
  {
    name: "Running Sneakers",
    slug: "running-sneakers",
    description: "Lightweight running sneakers with advanced cushioning technology. Designed for maximum comfort and performance.",
    short: "Lightweight running sneakers with advanced cushioning.",
    price: 119.99,
    category: "Accessories",
    tags: ["Sports", "Footwear", "Running"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    colors: ["#FFFFFF", "#000000", "#4299E1"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 100,
    rating: 4.7,
    reviews: 203,
    featured: false,
    onSale: false
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert products
    console.log('Inserting sample products...');
    await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${sampleProducts.length} products`);

    // Create admin user
    console.log('Creating admin user...');
    const admin = new User({
      email: 'admin@mw.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Admin user created (email: admin@mw.com, password: admin123)');

    // Create test customer
    const customer = new User({
      email: 'customer@test.com',
      password: 'customer123',
      name: 'Test Customer',
      role: 'customer'
    });
    await customer.save();
    console.log('✅ Customer user created (email: customer@test.com, password: customer123)');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
