class Painting {
    constructor(image_path, song_path, stage) { 
        var image_ =  new Image();
        image_.src = image_path;
        this.song = new Audio(song_path);
        this.image = new Konva.Image({
                        image: image_,
                        x: stage.width()*(1/2),
                        y: stage.height()*(1/2),
                        draggable: true,
                      });

     }
    disable_drag(){
      this.image.draggable('false');
    }

    enable_drag(){
      this.image.draggable('true');
    }

    enable_sound(){
      var song_ = this.song;
      this.image.on('mouseover',function(){song_.play();});
      this.image.on('mouseout',function(){song_.pause();});
    }
    disable_sound(){
      this.image.off('mouseover');
      this.image.off('mouseout');
    }
}


