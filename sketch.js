var towerImage,tower;
var doorImage,door,doorsGroup;
var ghostImage,ghost;
var climberImage,climber,climbersGroup
var invBlock,invBlockGroup
var gameState="PLAY"

function preload()
{
  towerImage=loadImage("tower.png");
  ghostImage=loadImage("ghost-standing.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
}
function setup()
{
 createCanvas(600, 600);

 
  
  tower = createSprite(300,300,20,50);
  tower.addImage("running", towerImage); 
  tower.velocityY=1;
  
  doorsGroup=new Group();
  
  climbersGroup=new Group();
  
  invBlockGroup=new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("standing", ghostImage); 
  //tower.velocityY=1
  ghost.scale=0.3;
}

function draw()
{
  if (gameState==="PLAY")
  {
    
  
    
  
  if (tower.y>400)
    {
      tower.y=300;
    }
  if(keyDown("space")){
     ghost.velocityY=-5;
     }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-3;
     }
  
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+3;
     }
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY=0;
    }
  
  if (invBlockGroup.isTouching(ghost)||ghost.y>600)
    {
      ghost.destroy();
      gameState="END";
    }
    
  
  
  drawSprites();
  
  
}
 if (gameState==="END") 
   {
     stroke("yellow");
     fill("yellow");
     textSize(30);
     text("GAMEOVER",230,250)
   }
}

function spawnDoors()
{
  if (frameCount % 240 === 0) {
    var door = createSprite(200,-50,40,10);
    door.x = Math.round(random(120,400));
    door.addImage(doorImage);
    //door.scale = 0.5;
    door.velocityY = 1;
    
    door.lifetime = 800;
    
    //adjust the depth
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    //add each cloud to the group
    doorsGroup.add(door);
    var climber = createSprite(200,10,40,10);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.x=door.x
    climber.lifetime = 800;
    
    climbersGroup.add(climber);
    var invBlock = createSprite(200,15,40,10);
   // climber.addImage(climberImage);
    invBlock.velocityY = 1;
    invBlock.x=door.x
    invBlock.lifetime = 800;
    invBlock.width=climber.width;
    invBlock.height=2;
    invBlock.debug=true;
    invBlockGroup.add(invBlock)
    
    climbersGroup.add(climber)
  }
  
  
}

