height= 270;
width= 480;
var i=0;

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);   
        this.frameNo = 0; 
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        mySound.stop();
        mySound = new sound("death","sounds/die.mp3");
        mySound.play();
    },
    reset : function() {
        myObstacles= [];
        if(score>0){
            for(i=score+2;i<100;i++){
                accelerations[i]=-Math.random();
            }
            if(score>0 && score!=null){
                console.log(score+1);
            }else{
                console.log(0);
            }
            
        }else{
            for(i=0;i<100;i++){
                accelerations[i]=-Math.random();
            }
        }
        k=0;
        j=0;
        document.body.removeChild(document.body.childNodes[0]);
        startGame();
    }
}

function sound(val,src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    if(val=="background"){
        this.sound.setAttribute("loop", "loop");
    }
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}