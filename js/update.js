level=3;
var j=0;
var k=0;
var accelerations = [];

for(i=0;i<50;i++){
    last_move=-Math.random();
    accelerations.push(last_move);
}

maxHeight = 200;
minGap = 100;
maxGap = 200;
minHeight = 20;
for(i=0;i<25;i++){
    heights.push(Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight));
    gapping.push(Math.floor(Math.random()*(maxGap-minGap+1)+minGap));
}

function test(){
    accelerate(accelerations[k]);
    setTimeout(function(){
        accelerate(.05);
    },50);
    k++;
}

function updateGameArea() {
      var x, y;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                myGameArea.reset();
            } 
        }
        myGameArea.clear();
        if (myGameArea.x && myGameArea.y) {
            myGamePiece.image.src = "images/bird3.png";
            accelerate(-1.5); 
            myGameArea.x=false;
        } else if(myGameArea.y){
            myGamePiece.image.src = "images/bird2.png";
            accelerate(0.05);
            myGameArea.y=false;
        }
        myBackground.speedX = -level; //change
        myBackground.newPos(); 
        myBackground.update();
        myGameArea.frameNo += 1*level;
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            j++;
            x = myGameArea.canvas.width;
            myObstacles.push(new component(10, heights[j], "green", x, 0));
            myObstacles.push(new component(10, x - heights[j] - gapping[j], "green", x, heights[j] + gapping[j]));
            if(j==20){
                alert("path found" + accelerations);
            }
            test();
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -level;
            myObstacles[i].update();
        }
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        score=myObstacles.length/2-4;
        if(score<0){
            score=0;
        }else{
            score=myObstacles.length/2-3;
        }
        scr=i/2-3;//same as score
        myScore.text="SCORE: " + score;
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update(); 
}