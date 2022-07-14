const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var solo;
var corda;
var uniao;

var fundo;
var fruta,frutaimg;
var coelho,coelhoimg;
var cortar;

var coelhoPiscando, coelhoComendo, coelhoTriste;

function preload()
{
  fundo = loadImage('background.png');
  frutaimg = loadImage('melon.png');
  coelhoimg = loadImage('Rabbit-01.png');
  coelhoPiscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  coelhoComendo = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  coelhoTriste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  coelhoPiscando.playing = true;
  coelhoPiscando.looping = true;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80); //taxa de frames
  engine = Engine.create();
  world = engine.world;
  solo = new Ground(200,680,600,20);

  corda = new Rope(7,{x:245,y:30});
  fruta = Bodies.circle(300,300,20);
  Matter.Composite.add(corda.body,fruta);

  uniao = new Link(corda,fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  coelhoPiscando.frameDelay = 20;

  coelho=createSprite(width/2,600);
  coelho.addImage(coelhoimg);
  coelho.scale=0.3;

  coelho.addAnimation('piscando', coelhoPiscando);
  coelho.changeAnimation('piscando');


  cortar=createImg("cut_btn.png")
  cortar.position(250,20)
  cortar.size(50,50)
  cortar.mouseClicked(cair)

  
}

function draw() 
{
  background(51);

  image(fundo,width/2,height/2,490,690);

  image(frutaimg,fruta.position.x,fruta.position.y,70,70);
  
  corda.show();
  Engine.update(engine);
  //solo.show();

 drawSprites();


   
}
function cair()
{
  corda.break();
  uniao.detach();
  uniao=null;
}
