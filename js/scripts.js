//Business Logic
//Object for details of each pizza that is ordered.
function Pizza (size,toppings) {
  this.size = size;
  this.toppings = toppings;
  };


//Object that stores the user's information
function UserInfo (firstName,lastName,streetAddress,city,state,zip) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.zip = zip;
  };

  var totalPrice = 0

//Calculates the price of a pizza
Pizza.prototype.pizzaPrice = function() {
  var pizzaPrice = 0;
  if (this.size == "small") {
    pizzaPrice += 7;
  } else if (this.size == "medium") {
    pizzaPrice += 10;
  } else if (this.size == "large") {
    pizzaPrice += 13;
  }
  for (i=-1; i<this.toppings.length; i+=1) {
    if (this.toppings[i] === "Cheese") {
      pizzaPrice += 1
    } else if (this.toppings[i] === "Pepperoni") {
      pizzaPrice += 2
    } else if (this.toppings[i] ==="Olives") {
      pizzaPrice += 1
    } else if (this.toppings[i] === "Peppers") {
      pizzaPrice += 2
    } else if (this.toppings.length === 0) {
      pizzaPrice += 0
    }
  return pizzaPrice;
  };
};

//User Interface
$(document).ready(function() {
  $("#pizzaInfoForm").submit(function(event) {
    event.preventDefault();
    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function() {
      toppings.push($(this).val());
    });
    localStorage.setItem("toppings",toppings);

    var pizza = new Pizza(size,toppings);
    var price = pizza.pizzaPrice();
    localStorage.setItem("pizza", JSON.stringify(pizza));

    // atLeastOneTopping(toppings)
    if (pizza.toppings.length >= 1) {
      document.getElementById("pizzaInfoForm").reset();
      $("#toppingAlert").hide();
      $("#shoppingCart").show();
      $("button#submitOrder").show();
      $("#userInfoForm").show();

      $("#displayOrderInfo").append(
        "<div class='row'>" +
          "<div class='col-md-4'>" +
            "<li>One " + pizza.size + " pizza. <br>" +
          "</div>" +
          "<div class='col-md-4'>" +
            "TOPPINGS: <ul>" + pizza.toppings.join("<br>") + "</ul>" +
          "</div>" +
          "<div class='col-md-4'>" +
            "Price: $" + price + "</li></h4>" +
          "</div>" +
        "</div>");
      totalPrice += price

    } else {
      $("#toppingAlert").show();
    };
  });

  $("#userInfoForm").submit(function(event) {
    event.preventDefault();
    var firstName = $("#user-first-name").val();
    var lastName = $("#user-last-name").val();
    var streetAddress = $("#user-street-address").val();
    var city = $("#user-city").val();
    var state = $("#user-state").val();
    var zip = $("#user-zip").val();
    var userInfo = new UserInfo(firstName,lastName,streetAddress,city,state,zip);

    $("#userInfoForm").hide();
    $("#pizzaInfoForm").hide();
    $("#welcomeTitle").hide();
    $("#shoppingCart").hide();
    $("#finalOrderDisplay").show();

    $("#finalOrderInfo").append(
      userInfo.firstName + " " + userInfo.lastName +
      "<br>" +
      userInfo.streetAddress +
      "<br>" +
      userInfo.city + ", " + userInfo.state + " " + userInfo.zip +
      "<br>" +
      "<br>" +
      "The total amount due is $" + totalPrice +".00"
    );
  });
});
