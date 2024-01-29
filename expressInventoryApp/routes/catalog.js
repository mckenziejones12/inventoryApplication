const express = require("express");
const router = express.Router();

// Require controller modules
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

/// ITEM ROUTES ///

// GET catalog homepage
router.get("/", itemController.index);

// GET request for creating Item (This must come before routes that display item using id)
router.get("/item/create", itemController.item_create_get);

// POST request for creating Item
router.post("/item/create", itemController.item_create_post);

// GET request for deleting Item
router.get("/item/:id/delete", itemController.item_delete_get);

// POST request for deleting Item
router.post("/item/:id/delete", itemController.item_delete_post);

// GET request for updating Item
router.get("/item/:id/update", itemController.item_update_get);

// POST request for updating Item
router.post("/item/:id/update", itemController.item_update_post);

// GET request for single Item
router.get("/item/:id", itemController.item_detail);

// GET request for list of all Items
router.get("/items", itemController.item_list);

/// CATEGORY ROUTES ///

// GET request for creating Category (This must come before route that displays category using id)
router.get("/category/create", categoryController.category_create_get);

// POST request for creating Category
router.post("/category/create", categoryController.category_create_post);

// GET request for deleting Category
router.get("/category/:id/delete", categoryController.category_delete_get);

// POST request for deleting Category
router.post("/category/:id/delete", categoryController.category_delete_post);

// GET request for updating Category
router.get("/category/:id/update", categoryController.category_update_get);

// POST request for updating Category
router.post("/category/:id/update", categoryController.category_update_post);

// GET request for a single Category
router.get("/category/:id", categoryController.category_detail);

// GET request for list of all Categories
router.get("/categories", categoryController.category_list);

module.exports = router;
