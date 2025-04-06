const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 5;

let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 3;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function gameLoop() {
  // Move paddles
  if (keys["w"] && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
  if (keys["s"] && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
  if (keys["ArrowUp"] && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
  if (keys["ArrowDown"] && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleSpeed;

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Collide top/bottom
  if (ballY <= 0 || ballY >= canvas.height) ballSpeedY = -ballSpeedY;

  // Collide paddles
  if (
    ballX <= paddleWidth &&
    ballY >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX >= canvas.width - paddleWidth &&
    ballY >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Score conditions
  if (ballX < 0 || ballX > canvas.width) resetBall();

  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(0, leftPaddleY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, "white");
  drawBall(ballX, ballY, 10, "white");

  requestAnimationFrame(gameLoop);
}

const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

gameLoop();
