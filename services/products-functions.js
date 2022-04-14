

const getFilterProducts = async(db, priceMin, priceMax) => {
  let queryString = `SELECT * FROM products WHERE sold = false AND available = true`;

  const queryParams = [];

  if (priceMin) {
    queryParams.push(`${priceMin}`);
    queryString += ` AND products.price >= $${queryParams.length} `;
  }
  if (priceMax) {
    queryParams.push(`${priceMax}`);
    queryString += ` AND price <= $${queryParams.length} `;
  }
  queryParams.push(20);
  queryString += `
    ORDER BY price
    LIMIT $${queryParams.length}; `;
  console.log(queryString, queryParams);

  const results = await db
    .query(queryString, queryParams);

  return results.rows;
};

// returns an object with the cookies' name as keys
const getAppCookies = (req) => {
  // We extract the raw cookies from the request headers
  const rawCookies = req.headers.cookie.split('; ');
  // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

  const parsedCookies = {};
  rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');
    // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });
  return parsedCookies;
};

const getAdminProducts = async(db,req) => {
  const id = getAppCookies(req)['user_id'];

  let queryString = `
  SELECT *
  FROM products
  WHERE available = true
  AND seller_id = $1;
  `;

  const results = await db.query(queryString, [id]);

  return results.rows;
};

module.exports = {
  getFilterProducts,
  getAdminProducts
};
