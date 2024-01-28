const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  description: { type: String, required: true, minLength: 10, maxLength: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: String, required: true },
  stockNumber: { type: String, required: true },
});

// Virtual for Item's URL
ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
