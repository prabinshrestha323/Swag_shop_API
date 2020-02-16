const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const wishList = new Schema({
  title: { type: String, default: "cool Wish LIst" },
  product: [{ type: ObjectId, ref: "products" }]
});

module.export = mongoose.model("Wishlist", wishList);
