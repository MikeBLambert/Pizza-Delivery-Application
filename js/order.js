//Business Logic
function Pizza (size,toppings) {
  this.size = size;
  this.toppings = toppings;
  };

  var totalPrice = 0
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

function goToCheckOut() {
  window.location.href = '../html/check-out.html'
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
  $("#proceedToCheckout").click(function(event) {
    event.preventDefault();
    goToCheckOut();
  })
});
