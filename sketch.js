var canvas;
var backgroundImage, car1_img, car2_img, track,obstaculo1_img, obstaculo2_img, moeda_img, gasolina_img,life_img;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2;
var cars = [];
var grupo_de_obstaculos;
var grupo_de_moedas;
var grupo_de_gasolina;


function preload() {
  backgroundImage = loadImage("assets/planodefundo.png");
  car1_img = loadImage("assets/car1.png");
  car2_img = loadImage("assets/car4.png");
  track = loadImage("assets/track.jpg");
  obstaculo1_img = loadImage("assets/doguinho.png");
  obstaculo2_img = loadImage("assets/THEROCK.png");
  moeda_img = loadImage("assets/Dogecoin.png");
  gasolina_img = loadImage("assets/Gas.png");
  life_img = loadImage("assets/life.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
