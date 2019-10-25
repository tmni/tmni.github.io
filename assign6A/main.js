

function selectDot(){
  var header = document.getElementById('dots');
  var btns = header.getElementsByClassName("dot");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("selected");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" selected", "");
    }
        this.className += " selected";
    });
  }
}

function selectMat(){
  var header = document.getElementById('materials');
  var btns = header.getElementsByClassName("material");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("sel");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" sel", "");
    }
        this.className += " sel";
    });
  }
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
    // var s = "Cart" + " (" total + ")"
    document.getElementById("cart").innerHTML = "Cart (" + String(total) + ")"
    alert("Added " + amount + " items to cart!")
    localStorage.setItem("cartTot", JSON.stringify(total));
    }
  }
function cartNum(){
  var cartnum = JSON.parse(localStorage.getItem("cartTot"))
  console.log("the cart num is" + cartnum)
  if (cartnum >0){
    document.getElementById("cart").innerHTML = "Cart (" + String(cartnum) + ")"
  }


}
/*** Document Load ****/
