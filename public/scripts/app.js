$(() => {
  // search button clicked
  $('.search-button').on('click', onSearchButtonClick);

  // price button updated
  $('.filter-button').on('click',onPriceRangeButtonClick);

  // let url = '/products';

  // $.get(url).then(function(json)  {

  //   $('.product-container').empty();
  //   renderProducts(json);
  // }).catch(error => console.log(error));
});

// prevent cross site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createProductElement = function(itemObj) {
  /*
    ? itemObj.id  // this is the product id
    ? itemObj.seller_id
    ? itemObj.category
    * product placement in the web page may change due to these properties
    ? itemObj.available
    ? itemObj.sold
  */
  return $(`<div class="product-feature id="${escape(itemObj.id)}"></div>`).append(`
      <img src="${escape(itemObj.image_url_one)}" class="product-feature-photo">
      <div class="product-header-description">
        <header class="product-header">
          <a href="/product/${escape(itemObj.id)}">
              <h3>${escape(itemObj.name)}</h3>
          </a>
          <h3>$${escape(itemObj.price)}</h3>
        </header>
        <p class="product-description">${escape(itemObj.description)}</p>
      </div>
  `);
};

const renderProducts = function(productData) {
  for (const item of productData.products) {
    $('.product-container').prepend(createProductElement(item));
  }
};

const onPriceRangeButtonClick = function(e) {
  // alert('on price range click');  // ! temp
  e.preventDefault();

  // check if the fields have something in there
  const $priceMin = $('.filter .minbox').val();
  const $priceMax = $('.filter .maxbox').val();

  // get the properties within the range from the server
  let url = '/products';
  url += ($priceMin ? `?priceMin=${$priceMin}` : '');
  if (url.includes('?')) {
    url += ($priceMax ? `&priceMax=${$priceMax}` : '');
  } else {
    url += ($priceMax ? `?priceMax=${$priceMax}` : '');
  }

  $.get(url).then(function(json)  {

    $('.product-container').empty();
    renderProducts(json);
  }).catch(error => console.log(error));
};

const onSearchButtonClick = function() {
  // alert('still in development!');  // ! temp
  console.log('search button clicked');
};
