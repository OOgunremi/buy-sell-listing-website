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
        console.log('data.rows = ', data.rows);
        res.render('message',{messages: data.rows});
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

    //console.log(req.body)
    res.sendStatus(201);

    const messages = req.body['message-box'];

    console.log('req.body = ', req.body);


    const values = [`${messages}`];
    const queryString = `INSERT INTO messages (
      messages
    )
  VALUES($1)  RETURNING *;`;
    db
      .query(queryString, values)
      .then((result) => {

        //console.log(result.rows[0]);
        return result;
      })
      .catch((err) => {
        console.log(err.message);
      });

  });

  return router;
};
