height= 270;
width= 480;
var i=0;
var l;
var new_move;
var last_move;
var last_score;
var last_moves=[];
var speed=[-.1,-.2,-.3,-.4,-.5,-.6,-.7,-.8,-.9];
var acc=[-.1,-.2,-.3,-.4,-.5,-.6,-.7,-.8,-.9];

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
        new_move = speed[Math.floor(Math.random()*9)];
        if(score==last_score){
            if(crash_pos=="top" && last_move){
                last_move += .1;
                i=acc.indexOf(last_move);
                if(i!=undefined || i!=null){
                    while(i<acc.length){
                        acc.pop();
                    }
                }
            }
            else if(crash_pos=="bottom" && last_move){
                last_move -= .1;
                i=acc.indexOf(last_move);
                if(i!=undefined || i!=null){
                    l=0;
                    while(l<i){
                        l++;
                        acc.shift();
                    }
                }
            }else{}

            crash_pos=null;
            if(acc.length==0){
                score-=1;
                acc=speed.slice();
            }
            new_move=acc.splice([Math.floor(Math.random()*acc.length)],1);
            //console.log(acc);
            //console.log(new_move);
        }else{
            last_score=score;
            acc=speed.slice();
        }
        //console.log(new_move);
        if(score>0){
            accelerations[score+2]=new_move;
            for(i=score+2;i<50;i++){//score+3
                accelerations[i]=speed[Math.floor(Math.random()*9)];
            }
        }else{
            accelerations[0]=new_move;
            for(i=1;i<50;i++){
                accelerations[i]=speed[Math.floor(Math.random()*9)];
            }
        }
        last_move=new_move;
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
