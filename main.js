let sounds;

let playing = null;

const clickHandler = function(){
  if(playing && typeof playing == "object")playing.load();
  playing = sounds[this.id].source;
  sounds[this.id].source.play();
};

const createAudio = function(sound){
  let file = `./sounds/${sound}.mp3`;
  let audio = document.createElement("audio");
  audio.src = file;
  audio.type = "audio/mp3";
  sounds[sound].source = audio;
};

const createButton = function(sound){
  let display = sounds[sound].name;
  let button = document.createElement("button");
  button.id = sound;
  button.textContent = display;
  button.addEventListener("click",clickHandler);
  document.querySelector("content").appendChild(button);
};

const buildSoundboard = ()=>{
  for(let sound in sounds){
    createAudio(sound);
    createButton(sound);
  }
};

fetch("./sounds/sounds.json").then(data=>data.json()).then(data=>{
  sounds = data;
  buildSoundboard();
}).catch(console.error);