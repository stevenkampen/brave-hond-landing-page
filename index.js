'use strict';

document.getElementById('contact-form').addEventListener('submit', function(e) {
  document.getElementById('contact-form-name').disabled = true;
  hideContactErrorMessage();
  hideContactSuccessMessage();
  e.preventDefault();
  var nameInput = document.getElementById('contact-form-name');
  var emailInput = document.getElementById('contact-form-email');
  var messageInput = document.getElementById('contact-form-message');
  var data = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
    _subject: 'CamperLyfe Contact from: ' + nameInput.value,
  };
  sendContactFormData(data, 
    function() {
      emptyContactForm();
      showContactSuccessMessage();
    },
    function() {
      showContactErrorMessage();
    });

});

function sendContactFormData(data, successCb, errorCb) {
  var http = new XMLHttpRequest();
  http.open('POST', '//formspree.io/steven@wasteofpaper.com', true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/json');

  http.onreadystatechange = function() {//Call a function when the state changes.
    if (http.readyState == 4) {
      document.getElementById('contact-form-name').disabled = false;
      if (http.status < 300) {
        successCb();
      } else if (http.status > 299) {
        errorCb();
      }
    }
  }
  http.send(JSON.stringify(data));
}

function emptyContactForm() {
  document.getElementById('contact-form-name').value = '';
  document.getElementById('contact-form-email').value = '';
  document.getElementById('contact-form-message').value = '';
}

function showContactErrorMessage() {
  document.getElementById('contact-form-error').style.display = 'block';
}

function hideContactErrorMessage() {
  document.getElementById('contact-form-error').style.display = 'none';
}

function showContactSuccessMessage() {
  document.getElementById('contact-form-success').style.display = 'block';
}

function hideContactSuccessMessage() {
  document.getElementById('contact-form-success').style.display = 'none';
}
