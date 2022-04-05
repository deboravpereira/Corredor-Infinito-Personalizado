var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var boy, boyImg;//4 PASSO ALTERAR VAR GHOST
var invisibleBlockGroup, invisibleBlock;//6 PASSO BL INVISIVEIS P/ IDENTIFICAR TOQUE DO PERSONAGEM POR BAIXO
var PLAY = 1;
var END = 0;
var gameState = PLAY;//7 passo
var dieSound, jumpSound;


function preload(){

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");//2 PASSO
  climberImg = loadImage("climber.png");
  boyImg = loadImage("boy_walk1.png");//4 PASSO ALTERAR VAR GHOST
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3")

}

function setup() {

  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();//2 PASSO
  climbersGroup = new Group(); //3 PASSO CRIAR CLIMBERS

  //4 PASSO PERSONAGEM
  boy = createSprite(200,200,50,50);
  boy.scale = 0.6;
  boy.addImage(boyImg);

  //6 PASSO blocos invisiveis
  invisibleBlockGroup = new Group();

}

function draw() {

  background(0);
  if (gameState === PLAY){
    
      if(tower.y > 400){
          tower.y = 300
        }
    
      //4 passo  movimento do personagem
      if (keyDown("left_arrow")){
        boy.x = boy.x -3;
      }
    
      if (keyDown("right_arrow")){
        boy.x = boy.x +3;
      }

      if (keyDown("space")){
        boy.velocityY = -5;
        jumpSound.play();
      }

      //4 passo gravidade do personagem
      boy.velocityY = boy.velocityY + 0.5;

      //5 passo  fazer personagem descansar na grade
      if (climbersGroup.isTouching(boy)){
        boy.velocityY = 0;
      }

      spawnDoors();//2 PASSO

      //7 PASSO CONDIÇÃO PARA ENTRAR NO ESTADO END
      if (invisibleBlockGroup.isTouching(boy) ||boy.y >600){
        boy.destroy();
        gameState = END;
        dieSound.play();
      }

      drawSprites();
      
  }

  //7 PASSO ESTADO END
  if (gameState === END){
    stroke("white");
    fill("BLACK");
    textSize(30);
    textFont("arial")
    text("ACABOU PARA VOCÊ AMIGO", 100,250);
    text("GAME OVER", 180,290);
  }
}

//2 PASSO CRIAR FUNÇÃO PARA GERAR PORTAS
function spawnDoors(){

  if (frameCount%240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    //3 PASSO CRIAR CLIMBERS
    climber = createSprite (200,10);
    climber.addImage(climberImg);
    //6 passo criar blocos invisiveis
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible=true;
    
    //2 PASSSO posição aleatória das portas 
    door.x = Math.round(random(120,400));
    door.velocityY=1;

    //3 PASSO CRIAR CLIMBERS
    climber.x = door.x;
    climber.velocityY=1;

    //6 passo posição do bloco invisivel
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    //4 PASSO DAR PROFUNDIDADE CORRETA
    boy.depth = door.depth;
    boy.depth += 1;

    //2 PASSSO tempo de vida das portas
    door.lifetime = 800;
    climber.lifetime = 800;//3 PASSO

    //2 PASSSO adicionar door ao grupo doors
    doorsGroup.add(door);
    climbersGroup.add(climber);//3 PASSO

    //6 passo adicionar blocos invisiveis ao grupo
    invisibleBlock.debug =true;
    invisibleBlockGroup.add(invisibleBlock);



  }

}
