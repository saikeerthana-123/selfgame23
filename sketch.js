//creating constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
//const Detector = Matter.Detector;

//creating variables
var engine, world;
var player, backgroundimg1, bg2;
var backgroundSprite;
var rand, randome, randomee;
var obs1,obs2,obs3,obs4;
var obstaclesGroup;
var out;
var slow,normal,fast,save,pup;
var voldemort;
var vold;
var nimbus;
var db;
var edges;
var dobby;
var riddle;
var nimbusGroup;
var gameState = "play";


function preload(){
  //loading images
  backgroundimg1 = loadImage("images/floor1.png");
  bg2 = loadImage("images/ocean.png");
  harryPotterImage = loadImage("images/HARRY POTTER 2.png");
  obs1 = loadImage("images/obstacle1.png");
  obs2 = loadImage("images/obstacle2.png");
  obs3 = loadImage("images/obstacle3.png");
  obs4 = loadImage("images/obstacle4.png");
  voldemort = loadImage("images/voldemort.png");
  nimbus = loadImage("images/nimbus2001.png");
  db = loadImage("images/dobby2.png");

  //loading sounds
  out = loadSound("sounds/storm.mp3");
  slow = loadSound("sounds/harry_potter.slow.mp3");
  normal = loadSound("sounds/harry_potter.fast.mp3");
  fast = loadSound("sounds/harry_potter.extrafast.mp3"); 
  save = loadSound("sounds/dobby.mp3");
 }

function setup() {
  //creating canvas
  createCanvas(windowWidth,windowHeight);

  //creating wndine and world
  engine = Engine.create();
  world = engine.world;
  //creating obstacles group
  obstaclesGroup = createGroup();
  //creating nimbus group
  nimbusGroup = createGroup();
  //background
  backgroundSprite = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  backgroundSprite.addImage(backgroundimg1);
  backgroundSprite.scale = 2;
  backgroundSprite.velocityY = 6;
  backgroundSprite.x = backgroundSprite.height/2;
  //player
  player = createSprite(windowWidth/2 - 300,windowHeight/2,300,300);
  player.addImage(harryPotterImage);
  player.scale = 0.8;
  //setting collider for player
  player.setCollider('rectangle',0,0,250,250);
  player.debug = true;
  
  //dobby
  dobby = createSprite(0,0,40,40);
  dobby.visible = false;
  dobby.scale = 0.4;
   //voldemort
  vold = createSprite(150,500,50,50);
  vold.velocityY = 6;  
  //voldemort image
  vold.addImage(voldemort);
  //edges
  
 }

function draw() {
  //background
  background("white"); 
  //creating edges
  edges = createEdgeSprites();
  if(gameState === "play"){
    //setting background sprite
    if (backgroundSprite.y > windowHeight) {
      backgroundSprite.y = backgroundSprite.height/2;
    }
   //creating obstacles
    if(frameCount % 100 === 0){
        randome = Math.round(random(400,900));
        var obs = createSprite(randome,5,10,10);
        rand = Math.round(random(1,4));
        obs.velocityY = 6;
        obs.debug = true;
        switch (rand) {
          case 1:
            obs.addImage(obs1);
            break;
          case 2:
            obs.addImage(obs2);
            break;
          case 3:
            obs.addImage(obs3);
            break;
          case 4:
            obs.addImage(obs4);
        }
        obs.scale = 0.5;
        obstaclesGroup.add(obs);
      }
      //allowing player to jump over obstacles
      if (keyDown("space")) {
        player.velocityY = -6;
      }
      //allowing player to move toward left or right
      if(keyCode === 37){
        player.velocityX = - 10;
      }
      if(keyCode === 39){
        player.velocityX = 10;
      }
      player.velocityY = player.velocityY + 0.8;
      //powerup with nimbus2001
      if(player.isTouching(nimbusGroup)){
        dobby.visible = true;
        dobby.x = player.x;
        dobby.y = player.y - 100;
        dobby.addImage(db);
        dobby.debug=true;
        //destroying obstacles when dobby hits;
        if(dobby.isTouching(obstaclesGroup)){
          obstaclesGroup.destroyEach();
        }
      }
      //calling spawnNimbus function
      spawnNimbus();
      //play music if level up
      if(frameCount <2000){
        slow.play();
      }
      if(frameCount >2000 && frameCount <4000){
        normal.play();
      }
      if(frameCount >4000){
        fast.play();
      }
    }
  //making player collide with edges
  player.collide(edges[3]);
  //drawing sprites
 
  //ending game when player is touching obstacles
   if (obstaclesGroup.isTouching(player)){
    gameState = "end";
    backgroundSprite.addImage(bg2);
    backgroundSprite.velocityY = 0;
    obstaclesGroup.destroyEach();
    obstaclesGroup.setVelocityYEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    player.velocityX = 0;
    player.velocityY = 0;
    slow.pause();
    normal.pause();
    fast.pause();
    out.play();
}
drawSprites();
}

//creating nimbus 2001
function spawnNimbus(){
  if(frameCount % 200 === 0){
  var nimbus2001 = createSprite(randome,200,50,50) ;
  nimbus2001.addImage(nimbus);
  nimbus2001.debug=true;
  nimbus2001.scale = 0.4;
  nimbus2001.lifetime = 100;
  nimbus2001.velocityY = 6;
  nimbus2001.setCollider('rectangle',0,0,200,30);
  nimbusGroup.add(nimbus2001);
  dobby.x = player.x;
  if(save.isPlaying === false){
    save.play();
  }
  else{
    save.pause();
  }
  }
}