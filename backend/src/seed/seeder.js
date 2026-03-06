import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = async () => {
  try {
    await connectDB();

    // 1. Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    console.log("Database cleared");

    // 2. Read JSON files
    const categories = JSON.parse(
      fs.readFileSync(path.join(__dirname, "categories.json"), "utf-8"),
    );
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "products.json"), "utf-8"),
    );

    // 3. Seed Categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories seeded`);

    // 4. Map Products to correctly reference Category IDs
    const categoryMap = createdCategories.reduce((acc, cat) => {
      acc[cat.slug] = cat._id;
      return acc;
    }, {});

    const mappedProducts = products.map((product) => {
      const categoryId = categoryMap[product.category];

      if (!categoryId) {
        console.warn(
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
    const createdProducts = await Product.insertMany(mappedProducts);
    console.log(`${createdProducts.length} products seeded`);

    console.log("Database seeded successfully! 🌱");
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
