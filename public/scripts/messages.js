// messages page jquery functions

// $(() => {
//   /*
//     // todo monitor if a conversation was selected
//     // todo monitor send button to send message data back to the seller
//     todo clear out the screen
//     todo get the conversation messages
//     todo setinterval update the conversation messsages
//       ! POTENTIAL PROBLEM - need to make sure that the set interval stops when the user leaves this page
//   */

//   // ! tags to be updated once that is completed
//   $('.conversation').on('click',onConversationClick);
//   // ! tags to be updated once that is completed
//   $('.conversationSend').on('click', onConversationSendClick);
// });

// let renderMessages = function (messages) {
//   //resets the elements in the messages container


//   //loops through all the array of messages and prepends HTML formated messages for chronological display
//   for (let message of messages) {
//     let messageHTML = createMessageElement(message);
//     messagesContainer.append(messageHTML);
//   }
// };

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
    console.log('tweetValue = ', messageValue);
    //checks if no character was typed or if excess was typed, returns error messages accordingly
    if (messageValue) {

      // POST request
      const url = '/messages/';
      const data = $(this).serialize();
      console.log('data = ', data);
      let messagesContainer = $('.messages');
      let temp = createMessageElement(messageValue);
      console.log('temp = ', temp);
      messagesContainer.append(temp);
      console.log('messagesContainer = ', messagesContainer);
      $.ajax({
        url: "/messages",
        type: "post",
        data: data


      }).then((data) => {
        //loads tweet GET request automatically without browser refresh
        // loadMessages();
      });
    }
  });

  // GET request function
  const loadMessages = function() {
    $.get('/messages', function(data, status) {
      // console.log(data);
      //renderMessages(data);
    });
  };
  loadMessages();
});
