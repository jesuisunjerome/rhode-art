import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).lean();
  res.json(categories);
});

// @desc    Get category by slug
// @route   GET /api/categories/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).lean();

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.json(category);
});
