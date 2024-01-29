const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// Display list of all Categories
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category List");
});

// Display detail page for specific Category
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category Detail: ${req.params.id}`);
});

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category Create GET");
});

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
