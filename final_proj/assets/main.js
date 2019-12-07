
var lvl = null
var diff = null
var viz = null
var context
var src
// change start to stop
function change() // no ';' here
{
    var elem = document.getElementById("start");
    elemText = elem.innerHTML
    console.log("elem", elem.innerHTML)
    if (elemText=="Start"){
      elem.innerHTML = "Stop";
    }
    else {location = location}//reload screen when pressing stop
}

function saveUserPrefs(){
  lvl = document.getElementById("beatchoice").value;
  diff = document.getElementById("diffchoice").value;
  viz = document.getElementById("vizchoice").value;
}

$('.dropdown-item').click(function() { // change variables based on what the user clicks
  toSet = $(this).text() ;
  var id = $(this).parent().attr("id");
  console.log("CALLED click")
  switch(id) {

  case "lvl":
    lvl = toSet;
    console.log("setting lvl to ", toSet)
    localStorage.setItem('lvl', JSON.stringify(lvl));
    break;
  case "diff":
    diff = toSet;
    localStorage.setItem('diff', JSON.stringify(diff));
    $('#diff-toast').toast('show')

    break;
  case "viz":
    viz = toSet;
    console.log("setting viz to ", toSet)
    localStorage.setItem('viz', JSON.stringify(viz));
    break;
  default:
    console.log("sadboi")
    break;
}

});

function changeWords(){

  var word = document.getElementById("word");

  switch(diff) {
    case "Easy":
      var arr = easy_words
      break;
    case "Medium":
      var arr = med_words
      break;
    case "Hard":
      var arr = hard_words
      break;
    }
    var randIndex = Math.floor(Math.random() * arr.length)
    word.innerHTML = arr[randIndex];

    }



function setAudio(){
  var audio = document.getElementById("audio");
  switch(lvl) {
    case "Level 1":
      // audio.src = URL.createObjectURL("Joey Bada$$ - Waves Instrumental.mp3")
      audio.src = "assets/music/Waves.mp3"
      break;
    case "Level 2":
      audio.src = "assets/music/Faded.mp3"
      break;
    case "Level 3":
      audio.src = "assets/music/Citgo.mp3"
      break;
    }
    var audtext = audio.src
    var n =audtext.lastIndexOf('/');
    var sn = audtext.substring(n + 1);
    console.log("song is ", sn)
    localStorage.setItem('song_name', JSON.stringify(sn));
}

function retrieveSettings(){
  lvl = JSON.parse(localStorage.getItem('lvl'));
  diff = JSON.parse(localStorage.getItem('diff'));
  viz = JSON.parse(localStorage.getItem('viz'));
  console.log("retrieved settings lvl", lvl, "diff", diff, "viz", viz)
}




  function start() {
    document.getElementById("audio").controls = true;
    change()
    retrieveSettings()
    setInterval(changeWords, 5000);
    setAudio()
    audio.crossOrigin = "anonymous"
    switch(viz) {
      case "Bars":
        console.log("case is viz bars")
        viz1()
        break
        default:
        viz1()
      }
    }


    $(document).ready(function() {

    // We don't want to see the popover contents until the user clicks the target.
    // If you don't hide 'blah' first it will be visible outside of the popover.
    //
    $('#blah').hide();

    // Initialize our popover
    //
    $('#target').popover({
        content: $('#blah'), // set the content to be the 'blah' div
        placement: 'bottom',
        html: true
    });
    // The popover contents will not be set until the popover is shown.  Since we don't
    // want to see the popover when the page loads, we will show it then hide it.
    //
    $('#target').popover('show');
    $('#target').popover('hide');

    // Now that the popover's content is the 'blah' dive we can make it visisble again.
    //
    $('#blah').show();


});
$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
});
