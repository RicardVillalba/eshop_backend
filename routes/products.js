const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productsList = await Product.find();
  if (!productsList) {
    res.status(500).json({ success: false });
  }
  res.send(productsList);
});

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    stockNum: req.body.stockNum,
  });
  product
    .save()
    .then((createdPtroduct) => {
      res.status(201).json(createdPtroduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

module.exports = router;
