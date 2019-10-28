var currentItem =  {
  "name": null,
  "color": null,
  "material": null,
};

var cart = []


class CartItem{
  constructor(pillow_type, color, fluff) {
       this.pillow = pillow_type;
       this.color = color;
       this.fluff = fluff;
   }
   getPillow(){
     return this.pillow}
   getFluff(){
     return this.fluff}
   getFluff(){
     return this.fluff}
   }


   function populateCart(){
     var cartItems = JSON.parse(localStorage.getItem("cart"));
     table = document.getElementById("cart-table");
     console.log(cartItems)
     for(var i = 0; i < cartItems.length; i++)
          {
              // create a new row
              var newRow = table.insertRow(table.length);
              for(var j = 0; j < cartItems[i].length; j++)
              {
                  // create a new cell
                  var cell = newRow.insertCell(j);

                  // add value to the cell
                  cell.innerHTML = cartItems[i][j];
              }
          }

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
       var item = new CartItem(currentItem["name"], currentItem["color"], currentItem["material"])
       // console.log("looping ",amount, " times")
       for (i = 0; i< amount; i++) {
         // console.log("cart item ", i)
         cart.push(item)
       }
         // console.log("here's the cart", cart)

       document.getElementById("cart").innerHTML = "Cart (" + String(total) + ")"
       alert("Added " + amount + " items to cart!")
       localStorage.setItem("cartTot", JSON.stringify(cart.length));
       localStorage.setItem("cart", JSON.stringify(cart));

       // console.log("the cart now has, ", cart)

     }
       }
    else{
      alert("Make sure you choose a color, material, and at least one pillow")
    }
     }



   function productTrack(){
     currentItem["name"] = document.getElementById("pillow-title").innerHTML.trim()
     var cartnum = JSON.parse(localStorage.getItem("cartTot"))
     console.log("the cart num is" + cartnum)
     if (cartnum >0){
       document.getElementById("cart").innerHTML = "Cart (" + String(cartnum) + ")"
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

     console.log("new color", currentItem)

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
