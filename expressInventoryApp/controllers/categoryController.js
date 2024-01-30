const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display list of all Categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "All Categories",
    category_list: allCategories,
  });
});

// Display detail page for specific Category
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get details of category and all associated items (in parallel)
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);
  if (category === null) {
    // No results
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    category: category,
    category_items: itemsInCategory,
  });
});

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {});

// Handle Category create on POST
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category Create POST");
});

// Display Category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category Delete GET");
});

// Handle Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category Delete POST");
});

// Display Category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category Update GET");
});

// Handle Category update form on POST
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category Update POST");
});
