//Business Logic
function UserInfo (firstName,lastName,streetAddress,city,state,zip) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.zip = zip;
};

//User Interface
$(document).ready(function() {
  var showFinalInfo = function() {
    var totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    var contactInfo = JSON.parse(localStorage.getItem('contactInfo'));
    $("#userInfoForm").hide();
    $("#finalOrderDisplay").show();
    $("#finalOrderInfo").append(
      contactInfo['firstName'] + " " + contactInfo['lastName'] +
      "<br>" +
      contactInfo['streetAddress'] +
      "<br>" +
      contactInfo['city'] + ", " + contactInfo['state'] + " " + contactInfo['zip'] +
      "<br>" +
      "<br>" +
      "The total amount due is $" + totalPrice +".00"
    );
  };

  var contactInfo = JSON.parse(localStorage.getItem('contactInfo'));
  if (contactInfo != null) {
    showFinalInfo();
  };

  userInfoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var firstName = $("#user-first-name").val();
    var lastName = $("#user-last-name").val();
    var streetAddress = $("#user-street-address").val();
    var city = $("#user-city").val();
    var state = $("#user-state").val();
    var zip = $("#user-zip").val();
    var userInfo = new UserInfo(firstName,lastName,streetAddress,city,state,zip);
    localStorage.setItem("contactInfo",JSON.stringify(userInfo));
    showFinalInfo();
  });


  newOrder.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '../index.html'
  });
});
