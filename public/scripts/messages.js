// messages page jquery functions

$(() => {
  /*
    // todo monitor if a conversation was selected
    // todo monitor send button to send message data back to the seller
    todo clear out the screen
    todo get the conversation messages
    todo setinterval update the conversation messsages
      ! POTENTIAL PROBLEM - need to make sure that the set interval stops when the user leaves this page
  */

  // ! tags to be updated once that is completed
  $('.conversation').on('click',onConversationClick);
  // ! tags to be updated once that is completed
  $('.conversationSend').on('click', onConversationSendClick);
});

const createMessageElement = function() {

};

const renderMessages = function() {

};

const loadMessages = function() {

};

const onConversationClick = function(e) {
  alert('still in development');
  e.preventDefault(); // ! this might not be necessary

  // clear container
  $('.conversation-container').empty();

  // render messages
};

const onConversationSendClick = function(e) {
  alert('still in development');
  e.preventDefault(); // ! this might not be necessary


};
