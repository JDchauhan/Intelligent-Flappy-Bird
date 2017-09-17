height= 270;
width= 480;
var i=0;
var set;
var last_move;
var new_move;
var last_score;
var last_moves=[];

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
        new_move = -Math.random();
        if(score==last_score){
            //console.log("here1");
         /*   
            for(i in last_moves){
                if(i==last_move){
                    set=1;
                }
            }
            if(set!=1){
                //last_moves.push(last_move);
                set=0;
            }

            */
            for(i in last_moves){
                if(!(new_move > i + .1 || new_move < i - .1)){
                    new_move=(i - Math.random()) / 2;
                }
            }
        }else{
            last_moves=[];
        }
        last_score=score;

        last_moves.push(new_move);
        if(score>0){
            accelerations[score+2]=new_move;
            for(i=score+3;i<50;i++){//score+3
                accelerations[i]=-Math.random();
            }
        }else{
            accelerations[0]=new_move;
            for(i=1;i<50;i++){
                accelerations[i]=-Math.random();
            }
        }
        console.log(score+1);
        k=0;
        j=0;
        //console.log(last_moves);
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