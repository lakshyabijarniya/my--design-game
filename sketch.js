var ballon, ballonImg;
var food, foodImg;
var obstacle, obstacleImg;
var score = 0;
var life = 3;
var obGroup;
var foodGroup;
var PLAY=0;
var END=1;
var coinS;
var gs;
var restart,restartI;
var gOver,gOverI;

var gameState="PLAY";

function preload() {
    ballonImg = loadImage("ballon.png");
    foodImg = loadImage("food.png");
    obstacleImg = loadImage("obstacle.png");
    coinS=loadSound("coin picking sound.wav");
    gs=loadSound("game over s.wav");
}

function setup() {
    createCanvas(800, 800);
    ballon = createSprite(400, 400);
    ballon.addImage("balllon", ballonImg);
    obGroup=new Group();
    foodGroup = new Group();
}

function draw() {
    background(0, 0, 255);
    ballon.scale = 0.3;
    if(gameState==="PLAY"){
        spawnFood();
        spawnOb();

        if (foodGroup.isTouching(ballon)) {
            score++;
            foodGroup.destroyEach();
            coinS.play();
        }

        if (obGroup.isTouching(ballon)) {
            life--;
            obGroup.destroyEach();
            gs.play();
        }

        if(life<=0){
            gameState="END";
        }
        if (keyDown("LEFT_ARROW")) {
            ballon.x = ballon.x-2;
        }
    
        if (keyDown("RIGHT_ARROW")) {
            ballon.x = ballon.x+2;
        }
    }
    else if(gameState="END"){
        background("black");
        textSize(40);
        obGroup.destroyEach();
        foodGroup.destroyEach();
        ballon.destroy();
        strokeWeight(8);
        stroke("blue");
        fill("pink");
        text("GameOver",300,300);
        if(mousePressedOver(restart)){
            gameState="PLAY";
        }
    }

    drawSprites();
    strokeWeight(4);
    stroke("blue");
    fill("green");
    textSize(20)
    text("Score : " + score, 700, 20);
    text("Life : " + life, 700, 40);

}


    //spawning obstacles
    function spawnOb(){
    if (frameCount % 60 === 0) {
        var rand = Math.round(random(0, 800));
        obstacle = createSprite(rand, -50);
        obstacle.addImage("ob", obstacleImg);
        obstacle.velocityY = 2;
        obGroup.add(obstacle);
        obstacle.debug=false;
        obstacle.setCollider("rectangle",0,-18,200,40)
}
    }

    //spawning food
    function spawnFood(){

    
    if (frameCount % 30 === 0) {
        var randd = Math.round(random(0, 800));
        food = createSprite(randd, -50);
        food.addImage("food", foodImg);
        food.scale = 0.1;
        food.velocityY = 3;
        foodGroup.add(food);
        food.debug=false;
    }  
}


