const mongoose = require('mongoose');
const csv = require('csvtojson');
require('dotenv').config();

const Product = require('./models/product');
const connectDB = require('./config/db');

const importProducts = async () => {
  try {
    await connectDB();

    const products = await csv().fromFile('./products.csv');

    const formattedProducts = products.map(p => ({
      name: p.name,
      description: p.description,
      price: Number(p.price),
      image: p.image,                 // 🔥 FIX
      category: p.category,
      inStock: Number(p.inStock),     // 🔥 FIX
      rating: Number(p.rating)        // 🔥 FIX
    }));

    await Product.deleteMany();
    await Product.insertMany(formattedProducts);

    console.log(`✅ ${formattedProducts.length} products imported successfully`);
    process.exit();
  } catch (error) {
    console.error('❌ Import error:', error);
    process.exit(1);
  }
};

importProducts();
