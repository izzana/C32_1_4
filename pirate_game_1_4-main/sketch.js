const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg, waterSound, backgroundMusic, cannonExplosion;
var canvas, angle, tower, ground, cannon, boat;
var balls = [];
var boats = [];

//carregar JSON e imagem do navio
var boatAnimation = [];
var boatSpritedata, boatSpritesheet;
//carregar JSON e imagem do navio quebrado
var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

function preload() {
  //adicionar imagem de fundo
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  //carregar JSON e imagem do navio
  boatSpritedata = loadJSON("./assets/boat/boat.json");
  boatSpritesheet = loadImage("./assets/boat/boat.png");
  //carregar JSON e imagem do navio quebrado
  brokenBoatSpritedata = loadJSON("./assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("./assets/boat/broken_boat.png");
}

function setup() {
  //criar canvas para o fundo cobrir a tela inteira
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  //rectMode(CENTER);
  //ellipseMode(RADIUS);

  //atribuir valor à variável angle
  angle = -PI/4;
  ground = new Ground(0, height - 1, width * 2, 1);
  //criando objeto torre e passando parâmetros definidos na criaçao da classe Tower
  tower = new Tower(150, 350, 160, 310);
  //criando objeto cannon/canhao
  cannon = new Cannon(180, 110, 100, 50, angle);
  //criando objeto cannonball
  //cannonBall = new CannonBall(cannon.x, cannon.y); colar dentro da function 

  //criar objeto navio/boat
  boat = new Boat(width, height - 100, 200, 200, -100);

  //criar variável para dados dos quadros
  var boatFrames = boatSpritedata.frames;
  //loop para percorrer a matriz boatFrames
  for(var i = 0; i < boatFrames.length; i++) {// i = i+1
    //variável para obter  a posição de cada quadro de boatFrames
    var pos = boatFrames[i].position;
    //variável para para obter a imagem de boatSpritesheet
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    //imagem para a matriz
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);


  Engine.update(engine);
  ground.display();
 
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  //function para exibir navio
  showBoats();
  //exibir o canhão
  cannon.display();
  //exibir a torre
  tower.display();


}

//function para quando tecla baixo for clicada
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

//criar function para mostrar bolas de canhão
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

//function para mostrar os navios
function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        boatAnimation
      );


      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
      boats[i].animate();
     
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}


//releasing the cannonball on key release
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
