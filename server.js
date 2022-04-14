// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//require product functions
const productsFunctions = require('./services/products-functions');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const messagesRoutes = require("./routes/messages");
const productsRoutes = require("./routes/products");
const favouritesRoutes = require("./routes/favourites");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
//app.use("/api/users", usersRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db));
app.use("/products", productsRoutes(db));
app.use("/users", usersRoutes(db));
app.use("/messages", messagesRoutes(db));
app.use("/favourites", favouritesRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/test", async (req, res) => {
  res.render("favorites");
});

app.get("/", async (req, res) => {
  let priceMin = req.query.priceMin;
  let priceMax = req.query.priceMax;
  const products = await productsFunctions.getFilterProducts(db, priceMin, priceMax);
  res.render("index", {products});
});


app.get("/msg", async (req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
  res.render("message");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
