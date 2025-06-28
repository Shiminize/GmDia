const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, imageUrl, category, metalOptions, diamondShapeOptions } = req.body;

  const createdProduct = await Product.create({
    name,
    price,
    description,
    imageUrl,
    category,
    metalOptions,
    diamondShapeOptions,
  });
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, imageUrl, category, metalOptions, diamondShapeOptions } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const updatedProduct = await Product.update(req.params.id, {
      name,
      price,
      description,
      imageUrl,
      category,
      metalOptions,
      diamondShapeOptions,
    });
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.destroy(req.params.id);
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
