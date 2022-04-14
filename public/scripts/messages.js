// messages page jquery functions

//protects against XSS Hacks
const escapeHacks = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createMessageElement = function(message) {
  let messageHTML = `
  <article class="message-box">
  <header class="message-header">
    <div class="message-user">
      <h3>Me</h3>
    </div>
  </header>
  <p class="message">
    ${message}
  </p>
</article>`;
  return messageHTML;

};

//waits for the page to fully load before calling the callback
$(document).ready(function() {
  console.log('document ready = ');

  //This is the submit handler
  $(".textsubmit").submit(function(event) {
    //prevents route redirection upon submission
    event.preventDefault();

    //grabs tweet values excluding spaces at begining and the end
    let messageValue = $("#message-text-area").val().trim();
    //checks if no character was typed or if excess was typed, returns error messages accordingly
    if (messageValue) {

      const url = '/messages/';
      let data = $(this).serialize();

      let messagesContainer = $('.messages');
      let temp = createMessageElement(messageValue);
      //console.log('data = ', data);
      messagesContainer.append(temp);
      const buyerID = document.cookie.split('=');

      $.ajax({
        url: "/messages",
        type: "post",
        data: {
          data,
          'user_id': buyerID
        }
      }).then((data) => {
        $("#message-text-area").val("");

      });
    }
  });

});
