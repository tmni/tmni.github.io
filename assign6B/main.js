var currentItem =  {
  "name": null,
  "color": null,
  "material": null,
  "price":null
};

var cart = []


class CartItem{
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

   function pageSetUp(){

     if ( JSON.parse(localStorage.getItem("cart")) !== null)
     {
       var allCart = JSON.parse(localStorage.getItem("cart"))
       document.getElementById("cart").innerHTML = "Cart (" + String(allCart.length) + ")"
     }

   }

   function totalCost(){
     if (JSON.parse(localStorage.getItem("cart")) !== null &&
     (JSON.parse(localStorage.getItem("cart")).length) != 0)
     {

     var carts = JSON.parse(localStorage.getItem("cart"))
     var total = 0
     carts.forEach(function (item) {
       total += parseFloat(item.price)})
       document.getElementById("total").innerHTML = "Your total is $" + String(total)
   }

   }
   function populateCart(){

     if (JSON.parse(localStorage.getItem("cart")) !== null &&
     (JSON.parse(localStorage.getItem("cart")).length) != 0)
     {
       var cartItems = JSON.parse(localStorage.getItem("cart"));
       console.log("the cart length is ", cartItems.length)
       document.getElementById("cart").innerHTML = "Cart (" + String(cartItems.length) + ")"

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
            break;}
       table.appendChild(tr);}
   }
   totalCost()

    }

 else{
   document.getElementById("noItems").innerHTML = "No items in cart"
 }
}

  function deleteItem(button){
    console.log("button", button)
    var cartItems = JSON.parse(localStorage.getItem("cart"));
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
       if (currentItem["name"] !=null && currentItem["color"] !=null && currentItem["material"] !=null ){



       var old = document.getElementById("cart").innerHTML
       var reg =  /\d+/;
       var prev = (old.match(/\d+/))

       if (prev == null){
         prev = 0;
       }


       var total = parseInt(prev) + parseInt(amount)
       var item = new CartItem(currentItem["name"], currentItem["color"], currentItem["material"], currentItem["price"])
       // console.log("looping ",amount, " times")
       for (i = 0; i< amount; i++) {
         // console.log("cart item ", i)
         cart.push(item)
       }
         // console.log("here's the cart", cart)

       document.getElementById("cart").innerHTML = "Cart (" + String(total) + ")"
       alert("Added " + amount + " items to cart!")
       if ( JSON.parse(localStorage.getItem("cart")) !== null){
         var oldCart = JSON.parse(localStorage.getItem("cart"));
         console.log("current", cart)
         console.log("old", oldCart)
         localStorage.setItem("cart", JSON.stringify(oldCart.concat(cart)));
         console.log("stored all cart items",JSON.parse(localStorage.getItem("cart")) )
       }
       else{
         localStorage.setItem("cart", JSON.stringify(cart));
         // localStorage.setItem("cartTot", JSON.stringify(cart.length));
       }
       window.location.reload()






       // console.log("the cart now has, ", cart)

     }
       }
    else{
      alert("Make sure you choose a color, material, and at least one pillow")
    }
     }



   function productTrack(){
     currentItem["name"] = document.getElementById("pillow-title").innerHTML.trim()
     currentItem["price"] = parseFloat(document.getElementById("price").innerHTML.replace(/[^0-9.-]+/g, ''))


     if ( JSON.parse(localStorage.getItem("cart")) !== null)
     {
       var allCart = JSON.parse(localStorage.getItem("cart"))
       document.getElementById("cart").innerHTML = "Cart (" + String(allCart.length) + ")"
     }
    // select a color
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
     //select material
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


   /*** Document Load ****/
