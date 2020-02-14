const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  price: Number,
  likes: {
    type: Number,
    default: 0
  }
});

mongoose.model("products", productSchema);
