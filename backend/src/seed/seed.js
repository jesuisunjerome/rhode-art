import express from "express";
import "dotenv/config";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import logger from "../config/logger.js";

import sampleProducts from "./products.json" with { type: "json" };
import sampleCategories from "./categories.json" with { type: "json" };

const app = express();
const PORT = process.env.PORT || 5000;

const seedData = async () => {
  try {
    // 1. Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // 2. Seed Categories
    const createdCategories = await Category.insertMany(sampleCategories);

    // 3. Map Products to correctly reference Category IDs
    const categoryMap = createdCategories.reduce((acc, cat) => {
      acc[cat.slug] = cat._id;
      return acc;
    }, {});

    const mappedProducts = sampleProducts.map((product) => {
      const categoryId = categoryMap[product.category];

      if (!categoryId) {
        logger.warn(
          `Warning: Category ${product.category} not found for product ${product.name}. Skipping or using first available.`,
        );
      }

      const { category, ...productData } = product;

      return {
        ...productData,
        category: categoryId || createdCategories[0]._id,
      };
    });

    // 5. Seed Products
    await Product.insertMany(mappedProducts);

    logger.info("Database seeded successfully! 🌱");
    process.exit();
  } catch (error) {
    logger.error(`Error seeding data: ${error.message}`);
  } finally {
    process.exit(1);
  }
};

app.listen(PORT, async () => {
  await connectDB();
  await seedData();
  logger.info(`Seed server running on port ${PORT}`);
});