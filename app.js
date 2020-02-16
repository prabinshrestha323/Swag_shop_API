const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
require("./models/info");

require("./models/product");
require("./models/wishlist");
const first = mongoose.model("Info");
const Product = mongoose.model("Product");
const Wishlist = mongoose.model("Wishlist");
mongoose
  .connect("mongodb://localhost/swag-shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB is connected ........."))
  .catch(err => console.log(err));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/info", (req, res) => {
  const info = new first();
  info.name = req.body.name;
  info.address = req.body.address;
  info.save(function(err, Info) {
    if (err) {
      res.send(err);
    } else {
      res.send(Info);
    }
  });
});

app.get("/info", (req, res) => {
  first.find({}, function(err, book) {
    if (err) {
      res.send({ err: "cound not feact info" });
    } else {
      res.send(book);
    }
  });
});
app.get("/:id", (req, res) => {
  first.findById(req.params.id, (err, Info) => {
    if (err) {
      res.send(err);
    }
    res.send(Info);
  });
});

app.put("/:id", (req, res) => {
  first.findById(req.params.id, (err, update) => {
    if (err) {
      res.send(err);
    }
    update.name = req.body.name;
    update.address = req.body.address;
    update.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.json(update);
      }
    });
  });
});

app.delete("/:id", (req, res) => {
  first.remove({ _id: req.params.id }, (err, first) => {
    if (err) {
      res.send(err);
    }
    res.send(first);
  });
});

app.put("/:id", (req, res) => {
  Wishlist.findById(req.params.id, (err, product) => {
    if (err) {
      res.send(err);
    }
    product.title = req.body.title;
    product.save(err => {
      if (err) {
        res.send(err);
      }
      res.send({ message: "product info is updated" });
    });
  });
});

app.post("/product", (req, res) => {
  const con = new Product();
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
  Product.find({}, function(err, Product) {
    if (err) {
      res.status(500).send({ error: "could not fetch product" });
    } else {
      res.send(products);
    }
  });
});

app.get("/wishlist", (req, res) => {
  Wishlist.find({}, function(err, Wishlist) {
    if (err) {
      res.status(500).send({ err: "could not create wishlist" });
    } else {
      res.send(Wishlist);
    }
  });
});
app.post("/wishlist", (req, res) => {
  const wishlist = new Wishlist();
  wishlist.title = req.body.title;
  wishlist.save(function(err, newWishlist) {
    if (err) {
      res.status(500).send({ err: "could not created" });
    } else {
      res.send(newWishlist);
    }
  });
});

app.put("/wishlist/product/add", (req, res) => {
  Product.findOne({ _id: req.params.ProductId }),
    function(err, product) {
      if (err) {
        res.send({ err: "cound not add item to wishlist" });
      } else {
        Wishlist.update(
          { _id: req.params.wishlistId },
          { $addToSet: { product: product._Id } },
          function(err, wishlist) {}
        );
      }
    };
});
//Server
const port = process.env.PORT || 8000;

app.listen(port, (req, res) => {
  console.log(`this is our server ${port}`);
});
