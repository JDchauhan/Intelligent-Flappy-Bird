var myGamePiece;
var mySound;
var myBackground;
var myScore;
var myObstacles= [];
var gapping=[];
var heights=[];

function startGame() {
    myBackground = new component(1650, 270, "images/background.jpg", 0, 0, "background");
    myGamePiece = new component(30, 30, "images/bird1.png", 10, 120,"image");

    myGamePiece.gravity = 0.05;
 //   myObstacle  = new component(10, 200, "green", 300, 120);
    mySound = new sound("background","sounds/background.mp3");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text"); 
    myGameArea.start();
    mySound.play();
}

function component(width, height, color, x, y,type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y; 

    this.update = function(){
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if(type == "image") {
            ctx.drawImage(this.image, this.x, this.y,this.width, this.height);
        } else if (type == "background") {
             ctx.drawImage(this.image, this.x, this.y,this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        if (this.type == "background") {
            if (this.x == 480-(this.width)) {
                this.x = 0;
            }
        }
        if(this.hitBottom()){
            this.gravitySpeed=0;
            this.gravity = 0;
            this.y = myGameArea.canvas.height - this.height;
        }
        if(this.hitTop()){
            this.gravitySpeed=0;
            this.gravity = 0;
            this.y = 0;
            accelerate(0.05);
        }
    } 

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            return true;
        }
    }

    this.hitTop = function() {
        var rockTop = myGameArea.canvas.height - this.height;
        if (this.y < 0) {
            this.y=0;
            return true;
        }
    }

    //crash
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop + 2) ||
               (mytop > otherbottom - 2) ||
               (myright < otherleft + 4) ||
               (myleft > otherright - 4)) {
           crash = false;
        }
        return crash;
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    if (!myGameArea.interval) {myGameArea.interval = setInterval(updateGameArea, 20);}

    myGamePiece.gravity = n*(level);
    if(n>=0){
        myGamePiece.image.src = "images/bird2.png";
    }else{
        myGamePiece.image.src = "images/bird3.png";
    }
}