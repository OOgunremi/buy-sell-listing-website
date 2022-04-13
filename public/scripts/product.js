// user viewed product page jquery functions

$(() => {
  // favorite button pressed
  $('.product-page .fav-button').on('click',onFavoriteButtonClick);
});

const onFavoriteButtonClick = function(e) {
  // alert('still in development');  // ! temp

  // check if there is a cookie before adding to favourites
  if (!document.cookie.length) {
    alert('please login to add to your favourites');
    return;
  }

  // ! this may change out depending if cookie parser is installed
  const buyerID = document.cookie.split('=')[1];
  const $productId = $('.product-page').attr('id');

  $.get(`/favourites`, {user_id: buyerID, product_id: $productId})
    .then((data)=> {
      // check if favourite already exists
      if (!data.favourites.length) {
        $.post(`/favourites`, {user_id: buyerID, product_id: $productId})
          .then((data)=> {
            alert('added to your favourites');
            console.log('added to your favourites');
          })
          .catch(error => console.log(error));
        return;
      }

      // remove product from the favourites table
      $.post(`/favourites/${data.favourites[0].id}/delete`)
        .then((data)=> {
          alert('removed from your favourites');
          console.log('removed from your favourites');
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};
