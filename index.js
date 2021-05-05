let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

let backgroundColor = "";
let snakeColor = "";

function createBackground() {
    context.fillStyle = "gray";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function getMode() {
    const modo = document.getElementById("modoDoJogo");
    return modo.value;
}

function getTheme() {
    const thema = document.getElementById("snakeColor");
    if(thema.value == 1){
        backgroundColor = "#d3d3d3";
        snakeColor = "blue";
    }
    else if(thema.value == 2) {
        backgroundColor = "#808080";
        snakeColor = "blue";
    }
    else {
        backgroundColor = "#505050";
        snakeColor = "blue";
    }
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") {
        direction = "left";
    }
    if(event.keyCode == 38 && direction != "down") {
        direction = "up";
    }
    if(event.keyCode == 39 && direction != "left") {
        direction = "right";
    }
    if(event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
}

function defineDirection() {
    if(snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }
    if(snake[0].x < 0 * box && direction == "left") {
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }
    if(snake[0].y < 0 * box && direction == "up") {
        snake[0].y = 16 * box;
    }
}

function startGame() {
    defineDirection();
    
    createBackground();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") {
        snakeX +=box;
    }
    if(direction == "left") {
        snakeX -= box;
    }
    if(direction == "up") {
        snakeY -= box;
    }
    if(direction == "down") {
        snakeY += box;
    }

    toEat(snakeX, snakeY);
}

function toEat(snakeX, snakeY) {

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);
}

let play = setInterval(startGame, 150);
function begin() {
    play;
    getTheme();

    let snake = document.getElementById("snake");
    snake.classList.add("active");

    let buttons = document.querySelector(".containerButtons");
    buttons.classList.add("noActive");

}