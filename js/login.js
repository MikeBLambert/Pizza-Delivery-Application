window.onload = function() {
  localStorage.clear();
}

userInfo.addEventListener('submit', function(event) {
  event.preventDefault();
  var inputField = document.getElementById('userName');
  localStorage.setItem('userName',JSON.stringify(inputField.value));
  window.location.href = 'html/order.html'
});
