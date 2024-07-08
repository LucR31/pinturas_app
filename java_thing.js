class Painting {
    constructor(image_path, song) { 
        this.image_path = image_path;
        this.song = song
     }
}
const painting_1 = new Painting('path_x_x', 'song_x')

var width = window.innerWidth;
var height = window.innerHeight;
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

var text = new Konva.Text({
  x: 100,
  y: 100,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'black',
})
function writeMessage(message) {
  text.text(message);
}

var paintings = {};
var images  = {}
const NUMBER = 2 //number of fotos

//Fill paintings with images and songs
for (var i = 0; i < NUMBER; i++) {
        //Attaching image to painting
        images[i] =  new Image();
        images[i].src = '/Users/fvlr/Desktop/test/fotos/'+i+'.jpg';

        paintings[i] = new Konva.Image({
            image: images[i],
            x: stage.width() * Math.random(),
            y: stage.height() * Math.random(),
            width: 200, 
            height: 137,
            draggable: true,
          });
          paintings[i].on('dblclick', function () {
            writeMessage(painting_1.song);
          });
          paintings[i].on('mouseout', function () {
            writeMessage('OUT');
          });
}

//Adding layers
var layer = new Konva.Layer();
for (var i = 0; i < NUMBER; i++) {
  layer.add(paintings[i]);
}
layer.add(text);
stage.add(layer);


