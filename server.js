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

//cookieParser
// app.use(express.cookieParser());

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

<<<<<<< HEAD
app.get("/test", async (req, res) => {
  res.render("product");
=======
app.get("/test", async(req, res) => {
  res.render("add_product");
>>>>>>> 95bd2a2cdc8a317570dda8f2db31915233edf7a9
});

app.get("/", async(req, res) => {
  let priceMin = req.query.priceMin;
  let priceMax = req.query.priceMax;
  const products = await productsFunctions.getFilterProducts(db, priceMin, priceMax);
  res.render("index", {products});
});

app.get("/admin", async(req, res) => {
  const products = await productsFunctions.getAdminProducts(db, req);
  res.render("admin_products", {products});
});

<<<<<<< HEAD
app.get("/msg", async (req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
  let query = `SELECT messages.id, users.username, messages  FROM messages JOIN users
    ON messages.buyer_id = users.id`;
    console.log(query);
    db.query(query)
      .then(data => {
        console.log('data.rows = ', data.rows);
        res.render('message',{messages: data.rows});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

// WHERE user_id=$1 and product_id=$2
// [req.query.user_id, req.query.product_id]
app.get("/fav", async (req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
  let query = `SELECT * FROM favourites WHERE user_id=$1`;
    // console.log('server side', query);
    // console.log('query values', req.query);
    // console.log('cookies', res.cookie('user_id'));
    db.query(query, [req.query.user_id])
      .then(data => {
        const favourites = data.rows;
        console.log('favorites', req.cookies, 'user_id', req.query.user_id);
        res.render("favorites", { favourites });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
=======
app.get("/msg", async(req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
  res.render("message");
});

app.get("/fav", async(req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
  res.render("favorites");
>>>>>>> 95bd2a2cdc8a317570dda8f2db31915233edf7a9
});

app.get("/msghistory", async(req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
  res.render("message_history");
});

<<<<<<< HEAD
app.get("/new", async (req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
=======
app.get("/new", async(req, res) => { //make sure any app.get("/urlname") I create here doesn't conflict with app.use("/names")
>>>>>>> 95bd2a2cdc8a317570dda8f2db31915233edf7a9
  res.render("add_product");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
