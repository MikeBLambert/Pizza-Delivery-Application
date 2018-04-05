//Business Logic
var totalPrice = 0
function Pizza (size,toppings) {
  this.size = size;
  this.toppings = toppings;
  };

var pizzasInStorage = JSON.parse(localStorage.getItem('pizzas'));
if (pizzasInStorage == null) {
  var pizzas = [];
} else {
  var pizzas = pizzasInStorage;
};

//Calculates pizza prices

Pizza.prototype.pizzaPrice = function() {
  var pizzaPrice = 0;
  if (this.size == "Small") {
    pizzaPrice += 7;
  } else if (this.size == "Medium") {
    pizzaPrice += 10;
  } else if (this.size == "Large") {
    pizzaPrice += 13;
  }
  for (i=0; i<=this.toppings.length; i+=1) {
    if (this.toppings[i] === "Cheese") {
      pizzaPrice += 1;
    } else if (this.toppings[i] === "Pepperoni") {
      pizzaPrice += 2;
    } else if (this.toppings[i] ==="Olives") {
      pizzaPrice += 1;
    } else if (this.toppings[i] === "Peppers") {
      pizzaPrice += 2;
    } else if (this.toppings.length === 0) {
      pizzaPrice += 0;
    };
  };
    return pizzaPrice;
};

var pricesInStorage = JSON.parse(localStorage.getItem('prices'));
if (pricesInStorage == null) {
  var prices = [];
} else {
  var prices = pricesInStorage;
}


//User Interface
$(document).ready(function() {

  //To display the user's name after "Welcome to Pizzarama"
  var userName = JSON.parse(localStorage.getItem('userName'));
  $("#userNameDisplay").append(" " + userName);

  var pizzasInStorage = JSON.parse(localStorage.getItem('pizzas'));
  if (pizzasInStorage != null) {
    $("#shoppingCart").show();
    for(i=0; i<pizzasInStorage.length; i+=1) {
      $("#displayPizzaInfo").append(
        "<div class='row' id='shoppingCartRows'>"+
          "<div class='col-md-4'>" +
            "<li>" +
              pizzasInStorage[i]['size'] +
            "</li>" +
          "</div>" +
          "<div class='col-md-4'>" +
            pizzasInStorage[i]['toppings'].join("<br>") +
          "</div>" +
          "<div class='col-md-4'>" +
            pricesInStorage[i] +
          "</div>" +
        "</div>");
    };
  };
  // var contactInfo = JSON.parse(localStorage.getItem('contactInfo'));

  if (pricesInStorage != null) {
    for(i=0; i<pricesInStorage.length; i+=1){
      $("#displayPriceInfo").append(
        pricesInStorage[i]
      );
    };
  };

  $("#pizzaInfoForm").submit(function(event) {
    event.preventDefault();
    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function() {
      toppings.push($(this).val());
    });
    var pizza = new Pizza(size,toppings);
    pizzas.push(pizza);

    var price = pizza.pizzaPrice();
    prices.push(price);
    totalPrice += price;
    localStorage.setItem("pizzas", JSON.stringify(pizzas));
    localStorage.setItem("prices", JSON.stringify(prices));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));


    $("#shoppingCart").show();
    $("#displayPizzaInfo").append(
      "<div class='row'>" +
        "<div class='col-md-4'>" +
          "<li>" +
            pizza.size +
          "</li>" +
        "</div>" +
        "<div class='col-md-4'>" +
          pizza.toppings.join("<br>") +
        "</div>" +
        "<div class='col-md-4'>" +
          price +
        "</div>" +
      "</div>");
  });


  $("#proceedToCheckout").click(function(event) {
    event.preventDefault();
    window.location.href = '../html/check-out.html'
  });
});
