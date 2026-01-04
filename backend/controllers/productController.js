const Product = require('../models/product');
const csv = require('csvtojson');
const fs = require('fs');

// ==============================
// GET ALL PRODUCTS (PAGINATION)
// ==============================
exports.getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // 🔍 Search
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    // 📂 Category
    if (category && category !== 'All') {
      query.category = category;
    }

    // 💰 Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // 🔃 Sorting
    let sortOptions = { createdAt: -1 };
    if (sortBy === 'priceAsc') sortOptions = { price: 1 };
    if (sortBy === 'priceDesc') sortOptions = { price: -1 };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // 🔁 Frontend-compatible format
    const formattedProducts = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.imageUrl,
      category: p.category,
      inStock: p.stock,
      rating: p.ratings,
      reviews: [],
    }));

    res.status(200).json({
      success: true,
      products: formattedProducts,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// GET SINGLE PRODUCT
// ==============================
exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      product: {
        id: p._id.toString(),
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.imageUrl,
        category: p.category,
        inStock: p.stock,
        rating: p.ratings,
        reviews: [],
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// CREATE PRODUCT
// ==============================
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, inStock, rating } =
      req.body;

    const product = await Product.create({
      name,
      price,
      description,
      imageUrl: image,
      category,
      stock: Number(inStock),
      ratings: Number(rating) || 0,
      user: req.user.id,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// UPDATE PRODUCT
// ==============================
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.image,
        category: req.body.category,
        stock: Number(req.body.inStock),
        ratings: Number(req.body.rating),
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// DELETE PRODUCT
// ==============================
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// BULK CSV UPLOAD
// ==============================
exports.uploadProductsCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'CSV file required' });
    }

    const items = await csv().fromFile(req.file.path);

    const formattedProducts = items.map(item => ({
      name: item.name,
      description: item.description,
      price: Number(item.price),
      imageUrl: item.image,
      category: item.category,
      stock: Number(item.inStock),
      ratings: Number(item.rating) || 0,
    }));

    await Product.insertMany(formattedProducts);
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: `${formattedProducts.length} products uploaded successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
