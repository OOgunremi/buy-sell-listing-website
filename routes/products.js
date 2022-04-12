const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Browse
  router.get("/", (req, res) => {
    let query = `SELECT * FROM products`;
    console.log(query);
    db.query(query)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Read
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    let query = `SELECT * FROM products WHERE id = ${id}`;
    console.log(query);
    db.query(query)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  //Edit
  router.post("/:id", (req, res) => {




  });


  //A

  router.post("/", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const sellerId = req.body.seller_id;
    const email =  req.body.email;
    const description = req.body.description;
    const category = req.body.category;
    const imageUrlOne = req.body.image_url_one;
    const available = req.body.available;
    const postCode = req.body.post_code;
    const sold = req.body.sold;

    const values = [`${name}`, `${price}`, `${sellerId}`, `${email}`, `${description}`, `${category}`, `${imageUrlOne}`, `${available}`, `${postCode}`, `${sold}`];
    const queryString = `INSERT INTO products (name, price, seller_id, description, category, image_url_one, available, sold)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)  RETURNING *;`;
    db
      .query(queryString, values)
      .then((result) => {



        console.log(result.rows[0]);
        return result;
      })
      .catch((err) => {
        console.log(err.message);
      });

  });


  //D
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id;


  });



  return router;
};

