var backImage,backgr;
var player, player_running;
var ground,ground_img;
var gameOverImg,bananaImg;
var stoneImg, gameOver;
var banana,obstacle,deadMonkeyImg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var bananasGroup,obstaclesGroup;

function preload(){
  backImage=loadImage("images/jungle.jpg");
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  stoneImg = loadImage("images/stone.png");
  bananaImg = loadImage("images/banana.png");
  gameOverImg = loadImage("images/gameOver.png")
  deadMonkeyImg = loadImage("images/deadMonkey.png")
}

function setup() {
  createCanvas(800,400);

  //making groups for bananas and obstacles
    obstaclesGroup = createGroup();
    bananasGroup = createGroup();
  
  

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY)
  {
    gameOver.visible = false;
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  bananas();
  obstacles();

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    if(player.isTouching(bananasGroup))
      {
        for (var i = 0; i < bananasGroup.length; i++) {
          if (bananasGroup.get(i).isTouching(player)) {
              bananasGroup.get(i).destroy();}}
        score = score +5;
        
        if(score===60||score===80||score===100||score===40)
        {
          player.scale = player.scale + 0.02;
          obstaclesGroup.scale = obstaclesGroup.scale + 0.02;
        }
      }
      if(obstaclesGroup.isTouching(player)&&gameState===PLAY)
    {
        gameState = END;
        
        gameOver.visible = true;
        player.velocityY =  0;
        backgr.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananasGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1);
        player.addImage(deadMonkeyImg)
        player.changeAnimation(deadMonkeyImg)
     }
  }
    
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(ground);
   
    player.setCollider("circle",-2,2,100);
    
  

  drawSprites();

  stroke("black");
      textSize(25);
      fill("black")
      text("score :"+score,250,100);

  //creating reqired functions    
  function bananas()
  {
     if(frameCount % 80===0)
     {
      banana = createSprite(700,300);
      banana.addAnimation("banana",bananaImg);
      banana.velocityX = -(5 + 3* score/100)
      banana.y = Math.round(random(300,250));
      banana.scale = 0.06;
      banana.lifetime = 150;
      bananasGroup.add(banana);
      }
   } 
   function obstacles()
  {
   if(frameCount % 150===0)
   {
     obstacle = createSprite(700,350);
     obstacle.addAnimation("obstacle", stoneImg);
     obstacle.velocityX = -(5 + 3* score/100);
     obstacle.scale = 0.2; 
     obstacle.lifetime = 400;
     obstaclesGroup.add(obstacle);
   } 
  } 
}