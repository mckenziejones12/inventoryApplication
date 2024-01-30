const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numCategories, numItems] = await Promise.all([
    Category.countDocuments({}).exec(),
    Item.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Colorado Adventure Rentals Inc.",
    categoryCount: numCategories,
    itemCount: numItems,
  });
});

// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name category")
    .sort({ name: 1 })
    .populate("category")
    .exec();
  res.render("item_list", {
    title: "All Rental Options",
    item_list: allItems,
  });
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  console.log("is this showing?");
  const rental = await Item.findById(req.params.id).populate("category").exec();

  console.log("what is rental: ", rental);

  if (rental === null) {
    const err = new Error("Rental not found");
    err.status = 404;
    return next(Error);
  }

  res.render("item_detail", {
    title: "Rental Details",
    rental: rental,
  });
});

// Display Item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create Get");
});

// Handle Item create form on POST
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create POST");
});

// Display Item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
});

// Handle Item delete form on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display Item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle Item update form on POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});
