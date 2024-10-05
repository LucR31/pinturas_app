class Painting {
    constructor(image_path, song_path, stage) { 
        var image_ =  new Image();
        image_.src = image_path;
        this.song = new Audio(song_path);
        this.image = new Konva.Image({
                        image: image_,
                        x: stage.width() * Math.random(),
                        y: stage.height() * Math.random(),
                        width: 200, 
                        height: 137,
                        draggable: true,
                      });

     }
}


