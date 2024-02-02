const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
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
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("item_form", {
    title: "Create New Rental Item",
    category: allCategories,
  });
});

// Handle Item create form on POST
exports.item_create_post = [
  // convert category to array
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },
  // validate & sanitize fields
  body("name", "Name must be at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category does not exist.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),
  body("stockNumber", "Stock Number must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Find the category that matches the one entered in the form
    // find - return an array of items or empty array
    // findOne - return a single item or null
    const category = await Category.findOne({ name: req.body.category });

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: category._id,
      price: req.body.price,
      stockNumber: req.body.stockNumber,
    });

    // Load the category on the item
    await item.populate("category");

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      res.render("item_form", {
        title: "Create New Rental Item",
        category: allCategories,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid, save new item now.
      await item.save();

      res.render("item_detail", {
        title: "Rental Details",
        rental: item,
      });
    }
  }),
];

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
