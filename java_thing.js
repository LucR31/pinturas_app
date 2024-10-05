
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
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
var transformers  = {}
const NUMBER = 4 //number of fotos

for (var i = 0; i < NUMBER; i++) {

  paintings[i] = new Painting('/Users/lucas/Desktop/haleakala.JPG', './musica/bird.m4a', stage)

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
    remove_image_play_song();
    for (var i = 0; i < NUMBER; i++) {
      //paintings[i].image.draggable = true TODO
      transformers[i].nodes([paintings[i].image]);
      layer.add(transformers[i]);
    }
  },
  false
);

document.getElementById('play').addEventListener(
  'click',
  function () {
    remove_transformers();
    for (var i = 0; i < NUMBER; i++) {
      paintings[i].image.on('mouseout',function(){
        //console.log(evt.currentTarget);
        //evt.target.song.play()
        });
      //paintings[i].image.on('mouseout',pl.apply(paintings[i]));
    }
  },
  false
);

function remove_transformers(){
    for (var i = 0; i < NUMBER; i++) {
      transformers[i].nodes([]);
    }
  }

function remove_image_play_song(){
    for (var i = 0; i < NUMBER; i++) {
      paintings[i].image.off('mouseover');
      paintings[i].image.off('mouseout');
    }
  }
