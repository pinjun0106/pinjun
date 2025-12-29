const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};

let direction = "";

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 畫蛇
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // 畫食物
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // 吃到食物
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").innerText = score;

    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  // ❗ 只有撞牆才結束
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height
  ) {
    clearInterval(game);
    alert("遊戲結束！分數：" + score);
    return;
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 120);