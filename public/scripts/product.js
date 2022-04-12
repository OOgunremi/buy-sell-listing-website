// uver viewed product page jquery functions

$(() => {
  /*
    // todo monitor send button pressed
    // todo monitor favorite button pressed
    todo send the text data to the server
    todo toggle the favorite button and send the information to the server
  */


  // send button pressed
  // ! tags to be updated once that is completed
  $('.contact_seller .send').on('click', onContactSellerButtonClick);

  // favorite button pressed
  // ! tags to be updated once that is completed
  $('.product details .favorite').on('click',onFavoriteButtonClick);

});




const onFavoriteButtonClick = function(e) {
  alert('still in development');
  e.preventDefault(); // ! this might not be necessary

  // ! check the status of the favorite button - this might be from the server or from the web page
  // todo depnding on the previous status, send a message to the server to either add or delete favorite
};

const onContactSellerButtonClick = function(e) {
  alert('still in development');
  e.preventDefault();

  // check if the text area is empty
  // ! tags to be updated once that is completed
  const $contactSellerText = $('.contactSellerText').val();
  if (!$contactSellerText) {
    alert('contact seller field must not be empty');
    return;
  }

  // send the data to server
  $.post('/message', $contactSellerText.serialize()).then(function() {
    $contactSellerText.val(''); // ! this might not be necessary
  });
};
