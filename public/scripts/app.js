// Client facing scripts here

$(() => {
  // search button clicked
  // ! tags to be updated once that is completed
  $('nav .searchBar').on('click', onSearchButtonClick);

  // price button updated
  // ! tags to be updated once that is completed
  $('header .priceRange').on('click',onPriceRangeButtonClick);
});



const createProductElement = function(itemObj) {
  // ! need to get the product data that Lucas will make to indicate the products
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

  // const $header = $(`<header><img src=${escape(tweetObject.user.avatars)}><div class='userInfo'><label for="name">${escape(tweetObject.user.name)}</label><label for="handle" class="handleName">${escape(tweetObject.user.handle)}</label></div></header>`);
  // const $paragraph = $(`<p>${escape(tweetObject.content.text)}</p>`);
  // const $footer = $(`<footer><label class="tweetTime" for="datePosted">${timeago.format(tweetObject.created_at)}</label><div class="tweetIcons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer>`);

  // return $('<article class="tweet"></article>').append($header,$paragraph,$footer);
};

const renderProducts = function(productData) {
  for (const item of productData) {
    // newest products show at the top
    // ! tags to be updated once that is completed
    $('.product-container').prepend(createProductElement(item));
  }
};

const onPriceRangeButtonClick = function() {
  alert('on price range click');

  // check if the fields have something in there
  // ! tags to be updated once that is completed
  const $priceMin = $('.priceMin').val();
  const $priceMax = $('.priceMax').val();
  if (!$priceMin && !$priceMax) {
    alert('enter at least one of the price range fields');
    return;
  }

  // get the latest data from the server
  // ! routed to be updated later on
  $.get('/product').then(function(data)  {
    // ? passing the argument data to the server
    // !    look at the lightbnb for this kind of functionality

    // ! tags to be updated once that is completed
    $('.product-container').empty();  // clear the product container
    renderProducts(data); // populate the product container with the products
  });
};

const onSearchButtonClick = function() {
  alert('still in development');
};
