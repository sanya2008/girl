const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg
var bg2
var girl
var score=0
var candies
var candy1
var candy2
var candy3
var candy4
var choco
var chocolate
var brocoli
var reset

function preload(){
backgroundImg=loadImage("ground.jpg")
girlImg=loadImage("girl-removebg-preview.png")
candy1=loadImage("candy-removebg-preview.png")
candy2=loadImage("candy2-removebg-preview.png")
candy3=loadImage("candy_3-removebg-preview.png")
candy4=loadImage("candy4-removebg-preview.png")
choco=loadImage("choco-removebg-preview.png")
brocoliImg=loadImage("brocoli-removebg-preview.png")
resetImg=loadImage("reset-removebg-preview.png")
bg2=loadImage("bg2.jpg")
}

function setup(){
    createCanvas(1500,650);
    engine = Engine.create();
    world = engine.world;
  
    girl=createSprite(1000,500,50,50)
    girl.addImage("girl",girlImg)
    girl.scale=0.5
    girl.visible=true;
    
    reset=createSprite(670,400,50,50)
    reset.addImage("reset",resetImg)
    reset.scale=0.3

    reset.visible=false;

    candiesGroup=new Group()
    chocolateGroup=new Group()
    brocoliGroup=new Group()
}

function draw(){
    background(backgroundImg);
   
    Engine.update(engine);
    drawSprites();

   girl.x=mouseX

   //if(candiesGroup.isTouching(girl)){
    //destroycandies
  //}

  girl.bounceOff(candiesGroup,destroycandies)
  girl.bounceOff(brocoliGroup,destroybrocs)
  girl.bounceOff(chocolateGroup,destroychoco)
   djcandies()
   chocolates()
   brocs()
   
   if(girl.y>560){
     girl.y=500
   }

  
   if(score==500){
    reset.visible=true;
     girl.visible=false;
     brocoli.visible=false;
     candies.visible=false;
     chocolate.visible=false;
     girl.destroy()
     background(bg2)
     
    stroke("yellow")
    fill("yellow")
    textSize(40)
    text("GAME OVER",600,300)
    text("YOU WON",620,350)
   }

   textSize(40);
  stroke(3);
  fill("black")
  text("SCORE: "+ score,1250,50);

  if(mousePressedOver(reset)){
    reset.visible=false;
    score=0
   }
}


function djcandies(){
    if(frameCount%20===0){
        candies=createSprite(120,30,20,20)
        candies.velocityY=4
        candies.x=Math.round(random(100,1400))
        var abc=Math.round(random(1,4))
      switch(abc){
        case 1:candies .addImage("candy1",candy1) ;
          break;
         case 2:candies .addImage("candy2",candy2) ;
          break;  
         case 3:candies .addImage("candy3",candy3) ;
          break;
          case 4:candies .addImage("candy4",candy4) ;
          break;
          default:break 
             
      }
      candies.scale=0.20
      candiesGroup.add(candies)
}
}

function chocolates(){
  if(frameCount%50===0){
    chocolate=createSprite(150,40,20,20)
    chocolate.velocityY=4
    chocolate.x=Math.round(random(100,1400))
    chocolate.addImage("choco",choco)
    chocolate.scale=0.3
  chocolateGroup.add(chocolate) 
  }
  
}

function destroycandies(girl,candies){
  score = score + 10;
  candies.remove();
}

function destroychoco(girl,chocolate){
  score=score+30
  chocolate.remove()
}

function destroybrocs(girl,brocoli){
  score= score -40;
  brocoli.remove()
}

function brocs(){
  if(frameCount%40===0){
    brocoli=createSprite(110,20,50,50)
    brocoli.velocityY=3
    brocoli.x=Math.round(random(100,1500))
    brocoli.addImage("brocoli",brocoliImg)
    brocoli.scale=0.4
    brocoliGroup.add(brocoli)
  }
}