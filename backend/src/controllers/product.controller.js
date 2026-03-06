import mongoose from "mongoose";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate("category", "name slug")
    .lean();
  res.json(products);
});

// @desc    Get top 8 masterpieces (most valuable available originals)
// @route   GET /api/products/masterpieces
// @access  Public
export const getTopMasterpieces = asyncHandler(async (req, res) => {
  const products = await Product.find({
    soldOut: false,
    type: "original",
    signed: true,
  })
    .populate("category", "name slug")
    .sort({ price: -1 })
    .limit(8)
    .lean();
  res.json(products);
});

// @desc    Get the latest product added
// @route   GET /api/products/latest
// @access  Public
export const getLatestProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ soldOut: false })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  if (!product) {
    res.status(404);
    throw new Error("No products found");
  }

  res.json(product);
});

// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  // Guard: validate ObjectId format before querying
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    throw new Error("Product not found");
  }

  const product = await Product.findById(req.params.id)
    .populate("category", "name slug")
    .lean();

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});
