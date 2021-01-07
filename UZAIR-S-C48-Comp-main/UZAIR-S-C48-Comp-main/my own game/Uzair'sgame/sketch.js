var monsterimg;

var trap1img,trap2img,trap3img,trap4img,trap5img;

var boost1img,boost2img,boost3img;

var bg1img,bg2img;

var zombie,zombie_attack,zombie_running,zombie_idle;

var ufo, ufoimg;



var points = 0;

var gameState = "play";
function preload()
{
    bg1img = loadImage("images/bg1.png");
    bg2img = loadImage("images/bg2.png");

    zombie_running=loadAnimation("images/Walk (1).png","images/Walk (2).png","images/Walk (3).png","images/Walk (4).png","images/Walk (5).png","images/Walk (6).png","images/Walk (7).png","images/Walk (8).png","images/Walk (9).png","images/Walk (10).png");
    zombie_attack=loadAnimation("images/Attack (2).png","images/Attack (3).png","images/Attack (4).png","images/Attack (5).png","images/Attack (6).png","images/Attack (7).png","images/Attack (8).png");
    zombie_idle=loadImage("images/Stand.png");
    trap1img = loadImage("images/trap1.jpg");
    trap2img = loadImage("images/trap2.png");
    trap3img = loadImage("images/trap3.jpg");
    trap4img = loadImage("images/trap4.jpg");
    trap5img = loadImage("images/trap5.jpg");

    

    boost1img = loadImage("images/boost1.png");
    boost2img = loadImage("images/boost2.png");
    boost3img = loadImage("images/boost3.png");

    energyimg = loadImage("images/jewel.png")
    ufoimg = loadImage("images/ufo.png");


}

function setup() {
  createCanvas(1500,750);

  zombie=createSprite(250,410,600,10);
  zombie.addAnimation("zombie_running",zombie_running);
  zombie.addAnimation("zombie_attack",zombie_attack);
  zombie.addImage("zombie_idle",zombie_idle);
  zombie.scale=0.2;

  ufo = createSprite(50,360,600,10);
  ufo.addImage("ufofly", ufoimg);
  ufo.scale = 0.3;
  
  obstaclesGroup = new Group();
  energyGroup = new Group();
}

function draw() {
  background(bg1img);  

  fill("white");
  
  text("Alma Matter : "+ points, 200, 100);

  if(gameState === "play")
  {
        if(keyDown("up"))
        {
                zombie.y = zombie.y -4;
        }

        if(keyDown("down"))
        {
                zombie.y = zombie.y +4;
        }

        ufo.y = zombie.y - 50;
        ufo.x = zombie.x - 200;

        if(zombie.isTouching(energyGroup))
        {
                points += 50;
                energyGroup.destroyEach();
        }

        if(zombie.isTouching(obstaclesGroup))
        {
               gameState = "end1";      
        }

        if(points === 50)
        {
                gameState = "end2";
        }

        spawnEnergy();
        spawnObstacles();

        
        
  }
  if(gameState === "end2")
  {
          obstaclesGroup.setVelocityXEach(0);
          energyGroup.setVelocityXEach(0);
          obstaclesGroup.setLifetimeEach(-1);
          energyGroup.setLifetimeEach(-1);
          obstaclesGroup.destroyEach();
          energyGroup.destroyEach();
          zombie.changeImage("zombie_idle",zombie_idle);
          zombie.x = width/2;
          zombie.scale = 0.6;
          zombie.y = height/2 - 200;

          ufo.velocityY = -3;
          ufo.velocityX = 4;
          ufo.scale = 0.3;

          textSize(25);
          text("UFO LOST ITS TRACK..... MISSION SAVE OURCUS ACCOMPLISHED",300,500);
  }


  if(gameState === "end1")
  {
          background(0);
          obstaclesGroup.setVelocityXEach(0);
          energyGroup.setVelocityXEach(0);
          obstaclesGroup.setLifetimeEach(-1);
          energyGroup.setLifetimeEach(-1);
          obstaclesGroup.destroyEach();
          energyGroup.destroyEach();

          zombie.depth = ufo.depth;
          ufo.depth++;
          
          ufo.x = zombie.x;
          ufo.y = zombie.y;
          zombie.changeImage("zombie_idle",zombie_idle);
          textSize(25);
          text("HUMANS HAVE GAINED VICTORY ONCE AGAIN",300,600);
  }

  
  
  drawSprites();
  
}





function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(1600,905,60,40);
    obstacle.y = Math.round(random(100,700));
    obstacle.velocityX = -4;

    
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(trap1img);
      obstacle.scale = 0.08;
              break;
      case 2: obstacle.addImage(trap2img);
      obstacle.scale = 0.1;
              break;
      case 3: obstacle.addImage(trap3img);
      obstacle.scale = 0.3;
              break;
      case 4: obstacle.addImage(trap4img);
      obstacle.scale = 0.09;
              break;
      case 5: obstacle.addImage(trap5img);
      obstacle.scale = 0.1;
              break;
      
      default: break;
}
    
     obstacle.lifetime = 1000;
     obstaclesGroup.add(obstacle);

}
}

function spawnEnergy()
{
        if(frameCount % 500 === 0)
        {
                var energy = createSprite(1600,905,60,40);
                energy.addImage("ener",energyimg);
                energy.velocityX = -5;
                energy.scale = 0.1;
                energy.y = Math.round(random(100,700));
                energy.lifetime = 1000;
                energyGroup.add(energy);
        }
}
