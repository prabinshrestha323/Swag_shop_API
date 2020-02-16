const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  title: String,
  price: Number,
  likes: Number
});
module.export = mongoose.model("Product", product);
