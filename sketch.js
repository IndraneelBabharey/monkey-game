var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background, backgroungImage;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup

var ground;

var gameOVER,restrtImg;
var SurvivalTime;


function preload() {

  backgroundImage = loadImage("ground (1).jpg")

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  groundImage = loadImage("geound2 (1) (1) (1).jpg");
  
  gameOVER = loadImage("text-removebg-preview.png")
  restartImg = loadImage("restart-removebg-preview.png")



}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
  console.log(message)
  
  
  background = createSprite(200, 180, 400, 10);
  background.addImage(backgroundImage)
  background.scale=3

  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;


  ground = createSprite(200,190,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100)
  gameOver.addImage(gameOVER)

  restart = createSprite(300,140)
  restart.addImage(restartImg)
  restart.scale=0.2
 
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();


  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height); 
  monkey.debug = true

  score = 0;

}

function draw() {


  //displaying score
  stroke("white")
  textSize(20)
  fill("white")
  text("Survival Time: " + score, 400, 50);

  stroke("black")
  textSize(20)
  fill("black")
  SurvivalTime=Math.ceil(frameCount/frameRate())
  //text("Survival Time:  "+ survivalTime,100,50)
  if (gameState === PLAY) 

   gameOver.visible=false;
    restart.visible=false;

    ground.velocityX = -(4 + 3 * score / 100)
    //scoring
    score = score + Math.round(getFrameRate() / 80);

   

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

   
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -8;

    }

   
    monkey.velocityY = monkey.velocityY + 0.8

   
    spawnbanana();
    spawnObstacles();

    


    if (obstaclesGroup.isTouching(monkey)) {
     // monkey.velocityY = -12;

      gameState = END;

obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    }
   else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    monkey.velocityY = 0
     
     


  
    
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

    if (mousePressedOver(restart)) {
    reset();
   }
  }


  
  monkey.collide(ground);




  drawSprites();
  text("X" + mouseX + "," + "Y" + mouseY, mouseX, mouseY);
}

function reset() {
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach()
  FoodGroup.destroyEach()
  
  score = 0
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage)         
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}





function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 50, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group

  }
}