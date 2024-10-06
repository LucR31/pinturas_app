class Painting {
    constructor(image_path, song_path, stage) { 
        var image_ =  new Image();
        image_.src = image_path;
        this.song = new Audio(song_path);
        this.image = new Konva.Image({
                        image: image_,
                        x: stage.width() * +1/2,
                        y: stage.height() * +1/2,
                        width: 200, 
                        height: 137,
                        draggable: true,
                      });

     }
}


