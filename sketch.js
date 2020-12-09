
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup , position;
var survival

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(400, 400);
  monkey = createSprite(80,315,20,20);
     banana = createSprite(600,165,10,40);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
ground = createSprite(400,350,900,10);
   obstacle = createSprite(600,326,10,40);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
    foodGroup = new Group();
  obstacleGroup = new Group();
  survival = 0;
}


function draw() {
background("white");
  text("Survival time: "+ survival, 200,50);
  if (ground.x < 0){
  ground.x = ground.width/2;
    }
   survival = survival + Math.round(getFrameRate()/60);
   // console.log(monkey.y);
  if(monkey.isTouching(ground)){
    
    monkey.collide(ground);
  }
   if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    if(foodGroup.isTouching(monkey)){
     
    
      foodGroup.destroyEach();
  
    }
      if(obstacleGroup.isTouching(monkey)){
    textSize(30);
        text("GAME OVER",120,200);
        monkey.velocityX = 0;
        foodGroup.setVelocityEach(0,0);
      obstacleGroup.setVelocityEach(0,0);
        foodGroup.destroyEach();
                survival = 0;

      }
  bananas();
  obstacles();
  
  
  
  
  drawSprites();
}

function bananas(){

 if (frameCount % 80 === 0){
   banana = createSprite(600,165,10,40);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
   banana.velocityX= -5;
     position = Math.round(random(120,200));
   banana.y = position;
   banana.lifetime = 125;
 }
  foodGroup.add(banana);
}
function obstacles(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(600,326,10,40);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -5;
  }
  
  obstacleGroup.add(obstacle);
}


