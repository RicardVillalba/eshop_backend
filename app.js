const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
const api = process.env.API_URL;

//midleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  stockNum: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

app.get(`${api}/products`, async (req, res) => {
  const productsList = await Product.find();
  if (!productsList) {
    res.status(500).json({ success: false });
  }
  res.send(productsList);
});

app.post(`${api}/products`, (req, res) => {
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

//Database
mongoose
  .connect(process.env.CONNECTION_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
