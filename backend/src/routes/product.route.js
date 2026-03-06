import express from "express";
import {
  getProductById,
  getProducts,
  getLatestProduct,
  getTopMasterpieces,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/masterpieces", getTopMasterpieces);
router.get("/latest", getLatestProduct);
router.get("/:id", getProductById);

export default router;
