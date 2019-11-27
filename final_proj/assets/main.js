
var lvl = null
var diff = null
var viz = null
var context
var src

$('.dropdown-item').click(function() { // change variables based on what the user clicks
  toSet = $(this).text() ;
  var id = $(this).parent().attr("id");
  console.log("CALLED click")
  switch(id) {

  case "lvl":
    lvl = toSet;
    console.log("setting lvl to ", toSet)
    localStorage.setItem('lvl', JSON.stringify(lvl));
    console.log("calling start")
    start()
    break;
  case "diff":
    diff = toSet;
    localStorage.setItem('diff', JSON.stringify(diff));
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

function viz1(){

  const canvas = document.getElementById("canvas");
  const h3 = document.getElementById('name')
  h3.innerText = JSON.parse(localStorage.getItem('song_name')); // Sets <h3> to the name of the file
  console.log("retrieved canvas and song name")



  ///////// <CANVAS> INITIALIZATION //////////
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  console.log("set canvas width and height")
  ///////////////////////////////////////////
  if (context == undefined){
    context = new AudioContext();

  }
  if (src == undefined){
    src = context.createMediaElementSource(audio)}

  // var context = new AudioContext(); // (Interface) Audio-processing graph
  //
  // console.log("created audio context", context)
  // let src = context.createMediaElementSource(audio); // Give the audio context an audio source,
  // to which can then be played and manipulated
  console.log("created media element source")
  const analyser = context.createAnalyser(); // Create an analyser for the audio context

  src.connect(analyser); // Connects the audio context source to the analyser
  analyser.connect(context.destination); // End destination of an audio graph in a given context
  // Sends sound to the speakers or headphones



  analyser.fftSize = 16384;
  // (FFTSize) represents the window size in samples that is used when performing a FFT

  // Lower the size, the less bars (but wider in size)
  ///////////////////////////////////////////////////////////


  const bufferLength = analyser.frequencyBinCount; // (read-only property)
  // Unsigned integer, half of fftSize (so in this case, bufferLength = 8192)
  // Equates to number of data values you have to play with for the visualization

  // The FFT size defines the number of bins used for dividing the window into equal strips, or bins.
  // Hence, a bin is a spectrum sample, and defines the frequency resolution of the window.

  const dataArray = new Uint8Array(bufferLength); // Converts to 8-bit unsigned integer array
  // At this point dataArray is an array with length of bufferLength but no values
  console.log('DATA-ARRAY: ', dataArray) // Check out this array of frequency values!

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  console.log('WIDTH: ', WIDTH, 'HEIGHT: ', HEIGHT)

  const barWidth = (WIDTH / bufferLength) * 13;
  console.log('BARWIDTH: ', barWidth)

  console.log('TOTAL WIDTH: ', (117*10)+(118*barWidth)) // (total space between bars)+(total width of all bars)

  let barHeight;
  let x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame); // Takes callback function to invoke before rendering

    x = 0;

    analyser.getByteFrequencyData(dataArray); // Copies the frequency data into dataArray
    // Results in a normalized array of values between 0 and 255
    // Before this step, dataArray's values are all zeros (but with length of 8192)

    ctx.fillStyle = "rgba(0,0,0,0.2)"; // Clears canvas before rendering bars (black with opacity 0.2)
    ctx.fillRect(0, 0, WIDTH, HEIGHT); // Fade effect, set opacity to 1 for sharper rendering of bars

    let r, g, b;
    let bars = 118 // Set total number of bars you want per frame

    for (let i = 0; i < bars; i++) {
      barHeight = (dataArray[i] * 2.5);

      if (dataArray[i] > 210){ // pink
        r = 250
        g = 0
        b = 255
      } else if (dataArray[i] > 200){ // yellow
        r = 250
        g = 255
        b = 0
      } else if (dataArray[i] > 190){ // yellow/green
        r = 204
        g = 255
        b = 0
      } else if (dataArray[i] > 180){ // blue/green
        r = 0
        g = 219
        b = 131
      } else { // light blue
        r = 0
        g = 199
        b = 255
      }

      // if (i === 0){
      //   console.log(dataArray[i])
      // }

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, (HEIGHT - barHeight), barWidth, barHeight);
      // (x, y, i, j)
      // (x, y) Represents start point
      // (i, j) Represents end point

      x += barWidth + 10 // Gives 10px space between each bar
    }}


  audio.play();
  console.log("playing audio")
  renderFrame();
  console.log("rndering frame")
};


  function start() {
    retrieveSettings()
    setAudio()
    audio.crossOrigin = "anonymous"
    switch(viz) {
      case "Viz 1":
        console.log("case is viz 1")
        viz1()
        break
        default:
        viz1()
      }
    }
    //viz inspired by https://medium.com/@ginalee1114/how-to-music-visualizer-web-audio-api-aa007f4ea525
    // const files = this.files; // FileList containing File objects selected by the user (DOM File API)
    // console.log('FILES[0]: ', files[0])
    // audio.src = URL.createObjectURL(files[0]); // Creates a DOMString containing the specified File object

    // const name = files[0].name
