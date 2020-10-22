var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;
var restart, restartImg;
var ground, groundImg, invisibleGround;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  restartImg = loadImage("Imported piskel (3).png");

  groundImg = loadImage("jungle.jpg");

}



function setup() {

  createCanvas(500, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(500, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x)
  ground.scale = 2;
  ground.addImage(groundImg);


  restart = createSprite(250, 160, 10, 10);
  restart.addImage(restartImg);
  restart.depth = ground.depth + 1;

  invisibleGround = createSprite(10, 390, 1000, 10);
  invisibleGround.visible = false;

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();


}


function draw() {


  drawSprites();
  textSize(17);
  fill("black");
  stroke("black");
  text("Your score:" + score, 380, 30);
  text("SurvivalTime:" + survivalTime, 360, 60);


  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;

    }

    monkey.velocityY = monkey.velocityY + 0.8

    monkey.collide(invisibleGround);

    spawnObstacles();
    spawnFood();
    survivalTime = survivalTime +
      Math.round(getFrameRate() / 60);


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (monkey.isTouching(FoodGroup)) {
      score = score + 5;
      FoodGroup.destroyEach();
    }
    restart.visible = false;
  }
  if (monkey.isTouching(obstaclesGroup)) {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    gameState = END;

  }
  if (gameState === END) {
    restart.visible = true;
    if (mousePressedOver(restart)) {
      reset();
    }
  }

  //ground.depth=monkey.depth; 
  monkey.depth = ground.depth + 1;
}

function spawnObstacles() {

  if (frameCount % 200 === 0) {
    obstacle = createSprite(800, 360, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifeTime = 300;
    obstaclesGroup.add(obstacle);
    obstacle.depth = ground.depth + 1;
  }
}

function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = Math.round(random(100, 70))
    banana.velocityX = -5;
    banana.lifeTime = 300;
    banana.addImage(bananaImage)
    banana.scale = 0.05;
    FoodGroup.add(banana);
    banana.depth = ground.depth + 1;
  }
}

function reset() {
  gameState = PLAY;
  FoodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score = 0;
  survivalTime = 0;
  ground.velocityX = -4;
  monkey.x = 80
  monkey.y = 315;
}