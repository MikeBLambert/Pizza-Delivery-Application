'use strict';

var userInfo = document.getElementById('userInfo')
var userNameInStorage = localStorage.getItem('userName');

function goToOrder() {
  window.location.href = 'html/order.html'
};

userInfo.addEventListener('submit', function(event) {
  event.preventDefault();
  var inputField = document.getElementById('userName');
  localStorage.setItem('userName',inputField.value);
  goToOrder();
});
