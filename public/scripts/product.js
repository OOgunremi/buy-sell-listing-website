// user viewed product page jquery functions

$(() => {

  // favorite button pressed
  // ! tags to be updated once that is completed
  $('.product-page .fav-button').on('click',onFavoriteButtonClick);

});

const onFavoriteButtonClick = function(e) {
  alert('still in development');
  e.preventDefault(); // ! this might not be necessary

  // ! check the status of the favorite button - this might be from the server or from the web page

  /*
    todo check the status of this favorite from teh database
      * give the user id, check if the product id exists, return the response to the client and decide from there
    todo add this product to your favorites
    todo remove this product fromk your favorites
  */
  // todo may need to add a check if there is a cookie to begin with
  const buyerID = document.cookie.split('=')[1]; // ! this may change out depending if cookie parser is installed
  const $productId = $('.product-page').attr('id');

  $.get(`/favourites?user_id=${buyerID}&product_id=${$productId}`)
    .then((data)=> {
      console.log(data.favourites);

      if (!data.favourites.length) {
        console.log('in favourties');
        $.post(`/favourites`, {user_id: buyerID, product_id: $productId})
          .then()
          .catch(error => console.log(error));
        return;
      }

      console.log("🚀 ~ file: product.js ~ line 40 ~ .then ~ data.favourites[0];", data.favourites[0]);

      // // todo remove this from the favourites table
      // $.post(`/favourites`)
      //   .then()
      //   .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

// const onContactSellerButtonClick = function(e) {
//   // check if the text area is empty
//   // ! tags to be updated once that is completed
//   const $contactSellerText = $('.contact-seller .contact-message').val();
//   if (!$contactSellerText) {
//     alert('contact seller field must not be empty');  // ! this may change later on
//     return;
//   }

//   const $productId = $('.product-page').attr('id');
//   const $sellerId = $('.product-page .contact-seller').attr('id');
//   const buyerID = document.cookie.split('=');

//   // send the data to server
//   $.post('/messages', {product_id: $productId, seller_id: $sellerId, buyer_id: buyerID[1], messages: $contactSellerText}).then(function() {
//     // todo clear out the text area field
//   });
// };
