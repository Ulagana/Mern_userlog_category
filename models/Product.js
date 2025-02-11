const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
  name: String,
  catId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subCatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  image: String,
  timestamp: String
});

// Check if the model already exists before creating it
module.exports =
  mongoose.models.Product || mongoose.model("Products", productSchema);
