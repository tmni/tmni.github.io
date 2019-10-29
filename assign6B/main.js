var currentItem =  { //track the current item user is selecting
  "name": null,
  "color": null,
  "material": null,
  "price":null
};

var cart = [] //array to hold items user adds


class CartItem{ //the CartItem holds all property of an item
  constructor(pillow_type, color, fluff, price) {
       this.pillow = pillow_type;
       this.color = color;
       this.fluff = fluff;
       this.price = price
   }
   getPillow(){
     return this.pillow}
   getColor(){
     return this.color}
   getFluff(){
     return this.fluff}

   getPrice(){
     return this.price}
   }

function pageSetUp(){ //shows Cart amount on all pages
     if ( getCart() !== null &&
     (getCart().length) != 0)
     {
       var allCart = getCart()
       document.getElementById("cart").innerHTML = "Cart (" + String(allCart.length) + ")"
       return allCart
     }

   }

function totalCost(){ //calculates cost of all items in cart
  if (getCart() !== null &&
  (getCart().length) != 0)
  {

    var allCart = getCart()
    var total = 0
    allCart.forEach(function (item) {
      total += parseFloat(item.price)})
      document.getElementById("total").innerHTML = "Your total is $" + String(total)
      var btn = document.createElement("BUTTON");
      btn.innerHTML = "Checkout";
      document.getElementById("checkout-button").appendChild(btn)

    }

  }

function fillTable(cartItems){ //fills up checkout cart
  table = document.getElementById("cart-table");
  for (i = 0; i < cartItems.length; i++) { //loop thru rows
    var tr = document.createElement('TR');
    for (j = 0; j < 5; j++) { //loop thru columns
      var td = document.createElement('TD')
      switch(j) { //fills table based on column
        case 0:
        td.appendChild(document.createTextNode(cartItems[i].pillow));
        tr.appendChild(td)
        break;
        case 1:
        td.appendChild(document.createTextNode(cartItems[i].color));
        tr.appendChild(td)
        break;
        case 2:
        td.appendChild(document.createTextNode(cartItems[i].fluff));
        tr.appendChild(td)
        break;
        case 3:
        td.appendChild(document.createTextNode(cartItems[i].price));
        tr.appendChild(td)
        break;
        case 4:
        var btn = document.createElement("BUTTON");
        btn.onclick = function() { deleteItem(this) };
        btn.id = "delete_" + i;
        btn.innerHTML = "X";
        console.log(btn)
        td.appendChild((btn));
        tr.appendChild(td)
        break;}}
        table.appendChild(tr);
      }
    }
function populateCart(){ //parent function for cart page
  if (getCart() !== null &&
  (getCart().length) != 0)
  {
    cartItems = pageSetUp()
    fillTable(cartItems)
    totalCost()
  }

  else{
    document.getElementById("noItems").innerHTML = "No items in cart"}
  }



function deleteItem(button){
  var cartItems = JSON.parse(localStorage.getItem("cart"));
  toDelete = parseInt(button.id.match(/\d+/));
  var table = document.getElementById("cart-table")

  document.getElementById("cart-table").deleteRow(toDelete);
  cartItems.splice(toDelete, 1)

  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.location.reload()




}





function addToCart(){ //saves elements of user cart when added
  var amount = document.getElementById("amt").value;
  if (amount >0){
    if (currentItem["name"] !=null && currentItem["color"] !=null &&
    currentItem["material"] !=null ){
      var item = new CartItem(currentItem["name"],
      currentItem["color"],
      currentItem["material"],
      currentItem["price"])
      for (i = 0; i< amount; i++) {
        cart.push(item)
      }
      alert("Added " + amount + " items to cart!")
      if ( getCart() !== null){
        var oldCart = getCart()
        localStorage.setItem("cart", JSON.stringify(oldCart.concat(cart)));
      }
      else{
        saveCart()
      }
      window.location.reload()
    }
  }
  else{
    alert("Make sure you choose a color, material, and at least one pillow")
  }
}

 function saveCart(){
   localStorage.setItem("cart", JSON.stringify(cart));
 }

 function getCart(){
   return JSON.parse(localStorage.getItem("cart"));

 }

 function selectColor(){ //tracks color selected
   $(document).ready(function () {
   $(".dot").click(function () {
   $(".dot").removeClass("selected");
   $(this).addClass("selected");
   switch(this.getAttribute("class")) {
      case "dot red selected":
        currentItem["color"] = "After School Special";
        break;
      case "dot yellow selected":
        currentItem["color"] = "Morning Hazel";
        break;
      case "dot blue selected":
        currentItem["color"] = "Cozy Denim";
        break;
        case "dot green selected":
          currentItem["color"] = "Rainy Day";
          break;
        }

   });
   });

 }

 function selectFluff(){ //tracks material selected
   $(document).ready(function () {
   $(".material").click(function () {
   $(".material").removeClass("sel");
   $(this).addClass("sel");
   currentItem["material"] = this.alt

   });
   });

 }

function productTrack(){ //parent function to track items added
 pageSetUp()
 currentItem["name"] =
 document.getElementById("pillow-title").innerHTML.trim()
 currentItem["price"] =
 parseFloat(document.getElementById("price").innerHTML.replace(/[^0-9.-]+/g, ''))
 selectColor()
 selectFluff()
}


   /*** Document Load ****/
