console.log ("called!")
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

   // function selectDot(){
   //   console.log("called"
   //   )
   //   var header = document.getElementById('dots');
   //   var btns = header.getElementsByClassName("dot");
   //   console.log("the btns are ", btns)
   //   for (var i = 0; i < btns.length; i++) {
   //     btns[i].addEventListener("click", function() {
   //     var current = document.getElementsByClassName("selected");
   //     console.log("theres a current", current)
   //
   //     if (current.length > 0) {
   //       current[0].className = current[0].className.replace(" selected", "");
   //     }
   //         this.className += " selected";
   //     });
   //   }
   // }

   // function selectMat(){
   //   var header = document.getElementById('materials');
   //   var btns = header.getElementsByClassName("material");
   //   for (var i = 0; i < btns.length; i++) {
   //     btns[i].addEventListener("click", function() {
   //     var current = document.getElementsByClassName("sel");
   //
   //     if (current.length > 0) {
   //       current[0].className = current[0].className.replace(" sel", "");
   //     }
   //         this.className += " sel";
   //     });
   //   }
   // }

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
       // var s = "Cart" + " (" total + ")"
       document.getElementById("cart").innerHTML = "Cart (" + String(total) + ")"
       alert("Added " + amount + " items to cart!")
       localStorage.setItem("cartTot", JSON.stringify(total));
       }
     }
   function ProductTrack(){
     var cartnum = JSON.parse(localStorage.getItem("cartTot"))
     console.log("the cart num is" + cartnum)
     if (cartnum >0){
       document.getElementById("cart").innerHTML = "Cart (" + String(cartnum) + ")"
     }
     $(document).ready(function () {
     $(".dot").click(function () {
     $(".dot").removeClass("selected");
     $(this).addClass("selected");
     });
     });
     $(document).ready(function () {
     $(".material").click(function () {
     $(".material").removeClass("sel");
     $(this).addClass("sel");
     });
     });
   }


   /*** Document Load ****/
