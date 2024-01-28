// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name, description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  stockNumber
) {
  console.log("what is category here: ", category);
  const itemDetail = {
    name: name,
    description: description,
    price: price,
    stockNumber: stockNumber,
  };
  if (category != false) itemDetail.category = category;

  const item = new Item(itemDetail);
  console.log("what is this yerrr: ", item);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Winter",
      "Colorado can get cold and snowy but fortunately there are many activities to keep you busy!"
    ),
    categoryCreate(
      1,
      "Summer",
      "There are unlimited ways to stay busy in the beautiful, warm days in Colorado!"
    ),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "Snowshoe",
      "Trek in the show with showshoes that help keep you from sinking!",
      categories[0],
      "$10.00",
      "W01"
    ),
    itemCreate(
      1,
      "Ski",
      "Cross country or downhill ski the powdery slopes!",
      categories[0],
      "$150.00",
      "W02"
    ),
    itemCreate(
      2,
      "Standup Paddleboard",
      "Get a workout in while paddle boarding on a reservior!",
      categories[1],
      "$30.00",
      "S01"
    ),
    itemCreate(
      3,
      "Canoe",
      "Take in the mountain backdrop while going for a cruise!",
      categories[1],
      "$20.00",
      "S02"
    ),
  ]);
}
