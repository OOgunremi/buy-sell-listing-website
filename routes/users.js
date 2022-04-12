/*
 * All routes for users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM users`;
    console.log(query);
    db.query(query)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const username = req.body.username;
    const email =  req.body.email;
    const password = req.body.password;
    const street = req.body.street;
    const city = req.body.city;
    const province = req.body.province;
    const postCode = req.body.post_code;
    const admin = req.body.admin;

    const values = [`${firstName}`, `${lastName}`, `${username}`, `${email}`, `${password}`, `${admin}`, `${street}`, `${city}`, `${province}`, `${postCode}`];
    const queryString = `INSERT INTO users (first_name, last_name, username, email, password, street, city, province, post_code, admin)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  RETURNING *;`;
    return pool
      .query(queryString, values)
      .then((result) => {
        console.log(result.rows[0]);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });


  });








  return router;
};


