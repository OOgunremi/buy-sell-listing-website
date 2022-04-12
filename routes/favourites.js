const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM favourites`;
    console.log(query);
    db.query(query)
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
  return router;
};
