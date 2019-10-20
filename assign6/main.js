function selectDot(){
  var header = document.getElementById('dots');
  var btns = header.getElementsByClassName("dot");
  var h = document.getElementById('materials');
  var b = header.getElementsByClassName("material");
    console.log(b)
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


/*** Document Load ****/
