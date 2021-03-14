const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const CategoriesList = await Category.find();
  if (!CategoriesList) {
    res.status(500).json({ success: false });
  }
  res.send(CategoriesList);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.icon,
  });
  category = await category.save();
  if (!category) {
    res.status(404).send("category cannot be created");
  }
  res.send(category);
});

module.exports = router;
