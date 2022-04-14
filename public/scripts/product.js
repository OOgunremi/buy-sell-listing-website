// user viewed product page jquery functions

$(() => {
  // favorite button pressed
  $('.product-page .fav-button').on('click',onFavoriteButtonClick);
});

const onFavoriteButtonClick = function(e) {
  // check if there is a cookie before adding to favourites
  if (!document.cookie.length) {
    alert('please login to add to your favourites');
    return;
  }

  const buyerID = document.cookie.split('=')[1];
  const $productId = $('.product-page').attr('id');

  $.get(`/favourites`, {user_id: buyerID, product_id: $productId})
    .then((data)=> {
      // check if favourite already exists
      if (!data.favourites.length) {
        $.post(`/favourites`, {user_id: buyerID, product_id: $productId})
          .then((data)=> {
            alert('added to your favourites');
            $(this).removeClass('btn-success').addClass('btn-danger');
            console.log('added to your favourites');
          })
          .catch(error => console.log(error));
        return;
      }

      // remove product from the favourites table
      $.post(`/favourites/${data.favourites[0].id}/delete`)
        .then((data)=> {
          alert('removed from your favourites');
          $(this).removeClass('btn-danger').addClass('btn-success');
          console.log('removed from your favourites');
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};
