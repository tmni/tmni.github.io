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

   function addToCart(){
     var amount = document.getElementById("amt").value;
     console.log(amount)
     if (amount >0){


       var old = document.getElementById("cart").innerHTML
       var reg =  /\d+/;
       var prev = (old.match(/\d+/))
       if (prev == null){
         prev = 0;
       }
       var total = parseInt(prev) + parseInt(amount)
      document.getElementById("cart").innerHTML = "Cart (" + String(total) + ")"
       alert("Added " + amount + " items to cart!")
       localStorage.setItem("cartTot", JSON.stringify(total));
       }
     }
   function ProductTrack(){
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
     $(this).addClass("selected");
     currentItem["color"] = this

     });
     });
     //select material
     $(document).ready(function () {
     $(".material").click(function () {
     $(".material").removeClass("sel");
     $(this).addClass("sel");
     currentItem["material"] = this
     });
     });

   }


   /*** Document Load ****/
