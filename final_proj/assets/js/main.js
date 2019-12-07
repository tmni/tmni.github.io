var lvl = null
var diff = null
var viz = "Bars"
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
  localStorage.setItem('lvl', JSON.stringify(lvl));
  localStorage.setItem('diff', JSON.stringify(diff));
  console.log(lvl, diff)

}
// update the dropdown selected
function updateText(obj){

  console.log($(obj).attr("class"))
  switch ($(obj).attr("class")) {
    case "dropdown-item lvl":
    $(".dropdown-item.lvl.selected").removeClass("selected")
    break;
    case "dropdown-item diff":
    $(".dropdown-item.diff.selected").removeClass("selected");
    break;
    case "dropdown-item viz":
    $(".dropdown-item.viz.selected").removeClass("selected");
    break;}
    $(obj).addClass("selected");
    console.log("changed class")
  }
  //update viz prefs
  function updateDefaults(obj){
    var id = $(obj).parent().attr("id");
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
  }
//dropdown actions
  $('.dropdown-item').click(function() { // change variables based on what the user clicks
    toSet = $(this).text() ;
    updateText(this)
    updateDefaults(this)

  });
//change the helper words every few seconds
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


//choose music based on lvl
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
  }



  // retrieves settings and displays music viz
  function start() {

    retrieveSettings()
    if (lvl == null){
      alert("the freestyle assistant requires a level and visualization choice to run")
      return;
    }
    document.getElementById("audio").controls = true;
    change()

    setInterval(changeWords, 5000);
    setAudio()
    audio.crossOrigin = "anonymous"
    switch(viz) {
      case "Bars":
      console.log("case is viz bars")
      viz1()
      break;
      default:
      viz1()
    }
  }
//popover
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
