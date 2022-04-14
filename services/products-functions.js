

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
      .query(queryString, queryParams)

    return results.rows
}

module.exports = {
  getFilterProducts
}
