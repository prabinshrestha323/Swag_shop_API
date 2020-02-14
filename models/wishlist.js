const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var wishlistschema = new Schema({
  title: {
    type: String,
    default: "Cool wish list"
  },
  product: [
    {
      type: ObjectId,
      ref: "Product"
    }
  ]
});

mongoose.model("Wishlist", wishlistschema);
