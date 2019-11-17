
var lvl = null
var diff = null
var viz = null

$('.dropdown-item').click(function() { // change variables based on what the user clicks
  toSet = $(this).text() ;
  var id = $(this).parent().attr("id");
  switch(id) {
  case "lvl":
    lvl = toSet;
    console.log("setting lvl to ", toSet)
    localStorage.setItem('lvl', JSON.stringify(lvl));
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
location.reload()

});

function setAudio(){
  var audio = document.getElementById("audio");
  switch(lvl) {
    case "Level 1":
      // audio.src = URL.createObjectURL("Joey Bada$$ - Waves Instrumental.mp3")
      audio.src = "Joey Bada$$ - Waves Instrumental.mp3"
      break;
    case "Level 2":
      audio.src = "Faded.mp3"
      break;
    case "Level 3":
      audio.src = "Citgo.mp3"
      break;
}
console.log("song is ", audio)
}

function retrieveSettings(){
  lvl = JSON.parse(localStorage.getItem('lvl'));
  diff = JSON.parse(localStorage.getItem('diff'));
  viz = JSON.parse(localStorage.getItem('viz'));
  console.log("lvl", lvl, "diff", diff, "viz", viz)
}
window.onload = function() {
  retrieveSettings()
  setAudio()
  audio.crossOrigin = "anonymous";}




  // const file = document.getElementById("file-input");

  // const audio = document.getElementById("audio");

  function start() {
    //viz inspired by https://medium.com/@ginalee1114/how-to-music-visualizer-web-audio-api-aa007f4ea525
    // const files = this.files; // FileList containing File objects selected by the user (DOM File API)
    // console.log('FILES[0]: ', files[0])
    // audio.src = URL.createObjectURL(files[0]); // Creates a DOMString containing the specified File object

    // const name = files[0].name
    const canvas = document.getElementById("canvas");
    const h3 = document.getElementById('name')
    h3.innerText = "HI" // Sets <h3> to the name of the file


    ///////// <CANVAS> INITIALIZATION //////////
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ///////////////////////////////////////////


    const context = new AudioContext(); // (Interface) Audio-processing graph
    let src = context.createMediaElementSource(audio); // Give the audio context an audio source,
    // to which can then be played and manipulated
    const analyser = context.createAnalyser(); // Create an analyser for the audio context

    src.connect(analyser); // Connects the audio context source to the analyser
    analyser.connect(context.destination); // End destination of an audio graph in a given context
    // Sends sound to the speakers or headphones


    /////////////// ANALYSER FFTSIZE ////////////////////////
    // analyser.fftSize = 32;
    // analyser.fftSize = 64;
    // analyser.fftSize = 128;
    // analyser.fftSize = 256;
    // analyser.fftSize = 512;
    // analyser.fftSize = 1024;
    // analyser.fftSize = 2048;
    // analyser.fftSize = 4096;
    // analyser.fftSize = 8192;
    analyser.fftSize = 16384;
    // analyser.fftSize = 32768;

    // (FFT) is an algorithm that samples a signal over a period of time
    // and divides it into its frequency components (single sinusoidal oscillations).
    // It separates the mixed signals and shows what frequency is a violent vibration.

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
      }
    }

    audio.play();
    renderFrame();
  };
