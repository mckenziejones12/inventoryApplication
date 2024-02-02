const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    Item.find({ category: req.params.id }, "name").exec(),
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
exports.category_create_get = (req, res, next) => {
  res.render("category_form", {
    title: "Create New Category",
  });
};

// Handle Category create on POST
exports.category_create_post = [
  // Validate and sanitize the name field
  body("name", "Category must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // Create a category object with escaped and trimmed data
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create New Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid, check if category already exists
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        // Category already exists, redirect to category detail page
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        // New category saved. Redirect to category detail page
        res.redirect(category.url);
      }
    }
  }),
];

// Display Category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);
  if (category === null) {
    // No results
    res.redirect("/catalog/categories");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    categoryItems: itemsInCategory,
  });
});

// Handle Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  if (itemsInCategory.length > 0) {
    // Category has items. Render in same way as GET route.
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      categoryItems: itemsInCategory,
    });
    return;
  } else {
    // Category has no items. Delete object and redirect to the list of categories.
    await Category.findByIdAndDelete(req.body.categoryid);
    console.log("did this delete?!?!");
    res.redirect("/catalog/categories");
  }
});

// Display Category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  // Get category
  const category = await Category.findById(req.params.id).exec();
  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }
  res.render("category_form", {
    title: "Update Category",
    category: category,
  });
});

// Handle Category update form on POST
exports.category_update_post = [
  // Validate and sanitize the name field
  body("name", "Category must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // Create new category with escaped/trimmed data and new ID
    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
    });
    if (!errors.isEmpty) {
      // Errors present. Render form again with sanitized values and error messages
      res.render("category_form", {
        title: "Update Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Form data valid. Update and Save.
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      // Redirect to category detail page
      res.redirect(updatedCategory.url);
    }
  }),
];
