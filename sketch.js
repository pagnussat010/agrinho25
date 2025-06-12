let screen = "start";
let player;
let fruits = [];
let trees = [];
let carrying = false;
let score = 0;
let goal = 5; // Quantidade de árvores para vencer

function setup() {
  createCanvas(800, 400);
  resetGame(); // Inicializa os elementos do jogo
}

function draw() {
  if (screen === "start") {
    drawStartScreen();
  } else if (screen === "game") {
    drawGame();
  } else if (screen === "win") {
    drawWinScreen();
  }
}

function drawStartScreen() {
  background(200, 250, 200);
  fill(50, 100, 50);
  textAlign(CENTER);
  textSize(30);
  text("🌾 Eco Conexão: Campo e Cidade Unidos 🌇", width / 2, 100);
  textSize(18);
  text("Colete frutas no campo e plante árvores na cidade!", width / 2, 160);
  text("Use as setas para se mover. Pressione ESPAÇO para plantar.", width / 2, 200);
  text("Pressione ENTER para começar!", width / 2, 260);
}

function drawWinScreen() {
  background(180, 250, 200);
  fill(0, 120, 0);
  textAlign(CENTER);
  textSize(32);
  text("🎉 Parabéns! Você conectou o campo e a cidade! 🌱", width / 2, height / 2 - 40);
  textSize(20);
  text("Pressione R para jogar novamente", width / 2, height / 2 + 20);
}

function drawGame() {
  background(150, 200, 255);

  // Campo
  fill(100, 200, 100);
  rect(0, 0, width / 2, height);
  fill(0);
  textSize(16);
  text("Campo 🌻", 20, 20);

  // Cidade
  fill(200, 200, 220);
  rect(width / 2, 0, width / 2, height);
  fill(0);
  text("Cidade 🏙️", width - 100, 20);

  // Árvores
  for (let tree of trees) {
    tree.show();
  }

  // Frutas
  for (let fruit of fruits) {
    fruit.show();
  }

  // Jogador
  player.move();
  player.show();

  // Coletar frutas
  for (let fruit of fruits) {
    if (!fruit.collected && dist(player.x, player.y, fruit.x, fruit.y) < 30) {
      if (!carrying) {
        fruit.collected = true;
        carrying = true;
      }
    }
  }

  // Mostrar o que está carregando
  if (carrying) {
    fill(255, 100, 100);
    ellipse(player.x, player.y - 20, 10, 10);
  }

  // Mostrar pontuação
  fill(0);
  textSize(16);
  text("Árvores plantadas: " + score + "/" + goal, width / 2 - 60, 20);

  // Verificar vitória
  if (score >= goal) {
    screen = "win";
  }
}

function keyPressed() {
  if (screen === "start" && keyCode === ENTER) {
    screen = "game";
  }

  if (screen === "game" && keyCode === 32 && carrying && player.x > width / 2) {
    trees.push(new Tree(player.x, player.y));
    carrying = false;
    score++;
  }

  if (screen === "win" && (key === 'r' || key === 'R')) {
    resetGame();
    screen = "game";
  }
}

function resetGame() {
  player = new Player();
  fruits = [];
  trees = [];
  carrying = false;
  score = 0;

  // Gerar frutas
  for (let i = 0; i < 5; i++) {
    fruits.push(new Fruit(random(50, 350), random(100, 300)));
  }
}

class Player {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.speed = 4;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    // Limites
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    fill(255, 200, 0);
    ellipse(this.x, this.y, 30, 30);
  }
}

class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collected = false;
  }

  show() {
    if (!this.collected) {
      fill(255, 0, 0);
      ellipse(this.x, this.y, 15, 15);
    }
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(139, 69, 19);
    rect(this.x - 5, this.y - 20, 10, 20);
    fill(34, 139, 34);
    ellipse(this.x, this.y - 30, 30, 30);
  }
}





