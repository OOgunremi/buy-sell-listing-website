/*
 * All routes for messages are defined here
 * Since this file is loaded in server.js into api/messages,
 *   these routes are mounted onto /messages
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM messages`;
    console.log(query);
    db.query(query)
      .then(data => {
        // console.log(data);
        const messages = data.rows;
        res.json({ messages });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    let query = `SELECT * FROM messages WHERE id = ${id}  AND messages.buyer_id = 1
    AND messages.seller_id = 2`;
    console.log(query);
    db.query(query)
      .then(data => {
        const messages = data.rows;
        res.json({ messages });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.post("/", (req, res) => {
    const messages = req.body.messages;


    const values = [`${messages}`];
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

  return router;
};
