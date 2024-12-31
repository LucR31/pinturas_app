
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

function makeData(){
  var list_files = document.getElementById('images-upload').files;
  for (i=0;i<list_files.length;i++){
    var form = document.getElementById(list_files[i].name);
    sessionStorage.setItem(list_files[i].name, 
                         form.options[form.selectedIndex].text);
  }
}

function addRow(){

  var tbody = document.getElementById('mytable').getElementsByTagName('tbody')[0];
  var list_files = document.getElementById('images-upload').files;
  var music_files = document.getElementById('music-upload').files;
  
  for (i=0; i<list_files.length; i++){

    let row = tbody.insertRow();
    let cell_name = row.insertCell(0);
    let cell_music = row.insertCell(1);
    let cell_music_play = row.insertCell(2);
    let cell_music_delete = row.insertCell(3);
    cell_name.innerHTML = list_files[i].name;

    //Delete
    var ita = document.createElement('i');
    ita.className = "fa fa-trash-o";
    cell_music_delete.appendChild(ita);

    //Audio 
    var audio = document.createElement('audio');
    var source = document.createElement('source');
    //source.src = ;
    audio.appendChild(source);
    cell_music_play.appendChild(audio);

    //Form
    var form = document.createElement('form');
    var select = document.createElement('select');
    form.id = "superform"+i;
    form.appendChild(select);
    select.id = list_files[i].name;
    cell_music.appendChild(form);

    for (j=0; j < music_files.length; j++){
      var option = document.createElement('option');
      option.value = music_files[j].name;
      option.innerText = music_files[j].name;
      select.appendChild(option);
    }
  }
}

//VARIABLES
var width = window.innerWidth;
var height = window.innerHeight;
var layer = new Konva.Layer();
var stage = new Konva.Stage({
  container: 'container',
  width: width*0.98,
  height: height*0.8,
});

var paintings = {};
var keys = Object.keys(sessionStorage);
var transformers  = {};
const NUMBER = keys.length; //number of fotos


for (var i = 0; i < keys.length; i++) {
  paintings[i] = new Painting('./pinturas/'+keys[i],
                              './musica/'+sessionStorage.getItem(keys[i]), 
                              stage);
  transformers[i] = new Konva.Transformer({
    keepRatio: true,
    enabledAnchors: [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ],
  });
}

//Adding layers
for (var i = 0; i < NUMBER; i++) {
  layer.add(paintings[i].image);
}
stage.add(layer);

//BUTTONS
document.getElementById('save').addEventListener(
  'click',
  function () {
    var dataURL = stage.toDataURL();
    downloadURI(dataURL, 'stage.png');
  },
  false
);

document.getElementById('edit').addEventListener(
  'click',
  function () {
    for (var i = 0; i < NUMBER; i++) {
      paintings[i].enable_drag();
      paintings[i].disable_sound();
      transformers[i].nodes([paintings[i].image]);
      layer.add(transformers[i]);
    }
  },
  false
);

document.getElementById('play').addEventListener(
  'click',
  function () {
    for (var i = 0; i < NUMBER; i++) {
      paintings[i].disable_drag();
      transformers[i].nodes([]);
      paintings[i].enable_sound();
    }
  },
  false
);

