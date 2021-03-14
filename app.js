const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//midleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//routers
const productsRouter = require("./routes/products");

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);

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
