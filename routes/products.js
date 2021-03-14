const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const productsList = await Product.find().populate("category");
  if (!productsList) {
    res.status(500).json({ success: false });
  }
  return res.send(productsList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(500).json({ success: false });
  }
  return res.send(product);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("invalid category");
  }
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    fullDescription: req.body.fullDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
  });
  product = await product.save();
  if (!product) {
    res.status(400).send("product cannot be created");
  }
  res.status(200).send(product);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("invalid product id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("invalid category");
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      fullDescription: req.body.fullDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      dateCreated: req.body.dateCreated,
    },
    {
      new: true,
    }
  );
  if (!product) {
    res.status(500).send("the product cannot be updated");
  }
  res.status(200).send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is removed" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
