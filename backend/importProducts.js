const mongoose = require('mongoose');
const csv = require('csvtojson');
const fs = require('fs');
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
      imageUrl: p.imageUrl,
      category: p.category,
      stock: Number(p.stock),
      ratings: Number(p.ratings)
    }));

    await Product.deleteMany(); // optional: purane products clear
    await Product.insertMany(formattedProducts);

    console.log('✅ Products imported successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Import error:', error);
    process.exit(1);
  }
};

importProducts();
