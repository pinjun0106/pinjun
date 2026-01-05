<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>貪吃蛇小遊戲</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      background-color: #fafafa;
    }

    canvas {
      border: 2px solid #000;
      background-color: #f0f0f0;
    }

    h2 {
      margin-bottom: 5px;
    }

    p {
      margin-top: 0;
    }
  </style>
</head>
<body>

  <h2>🐍 貪吃蛇小遊戲</h2>
  <p>分數：<span id="score">0</span></p>
  <canvas id="game" width="400" height="400"></canvas>

  <script>
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const box = 20;
    const maxX = canvas.width - box;
    const maxY = canvas.height - box;

    let score = 0;
    let direction = "";
    let snake = [{ x: 200, y: 200 }];

    let food = createFood();

    document.addEventListener("keydown", changeDirection);

    function changeDirection(e) {
      if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }

    function createFood() {
      return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 畫蛇
      snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "green" : "lightgreen";
        ctx.fillRect(part.x, part.y, box, box);
        ctx.strokeRect(part.x, part.y, box, box);
      });

      // 畫食物
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);

      let headX = snake[0].x;
      let headY = snake[0].y;

      if (direction === "LEFT") headX -= box;
      if (direction === "UP") headY -= box;
      if (direction === "RIGHT") headX += box;
      if (direction === "DOWN") headY += box;

      // 撞牆判定（真的超出畫面才死）
      if (
        headX < 0 ||
        headY < 0 ||
        headX > maxX ||
        headY > maxY
      ) {
        clearInterval(game);
        alert("遊戲結束！分數：" + score);
        return;
      }

      // 吃到食物
      if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = createFood();
      } else {
        snake.pop();
      }

      snake.unshift({ x: headX, y: headY });
    }

    const game = setInterval(draw, 120);
  </script>

</body>
</html>
