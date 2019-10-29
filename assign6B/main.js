var currentItem =  {
  "name": null,
  "color": null,
  "material": null,
  "price":null
};

var cart = []


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

     var cart = getCart()
     var total = 0
     cart.forEach(function (item) {
       total += parseFloat(item.price)})
    document.getElementById("total").innerHTML = "Your total is $" + String(total)
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Checkout";
    document.getElementById("checkout-button").appendChild(btn)

   }

   }

   function fillTable(cartItems){
     table = document.getElementById("cart-table");
     for (i = 0; i < cartItems.length; i++) { //loop thru rows
       var tr = document.createElement('TR');
       for (j = 0; j < 5; j++) { //loop thru columns
         var td = document.createElement('TD')
         switch(j) {
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
   function populateCart(){

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
    console.log("button", button)
    var cartItems = getCart();
    toDelete = parseInt(button.id.match(/\d+/));
    var table = document.getElementById("cart-table")
    console.log("the cart currently has", cartItems)
    console.log("I want to delete ", cartItems[toDelete])
    console.log("have to delete ", table.rows[toDelete] )
    document.getElementById("cart-table").deleteRow(toDelete);
    console.log("deleting from array", cartItems.splice(toDelete, 1))
    console.log("the cart is now", cartItems)
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.location.reload()
  }




   function addToCart(){
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

     function selectColor(){
       $(document).ready(function () {
       $(".dot").click(function () {
       $(".dot").removeClass("selected");
       // console.log("changed color", currentItem)
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

       // console.log("new color", currentItem)

       });
       });

     }

     function selectFluff(){
       $(document).ready(function () {
       $(".material").click(function () {
       $(".material").removeClass("sel");
       // console.log("changed material", currentItem)
       $(this).addClass("sel");
       currentItem["material"] = this.alt
       // console.log("added material", currentItem)
       });
       });

     }

   function productTrack(){
     pageSetUp()
     currentItem["name"] =
     document.getElementById("pillow-title").innerHTML.trim()
     currentItem["price"] =
     parseFloat(document.getElementById("price").innerHTML.replace(/[^0-9.-]+/g, ''))
     selectColor()
     selectFluff()
   }


   /*** Document Load ****/
