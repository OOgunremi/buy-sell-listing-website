// admin page jquery functions

$(() => {
  $('.edit-product .sold-button').on('click',onSoldButtonClick);
  $('.edit-product .remove-button').on('click',onRemoveButtonClick);
});

const onSoldButtonClick = function() {
  // alert('still in development');  // ! temp

  // check if there is a cookie before adding to favourites
  if (!document.cookie.length) {
    alert('please login to add to your favourites');
    return;
  }

  // todo test when there is multiple products on the same page
  // get information about the current product
  const $productId = $(this).parents('.product-feature').attr('id');

  $.get(`/products/${$productId}`)
    .then((data) => {
      const buyerID = document.cookie.split('=')[1];

      // check the product is owned by the user
      if (data.products[0].seller_id !== Number(buyerID)) {
        alert('cannot mark another merchant\'s product as sold');
        console.log('cannot mark another merchant\'s product as sold');
        return;
      }

      // update the information in the database
      const soldState = !data.products[0].sold ? true : false;
      $.post(`/products/${$productId}`, {sold: soldState}).then().catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

const onRemoveButtonClick = function() {
  // alert('still in development');  // ! temp

  // check if user is logged in
  if (!document.cookie.length) {
    alert('please login to add to your favourites');
    return;
  }

  // get information about the current product
  const $productFeature = $(this).parents('.product-feature');
  const $productId = $productFeature.attr('id');

  $.get(`/products/${$productId}`)
    .then((data) => {
      const buyerID = document.cookie.split('=')[1];

      // check the product is owned by the user
      if (data.products[0].seller_id !== Number(buyerID)) {
        alert('cannot remove another merchant\'s product');
        console.log('cannot remove another merchant\'s product');
        return;
      }

      // set the product availabe to false
      $.post(`/products/${$productId}/delete`, function() {
        $productFeature.remove();
        alert('product deleted');
      }).then().catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};
