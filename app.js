const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

require("./models/product");
const Product = mongoose.model("products");
const Wishlist = require("./models/wishlist");
mongoose
  .connect("mongodb://localhost/swag-shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB is connected ........."))
  .catch(err => console.log(err));

//middleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", (req, res) => {
  const product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.save(function(err, savedProduct) {
    if (err) {
      res.status(500).send({ error: "could not save Product" });
    } else {
      res.send(savedProduct);
    }
  });
});

app.get("/product", function(req, res) {
  Product.find({}),
    function(err, products) {
      if (err) {
        res.status(500).send({ error: "could not fetch product" });
      } else {
        res.send(products);
      }
    };
});

//Server
const port = process.env.PORT || 8000;

app.listen(port, (req, res) => {
  console.log(`this is our server ${port}`);
});
