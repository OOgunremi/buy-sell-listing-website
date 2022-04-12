$(() => {
  // search button clicked
  // ! tags to be updated once that is completed
  $('.searchBar').on('click', onSearchButtonClick);

  // price button updated
  // ! tags to be updated once that is completed
  $('.priceRange').on('click',onPriceRangeButtonClick);

  renderProducts(temp_data);
});

// ! delete this later
const temp_data = [{
  id:0,
  seller_id:0,
  category:'bike',
  name:'surly bike',
  description:'it is a bike',
  price:149900,
  image_url_one: "https://cdn.shopify.com/s/files/1/0773/9113/files/icons-28_400x.png?v=1636390832",
  available:true,
  sold:false,
}];

const createProductElement = function(itemObj) {
  /*
    ? itemObj.id  // this is the product id
    ? itemObj.seller_id
    ? itemObj.category
    ? itemObj.name
    ? itemObj.description
    ? itemObj.price
    ? itemObj.image_url_one

    * product placement in the web page may change due to these properties
    ? itemObj.available
    ? itemObj.sold
  */

  // ! need to get the product data that Lucas will make to indicate the products
  const $header = $(`<header><img src=${itemObj.image_url_one}>`);
  const $paragraph = $(`<p>id=${itemObj.id},seller_id=${itemObj.seller_id},description=${itemObj.description}, category = ${itemObj.category},  name = ${itemObj.name},  price = ${itemObj.price},available = ${itemObj.available},sold = ${itemObj.sold},</p>`);

  return $('<article class="product"></article>').append($header,$paragraph);
};

const renderProducts = function(productData) {
  for (const item of productData) {
    // newest products show at the top
    // ! tags to be updated once that is completed
    $('body').prepend(createProductElement(item));
  }
};

const onPriceRangeButtonClick = function() {
  alert('on price range click');  // ! temp

  // check if the fields have something in there
  // ! tags to be updated once that is completed
  const $priceMin = $('.priceMin').val();
  const $priceMax = $('.priceMax').val();
  if (!$priceMin && !$priceMax) {
    alert('enter at least one of the price range fields');  // ! temp
    return;
  }

  // get the properties within the range from the server
  // ! routed to be updated later on
  // todo clean this up later
  let url = '/product';
  url += ($priceMin ? `?priceMin=${$priceMin}` : '');
  if (url.includes('?')) {
    url += ($priceMax ? `&priceMax=${$priceMax}` : '');
  } else {
    url += ($priceMax ? `?priceMax=${$priceMax}` : '');
  }

  $.get(url).then(function(json)  {
    // ! tags to be updated once that is completed
    $('.product-container').empty();
    renderProducts(json);
  }).catch(error => console.log(error));
};

const onSearchButtonClick = function() {
  alert('still in development!');  // ! temp
};
