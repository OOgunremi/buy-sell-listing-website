const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM favourites WHERE user_id=$1 and product_id=$2`;
    // console.log('server side', query);
    // console.log('query values', req.query);

    db.query(query,[req.query.user_id, req.query.product_id])
      .then(data => {
        const favourites = data.rows;
        res.json({ favourites });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Add
  router.post("/", (req, res) => {
    // console.log('server side', req.body);

    const values = [req.body.product_id, req.body.user_id];
    const queryString = `
    INSERT INTO favourites (product_id,  user_id)
    VALUES($1, $2)  RETURNING *;
    `;

    db.query(queryString, values)
      .then((result) => {
        // console.log('add', result.rows[0]);
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // delete
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id;

    const values = [`${id}`];
    const queryString = `
    DELETE FROM favourites
    WHERE id=$1
    RETURNING *;
    `;
    // console.log('value', values);
    // console.log('queryString',  queryString);

    db.query(queryString, values)
      .then((result) => {
        // console.log('delete', result.rows[0]);
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });


  return router;
};
