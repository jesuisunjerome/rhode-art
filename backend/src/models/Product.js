import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Please add a short description"],
      maxlength: [200, "Short description cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    dimensions: {
      type: String,
      required: [true, "Please add dimensions"],
    },
    type: {
      type: String,
      required: [true, "Please add type"],
      enum: ["original", "print", "giclee", "open-edition"],
      default: "original",
    },
    medium: {
      type: String,
      required: [true, "Please add medium"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    soldOut: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
    },
    signed: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [String],
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    attributes: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-update soldOut based on countInStock before saving
productSchema.pre("save", function (next) {
  this.soldOut = this.countInStock <= 0;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
